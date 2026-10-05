import { BookCallButton } from "@/components/cta-button";
import { CtaBand } from "@/components/cta-band";
import { Figure } from "@/components/screenshot";
import { GusPhones } from "@/components/gus-phone";
import { Container, Eyebrow, FeatureList, Section, SectionHeading } from "@/components/section";
import { siteConfig } from "@/lib/site-config";

const products = [
  {
    title: "Websites",
    body: "Fast sites you own, built to show up in Google and AI answers.",
    href: "/websites",
  },
  {
    title: siteConfig.officeName,
    body: "Meet Gus, your automated office manager: schedule, quotes, estimates and billing.",
    href: "/office",
  },
  {
    title: "Custom AI",
    body: "Tools built around your crew's paperwork, inside apps you already use.",
    href: "/custom-ai",
  },
];

const steps = [
  { title: "Book a call", body: "Tell us where the time goes today." },
  { title: "We build it", body: "Set up around how you already work, not the other way round." },
  { title: "You go live", body: "Preview everything on your phone. Nothing launches without your OK." },
];

export default function HomePage() {
  return (
    <>
      <Container className="pb-20 pt-20 sm:pb-28 sm:pt-32">
        <Eyebrow>For local service businesses</Eyebrow>
        <h1 className="mt-5 max-w-4xl font-display text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.04em] text-ink sm:text-7xl lg:text-[5.5rem]">
          Get found. Get booked. Skip the busywork.
        </h1>
        <p className="mt-7 max-w-xl text-[19px] leading-relaxed text-muted sm:text-[21px]">
          Websites, booking and quoting, and custom AI for plumbers, HVAC, cleaners and
          contractors.
        </p>
        <div className="mt-10">
          <BookCallButton size="lg" />
        </div>
      </Container>

      <Section className="border-t border-line">
        <SectionHeading eyebrow={siteConfig.officeName} title="Meet Gus, your automated office manager." />
        <GusPhones className="mt-12 sm:mt-16" />
      </Section>

      <Section className="border-t border-line">
        <SectionHeading title="Three ways we help." />
        <FeatureList items={products} />
      </Section>

      <Section tone="muted" id="how-it-works">
        <SectionHeading title="How it works" />
        <FeatureList items={steps} numbered />
      </Section>

      <Section>
        <SectionHeading eyebrow={siteConfig.officeName} title="What your customers see" />
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
