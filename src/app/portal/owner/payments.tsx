import type { OwnerPayment, OwnerQuote, OwnerSubscription } from "@/lib/owner";
import { markPaidAction, markUnpaidAction, recordPlanPaymentAction, undoPlanPaymentAction } from "./actions";
import { PlanAmount } from "./plan-amount";
import { buttonPrimary, buttonSecondary, formatDate, formatMoney } from "./ui";

const field =
  "min-h-11 w-full rounded-xl border border-line bg-paper px-3 text-[15px] text-ink focus:border-ink/40 focus:outline-none";

const methodLabel: Record<string, string> = {
  card: "card",
  check: "check",
  cash: "cash",
  other: "other",
};

function today(zone: string): string {
  // en-CA formats as YYYY-MM-DD, the value a date input takes.
  return new Intl.DateTimeFormat("en-CA", { timeZone: zone }).format(new Date());
}

export function canMarkPaid(quote: OwnerQuote): boolean {
  if (quote.billing !== "one_time") return false;
  if (quote.customerStatus === "viewed" || quote.customerStatus === "accepted") return true;
  // Sent: GVAS handed it to the e-mail/text provider (delivery confirmation may never come).
  if (quote.customerStatus !== null && quote.customerStatus !== "sent") return false;
  return quote.status === "delivery_pending" || quote.status === "delivered";
}

export function MarkPaid({ quote, returnTo, zone }: { quote: OwnerQuote; returnTo: string; zone: string }) {
  const max = today(zone);
  return (
    <li className="px-5 py-4">
      <details className="group">
        <summary className="flex min-h-11 cursor-pointer list-none flex-wrap items-center justify-between gap-3">
          <span className="min-w-0">
            <span className="block font-semibold text-ink">
              {quote.customer.name ?? quote.customer.email ?? "Customer"} ·{" "}
              <span className="tabular-nums">{formatMoney(quote.totalCents, quote.currency)}</span>
            </span>
            <span className="block text-[13px] text-muted">
              {quote.lineItems.map((item) => item.description).join(", ") || "Quote"}
              {quote.customerStatus !== "accepted" && " · not accepted yet"}
            </span>
          </span>
          <span className={`${buttonSecondary} min-h-11 group-open:hidden`}>Mark paid</span>
        </summary>
        <form action={markPaidAction} className="mt-4 grid gap-3 sm:grid-cols-[auto_auto_1fr_auto] sm:items-end">
          <input type="hidden" name="quoteId" value={quote.id} />
          <input type="hidden" name="returnTo" value={returnTo} />
          <label className="grid gap-1 text-[13px] text-muted">
            Paid on
            <input type="date" name="paidOn" required defaultValue={max} max={max} className={field} />
          </label>
          <label className="grid gap-1 text-[13px] text-muted">
            How
            <select name="method" required defaultValue="check" className={field}>
              <option value="check">Check</option>
              <option value="cash">Cash</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label className="grid gap-1 text-[13px] text-muted">
            Note (optional, only you see it)
            <input name="note" maxLength={500} placeholder="e.g. check #1042" className={field} />
          </label>
          <button type="submit" className={`${buttonPrimary} min-h-11`}>
            Mark {formatMoney(quote.totalCents, quote.currency)} paid
          </button>
        </form>
      </details>
    </li>
  );
}

export function PaidBy({ quote, returnTo, zone }: { quote: OwnerQuote; returnTo: string; zone: string }) {
  const paid = quote.paidBy;
  if (!paid || !quote.paidOn) return null;
  return (
    <div className="mt-1 text-[12px] text-muted">
      Paid by {methodLabel[paid.method] ?? paid.method}, {formatDate(quote.paidOn, zone)}
      {paid.note ? ` · ${paid.note}` : ""}
      {paid.source === "manual" && (
        <details className="mt-1">
          <summary className="inline-flex min-h-11 cursor-pointer items-center underline underline-offset-2">
            Mark unpaid
          </summary>
          <form action={markUnpaidAction} className="mt-1 flex flex-wrap items-center gap-2">
            <input type="hidden" name="quoteId" value={quote.id} />
            <input type="hidden" name="returnTo" value={returnTo} />
            <span className="text-ink">Undo this payment? The quote goes back to unpaid.</span>
            <button type="submit" className={`${buttonSecondary} min-h-11`}>
              Yes, mark unpaid
            </button>
          </form>
        </details>
      )}
    </div>
  );
}

const ENDED = new Set(["canceled", "incomplete_expired"]);

/** yyyy-mm-dd as "Oct 31" (a calendar day, so no time-zone shift). */
export function formatDay(day: string | null | undefined): string {
  if (!day) return "—";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" }).format(
    new Date(`${day}T00:00:00Z`),
  );
}

/** A recurring quote that went out, with no card plan running: he can record check/cash payments. */
export function canRecordPlanPayment(quote: OwnerQuote, plans: OwnerSubscription[]): boolean {
  if (quote.billing !== "recurring" || !quote.interval) return false;
  if (plans.some((plan) => plan.quoteId === quote.id && !plan.manual && !ENDED.has(plan.status))) return false;
  if (quote.customerStatus === "declined") return false;
  if (quote.customerStatus !== null && quote.customerStatus !== "sent") return true;
  return quote.status === "delivery_pending" || quote.status === "delivered";
}

export function isLiveManualPlan(plan: OwnerSubscription): boolean {
  return plan.manual === true && !ENDED.has(plan.status);
}

