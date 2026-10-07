import Link from "next/link";
import {
  getOwnerBookings,
  getOwnerCalendar,
  getOwnerPaidThisMonth,
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
  onDay,
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

const DAYS = 7;

function weekday(key: string): string {
  return new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "UTC" }).format(
    new Date(`${key}T12:00:00Z`),
  );
}

function longDay(key: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${key}T12:00:00Z`));
}

const cardLink = "inline-flex min-h-11 items-center text-[13px] font-medium text-orange-ink";

function WeekStrip({ days, events, today, zone }: {
  days: string[];
  events: OwnerCalendar["events"];
  today: string;
  zone: string;
}) {
  return (
    <ol className="grid grid-cols-7 gap-1.5 p-3">
      {days.map((key) => {
        const count = events.filter((event) => onDay(event, key, zone)).length;
        const isToday = key === today;
        return (
          <li key={key}>
            <Link
              href={isToday ? "/portal/owner/calendar" : `/portal/owner/calendar#day-${key}`}
              aria-label={`${longDay(key)}: ${count === 0 ? "nothing" : `${count} on the calendar`}`}
              className={`flex min-h-16 flex-col items-center justify-center rounded-xl border text-center transition-colors ${
                isToday ? "border-ink bg-action text-paper" : "border-line text-ink hover:bg-ink/5"
              }`}
            >
              <span className={`text-[11px] font-medium ${isToday ? "text-paper/80" : "text-muted"}`}>
                {weekday(key)}
              </span>
              <span className="text-[16px] font-semibold tabular-nums">{Number(key.slice(8))}</span>
              <span className={`text-[11px] tabular-nums ${isToday ? "text-paper/80" : "text-muted"}`}>
                {count === 0 ? "·" : count}
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

export default async function OwnerTodayPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const token = await requireOwnerSessionToken();
  const zone = await getOwnerTimeZone(token);
  const today = dayKey(new Date(), zone);
  const anchor = new Date(`${today}T12:00:00Z`);
  const days = Array.from({ length: DAYS }, (_, index) => {
    const day = new Date(anchor);
    day.setUTCDate(anchor.getUTCDate() + index);
    return day.toISOString().slice(0, 10);
  });
  // Pad the window by a day each side; events are grouped by local day.
  const start = new Date(`${days[0]}T00:00:00Z`);
  start.setUTCDate(start.getUTCDate() - 1);
  const end = new Date(`${days[DAYS - 1]}T00:00:00Z`);
  end.setUTCDate(end.getUTCDate() + 2);
  const [quotesResult, bookingsResult, calendarResult, paidResult] = await Promise.allSettled([
    getOwnerQuotes(token),
    getOwnerBookings(token),
    getOwnerCalendar(token, start, end),
    getOwnerPaidThisMonth(token, zone),
  ]);
  const quotes: OwnerQuote[] | null = settled(quotesResult, "quotes");
  const bookings: OwnerBooking[] | null = settled(bookingsResult, "bookings");
  const calendar: OwnerCalendar | null = settled(calendarResult, "calendar");
  const paidThisMonth: number | null = settled(paidResult, "payments");

  const todaysEvents = (calendar?.events ?? []).filter((event) => onDay(event, today, zone));
  const pendingQuotes = (quotes ?? []).filter((quote) => quote.needsApproval);
  const pendingBookings = (bookings ?? []).filter((booking) => booking.needsDecision);
  const waiting = pendingQuotes.length + pendingBookings.length;
  const unpaid = (quotes ?? []).filter((quote) => quote.customerStatus === "accepted");
  const monthName = new Intl.DateTimeFormat("en-US", { month: "long", timeZone: "UTC" }).format(anchor);

  const money = [
    {
      label: "Paid this month",
      value: paidThisMonth === null ? "—" : formatMoney(paidThisMonth),
      detail: paidThisMonth === null ? "Couldn't load payments" : monthName,
    },
    {
      label: "Outstanding",
      value: quotes === null ? "—" : formatMoney(unpaid.reduce((sum, quote) => sum + quote.totalCents, 0)),
      detail:
        quotes === null
          ? "Couldn't load quotes"
          : `${unpaid.length} accepted, not paid yet`,
    },
  ];

  // Phone: one column in the order an owner checks it (Needs you, Today, This week, money).
  // Desktop: two columns; `contents` lets the column wrappers dissolve on small screens.
  return (
    <div>
      <Notice code={firstParam(params.notice)} message={firstParam(params.message)} />
      <div className="flex flex-col gap-4 sm:gap-6 lg:grid lg:grid-cols-[1.2fr_1fr] lg:items-start">
        <div className="contents lg:flex lg:flex-col lg:gap-6">
          <div className="order-1 lg:order-none">
            <Card
              title={waiting > 0 ? `Needs you · ${waiting}` : "Needs you"}
            >
              {quotes === null || bookings === null ? (
                <LoadError label="approvals" />
              ) : waiting === 0 ? (
                <div className="flex items-center gap-3 px-5 py-6">
                  <span
                    aria-hidden
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[18px] text-emerald-700"
                  >
                    ✓
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold text-ink">You&apos;re all caught up.</p>
                    <p className="text-[13px] text-muted">Nothing is waiting on you. Gus will text you when something is.</p>
                  </div>
                </div>
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
          </div>

          <div className="order-5 hidden sm:block lg:order-none">
            <Card
              title="Recent quotes"
              action={
                <Link href="/portal/owner/quotes" className={cardLink}>
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

        <div className="contents lg:flex lg:flex-col lg:gap-6">
          <dl className="order-4 grid grid-cols-2 gap-3 lg:order-none">
            {money.map((stat) => (
              <Link
                key={stat.label}
                href="/portal/owner/quotes"
                className="block min-h-11 rounded-2xl border border-line bg-paper px-4 py-3.5 transition-colors hover:border-ink/30"
              >
                <dt className="text-[12px] font-medium text-muted">{stat.label}</dt>
                <dd className="mt-1 font-display text-2xl font-semibold tabular-nums text-ink">{stat.value}</dd>
                <dd className="mt-0.5 text-[12px] text-muted">{stat.detail}</dd>
              </Link>
            ))}
          </dl>

          <div className="order-2 lg:order-none">
            <Card
              title="Today"
              action={
                <Link href="/portal/owner/calendar" className={cardLink}>
                  Full calendar
                </Link>
              }
            >
              {calendar === null ? (
                <LoadError label="your calendar" />
              ) : (
                <DayAgenda events={todaysEvents} problems={calendar.problems} empty="Nothing on the calendar today." zone={zone} day={today} />
              )}
            </Card>
          </div>

          <div className="order-3 lg:order-none">
            <Card title="This week">
              {calendar === null ? (
                <LoadError label="your calendar" />
              ) : (
                <WeekStrip days={days} events={calendar.events} today={today} zone={zone} />
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
