export function Section({
  children,
  className = "",
  tone = "paper",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "paper" | "peach" | "chip";
}) {
  const bg = {
    paper: "bg-paper",
    peach: "bg-peach-2",
    chip: "bg-chip",
  }[tone];

  return (
    <section className={`${bg} ${className}`}>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13px] font-semibold uppercase tracking-wide text-orange-ink">
      {children}
    </p>
  );
}
