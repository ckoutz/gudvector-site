import Link from "next/link";
import {
  getOwnerBookings,
  getOwnerCalendar,
  getOwnerTimeZone,
  type OwnerBooking,
  type OwnerCalendar,
} from "@/lib/owner";
import { redirectOwnerOnUnauthorized, requireOwnerSessionToken } from "@/lib/owner-session";
import { LoadError, dayKey, firstParam, zoneName } from "../ui";
import { OwnerCalendarView, type CalendarViewName } from "./owner-calendar";

export const dynamic = "force-dynamic";

const VIEWS: Record<string, CalendarViewName> = {
  timeGridDay: "timeGridDay",
  timeGridWeek: "timeGridWeek",
  dayGridMonth: "dayGridMonth",
};

export default async function OwnerCalendarPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const view = VIEWS[firstParam(params.view) ?? ""] ?? "timeGridWeek";
  const token = await requireOwnerSessionToken();
  const zone = await getOwnerTimeZone(token);

  const todayKey = dayKey(new Date(), zone);
  const asked = firstParam(params.date) ?? "";
  const dateKey = /^\d{4}-\d{2}-\d{2}$/.test(asked) && !Number.isNaN(Date.parse(asked)) ? asked : todayKey;
  // Cover the whole visible grid (a month view shows up to 6 weeks), padded a
  // day each side for time zones; the backend allows up to 62 days.
  const start = new Date(`${dateKey}T00:00:00Z`);
  start.setUTCDate(start.getUTCDate() - 8);
  const end = new Date(`${dateKey}T00:00:00Z`);
  end.setUTCDate(end.getUTCDate() + (view === "dayGridMonth" ? 50 : 16));

  let calendar: OwnerCalendar | null = null;
  let bookings: OwnerBooking[] = [];
  const [calendarResult, bookingsResult] = await Promise.allSettled([
    getOwnerCalendar(token, start, end),
    getOwnerBookings(token),
  ]);
  if (calendarResult.status === "fulfilled") {
    calendar = calendarResult.value;
  } else {
    redirectOwnerOnUnauthorized(calendarResult.reason);
    console.error("OwnerCalendar: load failed", calendarResult.reason);
  }
  if (bookingsResult.status === "fulfilled") {
    bookings = bookingsResult.value;
  } else {
    console.error("OwnerCalendar: bookings load failed", bookingsResult.reason);
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-[17px] font-semibold text-ink">Calendar</h2>
          <p className="mt-0.5 text-[12px] text-muted">Times shown in {zoneName(zone)}.</p>
        </div>
      </div>

      {calendar === null ? (
        <div className="mt-6 rounded-2xl border border-line bg-paper">
          <LoadError label="your calendar" />
        </div>
      ) : (
        <div className="mt-4 space-y-4">
          {calendar.problems.length > 0 && (
            <div className="rounded-2xl border border-line bg-peach-2 px-5 py-3 text-[13px] text-muted" role="alert">
              {calendar.problems.join(" ")}
            </div>
          )}
          <OwnerCalendarView
            events={calendar.events}
            bookings={bookings}
            zone={zone}
            initialView={view}
            initialDate={dateKey}
            viewChosen={Boolean(VIEWS[firstParam(params.view) ?? ""])}
          />
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
