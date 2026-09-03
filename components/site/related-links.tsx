import Link from "next/link";
import { PeachCard, Section } from "@/components/site/section";

export type RelatedLink = {
  href: string;
  title: string;
  text: string;
};

export function RelatedLinks({
  heading = "Keep reading",
  links,
  tone = "white",
}: {
  heading?: string;
  links: RelatedLink[];
  tone?: "white" | "wash" | "cream";
}) {
  return (
    <Section tone={tone}>
      <h2 className="text-3xl font-semibold">{heading}</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {links.map((link) => (
          <PeachCard key={link.href}>
            <h3 className="text-xl font-semibold">
              <Link href={link.href} className="text-brand-deep underline-offset-4 hover:underline">
                {link.title}
              </Link>
            </h3>
            <p className="text-ink-soft mt-2 leading-7">{link.text}</p>
          </PeachCard>
        ))}
      </div>
    </Section>
  );
}
