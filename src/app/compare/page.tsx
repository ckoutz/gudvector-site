import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { ComparisonTable, type Mark } from "@/components/comparison-table";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Güd Vector vs. Jobber vs. Housecall Pro vs. ServiceTitan",
  description:
    "A side-by-side look at Güd Vector, Jobber, Housecall Pro, and ServiceTitan — website ownership, custom automation, and what's included.",
  alternates: { canonical: "/compare" },
};

const columns = ["Güd Vector", "Jobber", "Housecall Pro", "ServiceTitan"] as const;

const rows: { feature: string; marks: Mark[] }[] = [
  { feature: "Simple interface", marks: ["yes", "maybe", "maybe", "no"] },
  { feature: "Automation built for your shop", marks: ["yes", "no", "no", "no"] },
  { feature: "You own the website", marks: ["yes", "no", "no", "no"] },
  { feature: "Custom-built website", marks: ["yes", "no", "no", "no"] },
  { feature: "Built for AI search", marks: ["yes", "maybe", "maybe", "maybe"] },
  { feature: "Start small, add more later", marks: ["yes", "no", "no", "no"] },
];

const whenRight = [
  { name: "Jobber", body: "Scheduling, invoicing and a client hub live in days." },
  { name: "Housecall Pro", body: "Dispatch, invoicing and financing for bigger-ticket jobs." },
  { name: "ServiceTitan", body: "Shops that have outgrown a handful of trucks." },
];

export default function ComparePage() {
  return (
    <>
      <PageHero
        eyebrow="Compare"
        h1="Güd Vector vs. Jobber, Housecall Pro and ServiceTitan."
        lede="They're good field-service software. We build something different: a site you own, set up around how your shop works."
      />

      <Section className="pt-0 sm:pt-0">
        <ComparisonTable columns={columns} rows={rows} />
        <p className="mt-4 text-[14px] text-muted">
          ~ depends on setup or isn&apos;t publicly documented — not a claim they lack it.
        </p>
      </Section>

      <Section tone="muted">
        <SectionHeading title="When they're the right answer" />
        <dl className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {whenRight.map((item) => (
            <div key={item.name} className="border-t border-line pt-6">
              <dt className="text-[20px] font-semibold text-ink">{item.name}</dt>
              <dd className="mt-2 text-[16px] leading-relaxed text-muted">{item.body}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section>
        <SectionHeading
          title="Already on Jobber or Housecall Pro?"
          lede="Keep it. Their built-in site lives inside your plan. A site from us is yours outright."
        />
      </Section>

      <CtaBand />
    </>
  );
}
