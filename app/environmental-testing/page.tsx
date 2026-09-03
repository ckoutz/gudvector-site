import Link from "next/link";
import { ContactSection } from "@/components/site/contact-section";
import { FaqList } from "@/components/site/faq-list";
import { PageHero } from "@/components/site/page-hero";
import { RelatedLinks } from "@/components/site/related-links";
import { PeachCard, Section } from "@/components/site/section";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata({
    title: "Environmental Testing & Inspection Portal | Güd Vector",
    description:
      "Websites and report portals for Bay Area environmental testing and inspection firms. We do not invent lab certifications. Email info@gudvector.com.",
    path: "/environmental-testing",
  });
}

export default function EnvironmentalTestingPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Environmental testing · Bay Area"
        title="A portal for the report and the bill."
        lede="Güd Vector builds custom websites and customer portals for environmental testing and inspection firms. Chain-of-custody, a PDF, and a fee — not a dispatch board. We do not invent lab certifications."
      />
      <Section tone="white">
        <div className="grid gap-4 md:grid-cols-2">
          <PeachCard>
            <h2 className="text-2xl font-semibold">Inspection vs sampling</h2>
            <p className="text-ink-soft mt-3 leading-7">
              A home inspection is a visual report against a standard of
              practice. Environmental sampling (mold, asbestos, water) is a
              different artifact: collection, a lab, and a result the customer
              has to retrieve. One firm may do both. The portal should not
              pretend they are the same job.
            </p>
          </PeachCard>
          <PeachCard>
            <h2 className="text-2xl font-semibold">What we will not claim</h2>
            <p className="text-ink-soft mt-3 leading-7">
              We are not a lab. We do not list certifications we do not hold.
              We do not put another firm&apos;s ELAP, NVLAP, or AIHA badge on
              this site. If your shop has those, they belong on your pages,
              with your proof.
            </p>
          </PeachCard>
        </div>
      </Section>
      <Section tone="wash">
        <h2 className="text-3xl font-semibold">East Bay and the wider Bay Area</h2>
        <p className="text-ink-soft mt-4 max-w-2xl text-lg leading-8">
          Concord, Contra Costa, and the rest of the San Francisco Bay Area.
          Inspectors in this market often sit near CREIA and ASHI rooms. That
          is context, not a partnership. See{" "}
          <Link href="/home-inspectors" className="text-brand-deep font-semibold underline-offset-4 hover:underline">
            home inspectors
          </Link>{" "}
          and the{" "}
          <Link href="/concord" className="text-brand-deep font-semibold underline-offset-4 hover:underline">
            Concord hub
          </Link>
          .
        </p>
      </Section>
      <Section tone="white">
        <h2 className="text-3xl font-semibold">Questions</h2>
        <div className="mt-6">
          <FaqList
            items={[
              {
                question: "Can the customer pay and get the PDF in one place?",
                answer:
                  "That is the portal job: review the quote you sent, pay, and retrieve the report. Pause and cancel follow your rules.",
              },
              {
                question: "Do you run the lab?",
                answer:
                  "No. We build the site and the customer path around the work you already do.",
              },
            ]}
          />
        </div>
      </Section>
      <RelatedLinks
        tone="wash"
        links={[
          {
            href: "/home-inspectors",
            title: "Home inspectors",
            text: "Report + fee, escrow time, no invented licenses.",
          },
          {
            href: "/owner-approved-quoting",
            title: "Owner-approved quoting",
            text: "The fee waits on you.",
          },
          {
            href: "/website-booking",
            title: "Website + booking",
            text: "A slot request around the sample date.",
          },
          {
            href: "/concord",
            title: "Concord hub",
            text: "Bay Area entity paragraph.",
          },
        ]}
      />
      <ContactSection />
    </main>
  );
}
