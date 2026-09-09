import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/section";
import {
  createBillingPortalUrl,
  formatCents,
  getPortalMe,
  getPortalQuotes,
  getPortalSubscriptions,
  isGvasError,
  type PortalMe,
  type PortalQuote,
  type PortalSubscription,
  type QuoteStatus,
} from "@/lib/gvas";
import { redirectOnUnauthorized, requirePortalSessionToken } from "@/lib/portal-session";
import { signOut } from "./actions";

export const metadata: Metadata = {
  title: "Customer portal",
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

const statusLabel: Record<QuoteStatus, string> = {
  sent: "Awaiting your response",
  viewed: "Awaiting your response",
  accepted: "Accepted",
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

const intervalLabel = { month: "monthly", year: "yearly" } as const;

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Los_Angeles",
  }).format(new Date(iso));
}

function SectionError({ label }: { label: string }) {
  return (
    <p role="alert" className="mt-4 rounded-xl border border-line bg-peach-2 px-4 py-3 text-[14px] text-muted">
      We couldn&apos;t load your {label} right now. Refresh the page to try again.
    </p>
  );
}

function QuoteRow({ quote }: { quote: PortalQuote }) {
  return (
    <li className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-[13px] font-semibold ${statusTone[quote.status]}`}
          >
            {statusLabel[quote.status]}
          </span>
          <span className="font-semibold text-ink tabular-nums">
            {formatCents(quote.totalCents, quote.currency)}
            {quote.billing === "recurring" && quote.interval && (
              <span className="font-normal text-muted"> {intervalLabel[quote.interval]}</span>
            )}
          </span>
        </div>
        <p className="mt-1 text-[13px] text-muted">
          {quote.approvedAt
            ? `Approved ${formatDate(quote.approvedAt)}`
            : `Sent ${formatDate(quote.createdAt)}`}{" "}
          · Quote #{quote.id}
        </p>
      </div>
      <Link
        href={`/q/${encodeURIComponent(quote.claimToken)}`}
        className="inline-flex items-center justify-center rounded-full border border-ink/20 px-5 py-2 text-[14px] font-semibold text-ink transition-colors hover:border-ink/40 hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-ink"
      >
        View quote
      </Link>
    </li>
  );
}

function SubscriptionRow({ subscription }: { subscription: PortalSubscription }) {
  const renewal = formatDate(subscription.currentPeriodEnd);
  return (
    <li className="px-5 py-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-chip px-3 py-1 text-[13px] font-semibold capitalize text-orange-ink">
          {subscription.status.replace(/_/g, " ")}
        </span>
        <span className="font-semibold text-ink tabular-nums">
          {formatCents(subscription.amountCents, subscription.currency)}
          {subscription.interval && (
            <span className="font-normal text-muted">
              {" "}
              / {subscription.interval === "month" ? "month" : "year"}
            </span>
          )}
        </span>
      </div>
      <p className="mt-1 text-[13px] text-muted">
        {subscription.cancelAtPeriodEnd
          ? `Cancels on ${renewal}`
          : `Next renewal ${renewal}`}
      </p>
    </li>
  );
}

export default async function PortalDashboardPage() {
  const sessionToken = await requirePortalSessionToken();

  let me: PortalMe | null = null;
  let meFailed = false;
  try {
    me = await getPortalMe(sessionToken);
  } catch (err) {
    redirectOnUnauthorized(err);
    console.error("PortalDashboard: /me failed", err);
    meFailed = true;
  }

  const [quotesResult, subscriptionsResult, billingResult] = await Promise.allSettled([
    getPortalQuotes(sessionToken),
    getPortalSubscriptions(sessionToken),
    createBillingPortalUrl(sessionToken),
  ]);

  let quotesFailed = false;
  let subscriptionsFailed = false;
  let quotes: PortalQuote[] = [];
  let subscriptions: PortalSubscription[] = [];
  let billingUrl: string | null = null;

  if (quotesResult.status === "fulfilled") {
    quotes = quotesResult.value.quotes;
  } else {
    redirectOnUnauthorized(quotesResult.reason);
    console.error("PortalDashboard: /quotes failed", quotesResult.reason);
    quotesFailed = true;
  }

  if (subscriptionsResult.status === "fulfilled") {
    subscriptions = subscriptionsResult.value.subscriptions;
  } else {
    redirectOnUnauthorized(subscriptionsResult.reason);
    console.error("PortalDashboard: /subscriptions failed", subscriptionsResult.reason);
    subscriptionsFailed = true;
  }

  if (billingResult.status === "fulfilled") {
    billingUrl = billingResult.value.url;
  } else {
    redirectOnUnauthorized(billingResult.reason);
    // 404 = no billing yet → the Manage billing button stays hidden.
    if (!isGvasError(billingResult.reason) || billingResult.reason.kind !== "not_found") {
      console.error("PortalDashboard: billing-portal failed", billingResult.reason);
    }
  }

  const businessName = me?.business.displayName ?? "your portal";

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Eyebrow>{businessName}</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            {me ? `Hi, ${me.customer.displayName}.` : "Your portal"}
          </h1>
          {me && (
            <p className="mt-1 text-[14px] text-muted">Signed in as {me.customer.email}</p>
          )}
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full border border-ink/20 px-5 py-2 text-[14px] font-semibold text-ink transition-colors hover:border-ink/40 hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-ink"
          >
            Sign out
          </button>
        </form>
      </div>

      {meFailed && (
        <SectionError label="account details" />
      )}

      <section className="mt-10" aria-labelledby="portal-quotes">
        <h2 id="portal-quotes" className="font-display text-xl font-semibold text-ink">
          Quotes
        </h2>
        {quotesFailed ? (
          <SectionError label="quotes" />
        ) : quotes.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-line bg-peach-2 p-6 text-[15px] text-muted">
            No quotes yet. When {businessName} sends one, it will show up here.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-paper">
            {quotes.map((quote) => (
              <QuoteRow key={quote.id} quote={quote} />
            ))}
          </ul>
        )}
      </section>

      <section className="mt-10" aria-labelledby="portal-subscriptions">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2
            id="portal-subscriptions"
            className="font-display text-xl font-semibold text-ink"
          >
            Subscriptions
          </h2>
          {billingUrl && (
            <a
              href={billingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-orange px-5 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-orange-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-ink"
            >
              Manage billing
            </a>
          )}
        </div>
        {subscriptionsFailed ? (
          <SectionError label="subscriptions" />
        ) : subscriptions.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-line bg-peach-2 p-6 text-[15px] text-muted">
            No active subscriptions.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-paper">
            {subscriptions.map((sub) => (
              <SubscriptionRow key={sub.id} subscription={sub} />
            ))}
          </ul>
        )}
      </section>

      <section className="mt-10" aria-labelledby="portal-request">
        <div className="rounded-2xl border border-orange/30 bg-peach-2 p-6 sm:p-8">
          <h2 id="portal-request" className="font-display text-xl font-semibold text-ink">
            Request a service
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">
            Need something else? Send {businessName} a request straight from your portal.
          </p>
          <Link
            href="/portal/request"
            className="mt-5 inline-flex items-center justify-center rounded-full bg-orange px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-orange-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-ink"
          >
            New request
          </Link>
        </div>
      </section>

      <p className="mt-12 text-[13px] text-muted">
        Portal provided by{" "}
        <Link href="/" className="font-medium text-orange-ink hover:text-orange-deep">
          Güd Vector
        </Link>{" "}
        on behalf of {businessName}.
      </p>
    </div>
  );
}
