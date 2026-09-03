import Link from "next/link";
import { ContactSection } from "@/components/site/contact-section";
import { FaqList } from "@/components/site/faq-list";
import { PageHero } from "@/components/site/page-hero";
import { RelatedLinks } from "@/components/site/related-links";
import { PeachCard, Section } from "@/components/site/section";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata({
    title: "I Don't Want to Learn Software | Güd Vector",
    description:
      "If the shop owner has to learn a product, it is the wrong product for a one-truck or small crew. Owner-approved quoting and a portal. Email info@gudvector.com.",
    path: "/dont-want-to-learn-software",
  });
}

export default function DontWantSoftwarePage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="A spoken objection"
        title="I don’t want to learn software."
        lede="If the shop owner has to learn a product, it is the wrong product for a one-truck or small crew. You should approve a quote on one screen. You should not become the software admin."
      />
      <Section tone="white">
        <PeachCard>
          <h2 className="text-2xl font-semibold">What Tuesday should feel like</h2>
          <p className="text-ink-soft mt-3 text-lg leading-8">
            A lead comes in. You send the quote from your phone. The customer
            reviews it, pays, or asks to pause. You are not configuring
            automations. You are not hunting a report. You are running the
            jobs.
          </p>
        </PeachCard>
      </Section>
      <Section tone="wash">
        <h2 className="text-3xl font-semibold">When packaged software is extra homework</h2>
        <p className="text-ink-soft mt-4 max-w-2xl text-lg leading-8">
          Packaged field software is the right answer when you want a standard
          this week and you will actually live in it. It is extra homework when
          you tried a 14-day trial, went back to a notebook, and still need a
          site homeowners can find.
        </p>
      </Section>
      <Section tone="white">
        <h2 className="text-3xl font-semibold">Questions owners actually ask</h2>
        <div className="mt-6">
          <FaqList
            items={[
              {
                question: "I tried a scheduler for two weeks and quit. Now what?",
                answer:
                  "That is common. A custom path encodes how you already quote. You do not migrate a company onto a product you already abandoned.",
              },
              {
                question: "Will my crew have to learn this?",
                answer:
                  "The customer uses a simple portal. You approve quotes. We do not hand the shop a new office job.",
              },
              {
                question: "Is this “simpler software” with a new login?",
                answer: (
                  <>
                    It is a site plus a system for this shop. Compare fairly on{" "}
                    <Link href="/jobber-alternative" className="text-brand-deep font-semibold underline-offset-4 hover:underline">
                      Jobber
                    </Link>
                    ,{" "}
                    <Link href="/housecall-pro-alternative" className="text-brand-deep font-semibold underline-offset-4 hover:underline">
                      Housecall Pro
                    </Link>
                    , and{" "}
                    <Link href="/servicetitan-alternative" className="text-brand-deep font-semibold underline-offset-4 hover:underline">
                      ServiceTitan
                    </Link>
                    .
                  </>
                ),
              },
              {
                question: "What if I am not a tech person?",
                answer:
                  "You should not need to be. One screen: approve or don’t approve. Email info@gudvector.com if you want that walk-through.",
              },
              {
                question: "Can I keep my notebook for prices?",
                answer: (
                  <>
                    Yes. The customer never sees the notebook. See{" "}
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
            text: "The differentiator, without a new product class.",
          },
          {
            href: "/website-booking",
            title: "Website + booking",
            text: "A request, not an unsupervised book.",
          },
          {
            href: "/jobber-housecall-site-builder",
            title: "Site builder vs custom",
            text: "If the bundled site was the homework.",
          },
          {
            href: "/concord",
            title: "Concord hub",
            text: "Bay Area entity page.",
          },
        ]}
      />
      <ContactSection />
    </main>
  );
}
