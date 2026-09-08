import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { Faq } from "@/components/faq";

export const metadata: Metadata = {
  title: "Plumber Websites for the Bay Area",
  description:
    "Websites for Bay Area plumbers. You send the quote. The customer pays in a portal. The site is yours. Email info@gudvector.com.",
  alternates: { canonical: "/plumbers" },
};

export default function PlumbersPage() {
  return (
    <>
      <PageHero
        eyebrow="Bay Area"
        h1="A plumbing site that works from a wet floor."
        lede="Güd Vector builds websites for Bay Area plumbers. When a pipe lets go, the search happens on a phone, standing in water. If the page is slow or broken, they call the next name."
        cta={{ label: "Get in touch", href: "/contact" }}
      />

      <Section tone="peach" className="pt-0">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-paper p-8">
            <h2 className="font-display text-xl font-semibold text-ink">
              Built for the truck, not a leftover template
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-muted">
              Real services — the jobs you actually run. Real service area. Pages that load
              fast and work on a phone, because that&apos;s what&apos;s in someone&apos;s
              hand next to a leaking pipe. Previews you approve before anything goes live.
              The site is yours — canceling a software login does not take it down.
            </p>
          </div>
          <div className="rounded-2xl bg-paper p-8">
            <h2 className="font-display text-xl font-semibold text-ink">
              Your license, on your page
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-muted">
              That&apos;s a fact worth showing, on your terms. Your license goes on your
              page, in your words. We do not invent a number for you.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          You send the quote
        </h2>
        <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-muted">
          A leak, a repipe, a water heater swap — the price does not go to the customer
          until you send it, even on an emergency call. Then they review, set up service,
          pay, pause, or cancel in a portal that looks like your shop, not a generic
          checkout.
        </p>
      </Section>

      <Section tone="peach">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Local plumbing shops
        </h2>
        <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-muted">
          Plumbing and HVAC owners in the Bay Area already have rooms where they meet —
          PHCC East Bay, PHCC SF–San Mateo. That&apos;s a place those owners already meet.
          It is not a Güd Vector membership, and we do not claim it is. We build the site
          and the quote system around a shop that is already busy, not one that needs a new
          trade group to join.
        </p>
      </Section>

      <Section tone="paper">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Questions plumbers ask
        </h2>
        <div className="mt-6">
          <Faq
            items={[
              {
                question: "Do I need a site if I already show up on Yelp or Angi?",
                answer:
                  "A strong listing helps. After a good review, more than half of people still open the website next (BrightLocal, 2026). A missing or broken site is the leak.",
              },
              {
                question: "Will the site book a job while I am under a house?",
                answer: "No. They can ask for a time. You still send the quote.",
              },
              {
                question: "Will you list my license number?",
                answer:
                  "Only if you give it to us. It's your license, on your page — we do not invent one.",
              },
            ]}
          />
        </div>
      </Section>
    </>
  );
}
