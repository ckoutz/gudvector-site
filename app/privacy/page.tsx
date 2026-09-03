import { ContactSection } from "@/components/site/contact-section";
import { Section } from "@/components/site/section";
import { pageMetadata } from "@/lib/metadata";
import { ENTITY } from "@/lib/site";

export function generateMetadata() {
  return pageMetadata({
    title: "Privacy | Güd Vector",
    description:
      "How Güd Vector Consulting Services uses information on gudvector.com and the customer portal. Email info@gudvector.com.",
    path: "/privacy",
    ogTitle: "Privacy | Güd Vector",
  });
}

export default function PrivacyPage() {
  return (
    <main id="main">
      <Section tone="cream" className="pt-12">
        <h1 className="text-4xl font-semibold sm:text-5xl">How we use your information.</h1>
        <p className="text-ink-soft mt-4 text-lg">
          {ENTITY.name} · {ENTITY.areaServed} · {ENTITY.email}
        </p>
      </Section>
      <Section tone="white">
        <div className="prose-gv mx-auto max-w-3xl space-y-8 text-lg leading-8">
          <section>
            <h2 className="text-2xl font-semibold">Who we are</h2>
            <p className="text-ink-soft mt-3">
              {ENTITY.name} is a {ENTITY.areaServed} shop. This page is for the
              website and customer portal at gudvector.com. Questions go to{" "}
              {ENTITY.email}.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold">What we collect</h2>
            <p className="text-ink-soft mt-3">
              When you use the contact form on this site, we collect your name,
              email, whether you need a website, systems, or both, and your
              message.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold">How we use it</h2>
            <p className="text-ink-soft mt-3">We use that information to:</p>
            <ul className="text-ink-soft mt-3 list-disc space-y-2 pl-6">
              <li>Send quotes and run your customer portal account</li>
              <li>Let you sign in with Google (Google shares your name and email)</li>
              <li>Take payment through Stripe</li>
              <li>Send quote links and one-time login codes by SMS through Twilio Verify</li>
            </ul>
            <p className="text-ink-soft mt-3">We do not sell this information.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold">How long we keep it</h2>
            <p className="text-ink-soft mt-3">
              We keep quote, account, and payment records while we work with
              you, and as needed for bookkeeping.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold">Contact</h2>
            <p className="text-ink-soft mt-3">
              Email {ENTITY.email} if you want us to update or remove your
              account details.
            </p>
            <p className="text-ink-soft mt-3">Updated August 2026.</p>
          </section>
        </div>
      </Section>
      <ContactSection />
    </main>
  );
}
