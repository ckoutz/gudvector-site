import { timingSafeEqual } from "node:crypto";

import { NextResponse } from "next/server";

import { requireCustomer } from "@/lib/api-auth";
import { hashPassword } from "@/lib/auth";
import { randomPassword } from "@/lib/ids";
import { notifyQuoteAcceptLink } from "@/lib/notify";
import { quoteService } from "@/lib/quote-desk";
import {
  createCustomer,
  createQuote,
  getCustomerByEmail,
  type Billing,
} from "@/lib/store";
import { appUrl, quotePublicUrl, quoteSignupUrl } from "@/lib/urls";

type ItemInput = { description?: string; quantity?: number; amountCents?: number };

const MAX_ITEMS = 50;

/** Service-to-service caller (GVAS) authenticated by a shared bearer token. */
function isServiceCaller(request: Request) {
  const expected = process.env.PORTAL_API_TOKEN?.trim();
  if (!expected) return false;
  const header = request.headers.get("authorization") ?? "";
  const [scheme, token = ""] = header.split(" ", 2);
  if (scheme !== "Bearer") return false;
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

function parseItems(raw: unknown, fallbackService: string, fallbackAmount: number) {
  if (Array.isArray(raw) && raw.length > 0) {
    if (raw.length > MAX_ITEMS) return null;
    const items: { description: string; quantity: number; amountCents: number }[] = [];
    for (const entry of raw as ItemInput[]) {
      const description = entry?.description?.trim() ?? "";
      const quantity = Number(entry?.quantity ?? 1);
      const amountCents = Number(entry?.amountCents);
      if (
        !description ||
        !Number.isInteger(quantity) ||
        quantity <= 0 ||
        !Number.isFinite(amountCents) ||
        amountCents < 0
      ) {
        return null;
      }
      items.push({ description, quantity, amountCents: Math.round(amountCents) });
    }
    return items;
  }
  if (!fallbackService || !Number.isFinite(fallbackAmount) || fallbackAmount <= 0) {
    return null;
  }
  return [
    { description: fallbackService, quantity: 1, amountCents: Math.round(fallbackAmount) },
  ];
}

export async function POST(request: Request) {
  const serviceCaller = isServiceCaller(request);
  if (!serviceCaller) {
    const { session, error } = await requireCustomer();
    if (error || !session) return error;
    if (session.role !== "admin") {
      return NextResponse.json({ error: "Shop login required." }, { status: 403 });
    }
  }

  let body: {
    customerName?: string;
    customerPhone?: string;
    customerEmail?: string;
    serviceAddress?: string;
    service?: string;
    amountCents?: number;
    items?: ItemInput[];
    billing?: Billing;
    // Service callers own SMS delivery themselves; the portal only emails.
    sendEmail?: boolean;
    sendSms?: boolean;
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid data." }, { status: 400 });
  }

  const customerName = body.customerName?.trim() ?? "";
  const items = parseItems(body.items, body.service?.trim() ?? "", Number(body.amountCents));
  if (!customerName || !items) {
    return NextResponse.json(
      { error: "Customer and at least one priced line item are required." },
      { status: 400 },
    );
  }
  const amountCents = items.reduce((sum, item) => sum + item.amountCents * item.quantity, 0);
  if (amountCents <= 0) {
    return NextResponse.json({ error: "Quote total must be greater than zero." }, { status: 400 });
  }

  const email = body.customerEmail?.trim().toLowerCase() || null;
  const phone = body.customerPhone?.trim() || null;
  if (!email && !phone) {
    return NextResponse.json(
      { error: "A customer email or phone is required to deliver the quote." },
      { status: 400 },
    );
  }

  let customerId: string | null = null;
  if (email) {
    const existing = await getCustomerByEmail(email);
    if (existing && existing.role !== "admin") {
      customerId = existing.id;
    } else if (!existing) {
      const created = await createCustomer({
        email,
        name: customerName,
        passwordHash: await hashPassword(randomPassword()),
        phone,
        role: "client",
      });
      customerId = created.id;
    }
  }

  const quote = await createQuote({
    customerId,
    amountCents,
    billing: body.billing === "monthly" ? "monthly" : "one_time",
    status: "sent",
    customerName,
    customerPhone: phone,
    customerEmail: email,
    serviceAddress: body.serviceAddress?.trim() || null,
    items,
  });

  const sendEmail = body.sendEmail ?? true;
  const sendSms = serviceCaller ? false : (body.sendSms ?? true);
  const delivery = await notifyQuoteAcceptLink({
    email: sendEmail ? email : null,
    phone: sendSms ? quote.customerPhone : null,
    acceptUrl: quoteSignupUrl(quote.claimToken),
    loginUrl: `${appUrl()}/portal/login?quote=${encodeURIComponent(quote.claimToken)}`,
    service: quoteService(quote),
  });

  return NextResponse.json({
    ok: true,
    id: quote.id,
    claimToken: quote.claimToken,
    quoteUrl: quotePublicUrl(quote.claimToken),
    emailed: delivery.emailed,
    smsOk: delivery.smsOk,
  });
}
