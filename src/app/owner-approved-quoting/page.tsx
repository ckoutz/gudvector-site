import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Container, FeatureList, Section, SectionHeading } from "@/components/section";
import { Figure, Screenshot } from "@/components/screenshot";
import { Faq } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Owner-Approved Quoting for Service Businesses",
  description:
    "Your customer never sees a price you haven't checked. Once you send it, they accept and pay online.",
  alternates: { canonical: "/owner-approved-quoting" },
};

const points = [
  {
    title: "You set the number",
    body: "Price the job your way. Nothing goes out until you hit send.",
  },
  {
    title: "They accept and pay",
    body: "One link to review the quote, accept or decline, and pay by card.",
  },
  {
    title: "Repeat work stays simple",
    body: "Customers pause, cancel or update billing in their own portal.",
  },
];

export default function OwnerApprovedQuotingPage() {
  return (
    <>
      <PageHero
        eyebrow="Owner-approved quoting"
        h1="You approve the quote. Then it goes out."
        lede="Your customer never sees a price you haven't checked. Once you send it, they accept and pay online."
      />

      <Container className="pb-4">
        <Screenshot
          name="quote"
          preload
          sizes="(min-width: 1152px) 1088px, 100vw"
          className="mx-auto max-w-5xl"
        />
      </Container>

      <Section>
        <SectionHeading title="No instant-quote guesswork." />
        <FeatureList items={points} />
      </Section>

      <Section tone="muted">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <SectionHeading
            title="Their portal, your name on it."
            lede="Every quote, payment and subscription in one place — no phone tag."
          />
          <Figure
            name="portal"
            caption={{ title: "Customer portal", body: "What your customer sees." }}
            sizes="(min-width: 1024px) 540px, 100vw"
          />
        </div>
      </Section>

      <Section>
        <SectionHeading title="Questions" />
        <div className="mt-10">
          <Faq
            items={[
              {
                question: "Does the software write the quote for me?",
                answer: "No. You set every price. We make it easy to send and get paid.",
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
