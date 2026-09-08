import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { Faq } from "@/components/faq";

export const metadata: Metadata = {
  title: "Websites & Quoting Systems for Owners Who Don't Want New Software",
  description:
    "Güd Vector builds websites and quoting systems for Bay Area service businesses — no new app to download, and nothing new for your customers to learn either.",
  alternates: { canonical: "/service-businesses" },
};

export default function ServiceBusinessesPage() {
  return (
    <>
      <PageHero
        eyebrow="For Bay Area service businesses"
        h1="If they can't find you, they call someone else."
        lede="You didn&apos;t get into this business to become the software admin. We build a website and quoting system around how you already work — no new app to download, no new technology to learn."
        cta={{ label: "Talk to Güd Vector", href: "/contact" }}
      />

      <Section tone="peach" className="pt-0">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          No new app, for you or your customer
        </h2>
        <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-muted">
          Nothing to download, nothing to install, on either end. Your customers already
          know how to click a link in a text or email; that&apos;s all this asks of them. You
          keep working the way you already do; we handle what&apos;s behind it.
        </p>
      </Section>

      <Section tone="paper">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          We use what you&apos;ve already got
        </h2>
        <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-muted">
          You don&apos;t need to switch how you quote, schedule, or keep track of jobs. We
          work with your current systems and make the parts around them run smoother —
          reminders, follow-up, getting the quote out — without touching how you actually
          decide what to charge. You still write the quote. You still send it. See{" "}
          <Link href="/owner-approved-quoting" className="underline underline-offset-2">
            owner-approved quoting
          </Link>
          .
        </p>
      </Section>

      <Section tone="chip">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Who this is for
        </h2>
        <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-muted">
          Landscapers. Plumbers. HVAC. Electrical. Roofing. Pool service. Cleaning. Pest
          control. Handyman. Home inspectors. Environmental testing. And any other
          owner-run service business where the person doing the work is still the one
          calling the shots — and doesn&apos;t want that to change.
        </p>
      </Section>

      <Section tone="peach">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Concord, Pleasant Hill, Walnut Creek, Martinez
        </h2>
        <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-muted">
          For Bay Area shops that already get work from neighbors and listings, and need a
          site that does not lose that click. Start from the{" "}
          <Link href="/bay-area" className="underline underline-offset-2">
            Bay Area page
          </Link>
          .
        </p>
      </Section>

      <Section tone="paper">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Questions service businesses ask
        </h2>
        <div className="mt-6">
          <Faq
            items={[
              {
                question: "Do I need a site if the listing is already strong?",
                answer:
                  "A strong listing helps. After a good review, more than half of people still open the website next (BrightLocal, 2026). A missing or weak site is the leak.",
              },
              {
                question: "What if I already have a site inside my scheduler?",
                answer:
                  "Those builders are a brochure on someone else's host. See our owner-approved quoting page for what a site and a system you own looks like instead.",
              },
              {
                question: "Does my customer have to create an account or download anything?",
                answer:
                  "No. They get a link, set up a profile on your site, and pay right there — no app store, no separate login to remember.",
              },
              {
                question: "Can quotes still require my approval?",
                answer: "Yes. That is the point. You send the quote.",
              },
            ]}
          />
        </div>
      </Section>
    </>
  );
}
