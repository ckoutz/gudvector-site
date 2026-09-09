import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { ContactForm } from "./contact-form";
import { siteConfig } from "@/lib/site-config";
import { intakeTransport } from "@/lib/gvas";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Güd Vector Consulting Services. Email info@gudvector.com — say whether you need a website, help sending quotes, or both.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        h1="Get in touch."
        lede="The only public contact is email. Say whether you need a website, help sending quotes, or both."
      />
      <Section tone="peach" className="pt-0">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl bg-paper p-8">
            <ContactForm intakeTransport={intakeTransport()} />
          </div>
          <div className="flex flex-col justify-center gap-3">
            <p className="text-[16px] text-char">
              Prefer email? Write to us directly at{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-medium text-orange-ink underline underline-offset-2"
              >
                {siteConfig.email}
              </a>
              .
            </p>
            <p className="text-[15px] text-muted">
              Already a customer? The{" "}
              <a href="/portal" className="font-medium text-orange-ink underline underline-offset-2">
                customer portal
              </a>{" "}
              is where you review a quote, pay, pause, or cancel.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
