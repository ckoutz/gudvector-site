import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getOwnerBookings,
  getOwnerCalendar,
  getOwnerCustomers,
  getOwnerPayments,
  getOwnerQuotes,
  getOwnerSubscriptions,
  getOwnerTimeZone,
  type OwnerBooking,
  type OwnerCalendar,
  type OwnerCustomer,
  type OwnerPayment,
  type OwnerQuote,
  type OwnerSubscription,
} from "@/lib/owner";
import { redirectOwnerOnUnauthorized, requireOwnerSessionToken } from "@/lib/owner-session";
import { formatDay, planEnded, planLapsed } from "../../payments";
import { Card, Empty, LoadError, Pill, formatDate, formatDateTime, formatMoney, formatPhone, quoteStatus } from "../../ui";
import { customerKey, sameEmail, withBookingOnly } from "../profile";

export const dynamic = "force-dynamic";

const DAY_MS = 24 * 60 * 60 * 1000;

function value<T>(result: PromiseSettledResult<T>, label: string): T | null {
  if (result.status === "fulfilled") return result.value;
  redirectOwnerOnUnauthorized(result.reason);
  console.error(`OwnerCustomer: ${label} failed`, result.reason);
  return null;
}

type Visit = {
  id: string;
  start: string;
  title: string;
  location: string | null;
  status: [string, "orange" | "green" | "muted" | "red"];
};

function visitsFor(customer: OwnerCustomer, bookings: OwnerBooking[], calendar: OwnerCalendar | null): Visit[] {
  const visits: Visit[] = [];
  const references = new Set<string>();
  const starts = new Set<number>();
  for (const booking of bookings) {
    if (!sameEmail(booking.customer.email, customer.email) || !booking.requestedStart) continue;
    if (booking.state !== "awaiting_owner" && booking.state !== "approved" && booking.state !== "declined") continue;
    references.add(booking.reference);
    starts.add(new Date(booking.requestedStart).getTime());
    visits.push({
      id: booking.reference,
      start: booking.requestedStart,
      title: booking.details ?? "Walk-through",
      location: booking.customer.address,
      status:
        booking.state === "approved"
          ? ["Booked", "green"]
          : booking.state === "declined"
            ? ["Declined", "muted"]
            : ["Needs your OK", "orange"],
    });
  }
  for (const event of calendar?.events ?? []) {
    if (event.source !== "booking" || !sameEmail(event.inviteeEmail, customer.email)) continue;
    if (event.reference && references.has(event.reference)) continue;
    if (starts.has(new Date(event.start).getTime())) continue;
    visits.push({
      id: `${event.start}-${event.title}`,
      start: event.start,
      title: event.title,
      location: event.location,
      status: ["Booked", "green"],
    });
  }
  return visits.sort((a, b) => a.start.localeCompare(b.start));
}

function quoteWork(quote: OwnerQuote): string {
  return quote.lineItems.map((item) => item.description).join(", ") || "Quote";
}

function isOpenQuote(quote: OwnerQuote): boolean {
  if (quote.needsApproval) return true;
  if (quote.status === "rejected" || quote.status === "drafting") return false;
  return quote.customerStatus !== "paid" && quote.customerStatus !== "declined";
}

function per(interval: "month" | "year" | null): string {
  return interval === "year" ? "/yr" : interval === "month" ? "/mo" : "";
}

