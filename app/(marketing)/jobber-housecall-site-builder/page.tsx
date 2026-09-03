import { ComparisonTable } from "@/components/site/comparison-table";
import { ContactSection } from "@/components/site/contact-section";
import { FaqList } from "@/components/site/faq-list";
import { PageHero } from "@/components/site/page-hero";
import { RelatedLinks } from "@/components/site/related-links";
import { PeachCard, Section } from "@/components/site/section";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata({
    title: "Jobber & Housecall Site Builder vs Custom | Güd Vector",
    description:
      "What a Jobber or Housecall Pro website builder does, and what a custom contractor site you own does instead. Dated 2 Sep 2026. Email info@gudvector.com.",
    path: "/jobber-housecall-site-builder",
  });
}

export default function SiteBuilderPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Comparison · facts dated 2 Sep 2026"
        title="You already have a site in Jobber or Housecall. Is that enough?"
        lede="Jobber includes a website builder on every plan. Housecall Pro sells Websites as an add-on. Both can look fine on day one. The question is what happens to local search, city pages, and the URL if you cancel the login."
      />
      <Section tone="white">
        <p className="text-ink-soft max-w-3xl text-lg leading-8">
          Official pages:{" "}
          <a href="https://www.getjobber.com/pricing/" className="text-brand-deep font-semibold underline-offset-4 hover:underline">
            Jobber pricing
          </a>{" "}
          and{" "}
          <a href="https://www.housecallpro.com/pricing/" className="text-brand-deep font-semibold underline-offset-4 hover:underline">
            Housecall Pro pricing
          </a>
          , fetched 2 September 2026. BrightLocal’s 2026 consumer survey: after
          good reviews, 54% of people visit the business website next. BrightLocal
          also notes only 40% of local businesses have a dedicated website —
          a stricter cut than “listed a URL on Google.”
        </p>
        <div className="mt-8">
          <ComparisonTable
            caption="Bundled builder vs a custom contractor site."
            columns={["", "Jobber / Housecall builder", "Custom site from Güd Vector"]}
            rows={[
              {
                label: "Included?",
                values: [
                  "Jobber: yes, every plan. Housecall: Websites add-on, built and managed by Housecall Pro.",
                  "The site is the project, not a checkbox.",
                ],
              },
              {
                label: "Who hosts the public page",
                values: [
                  "Their platform. 2026 writeups (Kore Komfort, Untap Web) note the site is tied to the CRM host.",
                  "You own the site. Canceling a software login does not take the domain down.",
                ],
              },
              {
                label: "City / service pages and schema",
                values: [
                  "Those same 2026 writeups describe no serious city-page set, no blog, and thin schema. Verify on a live builder site before you treat that as gospel for your account.",
                  "Unique pages for real services. LocalBusiness JSON-LD that matches the visible text.",
                ],
              },
              {
                label: "When they are the right answer",
                values: [
                  "You need a public URL this week and already live in that scheduler.",
                  "The listing is strong and the owned site is the leak — or you want quoting and a portal under the same brand.",
                ],
              },
            ]}
          />
        </div>
      </Section>
      <Section tone="wash">
        <PeachCard>
          <h2 className="text-2xl font-semibold">Keeping the scheduler, owning the site</h2>
          <p className="text-ink-soft mt-3 leading-7">
            Some shops should keep Jobber or Housecall for the calendar and
            still own the public site. We will not promise a live integration
            path we have not built for that job. If it is not wired yet, we
            say so.
          </p>
        </PeachCard>
      </Section>
      <Section tone="white">
        <h2 className="text-3xl font-semibold">Questions</h2>
        <div className="mt-6">
          <FaqList
            items={[
              {
                question: "Do I need a website if I have Google, Angi, or Yelp?",
                answer:
                  "Those listings start the trust. The website is where a lot of people confirm you. If it is missing, the listing did the hard part for a competitor.",
              },
              {
                question: "How much does a contractor website cost?",
                answer:
                  "Bay Area agencies publish packages in the low thousands to low tens of thousands. We do not invent a Güd Vector price on this page. Email info@gudvector.com.",
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
            text: "Full product comparison, including the fair row.",
          },
          {
            href: "/housecall-pro-alternative",
            title: "Housecall Pro alternative",
            text: "Includes their Websites add-on.",
          },
          {
            href: "/owner-approved-quoting",
            title: "Owner-approved quoting",
            text: "What the builder will not encode.",
          },
          {
            href: "/dont-want-to-learn-software",
            title: "I don’t want to learn software",
            text: "If the builder still made you the admin.",
          },
        ]}
      />
      <ContactSection />
    </main>
  );
}
