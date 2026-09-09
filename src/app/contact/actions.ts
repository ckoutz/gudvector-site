"use server";

import { Resend } from "resend";
import { contactSchema } from "./schema";
import { siteConfig } from "@/lib/site-config";
import { gvasEnv, resolveBookingUrl, withCalendlyPrefill } from "@/lib/gvas";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
  bookingUrl?: string | null;
};

async function bookingUrlFor(name: string, email: string): Promise<string | null> {
  const base = await resolveBookingUrl();
  return base ? withCalendlyPrefill(base, { name, email }) : null;
}

const needLabels: Record<string, string> = {
  website: "Website",
  quoting: "Automating business systems",
  both: "Both",
};

export async function submitContact(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    business: String(formData.get("business") ?? ""),
    need: String(formData.get("need") ?? ""),
    message: String(formData.get("message") ?? ""),
    website: String(formData.get("website") ?? ""),
  };

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0]);
      if (!fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    return { status: "error", fieldErrors, message: "Check the form and try again." };
  }

  // Honeypot tripped — pretend success, do not send.
  if (parsed.data.website) {
    return { status: "success", bookingUrl: null };
  }

  const { name, email, business, need, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey && gvasEnv.mock) {
    // Local dev with GVAS_MOCK=1: skip email so the success state is reachable.
    console.warn("submitContact: GVAS_MOCK=1 and no RESEND_API_KEY — skipping email send.");
    return { status: "success", bookingUrl: await bookingUrlFor(name, email) };
  }

  if (!apiKey) {
    // RESEND_API_KEY is not set in this environment. Set it in your Vercel
    // project's environment variables to enable outbound email — see README.
    console.error(
      "submitContact: RESEND_API_KEY is not set. Message not sent:",
      { name, email, business, need },
    );
    return {
      status: "error",
      message: `Something went wrong on our end. Email ${siteConfig.email} directly for now.`,
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `${siteConfig.name} website <site@gudvector.com>`,
      to: siteConfig.email,
      replyTo: email,
      subject: `New contact form message from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        business ? `Business: ${business}` : null,
        `Need: ${needLabels[need] ?? need}`,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (error) {
      console.error("submitContact: Resend error", error);
      return {
        status: "error",
        message: `Something went wrong sending that. Email ${siteConfig.email} directly for now.`,
      };
    }
  } catch (err) {
    console.error("submitContact: unexpected error", err);
    return {
      status: "error",
      message: `Something went wrong sending that. Email ${siteConfig.email} directly for now.`,
    };
  }

  return { status: "success", bookingUrl: await bookingUrlFor(name, email) };
}
