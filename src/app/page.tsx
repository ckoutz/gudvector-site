import Link from "next/link";
import { CtaButton } from "@/components/cta-button";
import { PhoneFrame, HomeMockScreen } from "@/components/phone-mock";
import { Section, Eyebrow } from "@/components/section";
import { siteConfig } from "@/lib/site-config";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-peach-2">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div>
            <Eyebrow>{siteConfig.areaServed}</Eyebrow>
            <p className="mt-2 text-[15px] font-medium text-char">
              Güd Vector — {siteConfig.motto}.
            </p>
            <h1 className="mt-4 max-w-xl font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]">
              If they can&apos;t find you, they call someone else.
            </h1>
            <p className="mt-6 max-w-lg text-[18px] leading-relaxed text-muted">
              We build a website and a system around how a Bay Area service shop already
              works. You send the quote. The customer pays, pauses, or cancels in a portal
              with your name on it. The site is yours — not a template you have to live in,
              and not new software to learn.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaButton href="/contact">Get in touch</CtaButton>
              <CtaButton href="#how-it-works" variant="ghost">
                See the steps
              </CtaButton>
            </div>
          </div>

          <div>
            <PhoneFrame>
              <HomeMockScreen />
            </PhoneFrame>
            <p className="mt-4 text-center text-[13px] font-medium text-muted">
              What a customer sees on their phone
            </p>
          </div>
        </div>
      </div>

      {/* After the review */}
      <Section tone="paper">
        <h2 className="max-w-2xl font-display text-3xl font-semibold text-ink sm:text-4xl">
          After the review, they still open a page.
        </h2>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted">
          A good listing gets them curious. The website is where they decide whether to call
          you or the next name. If that page is missing or broken, they call someone else.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-line p-7">
            <p className="text-[13px] font-semibold uppercase tracking-wide text-muted">
              What they have now
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold text-ink">
              A directory card
            </h3>
            <p className="mt-3 text-[16px] leading-relaxed text-muted">
              Stars on a listing. A Hotmail address. No page that lists the real work or lets
              someone reach you without hunting.
            </p>
          </div>
          <div className="rounded-2xl border border-orange/30 bg-peach-2 p-7">
            <p className="text-[13px] font-semibold uppercase tracking-wide text-orange-ink">
              What they can open
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold text-ink">
              A page that works on a phone
            </h3>
            <p className="mt-3 text-[16px] leading-relaxed text-muted">
              Your services. A way to ask for a quote. Later, a portal if you want them to
              pay, pause, or cancel without a phone tag.
            </p>
          </div>
        </div>
      </Section>

      {/* Two things we build */}
      <Section tone="peach">
        <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          Two things we build.
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl bg-paper p-8">
            <h3 className="font-display text-2xl font-semibold text-ink">
              A website they can find
            </h3>
            <p className="mt-3 text-[16px] leading-relaxed text-muted">
              For shops with no site, or one that isn&apos;t pulling its weight. Phone-ready
              pages, real copy, local search, click-to-call, and previews you approve before
              anything goes live. You keep the site.
            </p>
          </div>
          <div className="rounded-2xl bg-paper p-8">
            <h3 className="font-display text-2xl font-semibold text-ink">
              A way to send the quote
            </h3>
            <p className="mt-3 text-[16px] leading-relaxed text-muted">
              Practical tools for leads, follow-up, and getting paid — not enterprise
              software. You send the quote. Your customer gets a portal to review it, set up
              service, pay, or pause and cancel. No phone tag. No spreadsheet.
            </p>
          </div>
        </div>
      </Section>

      {/* One site, one system */}
      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              One site, one system, less to manage.
            </h2>
            <p className="mt-4 max-w-md text-[17px] leading-relaxed text-muted">
              For owners who want the business to stay simple. If you are chasing quotes,
              hunting for leads, or juggling separate tools for payments and follow-up, this
              is for you.
            </p>
          </div>
          <div className="rounded-2xl border border-line p-8">
            <h3 className="font-display text-xl font-semibold text-ink">
              You will not become the software admin.
            </h3>
            <p className="mt-3 text-[16px] leading-relaxed text-muted">
              We set up how you already quote, get paid, pause, and cancel. You stay on the
              number. You do not spend nights learning a product built for a shop that is not
              yours.
            </p>
          </div>
        </div>
      </Section>

      {/* Five short steps */}
      <Section tone="peach" className="scroll-mt-20">
        <div id="how-it-works" className="scroll-mt-20">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Five short steps.
          </h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              {
                title: "Tell us what's missing",
                body: "No site, a weak one, or follow-up that keeps falling through.",
              },
              {
                title: "See the plan",
                body: "Look at the pages before we build anything.",
              },
              {
                title: "Approve on your phone",
                body: "Every preview is phone-ready, because that's how your customers will see it.",
              },
              {
                title: "Quote to setup, in one place",
                body: "You send the quote. Your customer reviews it, sets up service, and pays — all through a simple portal. They can pause or cancel the same way.",
              },
              {
                title: "Go live",
                body: "Launch a site and a system your crew can actually run.",
              },
            ].map((step, i) => (
              <li key={step.title} className="rounded-2xl bg-paper p-6">
                <span className="font-display text-2xl font-semibold text-orange">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Who this is for */}
      <Section tone="paper">
        <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
          Who this is for.
        </h2>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted">
          Local service shops in Concord, Contra Costa, and the rest of the Bay Area.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            {
              title: "Service businesses",
              body: "Landscapers, environmental testing, and similar mom-and-pop crews that look strong on a listing and thin on their own site.",
              href: "/service-businesses",
            },
            {
              title: "Plumbers",
              body: "Bay Area pages that work when someone searches from a wet floor.",
              href: "/plumbers",
            },
            {
              title: "Home inspectors",
              body: "Trust, a report, and a fee — without new software to learn.",
              href: "/home-inspectors",
            },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-2xl border border-line p-6 transition-colors hover:border-orange/40 hover:bg-peach-2"
            >
              <h3 className="font-display text-lg font-semibold text-ink">{card.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{card.body}</p>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-[16px] text-char">
          Also:{" "}
          <Link
            href="/owner-approved-quoting"
            className="font-medium text-orange-ink underline underline-offset-2"
          >
            owner-approved quoting
          </Link>{" "}
          and{" "}
          <Link
            href="/website-booking"
            className="font-medium text-orange-ink underline underline-offset-2"
          >
            website + booking
          </Link>
          .
        </p>
      </Section>

      {/* About */}
      <Section tone="peach">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            A San Francisco Bay Area shop.
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-muted">
            {siteConfig.legalName} is a San Francisco Bay Area shop. Our motto:{" "}
            {siteConfig.motto}. We build websites for local service businesses and the
            practical systems that keep leads from going cold — real copy, phone-ready pages,
            quotes and payments through Stripe, and a customer portal for setup, payment, and
            cancellation.
          </p>
        </div>
      </Section>

      {/* Get in touch */}
      <Section tone="paper">
        <div className="flex flex-col items-start gap-6 rounded-2xl border border-line bg-peach-2 p-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
              Get in touch.
            </h2>
            <p className="mt-2 max-w-md text-[16px] leading-relaxed text-muted">
              The only public contact is email. Say whether you need a website, help sending
              quotes, or both.
            </p>
          </div>
          <CtaButton href="/contact" className="shrink-0">
            Get in touch
          </CtaButton>
        </div>
      </Section>
    </>
  );
}
