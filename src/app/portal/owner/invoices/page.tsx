import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getOwnerInvoices,
  getOwnerPaidThisMonth,
  getOwnerTimeZone,
  type OwnerInvoice,
} from "@/lib/owner";
import { redirectOwnerOnUnauthorized, requireOwnerSessionToken } from "@/lib/owner-session";
import { markUnpaidAction } from "../actions";
import { MarkPaidRow, formatDay } from "../payments";
import { Card, Empty, LoadError, Notice, Pill, buttonSecondary, firstParam, formatDate, formatMoney } from "../ui";

export const dynamic = "force-dynamic";

const RETURN = "/portal/owner/invoices";

const statusLabel: Record<"sent" | "overdue", [string, "red" | "orange" | "green"]> = {
  overdue: ["Overdue", "red"],
  sent: ["Sent", "orange"],
};

const methodLabel: Record<string, string> = { card: "card", check: "check", cash: "cash", other: "other" };

function who(invoice: OwnerInvoice): string {
  return invoice.customer.name ?? invoice.customer.email ?? "Customer";
}

function work(invoice: OwnerInvoice): string {
  return invoice.lineItems.map((item) => item.description).join(", ") || "Work";
}

function total(invoices: OwnerInvoice[]): number {
  return invoices.reduce((sum, invoice) => sum + invoice.totalCents, 0);
}

function PaidInvoice({ invoice, zone }: { invoice: OwnerInvoice; zone: string }) {
  const paid = invoice.paidBy;
  return (
    <li className="px-5 py-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 [overflow-wrap:anywhere]">
          <p className="font-semibold text-ink">
            {invoice.number} · {who(invoice)}
          </p>
          <p className="text-[13px] text-muted">{work(invoice)}</p>
          {paid && invoice.paidOn && (
            <p className="mt-1 text-[12px] text-muted">
              Paid by {methodLabel[paid.method] ?? paid.method}, {formatDate(invoice.paidOn, zone)}
              {paid.note ? ` · ${paid.note}` : ""}
            </p>
          )}
          {paid?.source === "manual" && (
            <details className="mt-1 text-[12px] text-muted">
              <summary className="inline-flex min-h-11 cursor-pointer items-center underline underline-offset-2">
                Mark unpaid
              </summary>
              <form action={markUnpaidAction} className="mt-1 flex flex-wrap items-center gap-2">
                <input type="hidden" name="quoteId" value={invoice.quoteId} />
                <input type="hidden" name="returnTo" value={RETURN} />
                <span className="text-ink">Undo this payment? The invoice goes back to unpaid.</span>
                <button type="submit" className={`${buttonSecondary} min-h-11`}>
                  Yes, mark unpaid
                </button>
              </form>
            </details>
          )}
        </div>
        <span className="shrink-0 font-semibold tabular-nums text-ink">
          {formatMoney(invoice.totalCents, invoice.currency)}
        </span>
      </div>
    </li>
  );
}

function OtherInvoice({ invoice, children }: { invoice: OwnerInvoice; children: ReactNode }) {
  return (
    <li className="px-5 py-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 [overflow-wrap:anywhere]">
          <p className="font-semibold text-ink">
            {invoice.number} · {who(invoice)}
          </p>
          <p className="text-[13px] text-muted">{work(invoice)}</p>
          <p className="mt-1 text-[12px] text-muted">{children}</p>
        </div>
        <span className="shrink-0 font-semibold tabular-nums text-ink">
          {formatMoney(invoice.totalCents, invoice.currency)}
        </span>
      </div>
    </li>
  );
}

