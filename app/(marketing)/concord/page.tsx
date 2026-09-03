import Link from "next/link";
import { ContactSection } from "@/components/site/contact-section";
import { PageHero } from "@/components/site/page-hero";
import { RelatedLinks } from "@/components/site/related-links";
import { PeachCard, Section } from "@/components/site/section";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata({
    title: "Concord & Contra Costa Websites for Trades | Güd Vector",
    description:
      "Güd Vector Consulting Services is a Bay Area firm that builds websites and owner-approved quoting for local service businesses. Email info@gudvector.com.",
    path: "/concord",
  });
}

export default function ConcordPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Concord · Contra Costa · East Bay"
        title="Websites for Concord and Contra Costa service shops."
        lede="Güd Vector Consulting Services is a Bay Area firm that builds websites and owner-approved quoting for local service businesses."
      />
      <Section tone="white">
        <PeachCard>
          <h2 className="text-2xl font-semibold">Who we are</h2>
          <p className="mt-3 text-lg leading-8">
            Güd Vector Consulting Services (Güd Vector) serves the San
            Francisco Bay Area. Email info@gudvector.com. You send the quote.
            The customer reviews it, pays, pauses, or cancels in a portal with
            your name on it.
          </p>
        </PeachCard>
      </Section>
      <Section tone="wash">
        <h2 className="text-3xl font-semibold">Where we work</h2>
        <p className="text-ink-soft mt-4 max-w-2xl text-lg leading-8">
          Concord, Pleasant Hill, Walnut Creek, Martinez, Clayton, Pittsburg,
          and the rest of Contra Costa and the San Francisco Bay Area.
        </p>
      </Section>
      <Section tone="white">
        <h2 className="text-3xl font-semibold">Trades we build for</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            ["/landscapers", "Landscapers", "Concord and East Bay crews."],
            ["/plumbers", "Plumbers", "Bay Area pages that work on a phone."],
            ["/home-inspectors", "Home inspectors", "Report, fee, and escrow timing."],
            ["/environmental-testing", "Environmental testing", "Report and bill in one place."],
          ].map(([href, title, text]) => (
            <PeachCard key={href}>
              <h3 className="text-xl font-semibold">
                <Link href={href} className="text-brand-deep underline-offset-4 hover:underline">
                  {title}
                </Link>
              </h3>
              <p className="text-ink-soft mt-2 leading-7">{text}</p>
            </PeachCard>
          ))}
        </div>
      </Section>
      <RelatedLinks
        tone="wash"
        links={[
          {
            href: "/owner-approved-quoting",
            title: "Owner-approved quoting",
            text: "You send the quote.",
          },
          {
            href: "/website-booking",
            title: "Website + booking",
            text: "A request is not an unsupervised book.",
          },
          {
            href: "/dont-want-to-learn-software",
            title: "I don’t want to learn software",
            text: "For owners who already quit a trial.",
          },
          {
            href: "/",
            title: "Home",
            text: "Two things we build. Five short steps.",
          },
        ]}
      />
      <ContactSection />
    </main>
  );
}
