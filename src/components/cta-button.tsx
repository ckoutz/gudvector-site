import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "filled" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-ink";

const variants: Record<Variant, string> = {
  filled: "bg-orange text-white hover:bg-orange-deep",
  ghost: "border border-ink/20 text-ink hover:border-ink/40 hover:bg-ink/5",
};

export function CtaButton({
  href,
  variant = "filled",
  className = "",
  children,
  ...props
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentProps<typeof Link>, "href">) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}
