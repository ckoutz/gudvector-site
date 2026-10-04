"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMark } from "@/components/logo";
import { BookCallButton } from "@/components/cta-button";
import { headerNav } from "@/lib/site-config";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `text-[15px] font-medium transition-colors hover:text-ink ${
      pathname === href ? "text-ink" : "text-muted"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:h-[72px] sm:px-8">
        <LogoMark className="h-9 w-auto shrink-0 sm:h-10" />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {headerNav.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <Link href="/portal" className={linkClass("/portal")}>
            Customer login
          </Link>
          <BookCallButton />
        </div>

        <button
          type="button"
          className="-mr-2 inline-flex items-center justify-center rounded-md p-2 text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 8h16M4 16h16"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-line bg-paper px-5 pb-6 pt-2 md:hidden"
        >
          <ul className="flex flex-col divide-y divide-line">
            {[...headerNav, { label: "Customer login", href: "/portal" }].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-[17px] font-medium text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <BookCallButton size="lg" className="mt-4 w-full" onClick={() => setOpen(false)} />
        </nav>
      )}
    </header>
  );
}
