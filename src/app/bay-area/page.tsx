import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Bay Area Websites & Owner-Approved Quoting for Trades",
  description:
    "Güd Vector Consulting Services is a Bay Area firm that builds websites and owner-approved quoting for local service businesses. Email info@gudvector.com.",
  alternates: { canonical: "/bay-area" },
};

const trades = [
  { title: "Landscapers", body: "Bay Area crews — see service businesses." },
  { title: "Plumbers", body: "Bay Area pages that work on a phone.", href: "/plumbers" },
  {
    title: "Home inspectors",
    body: "Report, fee, and escrow timing.",
    href: "/home-inspectors",
  },
  {
    title: "Environmental testing",
    body: "Report and bill in one place — see service businesses.",
  },
];

export default function BayAreaPage() {
  return (
    <>
      <PageHero
        eyebrow="Bay Area service businesses"
        h1="Websites and owner-approved quoting for Bay Area service shops."
        lede="Güd Vector Consulting Services is a Bay Area firm that builds websites and owner-approved quoting for local service businesses."
      />

      <Section tone="peach" className="pt-0">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">Who we are</h2>
            <p className="mt-3 text-[16px] leading-relaxed text-muted">
              {siteConfig.legalName} ({siteConfig.name}) serves the San Francisco Bay Area.
              Email {siteConfig.email}. You send the quote. The customer reviews it, pays,
              pauses, or cancels in a portal with your name on it.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">Where we work</h2>
            <p className="mt-3 text-[16px] leading-relaxed text-muted">
              Concord, Pleasant Hill, Walnut Creek, Martinez, Clayton, Pittsburg, and the
              rest of Contra Costa and the San Francisco Bay Area.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <h2 className="font-display text-2xl font-semibold text-ink">Trades we build for</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trades.map((trade) => (
            <div key={trade.title} className="rounded-2xl border border-line p-6">
              <h3 className="font-display text-lg font-semibold text-ink">{trade.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{trade.body}</p>
              {trade.href && (
                <Link
                  href={trade.href}
                  className="mt-3 inline-block text-[14px] font-medium text-orange-ink underline underline-offset-2"
                >
                  Learn more
                </Link>
              )}
            </div>
          ))}
        </div>
        <p className="mt-6 text-[15px] text-muted">
          Landscaping and environmental testing crews: see{" "}
          <Link
            href="/service-businesses"
            className="font-medium text-orange-ink underline underline-offset-2"
          >
            service businesses
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
