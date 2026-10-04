import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Container, FeatureList, Section, SectionHeading } from "@/components/section";
import { Screenshot } from "@/components/screenshot";
import { Faq } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Website + Booking for Service Businesses",
  description:
    "A website you own with a booking chat that still goes through you. Visitors pick a time; you confirm it.",
  alternates: { canonical: "/website-booking" },
};

const points = [
  {
    title: "A site you own",
    body: "Fast, phone-ready pages for your services and area. No template lock-in.",
  },
  {
    title: "A chat that books",
    body: "It answers the basics, collects the details and offers open times.",
  },
  {
    title: "You stay in control",
    body: "Every request comes to you first. Approve it, or suggest another time.",
  },
];

export default function WebsiteBookingPage() {
  return (
    <>
      <div className="mx-auto grid max-w-6xl items-center lg:grid-cols-[1.2fr_0.8fr] lg:gap-8 lg:pr-8">
        <PageHero
          eyebrow="Website + booking"
          h1="A booking chat that still goes through you."
          lede="Visitors ask questions and pick a time. You confirm it before anything lands on your calendar."
        />
        <Container className="pb-8 lg:px-0 lg:py-20">
          <Screenshot
            name="chat"
            preload
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 380px, 90vw"
            className="mx-auto max-w-[380px]"
          />
        </Container>
      </div>

      <Section className="border-t border-line">
        <SectionHeading
          title="Built for owner-run crews."
          lede="Plumbers, HVAC, cleaners, landscapers and contractors."
        />
        <FeatureList items={points} />
      </Section>

      <Section tone="muted">
        <SectionHeading title="Questions" />
        <div className="mt-10">
          <Faq
            items={[
              {
                question: "Does it book jobs automatically?",
                answer: "No. A customer picks a time. You confirm it before it's on the schedule.",
              },
              {
                question: "What if I don't want online booking?",
                answer: "That's fine. The site can just list your services and how to reach you.",
              },
            ]}
          />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
