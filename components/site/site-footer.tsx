import Link from "next/link";
import { BrandLogo } from "@/components/site/brand-logo";
import { PortalLoginLink } from "@/components/site/portal-login-link";
import { comparisonNav, ENTITY, footerNav } from "@/lib/site";

export function SiteFooter() {
  const workLinks = footerNav.filter(
    (item) => item.href !== "/privacy" && item.href !== "/terms",
  );
  const legalLinks = footerNav.filter(
    (item) => item.href === "/privacy" || item.href === "/terms",
  );

  return (
    <footer className="border-border mt-auto border-t bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(16rem,20rem)_1fr]">
        <div>
          <Link
            href="/"
            className="block w-full max-w-[18rem]"
            aria-label="Güd Vector home"
          >
            <BrandLogo variant="wordmark" />
          </Link>
          <p className="text-ink-soft mt-4 text-sm leading-6">
            {ENTITY.name}
            <br />
            {ENTITY.areaServed}
            <br />
            <a className="text-brand-deep font-semibold underline-offset-2 hover:underline" href={`mailto:${ENTITY.email}`}>
              {ENTITY.email}
            </a>
          </p>
          <p className="text-ink-soft mt-3 text-sm italic">
            {ENTITY.motto}
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="font-heading text-lg">Pages</p>
            <ul className="mt-3 space-y-2">
              {workLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ink-soft hover:text-ink min-h-11 inline-flex items-center text-sm font-semibold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-heading text-lg">Comparisons</p>
            <ul className="mt-3 space-y-2">
              {comparisonNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ink-soft hover:text-ink min-h-11 inline-flex items-center text-sm font-semibold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-heading text-lg">Also</p>
            <ul className="mt-3 space-y-2">
              <li>
                <PortalLoginLink className="text-ink-soft hover:text-ink min-h-11 inline-flex items-center text-sm font-semibold" />
              </li>
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ink-soft hover:text-ink min-h-11 inline-flex items-center text-sm font-semibold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-border border-t">
        <p className="text-ink-soft mx-auto max-w-6xl px-4 py-4 text-sm sm:px-6">
          {ENTITY.name} · gudvector.com · {ENTITY.email}
        </p>
      </div>
    </footer>
  );
}
