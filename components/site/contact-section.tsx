import { ContactForm } from "@/components/site/contact-form";
import { PeachCard, Section } from "@/components/site/section";
import { ENTITY } from "@/lib/site";

export function ContactSection() {
  return (
    <Section id="contact" tone="wash" className="flex-1 pt-12 pb-10 sm:pt-14 sm:pb-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,28rem)] lg:items-start">
        <div>
          <p className="bg-peach text-brand-ink inline-flex rounded-full px-3 py-1 text-sm font-semibold">
            Public contact
          </p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Get in touch.</h2>
          <p className="text-ink-soft mt-4 max-w-xl text-lg leading-8">
            The only public contact is email. Say whether you need a website,
            help sending quotes, or both.
          </p>
          <p className="mt-5 text-lg font-semibold">
            <a
              className="text-brand-deep underline-offset-4 hover:underline"
              href={`mailto:${ENTITY.email}`}
            >
              {ENTITY.email}
            </a>
          </p>
        </div>
        <PeachCard>
          <ContactForm />
        </PeachCard>
      </div>
    </Section>
  );
}
