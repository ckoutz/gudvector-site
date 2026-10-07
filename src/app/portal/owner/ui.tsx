import { DEFAULT_TIME_ZONE, type OwnerCustomerStatus, type OwnerQuote } from "@/lib/owner";

export const buttonPrimary =
  "inline-flex min-h-11 items-center justify-center rounded-full bg-action px-4 py-2 text-[14px] font-semibold text-paper transition-colors hover:bg-action-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-ink disabled:opacity-50";
export const buttonSecondary =
  "inline-flex min-h-11 items-center justify-center rounded-full border border-ink/20 px-4 py-2 text-[14px] font-semibold text-ink transition-colors hover:border-ink/40 hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-ink";

export function formatMoney(cents: number, currency: string | null = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

/** US numbers as "(510) 555-0163", however they were typed; anything else as stored. */
export function formatPhone(phone: string): string {
  const trimmed = phone.trim();
  const digits = trimmed.replace(/\D/g, "");
  const local = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  if (!/^[2-9]\d{2}[2-9]\d{6}$/.test(local) || (trimmed.startsWith("+") && !trimmed.startsWith("+1"))) return phone;
  return `(${local.slice(0, 3)}) ${local.slice(3, 6)}-${local.slice(6)}`;
}

export function formatDate(iso: string | null, zone: string = DEFAULT_TIME_ZONE): string {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: zone,
  }).format(new Date(iso));
}

export function formatTime(iso: string, zone: string = DEFAULT_TIME_ZONE): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: zone,
  }).format(new Date(iso));
}

export function formatDateTime(iso: string | null, zone: string = DEFAULT_TIME_ZONE): string {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: zone,
  }).format(new Date(iso));
}

/** "Pacific Time" for America/Los_Angeles; the IANA name when Intl has no generic name. */
export function zoneName(zone: string): string {
  const name = new Intl.DateTimeFormat("en-US", { timeZone: zone, timeZoneName: "longGeneric" })
    .formatToParts(new Date())
    .find((part) => part.type === "timeZoneName")?.value;
  return name && !name.startsWith("GMT") ? name : zone;
}

/** yyyy-mm-dd in the business's time zone. */
export function dayKey(value: Date | string, zone: string = DEFAULT_TIME_ZONE): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: zone,
  }).format(new Date(value));
  return parts;
}

/** The last instant before an exclusive `end`, so an event ending at midnight stays on the day before. */
function lastMoment(end: string): Date {
  return new Date(new Date(end).getTime() - 1);
}

/**
 * Whether `event` is on local day `key`. All-day events keep their own dates (GVAS sends them
 * anchored at UTC midnight, end exclusive); timed events count on every local day they overlap.
 */
export function onDay(
  event: { start: string; end?: string | null; allDay: boolean },
  key: string,
  zone: string = DEFAULT_TIME_ZONE,
): boolean {
  const day = (value: Date | string) =>
    event.allDay ? new Date(value).toISOString().slice(0, 10) : dayKey(value, zone);
  const first = day(event.start);
  const last = event.end ? day(lastMoment(event.end)) : first;
  return first <= key && key <= (last < first ? first : last);
}

type Tone = "orange" | "green" | "muted" | "red";

const toneClass: Record<Tone, string> = {
  orange: "bg-chip text-orange-ink",
  green: "bg-emerald-50 text-emerald-800",
  muted: "bg-ink/5 text-muted",
  red: "bg-red-50 text-red-800",
};

export function Pill({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${toneClass[tone]}`}
    >
      {children}
    </span>
  );
}

const customerStatusLabel: Record<OwnerCustomerStatus, [string, Tone]> = {
  sent: ["Sent", "muted"],
  viewed: ["Viewed", "orange"],
  accepted: ["Accepted, unpaid", "orange"],
  paid: ["Paid", "green"],
  declined: ["Declined by customer", "red"],
};

export function quoteStatus(quote: OwnerQuote): [string, Tone] {
  if (quote.needsApproval) return ["Needs your OK", "orange"];
  if (quote.status === "rejected") return ["You rejected", "muted"];
  if (quote.customerStatus) return customerStatusLabel[quote.customerStatus];
  if (quote.status === "delivery_pending" || quote.status === "approved") return ["Sending", "muted"];
  if (quote.status === "delivered") return ["Sent", "muted"];
  return ["Drafting", "muted"];
}

export function Card({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-line bg-paper">
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5">
        <h2 className="text-[15px] font-semibold text-ink">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function Empty({ children }: { children: React.ReactNode }) {
  return <p className="px-5 py-6 text-[14px] text-muted">{children}</p>;
}

export function LoadError({ label }: { label: string }) {
  return (
    <p role="alert" className="px-5 py-6 text-[14px] text-muted">
      Couldn&apos;t load {label} right now. Refresh to try again.
    </p>
  );
}

const notices: Record<string, string> = {
  "quote-approved": "Quote approved. Gus is sending it to the customer.",
  "quote-rejected": "Quote rejected. Nothing was sent.",
  "quote-stale": "That quote was already handled.",
  "quote-marked-paid": "Marked paid. The customer gets a short receipt by e-mail.",
  "quote-marked-unpaid": "Payment undone. The quote is accepted and unpaid again.",
  "plan-payment-recorded": "Payment recorded. The paid-through date is updated.",
  "plan-payment-undone": "Payment undone. The paid-through date moved back.",
  "booking-done": "Booking updated.",
  "booking-stale": "That booking was already handled.",
  failed: "That didn't go through. Try again in a minute.",
};

export function Notice({ code, message }: { code?: string; message?: string }) {
  const text = message || (code ? notices[code] : undefined);
  if (!text) return null;
  return (
    <p role="status" className="mb-6 rounded-xl border border-line bg-peach-2 px-4 py-3 text-[14px] text-ink">
      {text}
    </p>
  );
}

export function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}
