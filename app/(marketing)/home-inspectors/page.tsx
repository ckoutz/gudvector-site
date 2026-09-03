import Link from "next/link";
import { ContactSection } from "@/components/site/contact-section";
import { FaqList } from "@/components/site/faq-list";
import { PageHero } from "@/components/site/page-hero";
import { RelatedLinks } from "@/components/site/related-links";
import { PeachCard, Section } from "@/components/site/section";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata({
    title: "Home Inspector Websites in the Bay Area | Güd Vector",
    description:
      "Custom websites and report portals for Bay Area home inspectors. California does not license inspectors. Email info@gudvector.com.",
    path: "/home-inspectors",
  });
}

export default function HomeInspectorsPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Bay Area inspectors"
        title="A site that holds the report and the fee."
        lede="Güd Vector builds custom websites for Bay Area home inspectors. California does not license home inspectors. CREIA, ASHI, and InterNACHI membership is the signal buyers already look for."
      />
      <Section tone="white">
        <div className="grid gap-4 md:grid-cols-2">
          <PeachCard>
            <h2 className="text-2xl font-semibold">Escrow time is not software time</h2>
            <p className="text-ink-soft mt-3 leading-7">
              Inspectors sell trust, a PDF, and a calendar that has to fit a
              closing. The site should collect the fee and deliver the report.
              It should not make you learn a CRM.
            </p>
          </PeachCard>
          <PeachCard>
            <h2 className="text-2xl font-semibold">Next to environmental work</h2>
            <p className="text-ink-soft mt-3 leading-7">
              Mold, asbestos, and water sampling sit next to a home inspection.
              That is a different artifact. See{" "}
              <Link href="/environmental-testing" className="text-brand-deep font-semibold underline-offset-4 hover:underline">
                environmental testing
              </Link>
              . We do not invent lab certifications.
            </p>
          </PeachCard>
        </div>
      </Section>
      <Section tone="wash">
        <h2 className="text-3xl font-semibold">What the portal is for</h2>
        <p className="text-ink-soft mt-4 max-w-2xl text-lg leading-8">
          The customer reviews the quote you sent, pays, and gets the report in
          one place. Pause and cancel follow your rules — not a 30-minute salon
          slot.
        </p>
      </Section>
      <Section tone="white">
        <h2 className="text-3xl font-semibold">Questions</h2>
        <div className="mt-6">
          <FaqList
            items={[
              {
                question: "Does California license home inspectors?",
                answer:
                  "No. California does not license home inspectors. CREIA Standards of Practice are a recognized standard of care in the state. We do not sell memberships or claim them for you.",
              },
              {
                question: "Will I have to live in a new dashboard?",
                answer: (
                  <>
                    No. Read{" "}
                    <Link href="/dont-want-to-learn-software" className="text-brand-deep font-semibold underline-offset-4 hover:underline">
                      I don’t want to learn software
                    </Link>
                    .
                  </>
                ),
              },
            ]}
          />
        </div>
      </Section>
      <RelatedLinks
        tone="wash"
        links={[
          {
            href: "/owner-approved-quoting",
            title: "Owner-approved quoting",
            text: "You send the inspection fee. They see it after you say so.",
          },
          {
            href: "/website-booking",
            title: "Website + booking",
            text: "A slot request around escrow — still on your say.",
          },
          {
            href: "/environmental-testing",
            title: "Environmental testing",
            text: "Report + fee portal for sampling work.",
          },
          {
            href: "/concord",
            title: "Concord hub",
            text: "Bay Area firm page with the crawlable entity sentence.",
          },
        ]}
      />
      <ContactSection />
    </main>
  );
}
