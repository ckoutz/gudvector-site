import { NextResponse, type NextRequest } from "next/server";
import { getIntakeConversation } from "@/lib/gvas";
import { bearerToken, intakeErrorResponse } from "../../_shared";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = bearerToken(request);
  if (!token) return NextResponse.json({ error: "Missing token." }, { status: 401 });
  const { id } = await params;
  try {
    return NextResponse.json(await getIntakeConversation(id, token));
  } catch (err) {
    return intakeErrorResponse(err, "intake get");
  }
}
