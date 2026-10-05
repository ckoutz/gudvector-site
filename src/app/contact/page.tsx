import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/section";
import { ContactForm } from "./contact-form";
import { siteConfig } from "@/lib/site-config";
import { OpenChatButton } from "@/components/chat-bubble";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Güd Vector Consulting Services. Say whether you need a website, automation, or both.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        h1="Get in touch."
        lede="Tell us whether you need a website, automation, or both."
        cta={false}
      />
      <Container className="pb-24 sm:pb-32">
        <div className="grid gap-12 border-t border-line pt-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <ContactForm />
          <div className="flex flex-col gap-6 text-[16px] text-muted">
            <p>
              <span className="block font-semibold text-ink">Email</span>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-ink underline decoration-line underline-offset-4 hover:decoration-orange"
              >
                {siteConfig.email}
              </a>
            </p>
            <p>
              <span className="block font-semibold text-ink">Book a call</span>
              <OpenChatButton className="text-ink underline decoration-line underline-offset-4 hover:decoration-orange">
                Open the chat
              </OpenChatButton>
            </p>
            <p>
              <span className="block font-semibold text-ink">Already a customer?</span>
              <Link
                href="/portal"
                className="text-ink underline decoration-line underline-offset-4 hover:decoration-orange"
              >
                Customer portal
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
