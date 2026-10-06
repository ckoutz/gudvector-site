import {
  getOwnerBookings,
  getOwnerPayments,
  getOwnerQuotes,
  getOwnerSubscriptions,
  getOwnerTimeZone,
  type OwnerBooking,
  type OwnerPayment,
  type OwnerQuote,
  type OwnerSubscription,
} from "@/lib/owner";
import { redirectOwnerOnUnauthorized, requireOwnerSessionToken } from "@/lib/owner-session";
import { BookingDecision, QuoteDecision } from "../decisions";
import {
  ManualPlan,
  MarkPaid,
  PaidBy,
  StartPlan,
  canMarkPaid,
  canRecordPlanPayment,
  isLiveManualPlan,
} from "../payments";
import {
  Card,
  Empty,
  LoadError,
  Notice,
  Pill,
  firstParam,
  formatDate,
  formatDateTime,
  formatMoney,
  quoteStatus,
} from "../ui";

export const dynamic = "force-dynamic";

const RETURN = "/portal/owner/quotes";

function value<T>(result: PromiseSettledResult<T>, label: string): T | null {
  if (result.status === "fulfilled") return result.value;
  redirectOwnerOnUnauthorized(result.reason);
  console.error(`OwnerQuotes: ${label} failed`, result.reason);
  return null;
}

const bookingLabel: Record<OwnerBooking["state"], string> = {
  collecting: "Chatting",
  proposing_slots: "Picking a time",
  awaiting_owner: "Needs your OK",
  approved: "Approved",
  declined: "Declined",
  closed: "Closed",
};

