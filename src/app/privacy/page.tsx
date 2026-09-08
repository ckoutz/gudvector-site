import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Güd Vector Consulting Services uses the information you give us when you contact us, open a quote, or create a portal account.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="text-[13px] font-semibold uppercase tracking-wide text-orange-ink">
        Updated August 2026
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
        How we use your information.
      </h1>

      <div className="prose-legal mt-8 space-y-6 text-[16px] leading-relaxed text-char">
        <p>
          This page covers {siteConfig.legalName} (&ldquo;{siteConfig.name}&rdquo;), the
          gudvector.com website, and the customer portal at gudvector.com/portal.
        </p>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink">What we collect</h2>
          <p className="mt-2">
            We collect the name, email, and phone number you give us when you contact us,
            open a quote, or create a portal account.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink">How we use it</h2>
          <p className="mt-2">We use that information to:</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-6">
            <li>Send quotes and respond to what you send us through the contact form.</li>
            <li>Run portal accounts, including signing in with email, phone, or Google.</li>
            <li>
              Send quote links and one-time login codes by SMS through Twilio Verify.
            </li>
            <li>Take payment through Stripe. Payment is processed by Stripe.</li>
          </ul>
          <p className="mt-3">We do not sell this information.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink">How long we keep it</h2>
          <p className="mt-2">
            We keep quote, account, and payment records while we work with you, and as
            needed for bookkeeping.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink">Questions</h2>
          <p className="mt-2">
            Email{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-medium text-orange-ink underline underline-offset-2"
            >
              {siteConfig.email}
            </a>{" "}
            with any question about how we handle your information.
          </p>
        </section>
      </div>
    </div>
  );
}
