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
            ["Your license, on your page", "Your license, on your page — not buried."],
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
        <h2 className="text-3xl font-semibold">Local plumbing shops</h2>
        <p className="text-ink-soft mt-4 max-w-2xl text-lg leading-8">
          PHCC of Alameda & Contra Costa Counties is a local trade room for
          licensed plumbing and HVAC shops. See the{" "}
          <Link href="/concord" className="text-brand-deep font-semibold underline-offset-4 hover:underline">
            Concord and Contra Costa page
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
                question: "Will the site book a job while I am under a house?",
                answer: "No. They can ask for a time. You still send the quote.",
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
