import Link from "next/link";
import { BrandLogo } from "@/components/site/brand-logo";
import { ContactSection } from "@/components/site/contact-section";
import { PeachCard, Section, WhiteCard } from "@/components/site/section";
import { PhoneMockup } from "@/components/site/phone-mockup";
import { pageMetadata } from "@/lib/metadata";
import { ENTITY } from "@/lib/site";

export function generateMetadata() {
  return pageMetadata({
    title: "Güd Vector | Websites & Systems for Bay Area Service Businesses",
    description:
      "Fast, mobile-first websites and simple business systems for local service companies in the San Francisco Bay Area. Email info@gudvector.com.",
    path: "/",
  });
}

const steps = [
  {
    n: "01",
    title: "Tell us what's missing",
    text: "No site, a weak one, or follow-up that keeps falling through.",
  },
  {
    n: "02",
    title: "Get a clear plan",
    text: "See the pages and workflows before we build anything.",
  },
  {
    n: "03",
    title: "Approve on your phone",
    text: "Every preview is phone-ready, because that's how your customers will see it.",
  },
  {
    n: "04",
    title: "Quote to setup, in one place",
    text: "You send the quote. Your customer reviews it, sets up service, and pays — all through a simple portal. They can pause or cancel the same way.",
  },
  {
    n: "05",
    title: "Go live",
    text: "A site and quotes you can run from your phone.",
  },
];

const industries = [
  {
    href: "/landscapers",
    title: "Landscapers",
    text: "Concord and East Bay shops that look strong on Angi and thin on their own domain.",
  },
  {
    href: "/plumbers",
    title: "Plumbers",
    text: "Bay Area pages that work when someone searches from a wet floor.",
  },
  {
    href: "/home-inspectors",
    title: "Home inspectors",
    text: "Trust, report delivery, and a fee — without a new dashboard to learn.",
  },
  {
    href: "/environmental-testing",
    title: "Environmental testing",
    text: "A portal for the report and the bill. We do not invent lab certs.",
  },
];

