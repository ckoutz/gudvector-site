import Link from "next/link";
import {
  getOwnerBookings,
  getOwnerCalendar,
  getOwnerQuotes,
  getOwnerTimeZone,
  type OwnerBooking,
  type OwnerCalendar,
  type OwnerQuote,
} from "@/lib/owner";
import { redirectOwnerOnUnauthorized, requireOwnerSessionToken } from "@/lib/owner-session";
import { BookingDecision, QuoteDecision } from "./decisions";
import { DayAgenda } from "./agenda";
import {
  Card,
  Empty,
  LoadError,
  Notice,
  Pill,
  dayKey,
  firstParam,
  formatDate,
  formatMoney,
  quoteStatus,
} from "./ui";

export const dynamic = "force-dynamic";

function settled<T>(result: PromiseSettledResult<T>, label: string): T | null {
  if (result.status === "fulfilled") return result.value;
  redirectOwnerOnUnauthorized(result.reason);
  console.error(`OwnerToday: ${label} failed`, result.reason);
  return null;
}

export default async function OwnerTodayPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const token = await requireOwnerSessionToken();
  const zone = await getOwnerTimeZone(token);
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  start.setTime(start.getTime() - 12 * 3600 * 1000);
  const end = new Date(start.getTime() + 48 * 3600 * 1000);
  const [quotesResult, bookingsResult, calendarResult] = await Promise.allSettled([
    getOwnerQuotes(token),
    getOwnerBookings(token),
    getOwnerCalendar(token, start, end),
  ]);
  const quotes: OwnerQuote[] | null = settled(quotesResult, "quotes");
  const bookings: OwnerBooking[] | null = settled(bookingsResult, "bookings");
  const calendar: OwnerCalendar | null = settled(calendarResult, "calendar");

  const today = dayKey(new Date(), zone);
  const todaysEvents = (calendar?.events ?? []).filter((event) => dayKey(event.start, zone) === today);
  const pendingQuotes = (quotes ?? []).filter((quote) => quote.needsApproval);
  const pendingBookings = (bookings ?? []).filter((booking) => booking.needsDecision);
  const unpaid = (quotes ?? []).filter((quote) => quote.customerStatus === "accepted");
  const monthKey = today.slice(0, 7);
  const paidThisMonth = (quotes ?? [])
    .filter((quote) => quote.customerStatus === "paid" && dayKey(quote.updatedAt, zone).startsWith(monthKey))
    .reduce((sum, quote) => sum + quote.totalCents, 0);
  const waiting = pendingQuotes.length + pendingBookings.length;

  const stats = [
    { label: "Needs your OK", value: String(waiting) },
    { label: "On today's calendar", value: String(todaysEvents.length) },
    {
      label: "Accepted, unpaid",
      value: formatMoney(unpaid.reduce((sum, quote) => sum + quote.totalCents, 0)),
    },
    { label: "Paid this month", value: formatMoney(paidThisMonth) },
  ];

  return (
    <div>
      <Notice code={firstParam(params.notice)} message={firstParam(params.message)} />
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-line bg-paper px-4 py-3.5">
            <dt className="text-[12px] font-medium text-muted">{stat.label}</dt>
            <dd className="mt-1 font-display text-2xl font-semibold tabular-nums text-ink">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card title="Needs your OK">
          {quotes === null || bookings === null ? (
            <LoadError label="approvals" />
          ) : waiting === 0 ? (
            <Empty>You&apos;re all caught up. Nothing is waiting on you.</Empty>
          ) : (
            <ul className="divide-y divide-line">
              {pendingBookings.map((booking) => (
                <BookingDecision key={booking.reference} booking={booking} returnTo="/portal/owner" zone={zone} />
              ))}
              {pendingQuotes.map((quote) => (
                <QuoteDecision key={quote.id} quote={quote} returnTo="/portal/owner" />
              ))}
            </ul>
          )}
        </Card>

        <Card
          title="Today"
          action={
            <Link href="/portal/owner/calendar" className="text-[13px] font-medium text-orange-ink">
              Full calendar
            </Link>
          }
        >
          {calendar === null ? (
            <LoadError label="your calendar" />
          ) : (
            <DayAgenda events={todaysEvents} problems={calendar.problems} empty="Nothing on the calendar today." zone={zone} />
          )}
        </Card>
      </div>

      <div className="mt-6">
        <Card
          title="Recent quotes"
          action={
            <Link href="/portal/owner/quotes" className="text-[13px] font-medium text-orange-ink">
              All quotes
            </Link>
          }
        >
          {quotes === null ? (
            <LoadError label="quotes" />
          ) : quotes.length === 0 ? (
            <Empty>No quotes yet. Text Gus a price after an estimate and it shows up here.</Empty>
          ) : (
            <ul className="divide-y divide-line">
              {quotes.slice(0, 5).map((quote) => {
                const [label, tone] = quoteStatus(quote);
                return (
                  <li key={quote.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-medium text-ink">
                        {quote.customer.name ?? quote.customer.email ?? "Customer"}
                      </p>
                      <p className="text-[12px] text-muted">{formatDate(quote.createdAt, zone)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Pill tone={tone}>{label}</Pill>
                      <span className="w-20 text-right text-[14px] font-semibold tabular-nums text-ink">
                        {formatMoney(quote.totalCents, quote.currency)}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
