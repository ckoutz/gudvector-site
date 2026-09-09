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
        <Link
          href="/service-businesses"
          className="mt-8 flex flex-col gap-4 rounded-2xl border border-line p-8 transition-colors hover:border-orange/40 hover:bg-peach-2 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h3 className="font-display text-lg font-semibold text-ink">
              Service businesses
            </h3>
            <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-muted">
              Landscapers, plumbers, HVAC, electrical, roofing, cleaning, home inspectors,
              environmental testing, and similar owner-run crews across the Bay Area.
            </p>
          </div>
          <span className="shrink-0 text-[14px] font-medium text-orange-ink underline underline-offset-2">
            Learn more
          </span>
        </Link>
      </Section>
    </>
  );
}
