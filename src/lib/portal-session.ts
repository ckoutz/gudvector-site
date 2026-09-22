// Server-side helpers for the customer-portal session cookie. The sessionToken
// comes from the GVAS magic-link exchange (see src/lib/gvas.ts) and is stored
// only in an httpOnly cookie — never in localStorage or the page itself.

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isGvasError } from "@/lib/gvas";

export const PORTAL_SESSION_COOKIE = "gv_portal_session";
export const PORTAL_SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function getPortalSessionToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(PORTAL_SESSION_COOKIE)?.value ?? null;
}

/** Returns the session token or redirects to /portal/login when absent. */
export async function requirePortalSessionToken(): Promise<string> {
  const token = await getPortalSessionToken();
  if (!token) redirect("/portal/login");
  return token;
}

/**
 * Call inside a catch block around a portal API call: redirects to the login
 * page when the session was rejected (401), and does nothing otherwise. Safe —
 * redirect() throws, so call sites only reach past this when err is not a 401.
 */
export function redirectOnUnauthorized(err: unknown): void {
  if (isGvasError(err) && err.kind === "unauthorized") {
    redirect("/portal/login?expired=1");
  }
}
