// Owner dashboard session cookie. Owner and customer sessions are different
// GVAS credentials, so each lives in its own httpOnly cookie.

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isGvasError } from "@/lib/gvas";

export const OWNER_SESSION_COOKIE = "gv_owner_session";

export async function getOwnerSessionToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(OWNER_SESSION_COOKIE)?.value ?? null;
}

export async function requireOwnerSessionToken(): Promise<string> {
  const token = await getOwnerSessionToken();
  if (!token) redirect("/portal/login");
  return token;
}

export function redirectOwnerOnUnauthorized(err: unknown): void {
  if (isGvasError(err) && err.kind === "unauthorized") {
    redirect("/portal/login?expired=1");
  }
}
