"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/portal/owner", label: "Today" },
  { href: "/portal/owner/calendar", label: "Calendar" },
  { href: "/portal/owner/customers", label: "Customers" },
  { href: "/portal/owner/quotes", label: "Quotes & billing" },
  { href: "/portal/owner/settings", label: "Settings" },
] as const;

export function OwnerNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Dashboard" className="-mx-1 flex gap-1 overflow-x-auto">
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={`inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-3.5 py-1.5 text-[14px] font-medium transition-colors ${
              active ? "bg-ink text-paper" : "text-muted hover:bg-ink/5 hover:text-ink"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
