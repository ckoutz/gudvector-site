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
    title: "Jobber Alternative for Small Shops | Güd Vector",
    description:
      "A fair Jobber alternative for small Bay Area shops: custom website, owner-approved quoting, and a portal you own. Dated 2 Sep 2026. Email info@gudvector.com.",
    path: "/jobber-alternative",
  });
}

export default function JobberAlternativePage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Comparison · facts dated 2 Sep 2026"
        title="A Jobber alternative when the shop needs its own site and quote rules."
        lede="Güd Vector is not a Jobber clone. It is a custom website plus quoting, a customer portal, and booking requests built around this shop — so the owner does not migrate a whole company onto a login."
      />
      <Section tone="white">
        <p className="text-ink-soft max-w-3xl text-lg leading-8">
          Official Jobber prices below come from{" "}
          <a
            href="https://www.getjobber.com/pricing/"
            className="text-brand-deep font-semibold underline-offset-4 hover:underline"
          >
            getjobber.com/pricing
          </a>{" "}
          as fetched 2 September 2026. Re-check that page before you treat a
          dollar as current.
        </p>
        <div className="mt-8">
          <ComparisonTable
            caption="Jobber vs a custom Güd Vector build. Neutral facts first."
            columns={["", "Jobber", "Güd Vector"]}
            rows={[
              {
                label: "What you buy",
                values: [
                  "A field-service login: schedule, quotes, invoices, payments, Client Hub",
                  "A custom website and a system around how this shop already quotes and gets paid",
                ],
              },
              {
                label: "Public price (2 Sep 2026)",
                values: [
                  "Core from $29/mo billed annually ($49/mo no commitment). Connect from $139/mo no commitment. Grow from $199/mo. Plus from $499/mo (5 users) to $699/mo (15 users). Card 2.9% + 30¢. Add-ons on that page: Receptionist $29, Pipeline $49, Marketing Suite $99. 14-day Grow trial, no card.",
                  "Quoted as a project. No public rate card on this site.",
                ],
              },
              {
                label: "Website",
                values: [
                  "Website builder included on every plan",
                  "A site you own, with pages and schema a brochure builder typically skips",
                ],
              },
              {
                label: "Quotes",
                values: [
                  "Quotes and Client Hub approve / see appointment / pay. No native customer self-quoting on Jobber’s own stack (shops add ResponsiBid for that job).",
                  "You send the quote. The customer does not price the job themselves.",
                ],
              },
              {
                label: "When they are the right answer",
                values: [
                  "A 1–10 person crew that wants scheduling and invoicing live this week, plus a 20,000+ home-service community.",
                  "A shop that has already felt a template’s limits, needs owner-gated quotes, or wants the public site to survive if a SaaS login is canceled.",
                ],
              },
            ]}
          />
        </div>
      </Section>
      <Section tone="wash">
        <PeachCard>
          <h2 className="text-2xl font-semibold">When Jobber is the right answer</h2>
          <p className="text-ink-soft mt-3 leading-7">
            If you need drag-and-drop dispatch this week, a Client Hub, and a
            price you can start at $29–$49 a month, Jobber is built for that.
            Ease of use and that community are not things we pretend to beat.
            Go to the official page and run the trial.
          </p>
        </PeachCard>
      </Section>
      <Section tone="white">
        <h2 className="text-3xl font-semibold">Questions</h2>
        <div className="mt-6">
          <FaqList
            items={[
              {
                question: "Does Jobber include a website?",
                answer: (
                  <>
                    Yes, on every plan as of 2 Sep 2026. That is a different
                    product from a site you own. See{" "}
                    <Link href="/jobber-housecall-site-builder" className="text-brand-deep font-semibold underline-offset-4 hover:underline">
                      site builder vs custom
                    </Link>
                    .
                  </>
                ),
              },
              {
                question: "Are you cheaper than Jobber?",
                answer:
                  "Not on the sticker. A custom build is a project. Compare three years of seats, processing, and add-ons — plus the nights you spend as the admin — if cost is the question.",
              },
            ]}
          />
        </div>
      </Section>
      <RelatedLinks
        tone="wash"
        links={[
          {
            href: "/housecall-pro-alternative",
            title: "Housecall Pro alternative",
            text: "Official Basic $59 / MAX $299 from 2 Sep 2026.",
          },
          {
            href: "/servicetitan-alternative",
            title: "ServiceTitan alternative",
            text: "For small shops. Operator-reported prices, labeled unofficial.",
          },
          {
            href: "/jobber-housecall-site-builder",
            title: "Site builder vs custom",
            text: "The “we already have a site in Jobber” page.",
          },
          {
            href: "/dont-want-to-learn-software",
            title: "I don’t want to learn software",
            text: "Spoken objection, written out.",
          },
        ]}
      />
      <ContactSection />
    </main>
  );
}
