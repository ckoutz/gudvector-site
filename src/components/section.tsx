import Link from "next/link";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Section({
  children,
  className = "",
  tone = "paper",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "paper" | "muted";
  id?: string;
}) {
  const bg = tone === "muted" ? "bg-peach-2 border-y border-line" : "bg-paper";

  return (
    <section id={id} className={`${bg} scroll-mt-20 ${className}`}>
      <Container className="py-20 sm:py-28">{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-orange-ink">
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2
        className={`${eyebrow ? "mt-3" : ""} font-display text-3xl font-semibold tracking-[-0.025em] text-ink sm:text-[2.75rem] sm:leading-[1.1]`}
      >
        {title}
      </h2>
      {lede && <p className="mt-4 text-[18px] leading-relaxed text-muted">{lede}</p>}
    </div>
  );
}

/** Short title + one line, separated by a hairline — used for outcomes, steps, points. */
export function FeatureList({
  items,
  numbered = false,
}: {
  items: { title: string; body: string; href?: string }[];
  numbered?: boolean;
}) {
  const Tag = numbered ? "ol" : "ul";
  return (
    <Tag className="mt-12 grid gap-10 sm:mt-16 md:grid-cols-3 md:gap-8">
      {items.map((item, i) => (
        <li key={item.title} className="border-t border-line pt-6">
          <span
            aria-hidden={!numbered}
            className="font-mono text-[13px] font-medium tabular-nums text-orange-ink"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-3 text-[20px] font-semibold tracking-[-0.01em] text-ink">
            {item.href ? (
              <Link href={item.href} className="group inline-flex items-baseline gap-1.5 hover:text-orange-ink">
                {item.title}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            ) : (
              item.title
            )}
          </h3>
          <p className="mt-2 text-[16px] leading-relaxed text-muted">{item.body}</p>
        </li>
      ))}
    </Tag>
  );
}
