import Link from "next/link";
import { LogoLockup } from "@/components/logo";
import { footerNav, siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-line bg-peach-2">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.1fr)_repeat(4,minmax(0,1fr))]">
          <div>
            <LogoLockup className="h-28 w-auto" />
            <p className="mt-4 max-w-xs text-[15px] text-muted">
              {siteConfig.legalName} — {siteConfig.motto}.
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-3 inline-block text-[15px] font-medium text-orange-ink hover:text-orange-deep"
            >
              {siteConfig.email}
            </a>
          </div>

          {footerNav.map((group) => (
            <div key={group.heading}>
              <h3 className="text-[13px] font-semibold uppercase tracking-wide text-muted">
                {group.heading}
              </h3>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[15px] text-char hover:text-orange-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            {siteConfig.legalName} · gudvector.com · {siteConfig.email}
          </p>
          <p>{siteConfig.areaServed}</p>
        </div>
      </div>
    </footer>
  );
}