export default async function OwnerCustomerPage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const token = await requireOwnerSessionToken();
  const zone = await getOwnerTimeZone(token);
  const now = new Date();
  const [c, q, s, b, p, cal] = await Promise.allSettled([
    getOwnerCustomers(token),
    getOwnerQuotes(token),
    getOwnerSubscriptions(token),
    getOwnerBookings(token),
    getOwnerPayments(token),
    getOwnerCalendar(token, new Date(now.getTime() - 30 * DAY_MS), new Date(now.getTime() + 31 * DAY_MS)),
  ]);
  const customers = value(c, "customers");
  const bookings: OwnerBooking[] = value(b, "bookings") ?? [];
  if (customers === null) {
    return (
      <Card title="Customer">
        <LoadError label="this customer" />
      </Card>
    );
  }
  const customer = withBookingOnly(customers, bookings).find((row) => customerKey(row.email) === key);
  if (!customer) notFound();

  const quotes: OwnerQuote[] | null = value(q, "quotes");
  const plansAll: OwnerSubscription[] | null = value(s, "subscriptions");
  const payments: OwnerPayment[] | null = value(p, "payments");
  const calendar: OwnerCalendar | null = value(cal, "calendar");

  // GVAS links a quote to the customer once it's approved; pending ones match by e-mail.
  const linked = new Set(customer.quoteIds);
  const theirQuotes = (quotes ?? [])
    .filter((quote) => linked.has(quote.id) || sameEmail(quote.customer.email, customer.email))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const ids = new Set([...linked, ...theirQuotes.map((quote) => quote.id)]);
  const quoteFor = (id: string) => theirQuotes.find((quote) => quote.id === id);
  const plans = (plansAll ?? []).filter((plan) => ids.has(plan.quoteId));
  const ledger = (payments ?? []).filter((payment) => ids.has(payment.quoteId) && payment.counts);
  // Quotes paid before the payments ledger existed have no ledger row.
  const unledgered = theirQuotes.filter(
    (quote) => quote.customerStatus === "paid" && !(payments ?? []).some((payment) => payment.quoteId === quote.id),
  );
  const theirPayments = [
    ...ledger.map((payment) => ({
      id: payment.id,
      quoteId: payment.quoteId,
      paidOn: payment.paidOn,
      method: payment.method as string,
      monthsCovered: payment.monthsCovered,
      note: payment.note,
      amountCents: payment.amountCents,
      currency: payment.currency,
    })),
    ...unledgered.map((quote) => ({
      id: `quote-${quote.id}`,
      quoteId: quote.id,
      paidOn: quote.paidOn ?? quote.updatedAt,
      method: quote.paidBy?.method ?? "card",
      monthsCovered: null,
      note: quote.paidBy?.note ?? null,
      amountCents: quote.totalCents,
      currency: quote.currency ?? "USD",
    })),
  ].sort((a, b) => (b.paidOn ?? "").localeCompare(a.paidOn ?? ""));
  const visits = visitsFor(customer, bookings, calendar);
  const upcoming = visits.filter((visit) => new Date(visit.start) >= now && visit.status[0] !== "Declined");
  const pastVisits = visits.filter((visit) => !upcoming.includes(visit)).reverse();
  // A quote that became a plan is listed as the plan.
  const listed = theirQuotes.filter((quote) => !plans.some((plan) => plan.quoteId === quote.id));
  const openQuotes = listed.filter(isOpenQuote);
  const closedQuotes = listed.filter((quote) => !isOpenQuote(quote));
  const livePlans = plans.filter((plan) => !planEnded(plan));
  const endedPlans = plans.filter(planEnded);
  const unpaid = theirQuotes.filter((quote) => quote.customerStatus === "accepted" && quote.billing === "one_time");
  const paidCents =
    payments === null ? customer.paidCents : theirPayments.reduce((sum, payment) => sum + payment.amountCents, 0);
  const outstandingCents = unpaid.reduce((sum, quote) => sum + quote.totalCents, 0);

  const latest = theirQuotes[0];
  const latestBooking = bookings
    .filter((booking) => sameEmail(booking.customer.email, customer.email))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];
  const phone = customer.phone ?? latest?.customer.phone ?? latestBooking?.customer.phone ?? null;
  const address = latest?.customer.serviceAddress ?? latestBooking?.customer.address ?? null;

  const planLine = (plan: OwnerSubscription) => {
    const quote = quoteFor(plan.quoteId);
    const lapsed = planLapsed(plan, zone);
    const when = plan.manual
      ? `Check / cash · ${lapsed ? "ran out" : "paid through"} ${formatDay(plan.paidThrough)}`
      : `Card · ${plan.cancelAtPeriodEnd ? "cancels" : "renews"} ${formatDate(plan.currentPeriodEnd, zone)}`;
    return (
      <li key={plan.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3">
        <div className="min-w-0">
          <p className="text-[14px] font-medium text-ink">
            {quote ? quoteWork(quote) : "Plan"} ·{" "}
            <span className="tabular-nums">
              {formatMoney(plan.amountCents, plan.currency)}
              {per(plan.interval)}
            </span>
          </p>
          <p className="text-[12px] text-muted">{when}</p>
        </div>
        <Pill
          tone={
            planEnded(plan) ? "muted" : lapsed || plan.status === "past_due" ? "red" : plan.status === "active" ? "green" : "muted"
          }
        >
          {planEnded(plan) ? "Ended" : lapsed ? "Ran out" : plan.status === "past_due" ? "Past due" : "Active"}
        </Pill>
      </li>
    );
  };
  const quoteLine = (quote: OwnerQuote) => {
    const [label, tone] = quoteStatus(quote);
    return (
      <li key={quote.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3">
        <div className="min-w-0">
          <p className="text-[14px] font-medium text-ink">{quoteWork(quote)}</p>
          <p className="text-[12px] text-muted">
            Quote · {formatDate(quote.createdAt, zone)} ·{" "}
            <span className="tabular-nums">
              {formatMoney(quote.totalCents, quote.currency)}
              {quote.billing === "recurring" ? per(quote.interval) : ""}
            </span>
          </p>
        </div>
        <Pill tone={tone}>{label}</Pill>
      </li>
    );
  };
  const visitLine = (visit: Visit) => (
    <li key={visit.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3">
      <div className="min-w-0">
        <p className="text-[14px] font-medium text-ink">{visit.title}</p>
        <p className="text-[12px] text-muted">
          Visit · {formatDateTime(visit.start, zone)}
          {visit.location ? ` · ${visit.location}` : ""}
        </p>
      </div>
      <Pill tone={visit.status[1]}>{visit.status[0]}</Pill>
    </li>
  );
  const currentItems = [...upcoming.map(visitLine), ...livePlans.map(planLine), ...openQuotes.map(quoteLine)];
  const pastItems = [...pastVisits.map(visitLine), ...endedPlans.map(planLine), ...closedQuotes.map(quoteLine)];
  const partial = quotes === null || plansAll === null || calendar === null;

  return (
    <div className="space-y-6">
      <Link href="/portal/owner/customers" className="inline-flex min-h-11 items-center text-[14px] text-muted hover:text-ink">
        ← Customers
      </Link>

      <Card title={customer.name ?? customer.email}>
        <dl className="grid gap-x-6 gap-y-3 px-5 py-4 text-[14px] sm:grid-cols-2">
          <div>
            <dt className="text-[12px] text-muted">E-mail</dt>
            <dd className="break-words text-ink">{customer.email}</dd>
          </div>
          <div>
            <dt className="text-[12px] text-muted">Phone</dt>
            <dd className="text-ink">
              {phone ? formatPhone(phone) : "—"}{" "}
              {customer.smsConsent ? <Pill tone="green">OK to text</Pill> : <Pill tone="muted">Email only</Pill>}
            </dd>
          </div>
          <div>
            <dt className="text-[12px] text-muted">Address</dt>
            <dd className="text-ink">{address ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-[12px] text-muted">Customer since</dt>
            <dd className="text-ink">{formatDate(customer.createdAt, zone)}</dd>
          </div>
        </dl>
      </Card>

      {partial && (
        <p role="alert" className="text-[14px] text-muted">
          Some of this customer&apos;s history couldn&apos;t load. Refresh to try again.
        </p>
      )}

      <Card title="Current">
        {currentItems.length === 0 ? (
          <Empty>Nothing booked or open right now.</Empty>
        ) : (
          <ul className="divide-y divide-line">{currentItems}</ul>
        )}
      </Card>

      <Card title="Past">
        {pastItems.length === 0 ? <Empty>No past visits or quotes yet.</Empty> : <ul className="divide-y divide-line">{pastItems}</ul>}
      </Card>

      <Card title="Billing">
        <div className="grid grid-cols-2 gap-4 border-b border-line px-5 py-4">
          <div>
            <p className="text-[12px] text-muted">Paid to date</p>
            <p className="text-[20px] font-semibold tabular-nums text-ink">{formatMoney(paidCents)}</p>
          </div>
          <div>
            <p className="text-[12px] text-muted">Outstanding</p>
            <p className="text-[20px] font-semibold tabular-nums text-ink">
              {quotes === null ? "—" : formatMoney(outstandingCents)}
            </p>
            {unpaid.length > 0 && <p className="text-[12px] text-muted">{unpaid.length} accepted, not paid yet</p>}
          </div>
        </div>
        {payments === null ? (
          <LoadError label="payments" />
        ) : theirPayments.length === 0 ? (
          <Empty>No payments yet.</Empty>
        ) : (
          <ul className="divide-y divide-line">
            {theirPayments.map((payment) => {
              const quote = quoteFor(payment.quoteId);
              return (
                <li key={payment.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3">
                  <div className="min-w-0">
                    <p className="text-[14px] font-medium text-ink">{quote ? quoteWork(quote) : "Payment"}</p>
                    <p className="text-[12px] text-muted">
                      {formatDate(payment.paidOn, zone)} · {payment.method}
                      {payment.monthsCovered ? ` · ${payment.monthsCovered} mo` : ""}
                      {payment.note ? ` · ${payment.note}` : ""}
                    </p>
                  </div>
                  <p className="text-[14px] font-semibold tabular-nums text-ink">
                    {formatMoney(payment.amountCents, payment.currency)}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </div>
  );
}
