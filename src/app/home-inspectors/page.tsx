import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { Faq } from "@/components/faq";

export const metadata: Metadata = {
  title: "Home Inspector Websites for the Bay Area",
  description:
    "Websites for Bay Area home inspectors. You send the quote. Report and fee go through a portal with your name on it. Email info@gudvector.com.",
  alternates: { canonical: "/home-inspectors" },
};

export default function HomeInspectorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Bay Area"
        h1="A home inspection site buyers and agents can trust."
        lede="Güd Vector builds websites for Bay Area home inspectors. California does not license inspectors, so the page you send someone to is part of how they decide you're the real thing."
        cta={{ label: "Get in touch", href: "/contact" }}
      />

      <Section tone="peach" className="pt-0">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-paper p-8">
            <h2 className="font-display text-xl font-semibold text-ink">
              Built for the report, not a leftover template
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-muted">
              Real services, the areas you actually cover, pages that work on a phone.
              Previews you approve before anything goes live. The site is yours — canceling
              a software login does not take it down.
            </p>
          </div>
          <div className="rounded-2xl bg-paper p-8">
            <h2 className="font-display text-xl font-semibold text-ink">
              CREIA and ASHI are your signal
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-muted">
              California does not license home inspectors, so CREIA and ASHI membership is
              how inspectors show buyers and agents they can be trusted. If you carry
              either, it goes on your page. Güd Vector does not hold it and will not claim
              we do.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          You send the quote
        </h2>
        <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-muted">
          A booking comes in and you send the quote for the inspection — the price does not
          reach the customer until you send it. After the walk-through, your customer gets
          the report and pays the fee in a portal with your name on it, not a generic
          checkout.
        </p>
      </Section>

      <Section tone="peach">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          A report that beats the clock
        </h2>
        <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-muted">
          A home inspection report is usually wanted against an escrow deadline, not on your
          schedule. A page that works on a phone and a portal that delivers the report and
          takes the fee keeps that clock from becoming your problem.
        </p>
      </Section>

      <Section tone="chip">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Bay Area, not just one county
        </h2>
        <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-muted">
          For inspectors who already get referrals from agents across the Bay Area, and need
          a site that keeps up during escrow. Start from the{" "}
          <Link href="/bay-area" className="underline underline-offset-2">
            Bay Area page
          </Link>
          , or see how we build for{" "}
          <Link href="/service-businesses" className="underline underline-offset-2">
            other local service businesses
          </Link>
          .
        </p>
      </Section>

      <Section tone="paper">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Questions home inspectors ask
        </h2>
        <div className="mt-6">
          <Faq
            items={[
              {
                question: "Do I need a site if most of my work comes from referrals?",
                answer:
                  "A strong reputation gets someone curious. The website is where they decide whether to call you or the next name — a missing or broken page is where that referral leaks.",
              },
              {
                question: "Will the report get sent to my customer automatically?",
                answer:
                  "You still send it. The portal is where your customer gets the report and pays the fee — not a system that hands anything out without you.",
              },
              {
                question: "Do you hold my CREIA or ASHI membership for me?",
                answer:
                  "No. CREIA and ASHI are credentials you carry, not something Güd Vector holds or claims. If you're a member, it goes on your page.",
              },
            ]}
          />
        </div>
      </Section>
    </>
  );
}
