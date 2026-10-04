import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { FeatureList, Section, SectionHeading } from "@/components/section";
import { Figure } from "@/components/screenshot";
import { Faq } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `${siteConfig.officeName}: Meet Gus, Your Automated Office Manager`,
  description:
    "Gus runs your schedule, sends quotes, books estimates and handles billing. Nothing goes out until you OK it.",
  alternates: { canonical: "/office" },
};

const points = [
  {
    title: "Books estimates",
    body: "Gus answers visitors on your site, collects the details and offers open times. You confirm.",
  },
  {
    title: "Sends quotes",
    body: "You set the price. Gus sends it, and customers accept and pay from one link.",
  },
  {
    title: "Handles billing",
    body: "Customers pay, pause or cancel in their own portal, without calling you.",
  },
];

export default function OfficePage() {
  return (
    <>
      <PageHero
        eyebrow={siteConfig.officeName}
        h1="Meet Gus, your automated office manager."
        lede="Gus runs your schedule, sends quotes, books estimates and handles billing. Nothing goes out until you OK it."
      />

      <Section className="border-t border-line">
        <SectionHeading title="Less phone tag. More booked work." />
        <FeatureList items={points} />
      </Section>

      <Section tone="muted">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
          <Figure
            name="chat"
            caption={{ title: "Booking chat", body: "On your site, around the clock." }}
            sizes="(min-width: 1024px) 440px, (min-width: 640px) 60vw, 100vw"
            className="mx-auto w-full max-w-sm lg:max-w-none"
          />
          <div className="flex flex-col gap-12">
            <Figure
              name="quote"
              caption={{ title: "Quote page", body: "Your price, their accept button." }}
              sizes="(min-width: 1024px) 620px, 100vw"
            />
            <Figure
              name="portal"
              caption={{ title: "Customer portal", body: "Payments and subscriptions in one place." }}
              sizes="(min-width: 1024px) 620px, 100vw"
            />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading title="Questions" />
        <div className="mt-10">
          <Faq
            items={[
              {
                question: "Does Gus book jobs or send quotes on his own?",
                answer: "No. You confirm every time slot and approve every price first.",
              },
              {
                question: "Do I need to switch from Jobber or Housecall Pro?",
                answer: (
                  <>
                    No. See the{" "}
                    <Link href="/compare" className="text-ink underline underline-offset-4">
                      side-by-side comparison
                    </Link>
                    .
                  </>
                ),
              },
            ]}
          />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
