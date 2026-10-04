import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { FeatureList, Section, SectionHeading } from "@/components/section";
import { Figure } from "@/components/screenshot";
import { Faq } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `${siteConfig.managerName}: Booking Chat, Owner-Approved Quotes and a Customer Portal`,
  description:
    "A booking chat on your site, quotes you approve before they go out, and a portal where customers accept and pay.",
  alternates: { canonical: "/manager" },
};

const points = [
  {
    title: "A chat that books",
    body: "It answers the basics, collects the details and offers open times. You confirm.",
  },
  {
    title: "Quotes you approve",
    body: "You set every price. Customers review, accept and pay from one link.",
  },
  {
    title: "A portal with your name",
    body: "Customers see quotes, pay, and pause or cancel without calling you.",
  },
];

export default function ManagerPage() {
  return (
    <>
      <PageHero
        eyebrow={siteConfig.managerName}
        h1="Booking and quoting that still go through you."
        lede="Visitors book a time and get a quote online. Nothing reaches your calendar or your customer until you OK it."
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
                question: "Does it book jobs or send quotes on its own?",
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
