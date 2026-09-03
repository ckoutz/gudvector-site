import Link from "next/link";
import { ComparisonTable } from "@/components/site/comparison-table";
import { ContactSection } from "@/components/site/contact-section";
import { FaqList } from "@/components/site/faq-list";
import { PageHero } from "@/components/site/page-hero";
import { RelatedLinks } from "@/components/site/related-links";
import { Section } from "@/components/site/section";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata({
    title: "Website + Booking for Home Services | Güd Vector",
    description:
      "Online booking does not have to mean the software books the job without you. Custom websites for Bay Area home services. Email info@gudvector.com.",
    path: "/website-booking",
  });
}

export default function WebsiteBookingPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Website + booking"
        title="Booking on your site does not mean software books the job without you."
        lede="Custom quoting here means the shop owner still approves the number before the customer sees it. A homeowner can ask for a time. You still send the quote."
      />
      <Section tone="white">
        <ComparisonTable
          caption="How a request can work, without handing the job to a login."
          columns={["", "Scheduler website", "Calendly-style link", "Güd Vector"]}
          rows={[
            {
              label: "What the customer does",
              values: [
                "Picks a slot the software treats as booked",
                "Picks a 30-minute meeting",
                "Asks for a time on a page that looks like your shop",
              ],
            },
            {
              label: "Who approves the quote",
              values: [
                "Often the template",
                "There is no job quote",
                "You. You send the quote.",
              ],
            },
            {
              label: "Who owns the page",
              values: [
                "The scheduler host",
                "The meeting tool",
                "You",
              ],
            },
            {
              label: "Fits",
              values: [
                "Crews that want a standard book button this week",
                "A solo who only needs a chat",
                "Shops with quote rules, pause/cancel, or a weak site",
              ],
            },
          ]}
        />
      </Section>
      <Section tone="wash">
        <h2 className="text-3xl font-semibold">Cleaning and landscaping first</h2>
        <p className="text-ink-soft mt-4 max-w-2xl text-lg leading-8">
          Weekly clean and weekly mow are the jobs where a book button sounds
          easy — and where a bad one steals the afternoon. See{" "}
          <Link href="/landscapers" className="text-brand-deep font-semibold underline-offset-4 hover:underline">
            landscapers
          </Link>{" "}
          and the{" "}
          <Link href="/concord" className="text-brand-deep font-semibold underline-offset-4 hover:underline">
            Concord page
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
                question: "Can customers book online without me learning a new dashboard?",
                answer:
                  "They can request a time on your site. You do not have to live in a product to accept the job.",
              },
              {
                question: "Who approves the quote — me or the software?",
                answer: (
                  <>
                    You. See{" "}
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
            text: "The differentiator. You send the quote.",
          },
          {
            href: "/dont-want-to-learn-software",
            title: "I don’t want to learn software",
            text: "If you have to learn the product, it is the wrong product.",
          },
          {
            href: "/landscapers",
            title: "Landscapers",
            text: "Concord and East Bay landscapers.",
          },
          {
            href: "/plumbers",
            title: "Plumbers",
            text: "Bay Area industry page.",
          },
        ]}
      />
      <ContactSection />
    </main>
  );
}
