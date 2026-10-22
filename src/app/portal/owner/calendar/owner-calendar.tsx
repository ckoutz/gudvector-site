"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import luxonPlugin from "@fullcalendar/luxon3";
import timeGridPlugin from "@fullcalendar/timegrid";
import type { DateSelectArg, DatesSetArg, EventClickArg, EventDropArg, EventInput } from "@fullcalendar/core";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import type { OwnerBooking, OwnerCalendarEvent, OwnerTeamMember } from "@/lib/owner";
import { addVisitAction, cancelVisitAction, decideBookingAction, moveVisitAction, setOfferingAction } from "../actions";
import { buttonSecondary, formatDateTime } from "../ui";

export type CalendarViewName = "timeGridDay" | "timeGridWeek" | "dayGridMonth";

const COLORS = {
  confirmed: { backgroundColor: "#e3f0e6", borderColor: "#2f6b45", textColor: "#1d3b27" },
  pending: { backgroundColor: "#fdf0dc", borderColor: "#d9922e", textColor: "#6b4410" },
  completed: { backgroundColor: "#e7eef7", borderColor: "#5b7aa6", textColor: "#24364f" },
  calendar: { backgroundColor: "#eeede9", borderColor: "#9a978f", textColor: "#4a4842" },
};

function colorsFor(event: OwnerCalendarEvent) {
  if (event.source === "request") return COLORS.pending;
  if (event.source === "calendar") return COLORS.calendar;
  if (event.status === "completed") return COLORS.completed;
  return COLORS.confirmed;
}

const PALETTE = ["#2f6b45", "#2563eb", "#9333ea", "#c2410c", "#0f766e", "#be185d", "#4d7c0f", "#1e40af"];

/** One colour per person: their own, else a fixed palette by position. */
function teamColors(team: OwnerTeamMember[]): Map<string, string> {
  return new Map(team.map((member, index) => [member.employeeId, member.color ?? PALETTE[index % PALETTE.length]]));
}

function personColors(color: string) {
  return { backgroundColor: `${color}1f`, borderColor: color, textColor: "#1f1d1a" };
}

const timeOnly = (iso: string, zone: string) =>
  new Intl.DateTimeFormat("en-US", { timeZone: zone, hour: "numeric", minute: "2-digit" }).format(new Date(iso));

