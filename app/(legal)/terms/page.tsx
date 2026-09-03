import { ContactSection } from "@/components/site/contact-section";
import { Section } from "@/components/site/section";
import { pageMetadata } from "@/lib/metadata";
import { ENTITY } from "@/lib/site";

export function generateMetadata() {
  return pageMetadata({
    title: "Terms | Güd Vector",
    description:
      "Terms for using the Güd Vector website and customer portal. Quotes, payment, accounts, and SMS. Email info@gudvector.com.",
    path: "/terms",
    ogTitle: "Terms | Güd Vector",
  });
}

export default function TermsPage() {
  return (
    <main id="main">
      <Section tone="cream" className="pt-12">
        <h1 className="text-4xl font-semibold sm:text-5xl">Using this site.</h1>
        <p className="text-ink-soft mt-4 text-lg">
          {ENTITY.name} · {ENTITY.areaServed} · {ENTITY.email}
        </p>
      </Section>
      <Section tone="white">
        <div className="mx-auto max-w-3xl space-y-8 text-lg leading-8">
          <section>
            <h2 className="text-2xl font-semibold">The shop</h2>
            <p className="text-ink-soft mt-3">
              {ENTITY.name} is a {ENTITY.areaServed} shop. The website and
              customer portal at gudvector.com are how we quote work, set up
              service, and take payment. Public contact is {ENTITY.email}.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold">Quotes and payment</h2>
            <p className="text-ink-soft mt-3">
              A quote is an offer. Work starts after you accept. Payment is
              processed by Stripe. If your service can be paused or canceled,
              that happens in the portal.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold">Accounts</h2>
            <p className="text-ink-soft mt-3">
              Email, Google, and phone sign-in create a customer account, not a
              shop login. Do not use the portal to open someone else&apos;s
              quotes.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold">Texts</h2>
            <p className="text-ink-soft mt-3">
              We use Twilio to send quote links and one-time login codes. Google
              sign-in uses Google&apos;s account screen.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold">Questions</h2>
            <p className="text-ink-soft mt-3">
              Email {ENTITY.email}.
            </p>
            <p className="text-ink-soft mt-3">Updated August 2026.</p>
          </section>
        </div>
      </Section>
      <ContactSection />
    </main>
  );
}
