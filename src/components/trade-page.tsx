import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { Faq } from "@/components/faq";
import { siteConfig } from "@/lib/site-config";
import type { Trade } from "@/lib/trades";

export function TradePage({ trade }: { trade: Trade }) {
  return (
    <>
      <PageHero eyebrow={trade.eyebrow} h1={trade.h1} lede={trade.lede} />

      <Section className="border-t border-line">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
              Example texts an owner sends Gus
            </h2>
            <ul className="mt-8 flex flex-col items-end gap-3">
              {trade.texts.map((text) => (
                <li
                  key={text}
                  className="max-w-[85%] rounded-2xl rounded-br-md bg-ink px-4 py-3 text-[16px] leading-snug text-white"
                >
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
              Sample quote (invented business, invented amounts)
            </h2>
            <table className="mt-8 w-full border-collapse overflow-hidden rounded-2xl border border-line bg-paper text-left text-[16px]">
              <thead>
                <tr className="border-b border-line bg-peach-2 text-[14px] text-muted">
                  <th scope="col" className="px-4 py-3 font-semibold">Line item</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {trade.quote.map((line) => (
                  <tr key={line.item} className="border-b border-line text-char">
                    <td className="px-4 py-3">{line.item}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums">{line.amount}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-semibold text-ink">
                  <th scope="row" className="px-4 py-3">Total</th>
                  <td className="px-4 py-3 text-right tabular-nums">{trade.total}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading title={trade.differentTitle} />
        <ul className="mt-10 grid gap-8 md:grid-cols-2">
          {trade.different.map((point) => (
            <li key={point} className="border-t border-line pt-6 text-[17px] leading-relaxed text-char">
              {point}
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading title="Questions" />
        <div className="mt-10">
          <Faq items={trade.faq} />
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Try it"
          title="See Gus work for a different business."
          lede="See Gus work for a different business: the Larkspur demo (a made-up landscaping company). Gus works the same way for any trade."
        />
        <a
          href={siteConfig.demoUrl}
          className="mt-8 inline-flex min-h-12 items-center rounded-full border border-ink px-6 text-[16px] font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
        >
          Open the Larkspur demo
        </a>
      </Section>
    </>
  );
}
