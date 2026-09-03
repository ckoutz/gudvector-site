"use server";

import { Resend } from "resend";
import { needLabels, contactSchema } from "@/lib/validations/contact";
import { ENTITY } from "@/lib/site";
// An in-memory Map is not a rate limit on Vercel (each invocation is isolated).
// Production needs Cloudflare Turnstile (with keys) or a shared store. Honeypot stays.

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<
    Record<"name" | "email" | "need" | "message", string>
  >;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const honeypot = String(formData.get("website") ?? "");
  if (honeypot.trim()) {
    return { status: "success", message: "Thanks. We will reply by email." };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    need: formData.get("need"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (
        key === "name" ||
        key === "email" ||
        key === "need" ||
        key === "message"
      ) {
        fieldErrors[key] ??= issue.message;
      }
    }
    return {
      status: "error",
      message: "Check the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      status: "error",
      message:
        "The form is not sending yet. Email info@gudvector.com and say what you need.",
    };
  }

  const from =
    process.env.RESEND_FROM ?? "Güd Vector <info@gudvector.com>";
  const to = process.env.CONTACT_TO ?? ENTITY.email;
  const { name, email, need, message } = parsed.data;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New site note: ${needLabels[need]} — ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Need: ${needLabels[need]}`,
        "",
        message,
      ].join("\n"),
    });

    if (error) {
      return {
        status: "error",
        message:
          "We could not send that just now. Email info@gudvector.com instead.",
      };
    }
  } catch {
    return {
      status: "error",
      message:
        "We could not send that just now. Email info@gudvector.com instead.",
    };
  }

  return {
    status: "success",
    message: "Thanks. We will reply at the email you sent.",
  };
}
