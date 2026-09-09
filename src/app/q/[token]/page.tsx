import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/section";
import { CtaButton } from "@/components/cta-button";
import { formatUsd, getQuote, isGvasError, type QuoteResponse, type QuoteStatus } from "@/lib/gvas";
import { QuoteActions } from "./quote-actions";

export const metadata: Metadata = {
  title: "Your quote",
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

const statusLabel: Record<QuoteStatus, string> = {
  sent: "Awaiting your response",
  viewed: "Awaiting your response",
  accepted: "Accepted — payment pending",
  paid: "Paid",
  declined: "Declined",
};

const statusTone: Record<QuoteStatus, string> = {
  sent: "bg-chip text-orange-ink",
  viewed: "bg-chip text-orange-ink",
  accepted: "bg-chip text-orange-ink",
  paid: "bg-emerald-50 text-emerald-800",
  declined: "bg-ink/5 text-muted",
};

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">{children}</div>;
}

function StatusBadge({ status }: { status: QuoteStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[13px] font-semibold ${statusTone[status]}`}
    >
      {statusLabel[status]}
    </span>
  );
}

function NotFoundState() {
  return (
    <Shell>
      <Eyebrow>Quote</Eyebrow>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
        We couldn&apos;t find that quote.
      </h1>
      <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted">
        Check that you opened the full link from your email or text message. If the link
        is more than a few weeks old, ask the business to send it again.
      </p>
      <div className="mt-8">
        <CtaButton href="/" variant="ghost">
          Back to gudvector.com
        </CtaButton>
      </div>
    </Shell>
  );
}

function UnavailableState() {
  return (
    <Shell>
      <Eyebrow>Quote</Eyebrow>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
        Quotes are temporarily unavailable.
      </h1>
      <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted">
        We couldn&apos;t reach the quote service. Please try the link again in a few
        minutes.
      </p>
    </Shell>
  );
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Los_Angeles",
  }).format(new Date(iso));
}

export default async function QuotePage({ params, searchParams }: PageProps<"/q/[token]">) {
  const { token } = await params;
  const { paid } = await searchParams;

  let data: QuoteResponse;
  try {
    data = await getQuote(token);
  } catch (err) {
    if (isGvasError(err) && err.kind === "not_found") return <NotFoundState />;
    console.error("QuotePage: failed to load quote", err);
    return <UnavailableState />;
  }

  const { business, quote } = data;
  const isPaid = quote.status === "paid" || paid === "1";
  const isDeclined = quote.status === "declined";
  const effectiveStatus: QuoteStatus = isPaid ? "paid" : quote.status;

  return (
    <Shell>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Eyebrow>{business.displayName}</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Quote for {quote.customerName}
          </h1>
          {quote.serviceAddress && (
            <p className="mt-2 text-[16px] text-muted">{quote.serviceAddress}</p>
          )}
          <p className="mt-1 text-[14px] text-muted">
            Approved {formatDate(quote.approvedAt)} · Quote #{quote.id}
          </p>
        </div>
        <StatusBadge status={effectiveStatus} />
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-paper">
        <table className="w-full text-left text-[15px]">
          <thead className="bg-peach-2 text-[13px] font-semibold uppercase tracking-wide text-muted">
            <tr>
              <th scope="col" className="px-5 py-3">
                Item
              </th>
              <th scope="col" className="px-5 py-3 text-right">
                Qty
              </th>
              <th scope="col" className="px-5 py-3 text-right">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {quote.items.map((item, i) => (
              <tr key={i}>
                <td className="px-5 py-3.5 text-char">{item.description}</td>
                <td className="px-5 py-3.5 text-right tabular-nums text-muted">{item.quantity}</td>
                <td className="px-5 py-3.5 text-right tabular-nums text-char">
                  {formatUsd(item.amountCents * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="border-t border-line">
            <tr>
              <td colSpan={2} className="px-5 py-3 text-right text-muted">
                Subtotal
              </td>
              <td className="px-5 py-3 text-right tabular-nums text-char">
                {formatUsd(quote.subtotalCents)}
              </td>
            </tr>
            <tr className="bg-peach-2">
              <td colSpan={2} className="px-5 py-3.5 text-right font-semibold text-ink">
                Total ({quote.currency})
              </td>
              <td className="px-5 py-3.5 text-right font-display text-xl font-semibold tabular-nums text-ink">
                {formatUsd(quote.totalCents)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {quote.note && (
        <div className="mt-6 rounded-2xl bg-peach-2 p-6">
          <p className="text-[13px] font-semibold uppercase tracking-wide text-muted">
            Note from {business.displayName}
          </p>
          <p className="mt-2 whitespace-pre-line text-[15px] leading-relaxed text-char">
            {quote.note}
          </p>
        </div>
      )}

      <div className="mt-10">
        {isPaid ? (
          <div className="rounded-2xl border border-orange/30 bg-peach-2 p-8">
            <h2 className="font-display text-2xl font-semibold text-ink">
              Payment received. Thank you.
            </h2>
            <p className="mt-2 text-[16px] leading-relaxed text-muted">
              {business.displayName} has been notified and will be in touch to confirm the
              visit. Stripe will email you a receipt.
            </p>
          </div>
        ) : isDeclined ? (
          <div className="rounded-2xl border border-line bg-peach-2 p-8">
            <h2 className="font-display text-2xl font-semibold text-ink">Quote declined.</h2>
            <p className="mt-2 text-[16px] leading-relaxed text-muted">
              Questions? Contact{" "}
              <a
                href={business.siteUrl}
                className="font-medium text-orange-ink underline underline-offset-2"
                rel="noopener noreferrer"
              >
                {business.displayName}
              </a>
              .
            </p>
          </div>
        ) : (
          <QuoteActions token={token} />
        )}
      </div>

      <p className="mt-12 text-[13px] text-muted">
        Quote delivered by{" "}
        <Link href="/" className="font-medium text-orange-ink hover:text-orange-deep">
          Güd Vector
        </Link>{" "}
        on behalf of {business.displayName}.
      </p>
    </Shell>
  );
}
