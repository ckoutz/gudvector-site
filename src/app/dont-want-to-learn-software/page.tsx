import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { Faq } from "@/components/faq";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "I Don't Want to Learn Software",
  description:
    "If the owner has to learn a product, it is the wrong product for a one-truck or small crew. You send the quote. Email info@gudvector.com.",
  alternates: { canonical: "/dont-want-to-learn-software" },
};

export default function DontWantToLearnSoftwarePage() {
  return (
    <>
      <PageHero
        eyebrow="For owners who already quit a trial"
        h1="I don’t want to learn software."
        lede="If the shop owner has to learn a product, it is the wrong product for a one-truck or small crew. You should approve a quote on one screen. You should not become the software admin."
      />

      <Section tone="peach" className="pt-0">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-paper p-8">
            <h2 className="font-display text-xl font-semibold text-ink">
              What Tuesday should feel like
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-muted">
              A lead comes in. You send the quote from your phone. The customer reviews it,
              pays, or asks to pause. You are not setting up automations. You are not
              hunting a report. You are running the jobs.
            </p>
          </div>
          <div className="rounded-2xl bg-paper p-8">
            <h2 className="font-display text-xl font-semibold text-ink">
              When packaged software is extra homework
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-muted">
              Packaged field software is the right answer when you want a standard this week
              and you will actually live in it. It is extra homework when you tried a
              14-day trial, went back to a notebook, and still need a site homeowners can
              find.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          Questions owners actually ask
        </h2>
        <div className="mt-6">
          <Faq
            items={[
              {
                question: "I tried a scheduler for two weeks and quit. Now what?",
                answer:
                  "That is common. We set up how you already quote. You do not move the company onto a product you already abandoned.",
              },
              {
                question: "Will my crew have to learn this?",
                answer:
                  "The customer uses a simple portal. You approve quotes. We do not hand the shop a new office job.",
              },
              {
                question: "Is this simpler software with a new login?",
                answer: (
                  <>
                    It is a site plus a system for this shop. See the fast{" "}
                    <Link href="/compare" className="underline underline-offset-2">
                      side-by-side comparison
                    </Link>{" "}
                    against Jobber, Housecall Pro, and ServiceTitan.
                  </>
                ),
              },
              {
                question: "What if I am not a tech person?",
                answer: (
                  <>
                    You should not need to be. One screen: approve or don&apos;t. Email{" "}
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="underline underline-offset-2"
                    >
                      {siteConfig.email}
                    </a>{" "}
                    if you want that walk-through.
                  </>
                ),
              },
              {
                question: "Can I keep my notebook for prices?",
                answer: (
                  <>
                    Yes. The customer never sees the notebook. See{" "}
                    <Link
                      href="/owner-approved-quoting"
                      className="underline underline-offset-2"
                    >
                      owner-approved quoting
                    </Link>
                    .
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
