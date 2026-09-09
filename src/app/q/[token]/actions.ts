"use server";

import { acceptQuote, declineQuote, isGvasError } from "@/lib/gvas";

export type ActionResult<T> = { ok: true; data: T } | { ok: false; error: string };

function friendlyError(err: unknown, fallback: string): string {
  if (isGvasError(err)) {
    if (err.kind === "conflict" || err.kind === "unavailable") return err.message;
    if (err.kind === "not_found") return "This quote could not be found.";
  }
  console.error("quote action failed", err);
  return fallback;
}

export async function acceptQuoteAction(
  token: string,
): Promise<ActionResult<{ checkoutUrl: string }>> {
  try {
    const { checkoutUrl } = await acceptQuote(token);
    return { ok: true, data: { checkoutUrl } };
  } catch (err) {
    return {
      ok: false,
      error: friendlyError(err, "We couldn't start checkout. Please try again in a moment."),
    };
  }
}

export async function declineQuoteAction(
  token: string,
): Promise<ActionResult<{ status: "declined" }>> {
  try {
    const { status } = await declineQuote(token);
    return { ok: true, data: { status } };
  } catch (err) {
    return {
      ok: false,
      error: friendlyError(err, "We couldn't decline this quote. Please try again in a moment."),
    };
  }
}
