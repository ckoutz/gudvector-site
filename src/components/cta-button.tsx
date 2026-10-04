import Link from "next/link";
import type { ComponentProps } from "react";
import { OpenChatButton } from "@/components/chat-bubble";

type Variant = "filled" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-ink";

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-[15px]",
  lg: "px-7 py-3.5 text-[16px]",
};

const variants: Record<Variant, string> = {
  filled: "bg-orange text-white hover:bg-orange-deep",
  ghost: "border border-line text-ink hover:border-ink/30 hover:bg-peach-2",
};

export function ctaClasses(variant: Variant = "filled", size: Size = "md"): string {
  return `${base} ${sizes[size]} ${variants[variant]}`;
}

export function CtaButton({
  href,
  variant = "filled",
  size = "md",
  className = "",
  children,
  ...props
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentProps<typeof Link>, "href">) {
  return (
    <Link href={href} className={`${ctaClasses(variant, size)} ${className}`} {...props}>
      {children}
    </Link>
  );
}

/** The site's one primary action: opens the floating booking chat. */
export function BookCallButton({
  size = "md",
  className = "",
  onClick,
}: {
  size?: Size;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <OpenChatButton className={`${ctaClasses("filled", size)} ${className}`} onClick={onClick}>
      Book a call
      <span aria-hidden="true">→</span>
    </OpenChatButton>
  );
}
