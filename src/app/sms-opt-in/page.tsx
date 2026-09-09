import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "SMS Notifications",
  description:
    "How Güd Vector staff and enrolled business owners opt in to SMS notifications from +1 (877) 541-1550, what messages to expect, and how to opt out.",
  alternates: { canonical: "/sms-opt-in" },
};

const smsNumber = "+1 (877) 541-1550";
const supportPhone = "+1 (925) 858-8301";
const supportEmail = "cameron@gudvector.com";
const mailingAddress = "3125 Wildwood Dr, Concord, CA 94518";

export default function SmsOptInPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="text-[13px] font-semibold uppercase tracking-wide text-orange-ink">
        SMS program
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
        SMS Notifications — {siteConfig.name}.
      </h1>

      <div className="prose-legal mt-8 space-y-6 text-[16px] leading-relaxed text-char">
        <p>
          {siteConfig.name} staff and enrolled business owners can receive text messages
          from <a href="tel:+18775411550" className="font-medium text-orange-ink">{smsNumber}</a>{" "}
          for quote requests, quote confirmations, and job updates.
        </p>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink">How you opt in</h2>
          <p className="mt-2">
            Text the number above from your registered phone, or check the box below when
            enrolling your number with {siteConfig.name}.
          </p>

          <div className="mt-4 rounded-2xl border border-line bg-peach-2 p-6">
            <label className="flex items-start gap-3 text-[15px] text-char">
              <input
                type="checkbox"
                name="sms-consent"
                className="mt-1 h-4 w-4 shrink-0 rounded border-line accent-orange"
                aria-describedby="sms-consent-terms"
              />
              <span>
                I agree to receive SMS messages from {siteConfig.name} at the number I
                provided.
              </span>
            </label>
            <p id="sms-consent-terms" className="mt-3 text-[13px] leading-relaxed text-muted">
              Consent is not a condition of purchase. Message frequency varies (approx. 100
              messages/month). Message and data rates may apply. Reply STOP to unsubscribe at
              any time. Reply HELP for help or contact{" "}
              <a href={`mailto:${supportEmail}`} className="font-medium text-orange-ink">
                {supportEmail}
              </a>{" "}
              /{" "}
              <a href="tel:+19258588301" className="font-medium text-orange-ink">
                {supportPhone}
              </a>
              .
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink">Program details</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-6">
            <li>Consent is not a condition of purchase.</li>
            <li>Message frequency varies (approx. 100 messages/month).</li>
            <li>Message and data rates may apply.</li>
            <li>Reply STOP to unsubscribe at any time.</li>
            <li>
              Reply HELP for help or contact {supportEmail} / {supportPhone}.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink">Policies</h2>
          <p className="mt-2">
            See our{" "}
            <Link href="/privacy" className="font-medium text-orange-ink underline underline-offset-2">
              privacy policy
            </Link>{" "}
            and{" "}
            <Link href="/terms" className="font-medium text-orange-ink underline underline-offset-2">
              terms
            </Link>
            .
          </p>
        </section>

        <p className="text-[15px] text-muted">
          {siteConfig.name}, {mailingAddress}.
        </p>
      </div>
    </div>
  );
}
