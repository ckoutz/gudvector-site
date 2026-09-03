import Link from "next/link";
import { BrandLogo } from "@/components/site/brand-logo";
import { MobileNav } from "@/components/site/mobile-nav";
import { headerNav, LIVE_PORTAL } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-border/80 bg-cream/95 sticky top-0 z-40 border-b backdrop-blur-sm">
      <div className="mx-auto flex h-[4.25rem] w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="block w-[7.75rem] shrink-0 rounded-md focus-visible:outline-3"
          aria-label="Güd Vector home"
        >
          <BrandLogo priority className="w-full" />
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {headerNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-ink-soft hover:text-ink min-h-11 rounded-full px-3 py-2 text-[0.95rem] font-semibold"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={LIVE_PORTAL}
            className="text-ink-soft hover:text-ink min-h-11 rounded-full px-3 py-2 text-[0.95rem] font-semibold"
          >
            Customer portal
          </a>
          <Link
            href="/#contact"
            className="bg-brand hover:bg-brand-deep min-h-11 rounded-full px-4 py-2 text-[0.95rem] font-semibold text-white"
          >
            Get in touch
          </Link>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/#contact"
            className="bg-brand hover:bg-brand-deep min-h-11 rounded-full px-4 py-2 text-sm font-semibold text-white"
          >
            Get in touch
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
