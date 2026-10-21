import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { FeatureList, Section, SectionHeading } from "@/components/section";
import { Faq } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";
import { siteConfig } from "@/lib/site-config";
import { whoWeHelp } from "@/lib/trades";

export const metadata: Metadata = {
  title: "Websites and an Office Manager for Concord & Contra Costa Service Businesses",
  description:
    "Güd Vector Consulting Services builds websites, owner-approved quoting and Gus, an office manager you run by text, for service businesses in Concord and across Contra Costa. East Bay, based in Concord, California.",
  alternates: { canonical: "/concord" },
};

const products = [
  {
    title: "Websites",
    body: "A fast site you own, so the people who find you on Google, Yelp or a neighbor's tip can book you.",
    href: "/websites",
  },
  {
    title: siteConfig.officeName,
    body: "Gus answers your website, books estimates, sends the quotes you approve and keeps track of who owes you.",
    href: "/office",
  },
  {
    title: "Custom AI",
    body: "Tools built around your crew's paperwork, inside the apps you already use.",
    href: "/custom-ai",
  },
];

const towns = [
  "Concord",
  "Pleasant Hill",
  "Walnut Creek",
  "Martinez",
  "Clayton",
  "Pacheco",
  "Pittsburg",
  "Bay Point",
];

const guides = [
  {
    title: "Owner-approved quoting",
    body: "Every quote waits for your OK before the customer sees it.",
    href: "/owner-approved-quoting",
  },
  {
    title: "Run it by text",
    body: "Don't want to learn software? Text Gus like a person.",
    href: "/dont-want-to-learn-software",
  },
];

export default function ConcordPage() {
  return (
    <>
      <PageHero
        eyebrow="Concord & Contra Costa"
        h1="Websites and an office manager for Concord service businesses."
        lede="Güd Vector Consulting Services builds websites, owner-approved quoting and Gus, an office manager you run by text, for owner-run service businesses in Concord and across Contra Costa. East Bay, based in Concord, California."
      />

      <Section className="border-t border-line">
        <SectionHeading title="What we build" />
        <FeatureList items={products} />
      </Section>

      <Section tone="muted">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
              Where we work
            </h2>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Towns">
              {towns.map((town) => (
                <li
                  key={town}
                  className="rounded-full border border-line bg-paper px-4 py-2 text-[15px] text-char"
                >
                  {town}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[16px] leading-relaxed text-muted">
              And the rest of Contra Costa and the San Francisco Bay Area. Customer texts come from our
              local texting line,{" "}
              <Link
                href="/sms-opt-in"
                className="whitespace-nowrap font-medium text-orange-ink underline underline-offset-2"
              >
                {siteConfig.textingLine.display}
              </Link>
              .
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
              Who we help
            </h2>
            <ul className="mt-6 flex flex-col gap-3 text-[16px] text-char">
              {whoWeHelp.map((trade) => (
                <li key={trade.href} className="border-t border-line pt-3">
                  <Link
                    href={trade.href}
                    className="font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-orange"
                  >
                    {trade.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[16px] leading-relaxed text-muted">
              And electricians, home inspectors, environmental testing firms and
              similar owner-run crews, from one truck to a few.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading title="Start here" />
        <FeatureList items={guides} />
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Try it"
          title="See it on a demo we built."
          lede="Larkspur is a made-up landscaping company. Gus works the same way for any trade. Its reviews and details aren't real. Ask for an estimate as a customer, then see the owner side and text Gus yourself."
        />
        <a
          href={siteConfig.demoUrl}
          className="mt-8 inline-flex min-h-12 items-center rounded-full border border-ink px-6 text-[16px] font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
        >
          Open the Larkspur demo
        </a>
      </Section>

      <Section>
        <SectionHeading title="Questions" />
        <div className="mt-10">
          <Faq
            items={[
              {
                question: "Do you only work in Concord?",
                answer:
                  "No. We work with service businesses across Contra Costa and the San Francisco Bay Area. This page is for the ones close to home.",
              },
              {
                question: "Do I need to switch from the software I use now?",
                answer: "Not always. We'll look at what you use on the call and tell you honestly.",
              },
              {
                question: "Does Gus send quotes or book visits on his own?",
                answer:
                  "No. You approve every visit and every price first, in your dashboard or by replying YES to Gus's text.",
              },
              {
                question: "Who owns the website?",
                answer: (
                  <>
                    You do. See <Link href="/websites" className="underline underline-offset-2">Websites</Link>{" "}
                    for what&apos;s included.
                  </>
                ),
              },
            ]}
          />
        </div>
      </Section>

      <CtaBand title="See what this looks like for your business." />
    </>
  );
}
