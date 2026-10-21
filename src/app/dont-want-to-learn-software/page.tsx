import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { FeatureList, Section, SectionHeading } from "@/components/section";
import { Faq } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";
import { GusPhones } from "@/components/gus-phone";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Don't Want to Learn Software? Run Your Office by Text",
  description:
    "Gus is an office manager you text like a person. Ask about your week, approve visits, record payments and message customers. Nothing changes until you reply YES.",
  alternates: { canonical: "/dont-want-to-learn-software" },
};

const points = [
  {
    title: "Text the way you talk",
    body: "No menus, no commands to learn. Ask Gus in your own words, typos and all.",
  },
  {
    title: "Nothing changes until YES",
    body: "Before Gus changes anything, he tells you exactly what he'll do. Messages to a customer show who gets it and the full text. Reply YES, or anything else to cancel.",
  },
  {
    title: "Only your phone",
    body: "Gus answers only the phone number you registered with us. Your customers can't text him as you.",
  },
];

const examples = [
  "What's my week look like?",
  "What's waiting on me?",
  "Who still owes me money?",
  "Daniel paid invoice LL-1036 by check today",
  "Can you block off Friday? Taking the day off.",
  "When's Sam Rivera coming?",
];

export default function DontWantToLearnSoftwarePage() {
  return (
    <>
      <PageHero
        eyebrow="No new software to learn"
        h1="Don't want to learn software? Just text."
        lede="Gus is an office manager you text like a person. He answers your website, books estimates and keeps track of who owes you. You run it from your phone, and nothing changes until you reply YES."
      />

      <Section className="border-t border-line">
        <SectionHeading title="Your customer books. You text Gus." />
        <GusPhones story="landscaping" className="mt-12 sm:mt-16" />
      </Section>

      <Section className="border-t border-line">
        <SectionHeading title="How it works." />
        <FeatureList items={points} />
      </Section>

      <Section tone="muted">
        <SectionHeading
          title="Things owners text Gus."
          lede="These are real texts from our demo. Say it your way and Gus will understand."
        />
        <ul className="mt-10 flex max-w-2xl flex-col gap-3">
          {examples.map((text) => (
            <li
              key={text}
              className="self-start rounded-2xl rounded-bl-md bg-white px-4 py-3 text-[16px] leading-snug text-ink shadow-sm ring-1 ring-line"
            >
              {text}
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Try it"
          title="Text Gus on a demo we built."
          lede="Larkspur is a made-up landscaping company. Gus works the same way for any trade. Its reviews and details aren't real. Open the owner side and text Gus yourself."
        />
        <a
          href={siteConfig.demoUrl}
          className="mt-8 inline-flex min-h-12 items-center rounded-full border border-ink px-6 text-[16px] font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
        >
          Open the Demo
        </a>
      </Section>

      <Section className="border-t border-line">
        <SectionHeading title="Questions" />
        <div className="mt-10">
          <Faq
            items={[
              {
                question: "Do I need to install an app?",
                answer: "No. Gus works over regular text messages from the phone you already have.",
              },
              {
                question: "What if Gus gets it wrong?",
                answer:
                  "He tells you what he's about to do before he does it. If it's not right, reply with anything other than YES and nothing changes.",
              },
              {
                question: "Is there a dashboard too?",
                answer:
                  "Yes, if you want the bigger picture: your calendar, quotes and payments on one screen. You don't have to use it for everyday office work.",
              },
              {
                question: "Do I need to switch from the software I use now?",
                answer: "Not always. We'll look at what you use on the call and tell you honestly.",
              },
            ]}
          />
        </div>
      </Section>

      <CtaBand title="Try running your office by text." />
    </>
  );
}
