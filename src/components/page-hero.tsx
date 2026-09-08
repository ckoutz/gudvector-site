import { Eyebrow } from "@/components/section";
import { CtaButton } from "@/components/cta-button";

export function PageHero({
  eyebrow,
  h1,
  lede,
  cta,
}: {
  eyebrow: string;
  h1: string;
  lede: string;
  cta?: { label: string; href: string };
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-14 pt-14 sm:px-6 sm:pt-20">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        {h1}
      </h1>
      <p className="mt-5 max-w-2xl text-[18px] leading-relaxed text-muted">{lede}</p>
      {cta && (
        <div className="mt-8">
          <CtaButton href={cta.href}>{cta.label}</CtaButton>
        </div>
      )}
    </div>
  );
}
