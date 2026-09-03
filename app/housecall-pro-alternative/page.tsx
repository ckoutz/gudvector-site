import Link from "next/link";
import { ComparisonTable } from "@/components/site/comparison-table";
import { ContactSection } from "@/components/site/contact-section";
import { FaqList } from "@/components/site/faq-list";
import { PageHero } from "@/components/site/page-hero";
import { RelatedLinks } from "@/components/site/related-links";
import { PeachCard, Section } from "@/components/site/section";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata({
    title: "Housecall Pro Alternative for Small Shops | Güd Vector",
    description:
      "A fair Housecall Pro alternative for small contractors: owned website, owner-approved quotes, portal. Dated 2 Sep 2026. Email info@gudvector.com.",
    path: "/housecall-pro-alternative",
  });
}

export default function HousecallAlternativePage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Comparison · facts dated 2 Sep 2026"
        title="A Housecall Pro alternative when the shop wants its own site, not another add-on."
        lede="Housecall Pro is a strong mobile product for visual proposals and a large pro community. Güd Vector is a custom website and system for one shop — not a 200,000-user product you import."
      />
      <Section tone="white">
        <p className="text-ink-soft max-w-3xl text-lg leading-8">
          Official Housecall Pro prices from{" "}
          <a
            href="https://www.housecallpro.com/pricing/"
            className="text-brand-deep font-semibold underline-offset-4 hover:underline"
          >
            housecallpro.com/pricing
          </a>{" "}
          as fetched 2 September 2026.
        </p>
        <div className="mt-8">
          <ComparisonTable
            caption="Housecall Pro vs a custom Güd Vector build."
            columns={["", "Housecall Pro", "Güd Vector"]}
            rows={[
              {
                label: "What you buy",
                values: [
                  "Field-service software: booking, quotes, reviews, proposals",
                  "A custom website plus owner-approved quoting and a pay / pause / cancel portal",
                ],
              },
              {
                label: "Public price (2 Sep 2026)",
                values: [
                  "Basic $59/mo billed annually (1 user). Essentials includes 5 users; extra users $100/mo. MAX $299/mo annual / $329 monthly, 8 users, extra users $75/mo. Card “as low as 2.59%.” Vendor FAQ: no long-term contract. Claims “200,000+ Pros.”",
                  "Quoted as a project. No public rate card on this site.",
                ],
              },
              {
                label: "Website",
                values: [
                  "Housecall Pro Websites sold as an add-on — built and managed by Housecall Pro",
                  "A site you own. Canceling us does not kill a CRM subdomain.",
                ],
              },
              {
                label: "When they are the right answer",
                values: [
                  "Residential HVAC, plumbing, electrical, cleaning, or landscaping that wants fast mobile, visual proposals, and that pro community.",
                  "A shop that does not want add-on / tier creep, or whose multi-day jobs and pause rules do not fit the objects in the software.",
                ],
              },
            ]}
          />
        </div>
      </Section>
      <Section tone="wash">
        <PeachCard>
          <h2 className="text-2xl font-semibold">When Housecall Pro is the right answer</h2>
          <p className="text-ink-soft mt-3 leading-7">
            If close rate on a pretty proposal is the job, and you want to be
            live without a long contract, start at their pricing page. We do
            not claim a better consumer-financing or proposal machine for a
            shop that already lives there.
          </p>
        </PeachCard>
      </Section>
      <Section tone="white">
        <h2 className="text-3xl font-semibold">Questions</h2>
        <div className="mt-6">
          <FaqList
            items={[
              {
                question: "Is the Housecall website a custom contractor site?",
                answer: (
                  <>
                    No. It is an add-on on their platform. Details on{" "}
                    <Link href="/jobber-housecall-site-builder" className="text-brand-deep font-semibold underline-offset-4 hover:underline">
                      site builder vs a site you own
                    </Link>
                    .
                  </>
                ),
              },
              {
                question: "Do you name Housecall on the homepage?",
                answer:
                  "No. Competitor names stay on these comparison pages, with a fair “when they are right” row.",
              },
            ]}
          />
        </div>
      </Section>
      <RelatedLinks
        tone="wash"
        links={[
          {
            href: "/jobber-alternative",
            title: "Jobber alternative",
            text: "Official Core from $29/mo billed annually, re-checked 3 Sep 2026.",
          },
          {
            href: "/servicetitan-alternative",
            title: "ServiceTitan alternative",
            text: "Small-shop cutoff, unofficial dollars labeled.",
          },
          {
            href: "/owner-approved-quoting",
            title: "Owner-approved quoting",
            text: "You send the quote.",
          },
          {
            href: "/dont-want-to-learn-software",
            title: "I don’t want to learn software",
            text: "The learning-curve objection.",
          },
        ]}
      />
      <ContactSection />
    </main>
  );
}
