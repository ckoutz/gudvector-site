// Exchanges a magic-link token for a GVAS portal session, stores the
// sessionToken in an httpOnly cookie, and redirects to /portal. The token
// arrives via /portal/login?token=… which forwards here — cookies can only be
// set from a route handler or server action, never during page rendering.

import { NextResponse, type NextRequest } from "next/server";
import { createPortalSession, isGvasError } from "@/lib/gvas";
import { PORTAL_SESSION_COOKIE, PORTAL_SESSION_MAX_AGE } from "@/lib/portal-session";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const loginUrl = new URL("/portal/login", request.url);

  if (!token) {
    loginUrl.searchParams.set("error", "link");
    return NextResponse.redirect(loginUrl);
  }

  try {
    const { sessionToken } = await createPortalSession(token);
    const res = NextResponse.redirect(new URL("/portal", request.url));
    res.cookies.set(PORTAL_SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: PORTAL_SESSION_MAX_AGE,
    });
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
