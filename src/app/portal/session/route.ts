// Exchanges a magic-link token for a GVAS portal session, stores the
// sessionToken in an httpOnly cookie, and redirects to /portal. The token
// arrives via /portal/login?token=… which forwards here — cookies can only be
// set from a route handler or server action, never during page rendering.

import { NextResponse, type NextRequest } from "next/server";
import { createPortalSession, gvasEnv, isGvasError } from "@/lib/gvas";
import { createMockOwnerSession } from "@/lib/owner";
import { OWNER_SESSION_COOKIE } from "@/lib/owner-session";
import { PORTAL_SESSION_COOKIE, PORTAL_SESSION_MAX_AGE } from "@/lib/portal-session";

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: PORTAL_SESSION_MAX_AGE,
};

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const loginUrl = new URL("/portal/login", request.url);

  if (!token) {
    loginUrl.searchParams.set("error", "link");
    return NextResponse.redirect(loginUrl);
  }

  try {
    // The business owner signs in on the same page; GVAS says which role the
    // link was for, and each role gets its own cookie and its own dashboard.
    const session =
      gvasEnv.mock && token === "mock-owner"
        ? { sessionToken: createMockOwnerSession(), role: "owner" as const }
        : await createPortalSession(token);
    const isOwner = session.role === "owner";
    const res = NextResponse.redirect(
      new URL(isOwner ? "/portal/owner" : "/portal", request.url),
    );
    res.cookies.set(
      isOwner ? OWNER_SESSION_COOKIE : PORTAL_SESSION_COOKIE,
      session.sessionToken,
      cookieOptions,
    );
    res.cookies.delete(isOwner ? PORTAL_SESSION_COOKIE : OWNER_SESSION_COOKIE);
    return res;
  } catch (err) {
    if (!isGvasError(err) || err.kind !== "unauthorized") {
      console.error("portal session exchange failed", err);
    }
    loginUrl.searchParams.set(
      "error",
      isGvasError(err) && err.kind === "unauthorized" ? "link" : "unavailable",
    );
    return NextResponse.redirect(loginUrl);
  }
}
