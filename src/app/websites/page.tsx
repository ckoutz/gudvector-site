import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { FeatureList, Section, SectionHeading } from "@/components/section";
import { Faq } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Websites for Service Businesses, Built for Search and AI",
  description:
    "Fast, phone-ready websites you own, structured so Google and AI assistants can tell what you do and where.",
  alternates: { canonical: "/websites" },
};

const points = [
  {
    title: "Found in search and AI answers",
    body: "Real service pages and clean structure that Google and AI assistants can read.",
  },
  {
    title: "Fast on every phone",
    body: "Most of your customers find you on a phone. The site is built for that first.",
  },
  {
    title: "Yours to keep",
    body: "You own the domain and the site. No template lock-in, no monthly page builder.",
  },
];

export default function WebsitesPage() {
  return (
    <>
      <PageHero
        eyebrow="Websites"
        h1="A website built for how people search now."
        lede="Customers ask Google, and more and more they ask AI. Your site should give both a clear answer: what you do, where, and how to book."
      />

      <Section className="border-t border-line">
        <SectionHeading title="Built to get the call." />
        <FeatureList items={points} />
      </Section>

      <Section className="border-t border-line">
        <SectionHeading title="Questions" />
        <div className="mt-10">
          <Faq
            items={[
              {
                question: "Can it take bookings too?",
                answer: (
                  <>
                    Yes. Add{" "}
                    <Link href="/office" className="text-ink underline underline-offset-4">
                      {siteConfig.officeName}
                    </Link>{" "}
                    and Gus handles booking, quotes and billing, now or later.
                  </>
                ),
              },
              {
                question: "I already have a site. Do I start over?",
                answer: "Not always. We'll look at what you have on the call and tell you honestly.",
              },
            ]}
          />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
