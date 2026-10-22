import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { FeatureList, Section, SectionHeading } from "@/components/section";
import { Faq } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";
import { siteConfig } from "@/lib/site-config";
import { whoWeHelp } from "@/lib/trades";

export const metadata: Metadata = {
  title: "Who We Help: Websites and an Office Manager for Local Service Businesses",
  description:
    "Güd Vector Consulting Services builds websites, owner-approved quoting and Gus, an office manager you run by text, for owner-run local service businesses. Based in the Bay Area. We work with service businesses anywhere.",
  alternates: { canonical: "/who-we-help" },
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

const guides = [
  {
    title: "Owner-approved quoting",
    body: "Every quote waits for your OK before the customer sees it.",
    href: "/owner-approved-quoting",
  },
  {
    title: "No software to learn",
    body: "Don't want to learn software? Text Gus like a person.",
    href: "/dont-want-to-learn-software",
  },
];

export default function WhoWeHelpPage() {
  return (
    <>
      <PageHero
        eyebrow="Who we help"
        h1="Websites and an office manager for local service businesses."
        lede="Güd Vector Consulting Services builds websites, owner-approved quoting and Gus, an office manager you run by text, for owner-run local service businesses. Based in the Bay Area."
        note={
          <>
            Customer texts come from our texting line,{" "}
            <Link
              href="/sms-opt-in"
              className="whitespace-nowrap font-medium text-orange-ink underline underline-offset-2"
            >
              {siteConfig.textingLine.display}
            </Link>
            .
          </>
        }
      />

      <Section className="border-t border-line">
        <SectionHeading title="What we build" />
        <FeatureList items={products} />
      </Section>

      <Section tone="muted">
        <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
          Who we help
        </h2>
        <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted">
          Service businesses of all kinds, including:
        </p>
        <ul className="mt-6 flex max-w-xl flex-col gap-3 text-[16px] text-char">
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
        <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-muted">
          And electricians, home inspectors and similar owner-run crews, from one truck to a few.
        </p>
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
          Open the Demo
        </a>
      </Section>

      <Section>
        <SectionHeading title="Questions" />
        <div className="mt-10">
          <Faq
            items={[
              {
                question: "Do you only work in the Bay Area?",
                answer: "No. We're based in the Bay Area and work with service businesses anywhere.",
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
