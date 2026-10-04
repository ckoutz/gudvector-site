import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { SMS_CONSENT_COPY } from "@/lib/sms";

export const metadata: Metadata = {
  title: "SMS Notifications",
  description:
    "How customers and business owners opt in to SMS notifications from Güd Vector at +1 (877) 541-1550, what messages to expect, how often, and how to opt out.",
  alternates: { canonical: "/sms-opt-in" },
};

const smsNumber = "+1 (877) 541-1550";
const supportEmail = "cameron@gudvector.com";

const linkClass = "font-medium text-orange-ink underline underline-offset-2";

function ConsentExample({ children, note }: { children: React.ReactNode; note: string }) {
  return (
    <figure className="mt-4 rounded-2xl border border-line bg-peach-2 p-6">
      <label className="flex items-start gap-3 text-[15px] text-char">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 shrink-0 rounded border-line accent-orange"
        />
        <span>{children}</span>
      </label>
      <figcaption className="mt-3 text-[13px] leading-relaxed text-muted">{note}</figcaption>
    </figure>
  );
}

export default function SmsOptInPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="text-[13px] font-semibold uppercase tracking-wide text-orange-ink">
        SMS program
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
        SMS Notifications — {siteConfig.name}.
      </h1>

      <div className="prose-legal mt-8 space-y-8 text-[16px] leading-relaxed text-char">
        <p>
          {siteConfig.legalName} sends transactional text messages from{" "}
          <a href="tel:+18775411550" className="font-medium text-orange-ink">
            {smsNumber}
          </a>{" "}
          to two groups of people who have opted in: <strong>customers</strong> who book a
          call or receive a quote, and <strong>business owners and staff</strong> who use{" "}
          {siteConfig.name} to approve quotes and bookings. We never send marketing or
          promotional texts.
        </p>

        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">For customers</h2>

          <h3 className="mt-4 text-[17px] font-semibold text-ink">How you opt in</h3>
          <p className="mt-2">
            When you book a call in the chat on gudvector.com, or send us a message through
            the{" "}
            <Link href="/contact" className={linkClass}>
              contact form
            </Link>
            , you can tick an optional checkbox that reads:
          </p>
          <ConsentExample note="Unchecked by default. Booking a call or getting a quote does not require it.">
            {SMS_CONSENT_COPY}
          </ConsentExample>
          <p className="mt-3">
            We only text the phone number you give us, and only if that box is checked.
          </p>

          <h3 className="mt-6 text-[17px] font-semibold text-ink">What you&apos;ll receive</h3>
          <ul className="mt-2 list-disc space-y-1.5 pl-6">
            <li>Links to your quote when it&apos;s ready to review and pay.</li>
            <li>Booking confirmations and appointment updates (time changes, reminders).</li>
            <li>Replies to messages you send us.</li>
          </ul>

          <h3 className="mt-6 text-[17px] font-semibold text-ink">How often</h3>
          <p className="mt-2">
            Message frequency varies with your booking or quote, usually 1–5 messages per
            booking or quote.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">
            For business owners and staff
          </h2>

          <h3 className="mt-4 text-[17px] font-semibold text-ink">How you opt in</h3>
          <p className="mt-2">
            Text the number above from your registered phone, or check this box when you
            enroll your number with {siteConfig.name}:
          </p>
          <ConsentExample note="Unchecked by default. Consent is not a condition of using Güd Vector.">
            I agree to receive business update SMS messages from {siteConfig.name} (quote
            drafts for approval, quote approval and delivery confirmations, and appointment
            updates) at the number I provided.
          </ConsentExample>

          <h3 className="mt-6 text-[17px] font-semibold text-ink">What you&apos;ll receive</h3>
          <ul className="mt-2 list-disc space-y-1.5 pl-6">
            <li>Approval requests for quote drafts and customer booking requests.</li>
            <li>Confirmations that an approved quote or booking was delivered to the customer.</li>
            <li>Appointment updates for jobs on your calendar.</li>
          </ul>

          <h3 className="mt-6 text-[17px] font-semibold text-ink">How often</h3>
          <p className="mt-2">
            Message frequency varies with your business volume (approx. 100 messages/month).
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">Program details</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-6">
            <li>Consent is not a condition of purchase.</li>
            <li>No marketing or promotional messages are sent.</li>
            <li>Message and data rates may apply.</li>
            <li>Reply STOP to unsubscribe at any time. You&apos;ll get one confirmation text.</li>
            <li>
              Reply HELP for help, or email{" "}
              <a href={`mailto:${supportEmail}`} className={linkClass}>
                {supportEmail}
              </a>
              .
            </li>
            <li>Carriers are not liable for delayed or undelivered messages.</li>
            <li>
              Mobile numbers and opt-in consent are never shared with or sold to third parties
              for marketing.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">Policies</h2>
          <p className="mt-2">
            See our{" "}
            <Link href="/privacy" className={linkClass}>
              privacy policy
            </Link>{" "}
            and{" "}
            <Link href="/terms" className={linkClass}>
              terms
            </Link>
            . Questions? Email{" "}
            <a href={`mailto:${supportEmail}`} className={linkClass}>
              {supportEmail}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
