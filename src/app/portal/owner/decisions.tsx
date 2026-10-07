import type { OwnerBooking, OwnerQuote } from "@/lib/owner";
import { decideBookingAction, decideQuoteAction } from "./actions";
import { buttonPrimary, buttonSecondary, formatDateTime, formatMoney, formatPhone } from "./ui";

export function QuoteDecision({ quote, returnTo }: { quote: OwnerQuote; returnTo: string }) {
  return (
    <li className="px-5 py-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-semibold text-ink">
            Quote for {quote.customer.name ?? quote.customer.email ?? "customer"} ·{" "}
            <span className="tabular-nums">{formatMoney(quote.totalCents, quote.currency)}</span>
          </p>
          <ul className="mt-1 text-[13px] text-muted">
            {quote.lineItems.map((item, index) => (
              <li key={index}>
                {item.quantity > 1 ? `${item.quantity} × ` : ""}
                {item.description} · {formatMoney(item.unitPriceCents * item.quantity, quote.currency)}
              </li>
            ))}
          </ul>
        </div>
        <form action={decideQuoteAction} className="flex gap-2">
          <input type="hidden" name="quoteId" value={quote.id} />
          <input type="hidden" name="returnTo" value={returnTo} />
          <button type="submit" name="decision" value="approve" className={buttonPrimary}>
            Approve &amp; send
          </button>
          <button type="submit" name="decision" value="reject" className={buttonSecondary}>
            Reject
          </button>
        </form>
      </div>
    </li>
  );
}

export function BookingDecision({
  booking,
  returnTo,
  zone,
}: {
  booking: OwnerBooking;
  returnTo: string;
  zone: string;
}) {
  return (
    <li className="px-5 py-4">
      <p className="font-semibold text-ink">
        Estimate request from {booking.customer.name ?? "a customer"}
      </p>
      <p className="mt-1 text-[13px] text-muted">
        {formatDateTime(booking.requestedStart, zone)}
        {booking.customer.address ? ` · ${booking.customer.address}` : ""}
        {booking.customer.phone ? ` · ${formatPhone(booking.customer.phone)}` : ""}
      </p>
      {booking.details && <p className="mt-1 text-[14px] text-ink">{booking.details}</p>}
      <form action={decideBookingAction} className="mt-3 flex flex-wrap items-center gap-2">
        <input type="hidden" name="reference" value={booking.reference} />
        <input type="hidden" name="returnTo" value={returnTo} />
        <button type="submit" name="decision" value="approve" className={buttonPrimary}>
          Approve booking
        </button>
        <input
          name="reason"
          maxLength={500}
          placeholder="Reason, if declining (optional)"
          aria-label="Reason for declining"
          className="order-first w-full min-w-0 rounded-full sm:order-none sm:w-auto sm:flex-1 border border-line px-4 py-2 text-[14px] text-ink placeholder:text-muted/70 focus:border-ink/40 focus:outline-none"
        />
        <button type="submit" name="decision" value="decline" className={buttonSecondary}>
          Decline
        </button>
      </form>
    </li>
  );
}
