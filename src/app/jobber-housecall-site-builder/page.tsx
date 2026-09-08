import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { ComparisonTable, WhenTheyreRight } from "@/components/comparison-table";
import { Faq } from "@/components/faq";

export const metadata: Metadata = {
  title: "Jobber & Housecall Pro Site Builder vs a Site You Own",
  description:
    "You can keep Jobber or Housecall Pro for field-service work. Here's why the website itself should be something you own outright.",
  alternates: { canonical: "/jobber-housecall-site-builder" },
};

export default function JobberHousecallSiteBuilderPage() {
  return (
    <>
      <PageHero
        eyebrow="Website ownership"
        h1="You can keep Jobber or Housecall Pro. The website is a separate question."
        lede="If you already run Jobber or Housecall Pro, you already have a website — it came with the plan. Here's the difference between that builder and a site you own outright."
        cta={{ label: "Get in touch", href: "/contact" }}
      />

      <Section tone="paper">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          What the built-in builder is good for
        </h2>
        <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-muted">
          Jobber includes a website builder on every plan. Housecall Pro sells one as an
          add-on. Both work fine for a basic brochure page. But that page lives inside your
          CRM plan, not on its own — it&apos;s built for a fast setup, not a blog, real
          city-by-city pages, or the deeper markup that helps a page get found and cited.
        </p>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted">
          Because the site is part of the subscription, its future is tied to the
          subscription. That&apos;s a pattern worth understanding, not a specific claim about any
          one vendor. Novaica, a similar CRM-page builder used by some service shops, states
          in its own FAQ that canceling the plan means losing the website. That&apos;s an example
          of the pattern a subscription-based site builder can fall into — not a quote from
          Jobber or Housecall Pro&apos;s own marketing.
        </p>

        <div className="mt-8">
          <ComparisonTable
            competitorName="Jobber / Housecall Pro site builder"
            caption="A CRM-hosted site vs a site you own"
            rows={[
              {
                feature: "Who owns it",
                gudVector: "You. Outright, independent of any software subscription.",
                competitor: "The site lives inside your Jobber or Housecall Pro plan.",
              },
              {
                feature: "Blog and city pages",
                gudVector:
                  "Built out as real, individual pages for your services and service area.",
                competitor:
                  "Built for a fast basic setup — not designed for a blog or city-by-city pages.",
              },
              {
                feature: "If you downgrade or cancel",
                gudVector: "The site keeps running.",
                competitor:
                  "Depends on the plan and vendor. A website tied to a CRM plan can be affected when the subscription changes.",
              },
              {
                feature: "Field-service tools",
                gudVector:
                  "Not included — pairs with whatever scheduling tool you already use, Jobber or Housecall Pro included.",
                competitor:
                  "Scheduling, dispatch, invoicing, and payments bundled with the site.",
              },
            ]}
          />
        </div>
      </Section>

      <Section tone="peach">
        <WhenTheyreRight name="the Jobber or Housecall Pro site builder">
          If you&apos;re just getting started, want everything under one login, and don&apos;t need a
          blog or dedicated pages for every service and city you cover, the built-in builder
          is a reasonable way to get a page live fast. It&apos;s already part of a plan you may be
          paying for.
        </WhenTheyreRight>
      </Section>

      <Section tone="paper">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Keep the field-service software. Own the website.
        </h2>
        <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-muted">
          You don&apos;t have to leave Jobber or Housecall Pro to get a website you own. Many shops
          keep the CRM for scheduling, invoicing, and payments, and build the public-facing
          site separately — so the website doesn&apos;t depend on which software plan you&apos;re on
          this year.
        </p>
      </Section>

      <Section tone="chip">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Questions shops ask
        </h2>
        <div className="mt-6">
          <Faq
            items={[
              {
                question: "Do I have to cancel Jobber or Housecall Pro to work with Güd Vector?",
                answer:
                  "No. Keep them for scheduling, dispatch, invoicing, or whatever you use them for. A Güd Vector site is separate from that software.",
              },
              {
                question: "Will my new site connect to Jobber or Housecall Pro?",
                answer:
                  "Email info@gudvector.com and we'll talk through what you need connected.",
              },
              {
                question: "Is this page saying Jobber or Housecall Pro's builder is bad?",
                answer:
                  "No. It's fine for what it's built for — a fast, basic page inside your plan. This page is about whether the website itself should be tied to that plan.",
              },
            ]}
          />
        </div>
      </Section>
    </>
  );
}
