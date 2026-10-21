import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { FeatureList, Section, SectionHeading } from "@/components/section";
import { Faq } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";
import { GusPhones } from "@/components/gus-phone";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "For Landscapers: Gus Books Estimates, Sends Your Quotes, Runs by Text",
  description:
    "For landscaping crews: Gus answers your website, books estimates, sends the quotes you approve and keeps track of who still owes you. You run it all by text.",
  alternates: { canonical: "/landscapers" },
};

const points = [
  {
    title: "Estimates, booked for you",
    body: "Gus answers on your website day and night, gets the job details and offers your open times. You approve the visit.",
  },
  {
    title: "Quotes you approve",
    body: "You set the price. Gus sends it, and the customer accepts and pays from one link.",
  },
  {
    title: "An office that runs by text",
    body: "Ask what's on this week or who still owes you, mark a check paid, or block off a rain day. Every change waits for your YES.",
  },
];

export default function LandscapersPage() {
  return (
    <>
      <PageHero
        eyebrow="For landscapers"
        h1="Run your landscaping office from the truck."
        lede="Gus answers your website, books estimates, sends the quotes you approve and keeps track of who still owes you. You run it all by text, and nothing changes until you say YES."
      />

      <Section className="border-t border-line">
        <SectionHeading title="Your customer books. You text Gus." />
        <GusPhones story="landscaping" className="mt-12 sm:mt-16" />
      </Section>

      <Section className="border-t border-line">
        <SectionHeading title="Built for the busy season." />
        <FeatureList items={points} />
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
                question: "Is Larkspur Lawn & Garden a real business?",
                answer:
                  "No. Larkspur is a made-up landscaping company. Gus works the same way for any trade. The reviews, years in business and other details on that site are made up, so you can try everything without bothering a real company.",
              },
              {
                question: "Does Gus book visits or send quotes on his own?",
                answer:
                  "No. You approve every visit and every price first, in your dashboard or by replying YES to Gus's text.",
              },
              {
                question: "What number do the texts come from?",
                answer: `Our texting line, ${siteConfig.textingLine.display}. Customers only get texts if they tick the box asking for them, and they can reply STOP at any time.`,
              },
              {
                question: "Do I need to switch from the software I use now?",
                answer: "Not always. We'll look at what you use on the call and tell you honestly.",
              },
            ]}
          />
        </div>
      </Section>

      <CtaBand title="See what this looks like for your crew." />
    </>
  );
}
