// Google sends the owner back here after "Connect Google Calendar". GVAS
// checks the signed state against this owner's business before saving.

import { NextResponse, type NextRequest } from "next/server";
import { isGvasError } from "@/lib/gvas";
import { finishOwnerGoogleConnect } from "@/lib/owner";
import { OWNER_SESSION_COOKIE } from "@/lib/owner-session";

export const dynamic = "force-dynamic";

// Relative, like /portal/session, so proxied hosts stay on their own address.
function redirectTo(path: string) {
  return new NextResponse(null, { status: 307, headers: { location: path } });
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get(OWNER_SESSION_COOKIE)?.value;
  if (!token) return redirectTo("/portal/login");
  const params = request.nextUrl.searchParams;
  const code = params.get("code");
  const state = params.get("state");
  if (params.get("error") || !code || !state) return redirectTo("/portal/owner/calendar?google=cancelled");
  try {
    await finishOwnerGoogleConnect(token, code.slice(0, 2000), state.slice(0, 500));
  } catch (err) {
    if (isGvasError(err) && err.kind === "unauthorized") return redirectTo("/portal/login?expired=1");
    if (!isGvasError(err) || err.kind !== "conflict") console.error("google calendar connect failed", err);
    return redirectTo("/portal/owner/calendar?google=failed");
  }
  return redirectTo("/portal/owner/calendar?google=connected");
}
