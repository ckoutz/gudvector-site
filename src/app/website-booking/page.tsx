import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { Faq } from "@/components/faq";

export const metadata: Metadata = {
  title: "Website + Booking for Service Businesses",
  description:
    "Online booking does not have to mean the software books the job without you. A customer can ask for a time. You still confirm it. Email info@gudvector.com.",
  alternates: { canonical: "/website-booking" },
};

export default function WebsiteBookingPage() {
  return (
    <>
      <PageHero
        eyebrow="Booking"
        h1="A book button that still goes through you."
        lede="Online booking does not have to mean the software books the job without you. A customer can ask for a time. You confirm it before it's on the schedule."
        cta={{ label: "Get in touch", href: "/contact" }}
      />

      <Section tone="peach" className="pt-0">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          What the book button actually does
        </h2>
        <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-muted">
          The website lists your services and lets someone ask for a time. That request
          comes to you, not straight onto a calendar. You confirm it, or call to work out a
          better one. Nothing gets promised to the customer that you have not seen first.
        </p>
      </Section>

      <Section tone="paper">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          The jobs where this matters most
        </h2>
        <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-muted">
          Weekly clean and weekly mow are the jobs where a book button sounds easy — and
          where a bad one steals the afternoon. See{" "}
          <Link href="/service-businesses" className="underline underline-offset-2">
            service businesses
          </Link>{" "}
          and the{" "}
          <Link href="/bay-area" className="underline underline-offset-2">
            Bay Area page
          </Link>
          .
        </p>
      </Section>

      <Section tone="chip">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Booking and quoting work the same way
        </h2>
        <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-muted">
          A booking request and a quote go through the same door. The customer asks. You
          decide. See{" "}
          <Link href="/owner-approved-quoting" className="underline underline-offset-2">
            owner-approved quoting
          </Link>{" "}
          for how that works when the ask is a price instead of a time.
        </p>
      </Section>

      <Section tone="paper">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Questions owners ask about booking
        </h2>
        <div className="mt-6">
          <Faq
            items={[
              {
                question: "Does the site book the job automatically?",
                answer:
                  "No. A customer can ask for a time. You confirm it before it's on the schedule. Nothing gets booked without you seeing it.",
              },
              {
                question: "What if I don't want online booking at all?",
                answer:
                  "That's fine. The site can just list your services and a way to reach you. Booking is something we add when you want it, not a requirement.",
              },
              {
                question: "Is this the same as a scheduler inside a field-service app?",
                answer: (
                  <>
                    No. See our fair{" "}
                    <Link href="/compare" className="underline underline-offset-2">
                      comparison
                    </Link>{" "}
                    against Jobber, Housecall Pro, and ServiceTitan.
                  </>
                ),
              },
            ]}
          />
        </div>
      </Section>
    </>
  );
}
