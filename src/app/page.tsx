import { BookCallButton } from "@/components/cta-button";
import { CtaBand } from "@/components/cta-band";
import { Figure } from "@/components/screenshot";
import { Container, Eyebrow, FeatureList, Section, SectionHeading } from "@/components/section";

const outcomes = [
  {
    title: "A site that gets the call",
    body: "Fast, phone-ready and built for local search. You own it.",
  },
  {
    title: "Quotes you approve",
    body: "Nothing goes out until you OK the price. Customers accept and pay online.",
  },
  {
    title: "Booking while you work",
    body: "A chat on your site answers visitors and books the call. You confirm the time.",
  },
];

const steps = [
  { title: "Book a call", body: "Tell us how you quote, book and get paid today." },
  { title: "We build it", body: "Site, quoting and booking, set up around how you already work." },
  { title: "You go live", body: "Preview everything on your phone. Nothing launches without your OK." },
];

export default function HomePage() {
  return (
    <>
      <Container className="pb-20 pt-20 sm:pb-28 sm:pt-32">
        <Eyebrow>For plumbers, HVAC, cleaners and contractors</Eyebrow>
        <h1 className="mt-5 max-w-4xl font-display text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.04em] text-ink sm:text-7xl lg:text-[5.5rem]">
          Your website should book the job.
        </h1>
        <p className="mt-7 max-w-xl text-[19px] leading-relaxed text-muted sm:text-[21px]">
          We build sites and automations for local service businesses: a booking chat, quotes
          you approve, and a portal where customers pay.
        </p>
        <div className="mt-10">
          <BookCallButton size="lg" />
        </div>
      </Container>

      <Section className="border-t border-line">
        <SectionHeading title="Less phone tag. More booked work." />
        <FeatureList items={outcomes} />
      </Section>

      <Section tone="muted" id="how-it-works">
        <SectionHeading title="How it works" />
        <FeatureList items={steps} numbered />
      </Section>

      <Section>
        <SectionHeading eyebrow="The product" title="What your customers see" />
        <div className="mt-12 grid gap-12 sm:mt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
          <Figure
            name="chat"
            caption={{ title: "Booking chat", body: "Answers questions and books the call." }}
            sizes="(min-width: 1024px) 440px, (min-width: 640px) 60vw, 100vw"
            className="mx-auto w-full max-w-sm lg:max-w-none"
          />
          <div className="flex flex-col gap-12">
            <Figure
              name="quote"
              caption={{ title: "Quote page", body: "Review, accept and pay in one place." }}
              sizes="(min-width: 1024px) 620px, 100vw"
            />
            <Figure
              name="portal"
              caption={{ title: "Customer portal", body: "Pay, pause or cancel without calling you." }}
              sizes="(min-width: 1024px) 620px, 100vw"
            />
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
