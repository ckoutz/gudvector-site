"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import luxonPlugin from "@fullcalendar/luxon3";
import timeGridPlugin from "@fullcalendar/timegrid";
import type { DateSelectArg, DatesSetArg, EventClickArg, EventDropArg, EventInput } from "@fullcalendar/core";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import type { OwnerBooking, OwnerCalendarEvent } from "@/lib/owner";
import { addVisitAction, cancelVisitAction, decideBookingAction, moveVisitAction } from "../actions";
import { buttonSecondary, formatDateTime } from "../ui";

export type CalendarViewName = "timeGridDay" | "timeGridWeek" | "dayGridMonth";

const COLORS = {
  confirmed: { backgroundColor: "#e3f0e6", borderColor: "#2f6b45", textColor: "#1d3b27" },
  pending: { backgroundColor: "#fdf0dc", borderColor: "#d9922e", textColor: "#6b4410" },
  calendar: { backgroundColor: "#eeede9", borderColor: "#9a978f", textColor: "#4a4842" },
};

function colorsFor(event: OwnerCalendarEvent) {
  if (event.source === "request") return COLORS.pending;
  if (event.source === "calendar") return COLORS.calendar;
  return COLORS.confirmed;
}

const mapsLink = (address: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

type Selected = { event: OwnerCalendarEvent; booking: OwnerBooking | null };
type Draft = { start: string; end: string };

export function OwnerCalendarView({
  events,
  bookings,
  zone,
  initialView,
  initialDate,
  viewChosen,
}: {
  events: OwnerCalendarEvent[];
  bookings: OwnerBooking[];
  zone: string;
  initialView: CalendarViewName;
  initialDate: string;
  /** False when the URL names no view: phones then open on the day view. */
  viewChosen: boolean;
}) {
  const router = useRouter();
  const calendarRef = useRef<FullCalendar>(null);
  useEffect(() => {
    if (!viewChosen && window.matchMedia("(max-width: 639px)").matches) {
      calendarRef.current?.getApi().changeView("timeGridDay");
    }
  }, [viewChosen]);
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [selected, setSelected] = useState<Selected | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const byReference = useMemo(
    () => new Map(bookings.map((booking) => [booking.reference.toLowerCase(), booking])),
    [bookings],
  );
  const inputs: EventInput[] = events.map((event, index) => ({
    id: event.eventId ?? `${event.source}-${index}`,
    title: event.inviteeName && event.inviteeName !== event.title ? `${event.inviteeName} · ${event.title}` : event.title,
    start: event.allDay ? event.start.slice(0, 10) : event.start,
    end: (event.allDay ? event.end?.slice(0, 10) : event.end) ?? undefined,
    allDay: event.allDay,
    editable: Boolean(event.eventId) && event.status === "confirmed",
    extendedProps: { index },
    ...colorsFor(event),
  }));
  const needsYou = events.filter((event) => event.source === "request");

  function run(change: () => Promise<{ ok: boolean; message?: string }>, done?: () => void, undo?: () => void) {
    setMessage(null);
    startTransition(async () => {
      const result = await change();
      if (!result.ok) {
        undo?.();
        setMessage(result.message ?? "That didn't go through.");
        return;
      }
      done?.();
      router.refresh();
    });
  }

  function onDrop(arg: EventDropArg) {
    const start = arg.event.start?.toISOString();
    const end = arg.event.end?.toISOString();
    if (!start || !end || !arg.event.id) return arg.revert();
    run(() => moveVisitAction(arg.event.id, start, end), undefined, arg.revert);
  }

  function onClick(arg: EventClickArg) {
    const event = events[arg.event.extendedProps.index as number];
    if (!event) return;
    setDraft(null);
    setSelected({ event, booking: event.reference ? (byReference.get(event.reference.toLowerCase()) ?? null) : null });
  }

  function onSelect(arg: DateSelectArg) {
    if (arg.allDay) return;
    setSelected(null);
    setDraft({ start: arg.start.toISOString(), end: arg.end.toISOString() });
  }

  function onDates(arg: DatesSetArg) {
    const params = new URLSearchParams({ view: arg.view.type, date: arg.view.currentStart.toISOString().slice(0, 10) });
    if (params.get("view") !== initialView || params.get("date") !== initialDate) {
      router.replace(`/portal/owner/calendar?${params.toString()}`, { scroll: false });
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
      <div className="owner-calendar rounded-2xl border border-line bg-paper p-3">
        {message && (
          <p role="alert" className="mb-3 rounded-xl bg-peach-2 px-4 py-2 text-[13px] text-ink">
            {message}
          </p>
        )}
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, luxonPlugin]}
          timeZone={zone}
          initialView={initialView}
          initialDate={initialDate}
          headerToolbar={{ left: "today prev,next title", center: "", right: "timeGridDay,timeGridWeek,dayGridMonth addVisit" }}
          buttonText={{ today: "Today", day: "Day", week: "Week", month: "Month" }}
          customButtons={{
            addVisit: {
              text: "+ Add visit",
              click: () => {
                const start = new Date(Math.ceil(Date.now() / 3_600_000) * 3_600_000);
                setSelected(null);
                setDraft({ start: start.toISOString(), end: new Date(start.getTime() + 3_600_000).toISOString() });
              },
            },
          }}
          events={inputs}
          eventStartEditable
          eventDurationEditable
          selectable
          selectMirror
          nowIndicator
          slotMinTime="07:00:00"
          slotMaxTime="19:00:00"
          height="auto"
          eventDrop={onDrop}
          eventResize={(arg) => onDrop(arg as unknown as EventDropArg)}
          eventClick={onClick}
          select={onSelect}
          datesSet={onDates}
        />
      </div>

      <aside className="space-y-4">
        {draft && <AddVisit draft={draft} zone={zone} pending={pending} onCancel={() => setDraft(null)} onSave={(visit) => run(() => addVisitAction(visit), () => setDraft(null))} />}
        {selected && (
          <VisitPanel
            selected={selected}
            zone={zone}
            pending={pending}
            onClose={() => setSelected(null)}
            onCancelVisit={(eventId) => run(() => cancelVisitAction(eventId), () => setSelected(null))}
          />
        )}
        <section className="rounded-2xl border border-line bg-paper p-4">
          <h3 className="text-[15px] font-semibold text-ink">Needs you ({needsYou.length})</h3>
          <p className="mt-1 text-[12px] text-muted">Visits waiting for your approval. Click one to see Gus&apos;s notes.</p>
          <ul className="mt-3 space-y-2">
            {needsYou.map((event) => (
              <li key={event.reference ?? event.start}>
                <button
                  type="button"
                  onClick={() => setSelected({ event, booking: event.reference ? (byReference.get(event.reference.toLowerCase()) ?? null) : null })}
                  className="w-full rounded-xl border border-dashed px-3 py-2 text-left text-[13px]"
                  style={COLORS.pending}
                >
                  <span className="block font-medium">{event.inviteeName ?? event.title}</span>
                  <span className="block">{formatDateTime(event.start, zone)}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl border border-line bg-paper p-4 text-[12px] text-muted">
          <h3 className="text-[13px] font-semibold text-ink">Legend</h3>
          <ul className="mt-2 space-y-1.5">
            {(
              [
                ["Confirmed", COLORS.confirmed],
                ["Pending approval", COLORS.pending],
                ["Your own calendar", COLORS.calendar],
              ] as const
            ).map(([label, colors]) => (
              <li key={label} className="flex items-center gap-2">
                <span className="h-3 w-5 rounded border" style={{ backgroundColor: colors.backgroundColor, borderColor: colors.borderColor }} aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </div>
  );
}

function VisitPanel({
  selected,
  zone,
  pending,
  onClose,
  onCancelVisit,
}: {
  selected: Selected;
  zone: string;
  pending: boolean;
  onClose: () => void;
  onCancelVisit: (eventId: string) => void;
}) {
  const { event, booking } = selected;
  const address = event.location ?? booking?.customer.address ?? null;
  return (
    <section className="rounded-2xl border border-line bg-paper p-4 text-[13px]" aria-label="Visit details">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-[15px] font-semibold text-ink">{event.inviteeName ?? event.title}</h3>
        <button type="button" onClick={onClose} className="text-muted" aria-label="Close">
          ×
        </button>
      </div>
      <p className="mt-1 text-muted">{event.allDay ? "All day" : formatDateTime(event.start, zone)}</p>
      <dl className="mt-3 space-y-1.5">
        {event.title && event.title !== event.inviteeName && <Row label="Service" value={event.title} />}
        {address && (
          <div>
            <dt className="text-muted">Address</dt>
            <dd>
              <a href={mapsLink(address)} target="_blank" rel="noreferrer" className="text-orange-ink underline underline-offset-2">
                {address}
              </a>
            </dd>
          </div>
        )}
        {booking?.customer.phone && <Row label="Phone" value={booking.customer.phone} />}
        {(booking?.customer.email ?? event.inviteeEmail) && <Row label="E-mail" value={(booking?.customer.email ?? event.inviteeEmail) as string} />}
        {booking?.details && <Row label="Gus's notes" value={booking.details} />}
      </dl>
      {event.source === "request" && event.reference && (
        <div className="mt-4 flex gap-2">
          <form action={decideBookingAction}>
            <input type="hidden" name="reference" value={event.reference} />
            <input type="hidden" name="decision" value="approve" />
            <input type="hidden" name="returnTo" value="/portal/owner/calendar" />
            <button type="submit" className="rounded-full bg-ink px-4 py-1.5 text-[13px] font-medium text-paper">
              Approve
            </button>
          </form>
          <form action={decideBookingAction}>
            <input type="hidden" name="reference" value={event.reference} />
            <input type="hidden" name="decision" value="decline" />
            <input type="hidden" name="returnTo" value="/portal/owner/calendar" />
            <button type="submit" className={buttonSecondary}>
              Decline
            </button>
          </form>
        </div>
      )}
      {event.eventId && event.status === "confirmed" && (
        <div className="mt-4 space-y-2">
          <p className="text-[12px] text-muted">Drag the visit on the calendar to move it. The customer is told.</p>
          <button type="button" disabled={pending} onClick={() => onCancelVisit(event.eventId as string)} className={buttonSecondary}>
            Cancel this visit
          </button>
        </div>
      )}
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted">{label}</dt>
      <dd className="whitespace-pre-line text-ink">{value}</dd>
    </div>
  );
}

function AddVisit({
  draft,
  zone,
  pending,
  onCancel,
  onSave,
}: {
  draft: Draft;
  zone: string;
  pending: boolean;
  onCancel: () => void;
  onSave: (visit: { start: string; end: string; name: string; phone: string; email: string; address: string; notes: string }) => void;
}) {
  const field = "mt-1 w-full rounded-lg border border-line bg-paper px-3 py-1.5 text-[13px]";
  return (
    <form
      className="rounded-2xl border border-line bg-paper p-4 text-[13px]"
      aria-label="Add a visit"
      onSubmit={(submit) => {
        submit.preventDefault();
        const data = new FormData(submit.currentTarget);
        const value = (name: string) => String(data.get(name) ?? "");
        onSave({ ...draft, name: value("name"), phone: value("phone"), email: value("email"), address: value("address"), notes: value("notes") });
      }}
    >
      <h3 className="text-[15px] font-semibold text-ink">Add a visit</h3>
      <p className="mt-1 text-muted">
        {formatDateTime(draft.start, zone)}, {Math.round((Date.parse(draft.end) - Date.parse(draft.start)) / 60_000)} min. Drag on the calendar to pick another time.
      </p>
      <label className="mt-3 block">
        Customer name
        <input name="name" required maxLength={200} className={field} />
      </label>
      <label className="mt-2 block">
        Phone
        <input name="phone" type="tel" maxLength={40} className={field} />
      </label>
      <label className="mt-2 block">
        E-mail
        <input name="email" type="email" maxLength={320} className={field} />
      </label>
      <label className="mt-2 block">
        Address
        <input name="address" maxLength={500} className={field} />
      </label>
      <label className="mt-2 block">
        Service or notes
        <input name="notes" maxLength={2000} className={field} />
      </label>
      <div className="mt-3 flex gap-2">
        <button type="submit" disabled={pending} className="rounded-full bg-ink px-4 py-1.5 text-[13px] font-medium text-paper">
          Add visit
        </button>
        <button type="button" onClick={onCancel} className={buttonSecondary}>
          Cancel
        </button>
      </div>
    </form>
  );
}