export default async function OwnerInvoicesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const token = await requireOwnerSessionToken();
  const zone = await getOwnerTimeZone(token);
  const [i, p] = await Promise.allSettled([getOwnerInvoices(token), getOwnerPaidThisMonth(token, zone)]);
  if (i.status === "rejected") redirectOwnerOnUnauthorized(i.reason);
  if (i.status === "fulfilled" && !i.value.enabled) notFound();
  if (i.status === "rejected") console.error("OwnerInvoices: invoices failed", i.reason);
  const invoices = i.status === "fulfilled" ? i.value.invoices : null;
  const paidThisMonth = p.status === "fulfilled" ? p.value : null;
  const overdue = (invoices ?? []).filter((invoice) => invoice.status === "overdue");
  const sent = (invoices ?? []).filter((invoice) => invoice.status === "sent");
  const paid = (invoices ?? []).filter((invoice) => invoice.status === "paid");
  const drafts = (invoices ?? []).filter((invoice) => invoice.status === "draft");
  const voided = (invoices ?? []).filter((invoice) => invoice.status === "void");
  const open = [...overdue, ...sent];

  if (invoices === null) {
    return (
      <Card title="Invoices">
        <LoadError label="invoices" />
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Notice code={firstParam(params.notice)} message={firstParam(params.message)} />
      <dl className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-line bg-paper px-5 py-4">
          <dt className="text-[13px] text-muted">Outstanding</dt>
          <dd className="mt-1 font-display text-2xl font-semibold tabular-nums text-ink">{formatMoney(total(open))}</dd>
          <dd className="text-[13px] text-muted">
            {open.length} due{overdue.length > 0 ? `, ${overdue.length} overdue` : ""}
          </dd>
        </div>
        <div className="rounded-2xl border border-line bg-paper px-5 py-4">
          <dt className="text-[13px] text-muted">Paid this month</dt>
          <dd className="mt-1 font-display text-2xl font-semibold tabular-nums text-ink">
            {paidThisMonth === null ? "—" : formatMoney(paidThisMonth)}
          </dd>
          <dd className="text-[13px] text-muted">
            All payments,{" "}
            <Link href="/portal/owner/quotes" className="underline underline-offset-2 hover:text-ink">
              plans included
            </Link>
          </dd>
        </div>
      </dl>

      <Card title="Waiting for payment">
        {open.length === 0 ? (
          <Empty>Nothing due. Send an invoice from an accepted quote on Quotes.</Empty>
        ) : (
          <ul className="divide-y divide-line">
            {open.map((invoice) => {
              const [label, tone] = statusLabel[invoice.status as "sent" | "overdue"];
              return (
                <MarkPaidRow
                  key={invoice.number}
                  quoteId={invoice.quoteId}
                  title={
                    <>
                      {invoice.number} · {who(invoice)}
                    </>
                  }
                  detail={
                    <>
                      <Pill tone={tone}>{label}</Pill> {work(invoice)}
                      {invoice.sentAt ? ` · sent ${formatDate(invoice.sentAt, zone)}` : ""} · due{" "}
                      <span className="whitespace-nowrap">{formatDay(invoice.dueOn)}</span>
                      {invoice.replaces ? ` · replaces ${invoice.replaces}` : ""}
                    </>
                  }
                  totalCents={invoice.totalCents}
                  currency={invoice.currency}
                  returnTo={RETURN}
                  zone={zone}
                />
              );
            })}
          </ul>
        )}
      </Card>

      {drafts.length > 0 && (
        <Card title="Drafts">
          <ul className="divide-y divide-line">
            {drafts.map((invoice) => (
              <OtherInvoice key={invoice.number} invoice={invoice}>
                <Pill tone="orange">Draft</Pill> Not sent yet. Text Gus &ldquo;send invoice {invoice.number}&rdquo; to
                send it.
                {invoice.replaces ? ` Replaces ${invoice.replaces}.` : ""}
              </OtherInvoice>
            ))}
          </ul>
        </Card>
      )}

      <Card title="Paid">
        {paid.length === 0 ? (
          <Empty>No paid invoices yet.</Empty>
        ) : (
          <ul className="divide-y divide-line">
            {paid.map((invoice) => (
              <PaidInvoice key={invoice.number} invoice={invoice} zone={zone} />
            ))}
          </ul>
        )}
      </Card>

      {voided.length > 0 && (
        <Card title="Void">
          <ul className="divide-y divide-line">
            {voided.map((invoice) => (
              <OtherInvoice key={invoice.number} invoice={invoice}>
                <Pill tone="red">Void</Pill> Not owed. A new invoice replaced it.
              </OtherInvoice>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
