import type { CalendarSource, OwnerBooking, OwnerCalendarEvent } from "@/lib/owner";
import { dayKey, formatPhone, formatTime } from "./ui";

const sourceStyle: Record<CalendarSource, { label: string; dot: string }> = {
  booking: { label: "Booked", dot: "bg-orange" },
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
  zone,
  day,
  bookings = [],
}: {
  events: OwnerCalendarEvent[];
  /** Gus bookings, matched to events by reference for the details panel. */
  bookings?: OwnerBooking[];
  problems?: string[];
  empty: string;
  zone: string;
  /** The local day shown; a timed event that began earlier reads "Ongoing". */
  day?: string;
}) {
  const byReference = new Map(bookings.map((booking) => [booking.reference.toLowerCase(), booking]));
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
            <li key={`${event.start}-${index}`}>
              <details className="group">
                <summary className="flex cursor-pointer list-none gap-4 px-5 py-3 hover:bg-peach-2/60 [&::-webkit-details-marker]:hidden">
                  <span className="w-16 shrink-0 pt-0.5 text-[13px] tabular-nums text-muted">
                    {event.allDay
                      ? "All day"
                      : day && dayKey(event.start, zone) < day
                        ? "Ongoing"
                        : formatTime(event.start, zone)}
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
                  <span className="ml-auto shrink-0 pt-0.5 text-[12px] text-muted group-open:rotate-180" aria-hidden>
                    ▾
                  </span>
                </summary>
                <EventDetails
                  event={event}
                  booking={event.reference ? byReference.get(event.reference.toLowerCase()) : undefined}
                  zone={zone}
                />
              </details>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function mapsLink(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

function EventDetails({
  event,
  booking,
  zone,
}: {
  event: OwnerCalendarEvent;
  booking: OwnerBooking | undefined;
  zone: string;
}) {
  const address = booking?.customer.address ?? event.location;
  const name = booking?.customer.name ?? event.inviteeName;
  const email = booking?.customer.email ?? event.inviteeEmail;
  const phone = booking?.customer.phone;
  const when = event.allDay
    ? "All day"
    : `${formatTime(event.start, zone)}${event.end ? ` – ${formatTime(event.end, zone)}` : ""}`;
  const rows: [string, React.ReactNode][] = [["When", when]];
  if (name) rows.push(["Customer", name]);
  if (phone) {
    rows.push([
      "Phone",
      <a key="phone" href={`tel:${phone}`} className="text-orange-ink underline underline-offset-2">
        {formatPhone(phone)}
      </a>,
    ]);
  }
  if (email) rows.push(["E-mail", email]);
  if (address) {
    rows.push([
      "Address",
      <a
        key="address"
        href={mapsLink(address)}
        target="_blank"
        rel="noopener noreferrer"
        className="text-orange-ink underline underline-offset-2"
      >
        {address}
      </a>,
    ]);
  }
  if (booking?.details) rows.push(["Job", booking.details]);
  if (booking?.notes) rows.push(["Notes from Gus", booking.notes]);
  return (
    <dl className="grid grid-cols-[7.5rem_1fr] gap-x-3 gap-y-1.5 bg-peach-2/40 px-5 pb-4 pt-2 text-[13px] sm:pl-[6.75rem]">
      {rows.map(([label, value]) => (
        <div key={label} className="contents">
          <dt className="text-muted">{label}</dt>
          <dd className="min-w-0 whitespace-pre-line break-words text-ink">{value}</dd>
        </div>
      ))}
      {!booking && event.source === "calendar" && (
        <p className="col-span-2 pt-1 text-[12px] text-muted">From your own calendar. Gus has no notes for it.</p>
      )}
    </dl>
  );
}
