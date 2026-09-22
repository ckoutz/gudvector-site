"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { deletePortalSession } from "@/lib/gvas";
import { PORTAL_SESSION_COOKIE } from "@/lib/portal-session";

export async function signOut(): Promise<void> {
  const store = await cookies();
  const token = store.get(PORTAL_SESSION_COOKIE)?.value;
  if (token) {
    try {
      await deletePortalSession(token);
    } catch (err) {
      // Best-effort — the cookie is cleared either way.
      console.error("signOut: session delete failed", err);
    }
  }
  store.delete(PORTAL_SESSION_COOKIE);
  redirect("/portal/login");
}
