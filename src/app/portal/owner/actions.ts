"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isGvasError } from "@/lib/gvas";
import {
  decideOwnerBooking,
  decideOwnerQuote,
  deleteOwnerSession,
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
