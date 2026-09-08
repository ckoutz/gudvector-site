import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, Section } from "@/components/section";
import { PhoneFrame, QuoteMockScreen } from "@/components/phone-mock";
import { Faq } from "@/components/faq";
import { CtaButton } from "@/components/cta-button";

export const metadata: Metadata = {
  title: "Owner-Approved Quoting for Service Shops",
  description:
    "The shop owner still approves the number before the customer sees it. You send the quote. Email info@gudvector.com.",
  alternates: { canonical: "/owner-approved-quoting" },
};

export default function OwnerApprovedQuotingPage() {
  return (
    <>
      <div className="bg-peach-2">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div>
            <Eyebrow>Quotes</Eyebrow>
            <h1 className="mt-3 max-w-xl font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl">
              You approve the quote. Then it goes out.
            </h1>
            <p className="mt-6 max-w-lg text-[18px] leading-relaxed text-muted">
              The shop owner still approves the number before the customer sees it. You send
              the quote. Your customer reviews it, sets up service, and pays in a simple
              portal.
            </p>
            <div className="mt-8">
              <CtaButton href="/contact">Get in touch</CtaButton>
            </div>
          </div>
          <div>
            <PhoneFrame>
              <QuoteMockScreen />
            </PhoneFrame>
            <p className="mt-4 text-center text-[13px] font-medium text-muted">
              What a customer sees on their phone
            </p>
          </div>
        </div>
      </div>

      <Section tone="paper">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          What that means
        </h2>
        <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-muted">
          Owner-approved quoting is a quote the customer cannot see until the owner sends
          it. Not a homeowner pricing the job themselves. Not a template that fires while
          you are on a roof.
        </p>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[520px] border-collapse text-left text-[15px]">
            <caption className="border-b border-line bg-chip px-5 py-3 text-left text-[13px] font-semibold uppercase tracking-wide text-orange-ink caption-top">
              How the number leaves the shop
            </caption>
            <thead>
              <tr className="bg-peach-2">
                <th scope="col" className="px-5 py-3 font-semibold text-char">
                  &nbsp;
                </th>
                <th scope="col" className="px-5 py-3 font-semibold text-char">
                  Owner-approved
                </th>
                <th scope="col" className="px-5 py-3 font-semibold text-char">
                  Self-serve instant quote
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="px-5 py-4 align-top font-medium text-char">
                  Who sets the number
                </th>
                <td className="px-5 py-4 align-top text-muted">
                  The owner, before the customer ever sees it.
                </td>
                <td className="px-5 py-4 align-top text-muted">
                  A formula, based on what the customer enters.
                </td>
              </tr>
              <tr className="bg-peach-2/40">
                <th scope="row" className="px-5 py-4 align-top font-medium text-char">
                  What the customer sees
                </th>
                <td className="px-5 py-4 align-top text-muted">
                  A quote sent by your business, ready to accept or decline.
                </td>
                <td className="px-5 py-4 align-top text-muted">
                  A price the software generated on the spot.
                </td>
              </tr>
              <tr>
                <th scope="row" className="px-5 py-4 align-top font-medium text-char">
                  When it can go wrong
                </th>
                <td className="px-5 py-4 align-top text-muted">
                  Never — nothing goes out until you send it.
                </td>
                <td className="px-5 py-4 align-top text-muted">
                  A job priced without you ever looking at it.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section tone="peach">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          The portal looks like your shop
        </h2>
        <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-muted">
          The customer accepts or rejects a quote, then pays, pauses, or cancels — in a
          portal with your name on it, not a generic checkout.
        </p>
      </Section>

      <Section tone="paper">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Questions
        </h2>
        <div className="mt-6">
          <Faq
            items={[
              {
                question: "Does the software write the quote for me?",
                answer:
                  "No. You send the quote. We will not claim a step you cannot see.",
              },
              {
                question: "Is this a clone of the big field-service logins?",
                answer: (
                  <>
                    No. See our fair{" "}
                    <Link href="/compare" className="underline underline-offset-2">
                      side-by-side comparison
                    </Link>{" "}
                    against Jobber, Housecall Pro, and ServiceTitan, or how a{" "}
                    <Link
                      href="/jobber-housecall-site-builder"
                      className="underline underline-offset-2"
                    >
                      Jobber or Housecall Pro site builder
                    </Link>{" "}
                    compares to a site you own.
                  </>
                ),
              },
            ]}
          />
        </div>
      </Section>
    </>
  );
}
