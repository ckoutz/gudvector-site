"use client";

import { useState } from "react";
import Link from "next/link";
import { LogoMark } from "@/components/logo";
import { CtaButton } from "@/components/cta-button";
import { headerNav } from "@/lib/site-config";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <LogoMark className="h-12 w-auto shrink-0 sm:h-14" />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {headerNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[16px] font-medium text-char hover:text-orange-ink"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/portal"
            className="text-[16px] font-medium text-char hover:text-orange-ink"
          >
            Customer portal
          </Link>
        </nav>

        <div className="hidden md:block">
          <CtaButton href="/contact">Get in touch</CtaButton>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-char md:hidden"
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
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
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
          className="border-t border-line bg-paper px-4 pb-5 pt-2 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {[...headerNav, { label: "Customer portal", href: "/portal" }].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-3 text-[16px] font-medium text-char hover:bg-chip"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <CtaButton href="/contact" className="mt-3 w-full">
            Get in touch
          </CtaButton>
        </nav>
      )}
    </header>
  );
}
