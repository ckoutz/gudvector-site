import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { FeatureList, Section, SectionHeading } from "@/components/section";
import { Figure } from "@/components/screenshot";
import { Faq } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Owner-Approved Quoting: Every Quote Waits for Your OK",
  description:
    "Gus gets the job details and lines up the quote. You check the price and approve it. Only then does your customer get one link to accept and pay.",
  alternates: { canonical: "/owner-approved-quoting" },
};

const steps = [
  {
    title: "Gus gets the details",
    body: "Your customer describes the job on your website. Gus asks the follow-up questions, but never names a price. Pricing is your call.",
  },
  {
    title: "You check and approve",
    body: "The quote waits in your dashboard. Nothing goes to the customer until you approve it, and Gus flags anything that looks off.",
  },
  {
    title: "Your customer accepts and pays",
    body: "Once you approve, the customer gets one link to see the quote, accept or decline, and pay.",
  },
];

export default function OwnerApprovedQuotingPage() {
  return (
    <>
      <PageHero
        eyebrow="Owner-approved quoting"
        h1="Every quote waits for your OK."
        lede="Gus gets the job details and lines up the quote. You check the price and approve it. Only then does your customer get one link to accept and pay."
      />

      <Section className="border-t border-line">
        <SectionHeading title="How a quote goes out." />
        <FeatureList items={steps} />
      </Section>

      <Section tone="muted">
        <SectionHeading
          title="Your price, their accept button."
          lede="This is what your customer sees after you approve. The business in the picture is a sample."
        />
        <Figure
          name="quote"
          caption={{ title: "Quote page", body: "Line items, total and your note." }}
          sizes="(min-width: 1024px) 896px, 100vw"
          className="mt-10 max-w-4xl"
        />
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Try it"
          title="See it on a demo we built."
          lede="Larkspur is a made-up landscaping company. Gus works the same way for any trade. Its reviews and details aren't real. Ask for an estimate as a customer, then see the owner side."
        />
        <a
          href={siteConfig.demoUrl}
          className="mt-8 inline-flex min-h-12 items-center rounded-full border border-ink px-6 text-[16px] font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
        >
          Open the Demo
        </a>
      </Section>

      <Section className="border-t border-line">
        <SectionHeading title="Questions" />
        <div className="mt-10">
          <Faq
            items={[
              {
                question: "Can a quote go out without me?",
                answer:
                  "No. Automatic sending is switched off. Every quote waits until you approve it. If you'd like Gus to send quotes automatically from prices you set, we'll set that up for you, and you can keep approval on any time.",
              },
              {
                question: "What if a customer asks Gus for a price?",
                answer: "Gus tells them you'll confirm pricing when you review their request. He doesn't guess.",
              },
              {
                question: "What does my customer get?",
                answer:
                  "One link. They can see the quote, accept or decline it, and pay. They don't need an account or an app.",
              },
              {
                question: "Do I need to switch from the software I use now?",
                answer: "Not always. We'll look at what you use on the call and tell you honestly.",
              },
            ]}
          />
        </div>
      </Section>

      <CtaBand title="See how quoting would work for you." />
    </>
  );
}
