import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { IntakeChat } from "@/components/intake-chat";
import { gvasEnv, intakeTransport } from "@/lib/gvas";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Book an inspection",
  description:
    "Book an inspection in a quick chat: tell us what's going on, pick a time that works, and the owner confirms by email or text.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  const calendlyUrl = gvasEnv.calendlyUrl || null;

  return (
    <>
      <PageHero
        eyebrow="Book"
        h1="Book an inspection."
        lede="Answer a few quick questions, pick a time that works, and Cameron confirms by email or text. No account needed."
      />
      <Section tone="peach" className="pt-0">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <IntakeChat transport={intakeTransport()} />
          <div className="flex flex-col justify-center gap-3">
            <p className="text-[16px] text-char">
              Every booking is reviewed by a person before it&apos;s confirmed, so you&apos;ll
              never get an auto-scheduled visit nobody planned for.
            </p>
            {calendlyUrl && (
              <p className="text-[15px] text-muted">
                Prefer a calendar?{" "}
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-orange-ink underline underline-offset-2"
                >
                  Book directly on Calendly
                </a>
                .
              </p>
            )}
            <p className="text-[15px] text-muted">
              Questions first? Email{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-medium text-orange-ink underline underline-offset-2"
              >
                {siteConfig.email}
              </a>
              .
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
