import Link from "next/link";
import { BrandLogo } from "@/components/site/brand-logo";
import { MobileNav } from "@/components/site/mobile-nav";
import { PortalLoginLink } from "@/components/site/portal-login-link";
import { headerHashNav, headerNav } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-border/80 bg-cream/95 sticky top-0 z-40 border-b backdrop-blur-sm">
      <div className="mx-auto flex min-h-[4.25rem] w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="block shrink-0 rounded-md focus-visible:outline-3"
          aria-label="Güd Vector home"
        >
          <BrandLogo
            priority
            className="h-12 w-auto max-w-[10rem] object-contain object-left"
          />
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-1 xl:flex">
          {headerNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-ink-soft hover:text-ink min-h-11 rounded-full px-3 py-2 text-[0.95rem] font-semibold"
            >
              {item.label}
            </Link>
          ))}
          {headerHashNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-ink-soft hover:text-ink min-h-11 rounded-full px-3 py-2 text-[0.95rem] font-semibold"
            >
              {item.label}
            </Link>
          ))}
          <PortalLoginLink className="text-ink-soft hover:text-ink min-h-11 rounded-full px-3 py-2 text-[0.95rem] font-semibold" />
          <Link
            href="/#contact"
            className="bg-brand-deep hover:bg-[#a34000] min-h-11 rounded-full px-4 py-2 text-[0.95rem] font-semibold text-white"
          >
            Get in touch
          </Link>
        </nav>
        <div className="flex items-center gap-2 xl:hidden">
          <Link
            href="/#contact"
            className="bg-brand-deep hover:bg-[#a34000] min-h-11 rounded-full px-4 py-2 text-sm font-semibold text-white"
          >
            Get in touch
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
