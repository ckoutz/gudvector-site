import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { CtaButton } from "@/components/cta-button";

export const metadata: Metadata = {
  title: "Güd Vector vs. Jobber vs. Housecall Pro vs. ServiceTitan",
  description:
    "A side-by-side look at Güd Vector, Jobber, Housecall Pro, and ServiceTitan — website ownership, custom automation, and what's actually included.",
  alternates: { canonical: "/compare" },
};

type Mark = "yes" | "maybe" | "no";

const markStyles: Record<Mark, { symbol: string; className: string }> = {
  yes: { symbol: "✓", className: "text-orange-ink font-semibold" },
  maybe: { symbol: "~", className: "text-muted" },
  no: { symbol: "✗", className: "text-muted" },
};

function MarkCell({ mark }: { mark: Mark }) {
  const { symbol, className } = markStyles[mark];
  return <td className={`px-4 py-4 text-center text-[16px] ${className}`}>{symbol}</td>;
}

const columns = ["Güd Vector", "Jobber", "Housecall Pro", "ServiceTitan"] as const;

const rows: { feature: string; marks: Mark[] }[] = [
  { feature: "Simple interface", marks: ["yes", "maybe", "maybe", "no"] },
  { feature: "Custom automation, built for your shop", marks: ["yes", "no", "no", "no"] },
  { feature: "You own the website", marks: ["yes", "no", "no", "no"] },
  { feature: "Custom-built website", marks: ["yes", "no", "no", "no"] },
  { feature: "Built for AI search", marks: ["yes", "maybe", "maybe", "maybe"] },
  { feature: "Standalone, add more later", marks: ["yes", "no", "no", "no"] },
];

const summaries = [
  {
    name: "Jobber",
    sentence:
      "Jobber is a strong pick if you want scheduling, invoicing, and a customer hub live in days, inside their platform.",
  },
  {
    name: "Housecall Pro",
    sentence:
      "Housecall Pro is a solid choice if you want dispatch, invoicing, and financing options for bigger-ticket jobs, with the website sold as a separate add-on.",
  },
  {
    name: "ServiceTitan",
    sentence:
      "ServiceTitan is the right answer once a shop has outgrown a handful of trucks and needs marketplace, pricebook, and dispatch tools at scale.",
  },
];

export default function ComparePage() {
  return (
    <>
      <PageHero
        eyebrow="Comparison"
        h1="If they can't find you, they call someone else."
        lede="A fast side-by-side on the things that actually differ, not just price."
      />

      <Section tone="peach" className="pt-0">
        <div className="overflow-x-auto rounded-2xl border border-line bg-paper">
          <table className="w-full min-w-[560px] border-collapse text-left text-[15px]">
            <thead>
              <tr className="bg-chip">
                <th scope="col" className="px-4 py-3 font-semibold text-char">
                  &nbsp;
                </th>
                {columns.map((name) => (
                  <th
                    key={name}
                    scope="col"
                    className="px-4 py-3 text-center font-semibold text-char"
                  >
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.feature} className={i % 2 === 1 ? "bg-peach-2/40" : "bg-paper"}>
                  <th scope="row" className="px-4 py-4 align-middle font-medium text-char">
                    {row.feature}
                  </th>
                  {row.marks.map((mark, j) => (
                    <MarkCell key={columns[j]} mark={mark} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-2xl text-[14px] text-muted">
          ~ means it depends on setup or isn&apos;t publicly documented — not a claim they
          lack it.
        </p>
      </Section>

      <Section tone="paper">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          When one of these is the right answer
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {summaries.map((item) => (
            <div key={item.name} className="rounded-2xl border border-line p-6">
              <h3 className="font-display text-lg font-semibold text-ink">{item.name}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{item.sentence}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[15px] text-muted">
          Already running Jobber or Housecall Pro for scheduling? See{" "}
          <Link
            href="/jobber-housecall-site-builder"
            className="font-medium text-orange-ink underline underline-offset-2"
          >
            why the website is a separate question
          </Link>
          .
        </p>
      </Section>

      <Section tone="peach">
        <div className="flex flex-col items-start gap-6 rounded-2xl border border-line bg-paper p-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">
              Talk to Güd Vector.
            </h2>
            <p className="mt-2 max-w-md text-[16px] leading-relaxed text-muted">
              Tell us what you need — a website, help sending quotes, or both.
            </p>
          </div>
          <CtaButton href="/contact" className="shrink-0">
            Talk to Güd Vector
          </CtaButton>
        </div>
      </Section>
    </>
  );
}
