"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { submitPortalRequest } from "@/lib/gvas";
import { getPortalSessionToken, redirectOnUnauthorized } from "@/lib/portal-session";

export type PortalRequestState = {
  status: "idle" | "sent" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

const requestSchema = z.object({
  message: z.string().trim().min(1, "Tell us what you need."),
  preferredDates: z.string().trim(),
});

export async function submitPortalRequestAction(
  _prevState: PortalRequestState,
  formData: FormData,
): Promise<PortalRequestState> {
  const parsed = requestSchema.safeParse({
    message: formData.get("message"),
    preferredDates: formData.get("preferredDates") ?? "",
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0]);
      if (!fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    return { status: "error", fieldErrors, message: "Check the form and try again." };
  }

  const sessionToken = await getPortalSessionToken();
  if (!sessionToken) {
    // No session cookie — send them back through the magic-link flow.
    redirect("/portal/login");
  }

  const preferredDates = parsed.data.preferredDates;

  try {
    await submitPortalRequest(sessionToken, {
      message: parsed.data.message,
      ...(preferredDates ? { preferredDates } : {}),
    });
  } catch (err) {
    redirectOnUnauthorized(err); // navigates to /portal/login?expired=1 on a 401
    console.error("submitPortalRequestAction failed", err);
    return {
      status: "error",
      message: "We couldn't send that right now. Try again in a few minutes.",
    };
  }

  return { status: "sent" };
}
