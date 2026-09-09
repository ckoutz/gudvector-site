// Shared helpers for the intake route handlers. The browser talks to these
// site routes (never to GVAS directly) so GVAS_MOCK=1 works locally and the
// portal session cookie stays server-side.

import { NextResponse, type NextRequest } from "next/server";
import { isGvasError } from "@/lib/gvas";

export function bearerToken(request: NextRequest): string | null {
  const header = request.headers.get("authorization") ?? "";
  const match = /^Bearer\s+(.+)$/i.exec(header);
  return match ? match[1].trim() : null;
}

export function intakeErrorResponse(err: unknown, context: string): NextResponse {
  if (isGvasError(err)) {
    const status =
      err.kind === "unauthorized"
        ? 401
        : err.kind === "rate_limited"
          ? 429
          : err.kind === "not_found"
            ? 404
            : err.kind === "not_configured"
              ? 503
              : err.status && err.status >= 400
                ? err.status
                : 502;
    if (status >= 500) console.error(`${context} failed`, err);
    return NextResponse.json({ error: err.message }, { status });
  }
  console.error(`${context} failed`, err);
  return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
}