export default async function OwnerQuotesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const token = await requireOwnerSessionToken();
  const zone = await getOwnerTimeZone(token);
  const [q, s, b, p] = await Promise.allSettled([
    getOwnerQuotes(token),
    getOwnerSubscriptions(token),
    getOwnerBookings(token),
    getOwnerPayments(token),
  ]);
  const quotes: OwnerQuote[] | null = value(q, "quotes");
  const subscriptions: OwnerSubscription[] | null = value(s, "subscriptions");
  const bookings: OwnerBooking[] | null = value(b, "bookings");
  const payments: OwnerPayment[] | null = value(p, "payments");
  const pending = (quotes ?? []).filter((quote) => quote.needsApproval);
  const pendingBookings = (bookings ?? []).filter((booking) => booking.needsDecision);
  const awaitingPayment = (quotes ?? []).filter(canMarkPaid);
  // Without the plan list we can't tell a card plan from none, so no plan forms.
  const plannable = (quote: OwnerQuote) =>
    subscriptions !== null && canRecordPlanPayment(quote, subscriptions);
  const startPlans = (quotes ?? []).filter(
    (quote) => plannable(quote) && !(subscriptions ?? []).some((plan) => plan.quoteId === quote.id && isLiveManualPlan(plan)),
  );
  const shownPlans = (subscriptions ?? []).filter((plan) => !plan.manual || isLiveManualPlan(plan));
  const quoteFor = (id: string) => (quotes ?? []).find((quote) => quote.id === id);

  return (
    <div className="space-y-6">
      <Notice code={firstParam(params.notice)} message={firstParam(params.message)} />
      {(pending.length > 0 || pendingBookings.length > 0) && (
        <Card title="Needs your OK">
          <ul className="divide-y divide-line">
            {pendingBookings.map((booking) => (
              <BookingDecision key={booking.reference} booking={booking} returnTo={RETURN} zone={zone} />
            ))}
            {pending.map((quote) => (
              <QuoteDecision key={quote.id} quote={quote} returnTo={RETURN} />
            ))}
          </ul>
        </Card>
      )}

      {(awaitingPayment.length > 0 || startPlans.length > 0) && (
        <Card title="Waiting for payment">
          <ul className="divide-y divide-line">
            {awaitingPayment.map((quote) => (
              <MarkPaid key={quote.id} quote={quote} returnTo={RETURN} zone={zone} />
            ))}
            {startPlans.map((quote) => (
              <StartPlan key={quote.id} quote={quote} returnTo={RETURN} zone={zone} />
            ))}
          </ul>
        </Card>
      )}

      <Card title="Quotes">
        {quotes === null ? (
          <LoadError label="quotes" />
        ) : quotes.length === 0 ? (
          <Empty>No quotes yet.</Empty>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-[14px]">
              <thead className="text-[12px] text-muted">
                <tr className="border-b border-line">
                  <th className="px-5 py-2.5 font-medium">Customer</th>
                  <th className="px-5 py-2.5 font-medium">Work</th>
                  <th className="px-5 py-2.5 font-medium">Status</th>
                  <th className="px-5 py-2.5 font-medium">Created</th>
                  <th className="px-5 py-2.5 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {quotes.map((quote) => {
                  const [label, tone] = quoteStatus(quote);
                  return (
                    <tr key={quote.id}>
                      <td className="px-5 py-3 font-medium text-ink">
                        {quote.customer.name ?? quote.customer.email ?? "—"}
                      </td>
                      <td className="max-w-[240px] truncate px-5 py-3 text-muted">
                        {quote.lineItems.map((item) => item.description).join(", ") || "—"}
                      </td>
                      <td className="px-5 py-3">
                        <Pill tone={tone}>{label}</Pill>
                        <PaidBy quote={quote} returnTo={RETURN} zone={zone} />
                      </td>
                      <td className="px-5 py-3 text-muted">{formatDate(quote.createdAt, zone)}</td>
                      <td className="px-5 py-3 text-right font-semibold tabular-nums text-ink">
                        {formatMoney(quote.totalCents, quote.currency)}
                        {quote.billing === "recurring" && quote.interval && (
                          <span className="font-normal text-muted"> /{quote.interval === "month" ? "mo" : "yr"}</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card title="Monthly plans">
        {subscriptions === null ? (
          <LoadError label="plans" />
        ) : shownPlans.length === 0 ? (
          <Empty>No recurring plans yet.</Empty>
        ) : (
          <ul className="divide-y divide-line">
            {shownPlans.map((plan) => {
              const quote = quoteFor(plan.quoteId);
              return (
                <li key={plan.id} className="px-5 py-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-[14px] font-semibold text-ink">
                        {quote ? `${quote.customer.name ?? quote.customer.email ?? "Customer"} · ` : ""}
                        <span className="tabular-nums">
                          {formatMoney(plan.amountCents, plan.currency)} / {plan.interval}
                        </span>
                      </p>
                      {!plan.manual && (
                        <p className="text-[12px] text-muted">
                          Card · {plan.cancelAtPeriodEnd ? "Cancels" : "Renews"} {formatDate(plan.currentPeriodEnd, zone)}
                        </p>
                      )}
                    </div>
                    <Pill tone={plan.status === "active" ? "green" : plan.status === "past_due" ? "red" : "muted"}>
                      {plan.manual ? "check / cash" : plan.status.replace(/_/g, " ")}
                    </Pill>
                  </div>
                  {plan.manual && (
                    <ManualPlan
                      plan={plan}
                      quote={quote && plannable(quote) ? quote : undefined}
                      payments={payments}
                      returnTo={RETURN}
                      zone={zone}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </Card>

      <Card title="Website booking requests">
        {bookings === null ? (
          <LoadError label="booking requests" />
        ) : bookings.length === 0 ? (
          <Empty>No booking requests yet.</Empty>
        ) : (
          <ul className="divide-y divide-line">
            {bookings.map((booking) => (
              <li key={booking.reference} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3">
                <div className="min-w-0">
                  <p className="text-[14px] font-medium text-ink">
                    {booking.customer.name ?? booking.customer.email ?? "Visitor"}
                  </p>
                  <p className="text-[12px] text-muted">
                    {formatDateTime(booking.requestedStart, zone)}
                    {booking.details ? ` · ${booking.details}` : ""}
                  </p>
                </div>
                <Pill tone={booking.needsDecision ? "orange" : booking.state === "approved" ? "green" : "muted"}>
                  {bookingLabel[booking.state]}
                </Pill>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
