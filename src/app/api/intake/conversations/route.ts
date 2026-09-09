import { NextResponse, type NextRequest } from "next/server";
import { startIntakeConversation, startPortalIntakeConversation } from "@/lib/gvas";
import { getPortalSessionToken } from "@/lib/portal-session";
import { intakeErrorResponse } from "../_shared";

export const dynamic = "force-dynamic";

/**
 * Starts an intake conversation. `{ portal: true }` in the body starts it on
 * behalf of the logged-in customer (portal session cookie → Bearer to GVAS);
 * otherwise it is an anonymous conversation for the configured business.
 */
export async function POST(request: NextRequest) {
  let portal = false;
  try {
    const body = (await request.json()) as { portal?: boolean } | null;
    portal = body?.portal === true;
  } catch {
    // empty body → anonymous
  }

  try {
    if (portal) {
      const sessionToken = await getPortalSessionToken();
      if (!sessionToken) {
        return NextResponse.json({ error: "Not signed in." }, { status: 401 });
      }
      return NextResponse.json(await startPortalIntakeConversation(sessionToken), {
        status: 201,
      });
    }
    return NextResponse.json(await startIntakeConversation(), { status: 201 });
  } catch (err) {
    return intakeErrorResponse(err, "intake start");
  }
}
