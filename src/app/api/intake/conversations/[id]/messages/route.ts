import { NextResponse, type NextRequest } from "next/server";
import { sendIntakeMessage } from "@/lib/gvas";
import { bearerToken, intakeErrorResponse } from "../../../_shared";

export const dynamic = "force-dynamic";

const MAX_MESSAGE_LENGTH = 2000;

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = bearerToken(request);
  if (!token) return NextResponse.json({ error: "Missing token." }, { status: 401 });

  let message: string | null = null;
  let smsConsent = false;
  try {
    const body = (await request.json()) as { message?: unknown; sms_consent?: unknown };
    if (typeof body.message === "string") message = body.message.trim();
    smsConsent = body.sms_consent === true;
  } catch {
    // handled below
  }
  if (!message || message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  const { id } = await params;
  try {
    return NextResponse.json(await sendIntakeMessage(id, token, message, smsConsent));
  } catch (err) {
    return intakeErrorResponse(err, "intake message");
  }
}
