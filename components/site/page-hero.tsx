import type { ReactNode } from "react";
import Link from "next/link";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  lede: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, lede, children }: PageHeroProps) {
  return (
    <header className="bg-cream">
      <div className="mx-auto w-full max-w-6xl px-4 pt-12 pb-10 sm:px-6 sm:pt-16">
        {eyebrow ? (
          <p className="bg-peach text-brand-ink inline-flex rounded-full px-3 py-1 text-sm font-semibold">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold sm:text-5xl">
          {title}
        </h1>
        <p className="text-ink-soft mt-5 max-w-2xl text-lg leading-8">{lede}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/#contact"
            className="bg-brand-deep hover:bg-[#a34000] inline-flex min-h-11 items-center rounded-full px-5 py-2.5 font-semibold text-white"
          >
            Get in touch
          </Link>
          <Link
            href="/#how-it-works"
            className="border-border inline-flex min-h-11 items-center rounded-full border bg-white px-5 py-2.5 font-semibold"
          >
            See the steps
          </Link>
        </div>
        {children}
      </div>
    </header>
  );
}
