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
      "Websites for Concord and East Bay landscapers. You send the quote. The customer pays in a portal. The site is yours. Email info@gudvector.com.",
    path: "/landscapers",
  });
}

export default function LandscapersPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Concord / East Bay"
        title="A landscaping site homeowners can find."
        lede="Güd Vector builds websites for Concord and East Bay landscapers. After a good review, many people still open the website. If they cannot find you, they call someone else."
      />
      <Section tone="white">
        <div className="grid gap-4 md:grid-cols-2">
          <PeachCard>
            <h2 className="text-2xl font-semibold">Built for the yard, not a leftover template</h2>
            <p className="text-ink-soft mt-3 leading-7">
              Real services. Real service area. Pages that work on a phone.
              Previews you approve before anything goes live. The site is yours
              — canceling a software login does not take it down.
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
          For East Bay landscape contractors who already get work from
          neighbors and listings, and need a site that does not lose that
          click. Start from the{" "}
          <Link href="/concord" className="text-brand-deep font-semibold underline-offset-4 hover:underline">
            Concord and Contra Costa page
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
                question: "Do I need a site if the listing is already strong?",
                answer:
                  "A strong listing helps. After a good review, more than half of people still open the website next (BrightLocal, 2026). A missing or weak site is the leak.",
              },
              {
                question: "What if I already have a site inside my scheduler?",
                answer: (
                  <>
                    Those builders are a brochure on someone else’s host. See{" "}
                    <Link href="/jobber-housecall-site-builder" className="text-brand-deep font-semibold underline-offset-4 hover:underline">
                      site builder vs a contractor site you own
                    </Link>
                    .
                  </>
                ),
              },
              {
                question: "Can quotes still require my approval?",
                answer: "Yes. That is the point. You send the quote.",
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
            text: "Concord and the East Bay.",
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
