import Link from "next/link";
import { getOwnerCalendar, getOwnerTimeZone, type OwnerCalendar } from "@/lib/owner";
import { redirectOwnerOnUnauthorized, requireOwnerSessionToken } from "@/lib/owner-session";
import { CalendarLegend, DayAgenda } from "../agenda";
import { Card, LoadError, buttonSecondary, dayKey, firstParam, onDay, zoneName } from "../ui";

export const dynamic = "force-dynamic";

const DAYS = 7;

function dayLabel(key: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${key}T12:00:00Z`));
}

export default async function OwnerCalendarPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const week = Math.max(-8, Math.min(8, Number.parseInt(firstParam(params.week) ?? "0", 10) || 0));
  const token = await requireOwnerSessionToken();
  const zone = await getOwnerTimeZone(token);

  const todayKey = dayKey(new Date(), zone);
  const first = new Date(`${todayKey}T12:00:00Z`);
  first.setUTCDate(first.getUTCDate() + week * DAYS);
  const keys = Array.from({ length: DAYS }, (_, index) => {
    const day = new Date(first);
    day.setUTCDate(first.getUTCDate() + index);
    return day.toISOString().slice(0, 10);
  });
  // Pad the window by a day each side; events are grouped by local day below.
  const start = new Date(`${keys[0]}T00:00:00Z`);
  start.setUTCDate(start.getUTCDate() - 1);
  const end = new Date(`${keys[DAYS - 1]}T00:00:00Z`);
  end.setUTCDate(end.getUTCDate() + 2);

  let calendar: OwnerCalendar | null = null;
  try {
    calendar = await getOwnerCalendar(token, start, end);
  } catch (err) {
    redirectOwnerOnUnauthorized(err);
    console.error("OwnerCalendar: load failed", err);
  }

  const rangeLabel = `${dayLabel(keys[0])} – ${dayLabel(keys[DAYS - 1])}`;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[17px] font-semibold text-ink">{rangeLabel}</h2>
          <p className="mt-0.5 text-[12px] text-muted">Times shown in {zoneName(zone)} ({zone}).</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/portal/owner/calendar?week=${week - 1}`} className={buttonSecondary}>
            Previous
          </Link>
          {week !== 0 && (
            <Link href="/portal/owner/calendar" className={buttonSecondary}>
              This week
            </Link>
          )}
          <Link href={`/portal/owner/calendar?week=${week + 1}`} className={buttonSecondary}>
            Next
          </Link>
        </div>
      </div>
      <div className="mt-4">
        <CalendarLegend />
      </div>

      {calendar === null ? (
        <div className="mt-6 rounded-2xl border border-line bg-paper">
          <LoadError label="your calendar" />
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {calendar.problems.length > 0 && (
            <div className="rounded-2xl border border-line bg-peach-2 px-5 py-3 text-[13px] text-muted" role="alert">
              {calendar.problems.join(" ")}
            </div>
          )}
          {keys.map((key) => {
            const events = calendar.events.filter((event) => onDay(event, key, zone));
            return (
              <div key={key} id={`day-${key}`} className="scroll-mt-4">
                <Card title={`${dayLabel(key)}${key === todayKey ? " · Today" : ""}`}>
                  <DayAgenda events={events} empty="Nothing scheduled." zone={zone} day={key} />
                </Card>
              </div>
            );
          })}
          <p className="text-[13px] text-muted">
            Your own calendar shows here once you add its private link in{" "}
            <Link href="/portal/owner/settings" className="font-medium text-orange-ink underline underline-offset-2">
              Settings
            </Link>
            . The dashboard only reads it.
          </p>
        </div>
      )}
    </div>
  );
}
