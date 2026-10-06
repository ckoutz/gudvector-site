import type { OwnerQuote } from "@/lib/owner";
import { markPaidAction, markUnpaidAction } from "./actions";
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
  if (quote.billing !== "one_time" || quote.status !== "delivered") return false;
  return quote.customerStatus !== "paid" && quote.customerStatus !== "declined";
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
