import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { ComparisonTable, type Cell } from "@/components/comparison-table";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Güd Vector vs. Jobber vs. Housecall Pro vs. ServiceTitan",
  description:
    "Prices, contracts, websites and AI booking compared, from each company's own pricing and help pages.",
  alternates: { canonical: "/compare" },
};

const columns = ["Güd Vector", "Jobber", "Housecall Pro", "ServiceTitan"] as const;

const t = (text: string): Cell => ({ text });

const rows: { feature: string; marks: Cell[] }[] = [
  {
    feature: "Starting price",
    marks: [t("Websites from $500"), t("$29/mo billed yearly, $49 monthly"), t("$59/mo billed yearly, $79 monthly"), t("Not published")],
  },
  {
    feature: "Contract",
    marks: [t("Ask us"), t("Monthly, 12-month or yearly. Auto-renews."), t("No long-term contract"), t("Set in your order form")],
  },
  {
    feature: "Website",
    marks: [t("Custom-built by us"), t("You build it from a template, included"), t("Built by their team, paid add-on"), t("No website product")],
  },
  {
    feature: "If you cancel, the website",
    marks: [t("Yours for life"), t("Goes offline"), t("Not documented"), t("—")],
  },
  {
    feature: "AI that answers customers",
    marks: [t("Gus, in your website chat"), t("AI Receptionist, +$29/mo"), t("Chat included, phone answering extra"), t("AI Virtual Agent, add-on")],
  },
  { feature: "Online booking", marks: ["yes", "yes", "yes", "yes"] },
  { feature: "Customers approve quotes online", marks: ["yes", "yes", "yes", "yes"] },
];

const sources = [
  { label: "Jobber pricing", href: "https://www.getjobber.com/pricing/" },
  { label: "Jobber website help", href: "https://help.getjobber.com/en/articles/website-marketing-tools/" },
  { label: "Jobber AI Receptionist", href: "https://www.getjobber.com/features/ai-receptionist/" },
  { label: "Housecall Pro pricing", href: "https://www.housecallpro.com/pricing/" },
  { label: "Housecall Pro websites", href: "https://www.housecallpro.com/features/websites/" },
  { label: "Housecall Pro AI Team", href: "https://www.housecallpro.com/features/ai-team/" },
  { label: "ServiceTitan pricing", href: "https://www.servicetitan.com/pricing" },
  { label: "ServiceTitan AI Virtual Agent", href: "https://www.servicetitan.com/features/pro/virtual-agent" },
  { label: "ServiceTitan Scheduling Pro", href: "https://www.servicetitan.com/features/pro/scheduling" },
];

const whenRight = [
  { name: "Jobber", body: "You want to run quotes, scheduling and invoicing yourself, starting small." },
  { name: "Housecall Pro", body: "You want dispatch, invoicing and customer financing for bigger-ticket jobs." },
  { name: "ServiceTitan", body: "You run a larger shop with dispatchers and an office team." },
];

export default function ComparePage() {
  return (
    <>
      <PageHero
        eyebrow="Compare"
        h1="Güd Vector vs. Jobber, Housecall Pro and ServiceTitan."
        lede="They sell software you run. We build your site and set up Gus to run the office for you."
      />

      <Section className="pt-0 sm:pt-0">
        <ComparisonTable columns={columns} rows={rows} />
        <p className="mt-6 text-[14px] leading-relaxed text-muted">
          From each company&apos;s own pricing and help pages, checked October 4, 2026. Prices in USD for one
          user. Online booking is an add-on (Scheduling Pro) at ServiceTitan.
        </p>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[14px]">
          {sources.map((source) => (
            <li key={source.href}>
              <a
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted underline underline-offset-4 hover:text-ink"
              >
                {source.label}
              </a>
            </li>
          ))}
        </ul>
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
          lede="Keep it. A Jobber website stays online only while you subscribe. A site from us is yours for life."
        />
      </Section>

      <CtaBand />
    </>
  );
}
