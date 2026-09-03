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
    title: "ServiceTitan Alternative for Small Shops | Güd Vector",
    description:
      "If you are a small Bay Area shop, ServiceTitan’s operator-reported per-tech price and long contracts are usually the wrong product. Dated 2 Sep 2026.",
    path: "/servicetitan-alternative",
  });
}

export default function ServiceTitanAlternativePage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Comparison · facts dated 2 Sep 2026"
        title="A ServiceTitan alternative for small shops — not “Titan, cheaper.”"
        lede="If you are a small Bay Area shop, ServiceTitan’s operator-reported ~$245–$500 per tech per month and 12-month contracts are usually the wrong product. ServiceTitan does not publish a public dollar price."
      />
      <Section tone="white">
        <p className="text-ink-soft max-w-3xl text-lg leading-8">
          Official vendor page:{" "}
          <a
            href="https://www.servicetitan.com/pricing"
            className="text-brand-deep font-semibold underline-offset-4 hover:underline"
          >
            servicetitan.com/pricing
          </a>
          . It describes per-technician pricing and does not list dollars.
          Dollar bands below are operator-reported in 2026 contractor writeups,
          not vendor-published.
        </p>
        <div className="mt-8">
          <ComparisonTable
            caption="ServiceTitan vs Jobber / Housecall vs a custom build. Size first."
            columns={["", "ServiceTitan", "Jobber / Housecall Pro", "Güd Vector"]}
            rows={[
              {
                label: "Who it fits",
                values: [
                  "Larger trades shops, often 10–20+ techs, with a dispatcher and a pricebook. Vendor has said it is not optimized for 3 or fewer technicians (repeated in 2026 contractor guides; not independently verified on ServiceTitan.com in the 2 Sep 2026 research pass).",
                  "1–15 person crews that want a standard login this week.",
                  "Owner-operators and small crews that need a site they own plus quote rules the packages will not encode.",
                ],
              },
              {
                label: "Money (2 Sep 2026)",
                values: [
                  "No official public price. Operator-reported ~$245–$500 per technician per month; implementation $5,000–$50,000+; 12–36 month contracts. Always unofficial.",
                  "Public stickers: Jobber Core $29/$49; Housecall Basic $59. See their official pricing pages.",
                  "Project quote. No public rate card here.",
                ],
              },
              {
                label: "Time to live",
                values: [
                  "Full Stack HVAC 2026: 12–16 week setup; other 2026 reviews 3–6 months.",
                  "Days. 14-day trials, no card.",
                  "A build, not a trial. We still show pages and workflows before we build.",
                ],
              },
              {
                label: "When they are the right answer",
                values: [
                  "20–200 tech shops that need marketplace, pricebook, dispatch, and financing. Let them have that hill.",
                  "Crews that want scheduling and invoicing without a custom project.",
                  "Small shops that took a Titan demo, saw enterprise pricing, and still need a site + quoting + portal.",
                ],
              },
            ]}
          />
        </div>
      </Section>
      <Section tone="wash">
        <PeachCard>
          <h2 className="text-2xl font-semibold">When ServiceTitan is the right answer</h2>
          <p className="text-ink-soft mt-3 leading-7">
            Large shops with a dedicated office person, a real pricebook, and
            the budget for implementation should talk to ServiceTitan. We will
            not pitch Güd Vector as “ServiceTitan, cheaper.”
          </p>
        </PeachCard>
      </Section>
      <Section tone="white">
        <h2 className="text-3xl font-semibold">Questions</h2>
        <div className="mt-6">
          <FaqList
            items={[
              {
                question: "Do you have an official ServiceTitan price?",
                answer:
                  "No. Nobody outside their sales process does. If a page quotes a dollar without saying “operator-reported,” treat it as marketing.",
              },
              {
                question: "Should a 5-person Bay Area shop start with Titan?",
                answer: (
                  <>
                    Usually no. Start with{" "}
                    <Link href="/jobber-alternative" className="text-brand-deep font-semibold underline-offset-4 hover:underline">
                      Jobber
                    </Link>{" "}
                    or{" "}
                    <Link href="/housecall-pro-alternative" className="text-brand-deep font-semibold underline-offset-4 hover:underline">
                      Housecall Pro
                    </Link>{" "}
                    if you want packaged software, or a custom site + quoting
                    path if those packages already failed you.
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
            href: "/jobber-alternative",
            title: "Jobber alternative",
            text: "The more common small-shop SaaS answer.",
          },
          {
            href: "/housecall-pro-alternative",
            title: "Housecall Pro alternative",
            text: "The other common small-shop SaaS answer.",
          },
          {
            href: "/owner-approved-quoting",
            title: "Owner-approved quoting",
            text: "Control without a 12–16 week implementation.",
          },
          {
            href: "/dont-want-to-learn-software",
            title: "I don’t want to learn software",
            text: "Titan’s learning curve is the cautionary tale.",
          },
        ]}
      />
      <ContactSection />
    </main>
  );
}