const mapsLink = (address: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

type Selected = { event: OwnerCalendarEvent; booking: OwnerBooking | null };
type Draft = { start: string; end: string };

export function OwnerCalendarView({
  events,
  bookings,
  team,
  zone,
  initialView,
  initialDate,
  viewChosen,
  canEdit,
}: {
  events: OwnerCalendarEvent[];
  bookings: OwnerBooking[];
  /** Everyone with a calendar; the team view shows only with two or more. */
  team: OwnerTeamMember[];
  zone: string;
  initialView: CalendarViewName;
  initialDate: string;
  /** False when the URL names no view: phones then open on the day view. */
  viewChosen: boolean;
  /** Engine businesses only; Calendly visits are changed in Calendly. */
  canEdit: boolean;
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
  const teamOn = team.length > 1;
  const colorOf = useMemo(() => teamColors(team), [team]);
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const [viewType, setViewType] = useState<string>(initialView);
  const inputs: EventInput[] = events.flatMap((event, index) => {
    if (teamOn && event.employeeId && hidden.has(event.employeeId)) return [];
    const named = event.inviteeName && event.inviteeName !== event.title ? `${event.inviteeName} · ${event.title}` : event.title;
    const person = teamOn && event.source === "booking" && event.employeeId ? colorOf.get(event.employeeId) : undefined;
    const unassigned = teamOn && event.source === "booking" && event.assigned === false;
    return [
      {
        id: event.eventId ?? `${event.source}-${index}`,
        title: unassigned ? `Unassigned · ${named}` : named,
        start: event.allDay ? event.start.slice(0, 10) : event.start,
        end: (event.allDay ? event.end?.slice(0, 10) : event.end) ?? undefined,
        allDay: event.allDay,
        editable: canEdit && Boolean(event.eventId) && event.status === "confirmed",
        extendedProps: { index },
        classNames: unassigned ? ["fc-unassigned"] : [],
        ...(person ? personColors(person) : colorsFor(event)),
      },
    ];
  });
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
    setViewType(arg.view.type);
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
        {teamOn && (
          <div className="mb-3 flex flex-wrap items-center gap-2 text-[12px]" role="group" aria-label="Show people">
            <span className="text-muted">Show:</span>
            {team.map((member) => {
              const shown = !hidden.has(member.employeeId);
              const color = colorOf.get(member.employeeId) as string;
              return (
                <button
                  key={member.employeeId}
                  type="button"
                  aria-pressed={shown}
                  onClick={() =>
                    setHidden((before) => {
                      const next = new Set(before);
                      if (shown) next.add(member.employeeId);
                      else next.delete(member.employeeId);
                      return next;
                    })
                  }
                  className="flex min-h-9 items-center gap-1.5 rounded-full border px-3"
                  style={shown ? { borderColor: color, backgroundColor: `${color}1f` } : { borderColor: "#d8d5cd", opacity: 0.55 }}
                >
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} aria-hidden />
                  {member.name}
                </button>
              );
            })}
          </div>
        )}
        {teamOn && viewType === "timeGridDay" && <WhereIsEveryone team={team} events={events} colorOf={colorOf} zone={zone} />}
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, luxonPlugin]}
          timeZone={zone}
          initialView={initialView}
          initialDate={initialDate}
          headerToolbar={{ left: "today prev,next title", center: "", right: canEdit ? "timeGridDay,timeGridWeek,dayGridMonth addVisit" : "timeGridDay,timeGridWeek,dayGridMonth" }}
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
          selectable={canEdit}
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
        {draft && (
          <AddVisit
            draft={draft}
            zone={zone}
            pending={pending}
            team={teamOn ? team : []}
            onCancel={() => setDraft(null)}
            onSave={(visit) => run(() => addVisitAction(visit), () => setDraft(null))}
          />
        )}
        {selected && (
          <VisitPanel
            selected={selected}
            zone={zone}
            pending={pending}
            canEdit={canEdit}
            team={teamOn ? team : []}
            onClose={() => setSelected(null)}
            onCancelVisit={(eventId) => run(() => cancelVisitAction(eventId), () => setSelected(null))}
            onAssign={(event, employeeId) =>
              run(() => moveVisitAction(event.eventId as string, event.start, event.end ?? event.start, employeeId), () => setSelected(null))
            }
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
        {teamOn && canEdit && (
          <Offering team={team} pending={pending} onSave={(ids) => run(() => setOfferingAction(ids))} />
        )}
        <section className="rounded-2xl border border-line bg-paper p-4 text-[12px] text-muted">
          <h3 className="text-[13px] font-semibold text-ink">Legend</h3>
          <ul className="mt-2 space-y-1.5">
            {(
              [
                ["Confirmed", COLORS.confirmed],
                ["Pending approval", COLORS.pending],
                ["Completed", COLORS.completed],
                ["Your own calendar", COLORS.calendar],
                ...team.filter(() => teamOn).map((member) => [member.name, personColors(colorOf.get(member.employeeId) as string)] as const),
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
  canEdit,
  team,
  onClose,
  onCancelVisit,
  onAssign,
}: {
  selected: Selected;
  zone: string;
  pending: boolean;
  canEdit: boolean;
  team: OwnerTeamMember[];
  onClose: () => void;
  onCancelVisit: (eventId: string) => void;
  onAssign: (event: OwnerCalendarEvent, employeeId: string) => void;
}) {
  const active = team.filter((member) => member.active);
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
        {team.length > 0 && event.source === "booking" && event.employeeId && (
          <Row label="Who" value={event.assigned === false ? "Unassigned" : (event.employeeName ?? "Unassigned")} />
        )}
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
            {active.length > 0 && (
              <label className="mb-2 block text-[12px] text-muted">
                Who does it
                <select name="employeeId" defaultValue="" className="mt-1 block w-full rounded-lg border border-line bg-paper px-2 py-1.5 text-[13px] text-ink">
                  <option value="">Decide later</option>
                  {active.map((member) => (
                    <option key={member.employeeId} value={member.employeeId}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </label>
            )}
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
      {canEdit && event.eventId && event.status === "confirmed" && (
        <div className="mt-4 space-y-2">
          <p className="text-[12px] text-muted">Drag the visit on the calendar to move it. The customer is told.</p>
          {active.length > 0 && (
            <form
              className="flex flex-wrap items-end gap-2"
              onSubmit={(submit) => {
                submit.preventDefault();
                const employeeId = String(new FormData(submit.currentTarget).get("employeeId") ?? "");
                if (employeeId) onAssign(event, employeeId);
              }}
            >
              <label className="text-[12px] text-muted">
                Give to
                <select
                  name="employeeId"
                  defaultValue={event.assigned === false ? "" : (event.employeeId ?? "")}
                  className="mt-1 block rounded-lg border border-line bg-paper px-2 py-1.5 text-[13px] text-ink"
                >
                  <option value="" disabled>
                    Pick someone
                  </option>
                  {active.map((member) => (
                    <option key={member.employeeId} value={member.employeeId}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit" disabled={pending} className={buttonSecondary}>
                Assign
              </button>
            </form>
          )}
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
  team,
  onCancel,
  onSave,
}: {
  draft: Draft;
  zone: string;
  pending: boolean;
  team: OwnerTeamMember[];
  onCancel: () => void;
  onSave: (visit: {
    start: string;
    end: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    notes: string;
    employeeId: string;
  }) => void;
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
        onSave({ ...draft, name: value("name"), phone: value("phone"), email: value("email"), address: value("address"), notes: value("notes"), employeeId: value("employeeId") });
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
      {team.length > 0 && (
        <label className="mt-2 block">
          Who does it
          <select name="employeeId" defaultValue="" className={field}>
            <option value="">Decide later</option>
            {team
              .filter((member) => member.active)
              .map((member) => (
                <option key={member.employeeId} value={member.employeeId}>
                  {member.name}
                </option>
              ))}
          </select>
        </label>
      )}
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

/** Day view: what each person is doing right now, or their next visit today. */
function WhereIsEveryone({
  team,
  events,
  colorOf,
  zone,
}: {
  team: OwnerTeamMember[];
  events: OwnerCalendarEvent[];
  colorOf: Map<string, string>;
  zone: string;
}) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(timer);
  }, []);
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: zone }).format(new Date(now));
  const dayOf = (iso: string) => new Intl.DateTimeFormat("en-CA", { timeZone: zone }).format(new Date(iso));
  const visits = events.filter((event) => event.source === "booking" && !event.allDay && event.employeeId && event.status !== "cancelled");
  return (
    <section aria-label="Where is everyone now" className="mb-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {team
        .filter((member) => member.active)
        .map((member) => {
          const mine = visits
            .filter((event) => event.employeeId === member.employeeId && dayOf(event.start) === today)
            .sort((a, b) => a.start.localeCompare(b.start));
          const current = mine.find((event) => Date.parse(event.start) <= now && Date.parse(event.end ?? event.start) > now);
          const next = mine.find((event) => Date.parse(event.start) > now);
          const color = colorOf.get(member.employeeId) as string;
          const where = (event: OwnerCalendarEvent) => event.location ?? event.inviteeName ?? event.title;
          return (
            <div key={member.employeeId} className="min-w-0 rounded-xl border-l-4 bg-paper-2 px-3 py-2 text-[12px]" style={{ borderLeftColor: color, backgroundColor: `${color}12` }}>
              <p className="font-semibold text-ink">{member.name}</p>
              <p className="truncate text-muted">
                {current
                  ? `Now: ${where(current)} until ${timeOnly(current.end ?? current.start, zone)}`
                  : next
                    ? `Free. Next: ${where(next)} at ${timeOnly(next.start, zone)}`
                    : "Free for the rest of today"}
              </p>
            </div>
          );
        })}
    </section>
  );
}

/** Whose open times Gus offers customers. */
function Offering({ team, pending, onSave }: { team: OwnerTeamMember[]; pending: boolean; onSave: (ids: string[]) => void }) {
  return (
    <form
      className="rounded-2xl border border-line bg-paper p-4 text-[13px]"
      aria-label="Whose times Gus offers"
      onSubmit={(submit) => {
        submit.preventDefault();
        onSave(new FormData(submit.currentTarget).getAll("employeeId").map(String));
      }}
    >
      <h3 className="text-[15px] font-semibold text-ink">Whose times Gus offers</h3>
      <p className="mt-1 text-[12px] text-muted">Customers get open times from the people you tick. They never pick a person; you choose who goes when you approve.</p>
      <div className="mt-2 space-y-1.5">
        {team
          .filter((member) => member.active)
          .map((member) => (
            <label key={member.employeeId} className="flex min-h-9 items-center gap-2">
              <input type="checkbox" name="employeeId" value={member.employeeId} defaultChecked={member.offersTimes} />
              {member.name}
            </label>
          ))}
      </div>
      <button type="submit" disabled={pending} className={`mt-2 ${buttonSecondary}`}>
        Save
      </button>
    </form>
  );
}
