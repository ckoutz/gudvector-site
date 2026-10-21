import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { FeatureList, Section, SectionHeading } from "@/components/section";
import { CtaBand } from "@/components/cta-band";
import { Figure } from "@/components/screenshot";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Custom AI Tools for Service Businesses",
  description:
    "When off-the-shelf software doesn't fit, we build the AI tool that does, inside the apps your team already uses.",
  alternates: { canonical: "/custom-ai" },
};

const points = [
  {
    title: "Talk, don't type",
    body: "Techs dictate in the job's Slack channel. No handwritten forms to retype later.",
  },
  {
    title: "Gaps caught on site",
    body: "It asks about vague or missing details once, while they're still on the job.",
  },
  {
    title: "Rules in code, not guesses",
    body: "Numbering and required fields are checked by software, so nothing gets made up.",
  },
];

export default function CustomAiPage() {
  return (
    <>
      <PageHero
        eyebrow="Custom AI"
        h1="AI built around how your crew already works."
        lede="When off-the-shelf software doesn't fit the job, we build the tool that does, inside the apps your team already uses."
        price={siteConfig.pricing.customAi}
      />

      <Section className="border-t border-line">
        <SectionHeading
          eyebrow="Example"
          title="Voice field notes for a survey crew."
          lede="Built for an environmental survey firm. A voice memo becomes their finished field form, in their own layout."
        />
        <Figure
          name="fieldNotes"
          bare
          caption={{
            title: "Illustrative example",
            body: "The building, names and values are invented. Not a real project or client.",
          }}
          sizes="(min-width: 1152px) 1088px, 100vw"
          className="mt-10 sm:mt-14"
        />
        <FeatureList items={points} />
      </Section>

      <CtaBand
        title="Got a process that eats your week?"
        body="Tell us about it on a short call."
      />
    </>
  );
}
