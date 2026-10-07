import { createHash } from "node:crypto";
import type { OwnerBooking, OwnerCustomer } from "@/lib/owner";

/** A customer's address in the dashboard: a hash, so the e-mail stays out of URLs and logs. */
export function customerKey(email: string): string {
  return createHash("sha256").update(email.trim().toLowerCase()).digest("hex").slice(0, 16);
}

export function sameEmail(a: string | null | undefined, b: string | null | undefined): boolean {
  return Boolean(a && b && a.trim().toLowerCase() === b.trim().toLowerCase());
}

/** A chat that reached a picked time: the person is a customer even before any quote. */
function hasVisit(booking: OwnerBooking): boolean {
  return booking.state === "awaiting_owner" || booking.state === "approved" || booking.state === "declined";
}

/** GVAS's customers (people with a quote), plus people who only booked a visit so far. */
export function withBookingOnly(customers: OwnerCustomer[], bookings: OwnerBooking[]): OwnerCustomer[] {
  const extra = new Map<string, OwnerCustomer>();
  for (const booking of bookings) {
    const email = booking.customer.email;
    if (!email || !hasVisit(booking) || customers.some((c) => sameEmail(c.email, email))) continue;
    const key = email.trim().toLowerCase();
    const row = extra.get(key);
    if (row && row.createdAt <= booking.createdAt) continue;
    extra.set(key, {
      email,
      name: booking.customer.name,
      phone: booking.customer.phone,
      smsConsent: null,
      createdAt: booking.createdAt,
      quoteCount: 0,
      paidCents: 0,
      lastQuoteAt: null,
      quoteIds: [],
    });
  }
  return [...customers, ...extra.values()];
}
