import Link from "next/link";
import { ContactSection } from "@/components/site/contact-section";
import { FaqList } from "@/components/site/faq-list";
import { PageHero } from "@/components/site/page-hero";
import { RelatedLinks } from "@/components/site/related-links";
import { PeachCard, Section } from "@/components/site/section";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata({
    title: "Landscaper Websites in Concord & East Bay | Güd Vector",
    description:
      "Custom websites for Concord and East Bay landscapers. Owner-approved quotes, a customer portal, and a site you own. Email info@gudvector.com.",
    path: "/landscapers",
  });
}

export default function LandscapersPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Concord / East Bay · C-27"
        title="A landscaping site homeowners can find."
        lede="Güd Vector builds custom websites for Concord and East Bay landscapers. After a good review, many people still open the website. If they cannot find you, they call someone else."
      />
      <Section tone="white">
        <div className="grid gap-4 md:grid-cols-2">
          <PeachCard>
            <h2 className="text-2xl font-semibold">Built for the yard, not a template</h2>
            <p className="text-ink-soft mt-3 leading-7">
              Real services. Real service area. Phone-first pages. Previews you
              approve before anything goes live. The site is yours — canceling
              a software login does not take it down.
            </p>
          </PeachCard>
          <PeachCard>
            <h2 className="text-2xl font-semibold">You send the quote</h2>
            <p className="text-ink-soft mt-3 leading-7">
              Weekly mow, cleanup, or a bigger install — the number does not go
              to the customer until you send it. Then they can review, set up
              service, pay, pause, or cancel in a portal that looks like your
              shop.
            </p>
          </PeachCard>
        </div>
      </Section>
      <Section tone="wash">
        <h2 className="text-3xl font-semibold">Concord, Pleasant Hill, Walnut Creek, Martinez</h2>
        <p className="text-ink-soft mt-4 max-w-2xl text-lg leading-8">
          This page is for East Bay landscape contractors — including C-27
          shops — who already get work from neighbors and listings, and need a
          site that does not leak that click. Start from the{" "}
          <Link href="/concord" className="text-brand-deep font-semibold underline-offset-4 hover:underline">
            Concord / Contra Costa hub
          </Link>
          .
        </p>
      </Section>
      <Section tone="white">
        <h2 className="text-3xl font-semibold">Questions landscapers ask</h2>
        <div className="mt-6">
          <FaqList
            items={[
              {
                question: "Do I need a site if Angi is already 4.9?",
                answer:
                  "A strong listing helps. BrightLocal’s 2026 consumer survey found that after good reviews, 54% of people still hit the website next. A missing or weak site is the leak.",
              },
              {
                question: "What if I already have a site inside my scheduler?",
                answer: (
                  <>
                    Those builders are a brochure on someone else’s host. See{" "}
                    <Link href="/jobber-housecall-site-builder" className="text-brand-deep font-semibold underline-offset-4 hover:underline">
                      site builder vs a custom contractor site
                    </Link>
                    .
                  </>
                ),
              },
              {
                question: "Can quotes still require my approval?",
                answer: (
                  <>
                    Yes. That is the point. Read{" "}
                    <Link href="/owner-approved-quoting" className="text-brand-deep font-semibold underline-offset-4 hover:underline">
                      owner-approved quoting
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
            text: "You approve the number. Then it goes out.",
          },
          {
            href: "/website-booking",
            title: "Website + booking",
            text: "A request on your site does not mean software books the job without you.",
          },
          {
            href: "/concord",
            title: "Concord & Contra Costa",
            text: "The Bay Area hub for trades pages.",
          },
          {
            href: "/dont-want-to-learn-software",
            title: "I don’t want to learn software",
            text: "You stay the owner. You do not become the admin.",
          },
        ]}
      />
      <ContactSection />
    </main>
  );
}
