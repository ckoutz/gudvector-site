import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  tone?: "cream" | "white" | "wash";
  className?: string;
  children: ReactNode;
};

export function Section({
  id,
  tone = "cream",
  className,
  children,
}: SectionProps) {
  const tones = {
    cream: "bg-cream",
    white: "bg-white",
    wash: "bg-wash",
  };

  return (
    <section
      id={id}
      className={cn("py-16 sm:py-20", id && "scroll-mt-[6.5rem]", tones[tone], className)}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

export function WhiteCard({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white bg-white p-6 shadow-[0_10px_30px_rgba(42,33,24,0.06)] sm:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function PeachCard({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("bg-peach rounded-3xl p-3 sm:p-4", className)}>
      <div className="rounded-[1.35rem] bg-white p-6 sm:p-8">{children}</div>
    </div>
  );
}