function per(interval: "month" | "year" | null): string {
  return interval === "year" ? "/yr" : "/mo";
}

export function RecordPlanPayment({ quote, returnTo, zone }: { quote: OwnerQuote; returnTo: string; zone: string }) {
  const max = today(zone);
  return (
    <details className="group">
      <summary className="inline-flex min-h-11 cursor-pointer list-none items-center">
        <span className={`${buttonSecondary} min-h-11 group-open:hidden`}>Record payment</span>
        <span className="hidden text-[13px] text-muted underline underline-offset-2 group-open:inline">Close</span>
      </summary>
      <form action={recordPlanPaymentAction} className="mt-3 grid gap-3 sm:grid-cols-2 sm:items-end">
        <input type="hidden" name="quoteId" value={quote.id} />
        <input type="hidden" name="returnTo" value={returnTo} />
        {/* One key per form: a double click or resubmit records the payment once. */}
        <input type="hidden" name="key" value={crypto.randomUUID()} />
        <label className="grid gap-1 text-[13px] text-muted">
          Paid on
          <input type="date" name="paidOn" required defaultValue={max} max={max} className={field} />
        </label>
        <label className="grid gap-1 text-[13px] text-muted">
          How
          <select name="method" required defaultValue="check" className={field}>
            <option value="check">Check</option>
            <option value="cash">Cash</option>
            <option value="other">Other</option>
          </select>
        </label>
        <PlanAmount priceCents={quote.totalCents} currency={quote.currency || "USD"} interval={quote.interval ?? "month"} />
        <label className="grid gap-1 text-[13px] text-muted sm:col-span-2">
          Note (optional, only you see it)
          <input name="note" maxLength={500} placeholder="e.g. check #1042" className={field} />
        </label>
        <p className="text-[12px] text-muted sm:col-span-2">
          {quote.customer.email ? "The customer gets a short receipt by e-mail." : "No email on file, so no receipt."}
        </p>
        <button type="submit" className={`${buttonPrimary} min-h-11 sm:col-span-2 sm:justify-self-start`}>
          Record payment
        </button>
      </form>
    </details>
  );
}

/** A recurring quote with no plan yet, in "Waiting for payment". */
export function StartPlan({ quote, returnTo, zone }: { quote: OwnerQuote; returnTo: string; zone: string }) {
  return (
    <li className="space-y-2 px-5 py-4">
      <p className="min-w-0">
        <span className="block font-semibold text-ink">
          {quote.customer.name ?? quote.customer.email ?? "Customer"} ·{" "}
          <span className="tabular-nums">
            {formatMoney(quote.totalCents, quote.currency)}
            {per(quote.interval)}
          </span>
        </span>
        <span className="block text-[13px] text-muted">
          {quote.lineItems.map((item) => item.description).join(", ") || "Plan"}
          {quote.customerStatus !== "accepted" && quote.customerStatus !== "paid" && " · not accepted yet"}
        </span>
      </p>
      <RecordPlanPayment quote={quote} returnTo={returnTo} zone={zone} />
    </li>
  );
}

/** Paid-through date, the payments behind it (each can be undone), and Record payment. */
export function ManualPlan({
  plan,
  quote,
  payments,
  returnTo,
  zone,
}: {
  plan: OwnerSubscription;
  quote: OwnerQuote | undefined;
  payments: OwnerPayment[] | null;
  returnTo: string;
  zone: string;
}) {
  const active = (payments ?? [])
    .filter((p) => p.quoteId === plan.quoteId && p.kind === "plan" && p.source === "manual" && !p.voidedAt)
    .sort((a, b) => (b.paidOn ?? "").localeCompare(a.paidOn ?? ""));
  const lapsed = !!plan.paidThrough && plan.paidThrough < today(zone);
  return (
    <div className="mt-2 space-y-2">
      <p className={`text-[13px] ${lapsed ? "font-semibold text-red-700" : "text-muted"}`}>
        {lapsed ? "Ran out" : "Paid through"} {formatDay(plan.paidThrough)}
      </p>
      {payments === null && (
        <p className="text-[12px] text-red-700">
          Couldn&apos;t load the payments, so Undo isn&apos;t available. Refresh to try again.
        </p>
      )}
      {active.length > 0 && (
        <ul className="space-y-1 text-[12px] text-muted">
          {active.map((payment) => (
            <li key={payment.id}>
              <details>
                <summary className="inline-flex min-h-11 cursor-pointer items-center gap-1">
                  {formatDate(payment.paidOn, zone)} · {methodLabel[payment.method] ?? payment.method} ·{" "}
                  {formatMoney(payment.amountCents, payment.currency)} for {payment.monthsCovered ?? 0} mo
                  {payment.note ? ` · ${payment.note}` : ""}
                  <span className="ml-1 underline underline-offset-2">Undo</span>
                </summary>
                <form action={undoPlanPaymentAction} className="mt-1 flex flex-wrap items-center gap-2">
                  <input type="hidden" name="quoteId" value={plan.quoteId} />
                  <input type="hidden" name="paymentId" value={payment.id} />
                  <input type="hidden" name="returnTo" value={returnTo} />
                  <span className="text-ink">Undo this payment? The paid-through date moves back.</span>
                  <button type="submit" className={`${buttonSecondary} min-h-11`}>
                    Yes, undo
                  </button>
                </form>
              </details>
            </li>
          ))}
        </ul>
      )}
      {quote && <RecordPlanPayment quote={quote} returnTo={returnTo} zone={zone} />}
    </div>
  );
}
