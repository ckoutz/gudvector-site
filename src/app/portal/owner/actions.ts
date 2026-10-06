"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isGvasError } from "@/lib/gvas";
import {
  decideOwnerBooking,
  decideOwnerQuote,
  deleteOwnerSession,
  markOwnerQuotePaid,
  markOwnerQuoteUnpaid,
  recordOwnerPlanPayment,
  undoOwnerPlanPayment,
  type ManualPaymentMethod,
  updateOwnerSettings,
  type OwnerSettingsUpdate,
} from "@/lib/owner";
import {
  OWNER_SESSION_COOKIE,
  redirectOwnerOnUnauthorized,
  requireOwnerSessionToken,
} from "@/lib/owner-session";

const PAGES = new Set([
  "/portal/owner",
  "/portal/owner/calendar",
  "/portal/owner/customers",
  "/portal/owner/quotes",
]);

function returnPath(formData: FormData): string {
  const value = String(formData.get("returnTo") ?? "");
  return PAGES.has(value) ? value : "/portal/owner";
}

function back(path: string, query: Record<string, string>): never {
  revalidatePath("/portal/owner", "layout");
  redirect(`${path}?${new URLSearchParams(query).toString()}`);
}

export async function decideQuoteAction(formData: FormData): Promise<void> {
  const token = await requireOwnerSessionToken();
  const path = returnPath(formData);
  const id = String(formData.get("quoteId") ?? "");
  const approve = formData.get("decision") === "approve";
  let code: string;
  try {
    await decideOwnerQuote(token, id, approve);
    code = approve ? "quote-approved" : "quote-rejected";
  } catch (err) {
    redirectOwnerOnUnauthorized(err);
    const stale = isGvasError(err) && (err.kind === "conflict" || err.kind === "not_found");
    if (!stale) console.error("decideQuoteAction failed", err);
    code = stale ? "quote-stale" : "failed";
  }
  back(path, { notice: code });
}

const METHODS = new Set<ManualPaymentMethod>(["check", "cash", "other"]);

export async function markPaidAction(formData: FormData): Promise<void> {
  const token = await requireOwnerSessionToken();
  const path = returnPath(formData);
  const id = String(formData.get("quoteId") ?? "");
  const paidOn = String(formData.get("paidOn") ?? "");
  const method = String(formData.get("method") ?? "") as ManualPaymentMethod;
  const note = String(formData.get("note") ?? "").trim().slice(0, 500);
  let query: Record<string, string>;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(paidOn) || !METHODS.has(method)) {
    back(path, { message: "Pick the date it was paid and how." });
  }
  try {
    await markOwnerQuotePaid(token, id, { paidOn, method, ...(note ? { note } : {}) });
    query = { notice: "quote-marked-paid" };
  } catch (err) {
    redirectOwnerOnUnauthorized(err);
    if (isGvasError(err) && (err.kind === "conflict" || err.status === 422)) {
      query = { message: err.message };
    } else if (isGvasError(err) && err.kind === "not_found") {
      query = { notice: "quote-stale" };
    } else {
      console.error("markPaidAction failed", err);
      query = { notice: "failed" };
    }
  }
  back(path, query);
}

export async function markUnpaidAction(formData: FormData): Promise<void> {
  const token = await requireOwnerSessionToken();
  const path = returnPath(formData);
  const id = String(formData.get("quoteId") ?? "");
  let query: Record<string, string>;
  try {
    await markOwnerQuoteUnpaid(token, id);
    query = { notice: "quote-marked-unpaid" };
  } catch (err) {
    redirectOwnerOnUnauthorized(err);
    if (isGvasError(err) && err.kind === "conflict") {
      query = { message: err.message };
    } else if (isGvasError(err) && err.kind === "not_found") {
      query = { notice: "quote-stale" };
    } else {
      console.error("markUnpaidAction failed", err);
      query = { notice: "failed" };
    }
  }
  back(path, query);
}

const PAYMENT_KEY = /^[A-Za-z0-9_-]{8,64}$/;

