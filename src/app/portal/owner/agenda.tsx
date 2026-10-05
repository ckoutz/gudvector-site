import type { CalendarSource, OwnerCalendarEvent } from "@/lib/owner";
import { formatTime } from "./ui";

const sourceStyle: Record<CalendarSource, { label: string; dot: string }> = {
  booking: { label: "Calendly booking", dot: "bg-orange" },
  request: { label: "Waiting for your OK", dot: "border-2 border-orange bg-paper" },
  calendar: { label: "Your calendar", dot: "bg-ink/30" },
};

export function CalendarLegend() {
  return (
    <ul className="flex flex-wrap gap-4 text-[12px] text-muted">
      {(Object.keys(sourceStyle) as CalendarSource[]).map((source) => (
        <li key={source} className="flex items-center gap-1.5">
          <span className={`h-2.5 w-2.5 rounded-full ${sourceStyle[source].dot}`} aria-hidden />
          {sourceStyle[source].label}
        </li>
      ))}
    </ul>
  );
}

export function DayAgenda({
  events,
  problems = [],
  empty,
}: {
  events: OwnerCalendarEvent[];
  problems?: string[];
  empty: string;
}) {
  return (
    <div>
      {problems.map((problem) => (
        <p key={problem} role="alert" className="border-b border-line bg-peach-2 px-5 py-2.5 text-[13px] text-muted">
          {problem}
        </p>
      ))}
      {events.length === 0 ? (
        <p className="px-5 py-6 text-[14px] text-muted">{empty}</p>
      ) : (
        <ul className="divide-y divide-line">
          {events.map((event, index) => (
            <li key={`${event.start}-${index}`} className="flex gap-4 px-5 py-3">
              <span className="w-16 shrink-0 pt-0.5 text-[13px] tabular-nums text-muted">
                {event.allDay ? "All day" : formatTime(event.start)}
              </span>
              <span
                className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${sourceStyle[event.source].dot}`}
                title={sourceStyle[event.source].label}
                aria-hidden
              />
              <div className="min-w-0">
                <p className="text-[14px] font-medium text-ink">{event.title}</p>
                <p className="text-[12px] text-muted">
                  {[
                    event.inviteeName,
                    event.location,
                    event.source === "request" ? "Waiting for your OK" : null,
                  ]
                    .filter(Boolean)
                    .join(" · ") || sourceStyle[event.source].label}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
