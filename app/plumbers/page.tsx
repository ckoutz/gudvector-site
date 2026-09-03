import Link from "next/link";
import { ContactSection } from "@/components/site/contact-section";
import { FaqList } from "@/components/site/faq-list";
import { PageHero } from "@/components/site/page-hero";
import { RelatedLinks } from "@/components/site/related-links";
import { PeachCard, Section } from "@/components/site/section";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata({
    title: "Plumber Websites in the Bay Area | Güd Vector",
    description:
      "Custom websites for Bay Area plumbers. Fast mobile pages, owner-approved quotes, and a customer portal. Email info@gudvector.com.",
    path: "/plumbers",
  });
}

export default function PlumbersPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Bay Area plumbers"
        title="When the pipe breaks, they look you up."
        lede="Güd Vector builds custom websites for Bay Area plumbing shops. The page has to work on a phone, show the real services, and let someone reach you without hunting."
      />
      <Section tone="white">
        <h2 className="text-3xl font-semibold">What a plumbing homepage needs</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            ["Tap-to-reach", "A clear way to contact you on the first screen."],
            ["License in view", "CSLB lookup belongs next to the offer, not buried."],
            ["Service area", "Bay Area cities you actually cover, said plainly."],
            ["After-hours", "What happens when you are on a job."],
            ["Owner-approved quote", "You send the number. The site does not guess."],
            ["Portal for the rest", "Review, pay, pause, or cancel without phone tag."],
          ].map(([title, text]) => (
            <PeachCard key={title}>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-ink-soft mt-2 leading-7">{text}</p>
            </PeachCard>
          ))}
        </div>
      </Section>
      <Section tone="wash">
        <h2 className="text-3xl font-semibold">East Bay rooms, not a booth</h2>
        <p className="text-ink-soft mt-4 max-w-2xl text-lg leading-8">
          PHCC of Alameda & Contra Costa Counties is a local trade room for
          licensed plumbing and HVAC shops. That is not a partnership claim —
          it is where those owners already sit. See the{" "}
          <Link href="/concord" className="text-brand-deep font-semibold underline-offset-4 hover:underline">
            Concord hub
          </Link>{" "}
          for the Bay Area sentence.
        </p>
      </Section>
      <Section tone="white">
        <h2 className="text-3xl font-semibold">Questions</h2>
        <div className="mt-6">
          <FaqList
            items={[
              {
                question: "Is this a booking app that takes the job while I am under a house?",
                answer: (
                  <>
                    No.{" "}
                    <Link href="/website-booking" className="text-brand-deep font-semibold underline-offset-4 hover:underline">
                      Online booking
                    </Link>{" "}
                    here means a customer can ask for a slot. You still approve
                    the quote.
                  </>
                ),
              },
              {
                question: "Do you name a public phone for Güd Vector?",
                answer:
                  "No. Public contact for us is info@gudvector.com and the form on this page. Your shop page can still have click-to-call for your number.",
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
            text: "The number waits on you.",
          },
          {
            href: "/website-booking",
            title: "Website + booking",
            text: "Request a time without handing the job to software.",
          },
          {
            href: "/concord",
            title: "Concord & Contra Costa",
            text: "Bay Area hub for local service shops.",
          },
        ]}
      />
      <ContactSection />
    </main>
  );
}