export default function HomePage() {
  return (
    <main id="main">
      <Section tone="cream" className="pt-10 sm:pt-14">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_18.5rem]">
          <div>
            <p className="bg-peach text-brand-ink inline-flex rounded-full px-3 py-1 text-sm font-semibold">
              San Francisco Bay Area
            </p>
            <p className="text-ink-soft mt-5 text-lg">
              Güd Vector — {ENTITY.motto}
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold sm:text-5xl lg:text-6xl">
              {ENTITY.h1}
            </h1>
            <p className="text-ink-soft mt-5 max-w-2xl text-lg leading-8">
              After a good review they still look you up on Google — and a lot
              of them now ask ChatGPT who to call.
            </p>
            <p className="text-ink-soft mt-4 max-w-2xl text-lg leading-8">
              You get a phone-ready page you own, live fast. Then quoting and
              pay are wired to how you already work — not another dashboard you
              learn.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="bg-brand-deep hover:bg-[#a34000] inline-flex min-h-11 items-center rounded-full px-5 py-2.5 font-semibold text-white"
              >
                Get in touch
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex min-h-11 items-center rounded-full border border-[#f0d2b4] bg-white px-5 py-2.5 font-semibold"
              >
                See how it works
              </Link>
            </div>
          </div>
          <PhoneMockup />
        </div>
      </Section>

      <Section tone="white">
        <p className="bg-peach text-brand-ink inline-flex rounded-full px-3 py-1 text-sm font-semibold">
          What a customer opens on their phone
        </p>
        <h2 className="mt-4 max-w-3xl text-3xl font-semibold sm:text-4xl">
          Their shop vs a page a homeowner can use.
        </h2>
        <p className="text-ink-soft mt-4 max-w-2xl text-lg leading-8">
          After a good review, a lot of people still hit the website next. If
          that site is missing or broken, they call someone else. This is a
          labeled preview — not a live client.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <PeachCard>
            <p className="text-ink-soft text-sm font-semibold uppercase tracking-wide">
              What they have now
            </p>
            <h3 className="mt-2 text-2xl font-semibold">A directory card</h3>
            <p className="text-ink-soft mt-3 leading-7">
              Stars on a listing. A Hotmail address. No owned page that lists
              the real services or lets someone reach you without hunting.
            </p>
          </PeachCard>
          <PeachCard>
            <p className="text-ink-soft text-sm font-semibold uppercase tracking-wide">
              What a customer can open
            </p>
            <h3 className="mt-2 text-2xl font-semibold">A phone-first page</h3>
            <p className="text-ink-soft mt-3 leading-7">
              Your services. A way to ask for a quote. A portal later, if you
              want them to pay, pause, or cancel without a phone tag.
            </p>
          </PeachCard>
        </div>
      </Section>

      <Section id="services" tone="wash">
        <h2 className="text-3xl font-semibold sm:text-4xl">Two pillars.</h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <PeachCard>
            <h3 className="text-2xl font-semibold">Website building for small business</h3>
            <p className="text-ink-soft mt-3 leading-7">
              For businesses with no site, or one that isn&apos;t pulling its
              weight. Clean, mobile-first pages for their shop — real copy,
              local SEO, and a click-to-call button on their site, plus
              previews you approve before anything goes live.
            </p>
          </PeachCard>
          <PeachCard>
            <h3 className="text-2xl font-semibold">Automating business systems</h3>
            <p className="text-ink-soft mt-3 leading-7">
              Practical systems for leads, follow-up, and simple workflows —
              not enterprise software. You send the quote, and your customer
              gets a portal to review it, set up service, pay, or pause and
              cancel — no phone tag, no spreadsheets.
            </p>
          </PeachCard>
        </div>
      </Section>

      <Section tone="white">
        <h2 className="max-w-3xl text-3xl font-semibold sm:text-4xl">
          {ENTITY.tagline}
        </h2>
        <p className="text-ink-soft mt-4 max-w-2xl text-lg leading-8">
          Business owners who want running their business to be simple. If
          you&apos;re chasing quotes, hunting for leads, or juggling separate
          tools for payments and follow-up, this is for you — one site, one
          system, less to manage.
        </p>
        <WhiteCard className="border-border mt-8 border">
          <h3 className="text-2xl font-semibold">You will not become the software admin.</h3>
          <p className="text-ink-soft mt-3 max-w-3xl leading-7">
            We encode how you already quote, get paid, pause, and cancel. You
            stay in the loop on the number. You do not spend nights learning a
            product built for a shop that is not yours.
          </p>
        </WhiteCard>
      </Section>

      <Section id="how-it-works" tone="wash">
        <h2 className="text-3xl font-semibold sm:text-4xl">Five short steps.</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {steps.map((step) => (
            <li key={step.n}>
              <PeachCard>
                <p className="text-brand font-heading text-sm font-semibold">{step.n}</p>
                <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-ink-soft mt-2 leading-7">{step.text}</p>
              </PeachCard>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="white">
        <h2 className="text-3xl font-semibold sm:text-4xl">Who this is for.</h2>
        <p className="text-ink-soft mt-4 max-w-2xl text-lg leading-8">
          Start with the{" "}
          <Link href="/concord" className="text-brand-deep font-semibold underline-offset-4 hover:underline">
            Concord and Contra Costa hub
          </Link>
          , then the trade page that matches the shop.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {industries.map((item) => (
            <PeachCard key={item.href}>
              <h3 className="text-xl font-semibold">
                <Link href={item.href} className="text-brand-deep underline-offset-4 hover:underline">
                  {item.title}
                </Link>
              </h3>
              <p className="text-ink-soft mt-2 leading-7">{item.text}</p>
            </PeachCard>
          ))}
        </div>
        <p className="text-ink-soft mt-8">
          Also see{" "}
          <Link href="/owner-approved-quoting" className="text-brand-deep font-semibold underline-offset-4 hover:underline">
            owner-approved quoting
          </Link>{" "}
          and{" "}
          <Link href="/website-booking" className="text-brand-deep font-semibold underline-offset-4 hover:underline">
            website + booking
          </Link>
          .
        </p>
      </Section>

      <Section id="about" tone="wash">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              A San Francisco Bay Area shop.
            </h2>
            <p className="text-ink-soft mt-4 max-w-2xl text-lg leading-8">
              Güd Vector Consulting Services is a San Francisco Bay Area shop.
              Our motto: {ENTITY.motto} We build websites for local service
              businesses and set up the practical systems that keep leads from
              going cold — real copy, phone-ready pages, quotes and payments
              through Stripe, and a customer portal for setup, payment, and
              cancellation.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-4">
            <BrandLogo variant="full" />
          </div>
        </div>
      </Section>

      <ContactSection />
    </main>
  );
}
