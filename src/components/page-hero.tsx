import { Container, Eyebrow } from "@/components/section";
import { BookCallButton } from "@/components/cta-button";

export function PageHero({
  eyebrow,
  h1,
  lede,
  price,
  cta = true,
}: {
  eyebrow: string;
  h1: string;
  lede: string;
  price?: string;
  cta?: boolean;
}) {
  return (
    <Container className="pb-14 pt-16 sm:pb-20 sm:pt-28">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-4 max-w-4xl font-display text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.035em] text-ink sm:text-6xl">
        {h1}
      </h1>
      <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-muted sm:text-[20px]">
        {lede}
      </p>
      {price && <p className="mt-4 text-[17px] font-semibold text-ink sm:text-[18px]">{price}</p>}
      {cta && (
        <div className="mt-10">
          <BookCallButton size="lg" />
        </div>
      )}
    </Container>
  );
}
