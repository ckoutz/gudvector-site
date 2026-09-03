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
    title: "Owner-Approved Quoting for Service Shops | Güd Vector",
    description:
      "Custom quoting means the shop owner still approves the number before the customer sees it. You send the quote. Email info@gudvector.com.",
    path: "/owner-approved-quoting",
  });
}

export default function QuotingPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Owner-approved quoting"
        title="You approve the quote. Then it goes out."
        lede="Custom quoting here means the shop owner still approves the number before the customer sees it. You send the quote. Your customer reviews it, sets up service, and pays in a simple portal."
      />
      <Section tone="white">
        <PeachCard>
          <h2 className="text-2xl font-semibold">The definition, in one lift</h2>
          <p className="text-ink-soft mt-3 text-lg leading-8">
            Owner-approved quoting is a quote the customer cannot see until the
            owner sends it. Not a homeowner pricing the job themselves. Not a
            template that fires while you are on a roof.
          </p>
        </PeachCard>
        <div className="mt-8">
          <ComparisonTable
            caption="How the number leaves the shop."
            columns={["", "Spreadsheet / text", "Packaged field software", "Güd Vector"]}
            rows={[
              {
                label: "Who writes the number",
                values: ["You, in a sheet or a thread", "You, inside their quote screen", "You"],
              },
              {
                label: "Who sends it",
                values: ["You, if you remember", "You, or a flow you configured", "You. You send the quote."],
              },
              {
                label: "What the customer gets",
                values: [
                  "A photo of a sheet, or a PDF",
                  "A client hub to approve and pay",
                  "A branded portal to review, pay, pause, or cancel",
                ],
              },
              {
                label: "When it is the right answer",
                values: [
                  "A handful of quotes a month",
                  "A crew that wants a standard today",
                  "A shop whose quote rules do not fit a checkbox",
                ],
              },
            ]}
          />
        </div>
      </Section>
      <Section tone="wash">
        <h2 className="text-3xl font-semibold">The portal is theirs, not our checkout</h2>
        <p className="text-ink-soft mt-4 max-w-2xl text-lg leading-8">
          The live customer portal pattern already exists for shops: accept or
          reject a quote, then pay, pause, or cancel. We do not put Güd
          Vector&apos;s own checkout in the hero. The phone preview on the home
          page is a labeled pattern, not a live client.
        </p>
      </Section>
      <Section tone="white">
        <h2 className="text-3xl font-semibold">Questions</h2>
        <div className="mt-6">
          <FaqList
            items={[
              {
                question: "Do you advertise software that drafts the quote for me?",
                answer:
                  "No. The live copy is still “You send the quote.” We will not claim a drafting step that the owner cannot see.",
              },
              {
                question: "Is this a clone of the big field-service logins?",
                answer: (
                  <>
                    No. Fair comparison pages live here:{" "}
                    <Link href="/jobber-alternative" className="text-brand-deep font-semibold underline-offset-4 hover:underline">
                      Jobber
                    </Link>
                    ,{" "}
                    <Link href="/housecall-pro-alternative" className="text-brand-deep font-semibold underline-offset-4 hover:underline">
                      Housecall Pro
                    </Link>
                    ,{" "}
                    <Link href="/servicetitan-alternative" className="text-brand-deep font-semibold underline-offset-4 hover:underline">
                      ServiceTitan
                    </Link>
                    , and{" "}
                    <Link href="/jobber-housecall-site-builder" className="text-brand-deep font-semibold underline-offset-4 hover:underline">
                      their site builders
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
            href: "/website-booking",
            title: "Website + booking",
            text: "A request is not an unsupervised book.",
          },
          {
            href: "/dont-want-to-learn-software",
            title: "I don’t want to learn software",
            text: "Control without becoming the admin.",
          },
          {
            href: "/jobber-alternative",
            title: "Jobber alternative",
            text: "Fair table. When Jobber is the right answer, we say so.",
          },
          {
            href: "/landscapers",
            title: "Landscapers",
            text: "Industry page with quoting linked from the work.",
          },
        ]}
      />
      <ContactSection />
    </main>
  );
}
