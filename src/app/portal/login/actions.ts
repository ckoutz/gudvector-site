"use server";

import { z } from "zod";
import { requestPortalLogin } from "@/lib/gvas";

export type PortalLoginState = {
  status: "idle" | "sent" | "error";
  message?: string;
  fieldError?: string;
};

const emailSchema = z
  .string()
  .trim()
  .min(1, "Enter the email you gave the business.")
  .email("Enter a valid email.");

export async function requestPortalLoginAction(
  _prevState: PortalLoginState,
  formData: FormData,
): Promise<PortalLoginState> {
  const parsed = emailSchema.safeParse(formData.get("email"));
  if (!parsed.success) {
    return {
      status: "error",
      fieldError: parsed.error.issues[0]?.message ?? "Enter a valid email.",
    };
  }

  try {
    // GVAS answers 202 whether or not the email is registered — show the same
    // "check your email" state either way so this can't be used to probe accounts.
    await requestPortalLogin(parsed.data);
  } catch (err) {
    console.error("requestPortalLoginAction failed", err);
    return {
      status: "error",
      message: "We couldn't send a sign-in link right now. Try again in a few minutes.",
    };
  }

  return { status: "sent" };
}
