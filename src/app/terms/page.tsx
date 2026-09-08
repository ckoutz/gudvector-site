import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Terms for using the Güd Vector Consulting Services website and customer portal — quotes, payment, accounts, and SMS.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="text-[13px] font-semibold uppercase tracking-wide text-orange-ink">
        Updated August 2026
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
        Using this site.
      </h1>

      <div className="prose-legal mt-8 space-y-6 text-[16px] leading-relaxed text-char">
        <p>
          The website and customer portal at gudvector.com are how we quote work, set up
          service, and take payment.
        </p>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink">Quotes</h2>
          <p className="mt-2">
            A quote is an offer. Work starts after you accept. You send the quote; your
            customer reviews it, sets up service, and pays in the portal.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink">
            Pausing and canceling
          </h2>
          <p className="mt-2">
            If your service can be paused or canceled, that happens in the portal.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink">Accounts</h2>
          <p className="mt-2">
            Email, Google, and phone sign-in create a customer account, not a shop login. Do
            not use the portal to open someone else&apos;s quotes.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink">Payment and SMS</h2>
          <p className="mt-2">
            Payment is processed by Stripe. We use Twilio to send quote links and one-time
            login codes.
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
            with any question about these terms.
          </p>
        </section>
      </div>
    </div>
  );
}