export async function recordPlanPaymentAction(formData: FormData): Promise<void> {
  const token = await requireOwnerSessionToken();
  const path = returnPath(formData);
  const id = String(formData.get("quoteId") ?? "");
  const key = String(formData.get("key") ?? "");
  const paidOn = String(formData.get("paidOn") ?? "");
  const method = String(formData.get("method") ?? "") as ManualPaymentMethod;
  const months = Number(formData.get("months"));
  const amount = String(formData.get("amount") ?? "").trim().replace(/^\$/, "");
  const note = String(formData.get("note") ?? "").trim().slice(0, 500);
  if (
    !PAYMENT_KEY.test(key) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(paidOn) ||
    !METHODS.has(method) ||
    !Number.isInteger(months) ||
    months < 1 ||
    months > 24 ||
    !/^\d+(\.\d{1,2})?$/.test(amount)
  ) {
    back(path, { message: "Fill in the date, how, the months covered and the amount." });
  }
  const amountCents = Math.round(Number(amount) * 100);
  let query: Record<string, string>;
  try {
    await recordOwnerPlanPayment(token, id, {
      key,
      paidOn,
      method,
      months,
      amountCents,
      ...(note ? { note } : {}),
    });
    query = { notice: "plan-payment-recorded" };
  } catch (err) {
    redirectOwnerOnUnauthorized(err);
    if (isGvasError(err) && (err.kind === "conflict" || err.status === 422)) {
      query = { message: err.message };
    } else if (isGvasError(err) && err.kind === "not_found") {
      query = { notice: "quote-stale" };
    } else {
      console.error("recordPlanPaymentAction failed", err);
      query = { notice: "failed" };
    }
  }
  back(path, query);
}

export async function undoPlanPaymentAction(formData: FormData): Promise<void> {
  const token = await requireOwnerSessionToken();
  const path = returnPath(formData);
  const id = String(formData.get("quoteId") ?? "");
  const paymentId = String(formData.get("paymentId") ?? "");
  let query: Record<string, string>;
  try {
    await undoOwnerPlanPayment(token, id, paymentId);
    query = { notice: "plan-payment-undone" };
  } catch (err) {
    redirectOwnerOnUnauthorized(err);
    if (isGvasError(err) && err.kind === "conflict") {
      query = { message: err.message };
    } else if (isGvasError(err) && err.kind === "not_found") {
      query = { notice: "quote-stale" };
    } else {
      console.error("undoPlanPaymentAction failed", err);
      query = { notice: "failed" };
    }
  }
  back(path, query);
}

export async function decideBookingAction(formData: FormData): Promise<void> {
  const token = await requireOwnerSessionToken();
  const path = returnPath(formData);
  const reference = String(formData.get("reference") ?? "");
  const approve = formData.get("decision") === "approve";
  const reason = String(formData.get("reason") ?? "").trim().slice(0, 500);
  let query: Record<string, string>;
  try {
    const result = await decideOwnerBooking(token, reference, approve, reason || undefined);
    query = { message: result.message };
  } catch (err) {
    redirectOwnerOnUnauthorized(err);
    console.error("decideBookingAction failed", err);
    query = { notice: "failed" };
  }
  back(path, query);
}

export type SettingsState = { status: "idle" | "saved" | "error"; message?: string };

const TEXT_FIELDS = [
  "displayName",
  "calendlyUrl",
  "notificationEmail",
  "timezone",
  "intakeBrief",
  "intakeQuestions",
  "intakeOpening",
] as const;

export async function saveSettingsAction(
  _prev: SettingsState,
  formData: FormData,
): Promise<SettingsState> {
  const token = await requireOwnerSessionToken();
  const update: OwnerSettingsUpdate = {};
  for (const field of TEXT_FIELDS) {
    const value = formData.get(field);
    if (typeof value === "string") update[field] = value.trim();
  }
  const feed = String(formData.get("calendarFeedUrl") ?? "").trim();
  if (formData.get("disconnectCalendar") === "on") update.calendarFeedUrl = "";
  else if (feed) update.calendarFeedUrl = feed;
  try {
    await updateOwnerSettings(token, update);
  } catch (err) {
    redirectOwnerOnUnauthorized(err);
    if (isGvasError(err) && err.status === 422) {
      return { status: "error", message: err.message };
    }
    console.error("saveSettingsAction failed", err);
    return { status: "error", message: "Couldn't save right now. Try again in a minute." };
  }
  revalidatePath("/portal/owner", "layout");
  return { status: "saved", message: "Saved." };
}

export async function signOutOwner(): Promise<void> {
  const store = await cookies();
  const token = store.get(OWNER_SESSION_COOKIE)?.value;
  if (token) {
    try {
      await deleteOwnerSession(token);
    } catch (err) {
      console.error("signOutOwner: session delete failed", err);
    }
  }
  store.delete(OWNER_SESSION_COOKIE);
  redirect("/portal/login");
}
