import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { FeatureList, Section, SectionHeading } from "@/components/section";
import { CtaBand } from "@/components/cta-band";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Custom AI Tools for Service Businesses",
  description:
    "When off-the-shelf software doesn't fit, we build the AI tool that does, inside the apps your team already uses.",
  alternates: { canonical: "/custom-ai" },
};

const exchange = [
  {
    from: "Technician",
    text: "Area 1, floor tile and mastic, twelve-by-twelve tan tile, rooms 104 and 114, intact, samples 01-1 and 01-2.",
  },
  { from: "Assistant", text: "Got it. Is the tile friable or non-friable?" },
  { from: "Technician", text: "Non-friable. Done." },
  { from: "Assistant", text: "Area 1 complete. Your finished form is posted to the channel." },
];

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
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            eyebrow="Example"
            title="Voice field notes for a survey crew."
            lede="Built for an environmental survey firm. A voice memo becomes their finished field form, in their own layout."
          />
          <ol className="flex flex-col gap-3" aria-label="Example conversation">
            {exchange.map((line, i) => (
              <li
                key={i}
                className={`max-w-[90%] rounded-2xl px-5 py-4 text-[16px] leading-relaxed ${
                  line.from === "Technician"
                    ? "self-end bg-ink text-paper"
                    : "self-start border border-line bg-peach-2 text-char"
                }`}
              >
                <span className="sr-only">{line.from}: </span>
                {line.text}
              </li>
            ))}
          </ol>
        </div>
        <FeatureList items={points} />
      </Section>

      <CtaBand
        title="Got a process that eats your week?"
        body="Tell us about it on a short call."
      />
    </>
  );
}
