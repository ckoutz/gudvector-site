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
    // Phone: two full-width rows (3 + 2 tabs), so the row sits centred under the
    // heading. Wider screens: one left-aligned row of pills.
    <nav aria-label="Dashboard" className="grid grid-cols-6 gap-1 sm:-mx-1 sm:flex sm:flex-wrap">
      {tabs.map((tab, index) => {
        const active = pathname === tab.href || (tab.href !== "/portal/owner" && pathname.startsWith(`${tab.href}/`));
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={`inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-full px-3 py-1.5 text-[14px] font-medium transition-colors sm:px-3.5 ${
              index < 3 ? "col-span-2" : "col-span-3"
            } ${
              active ? "bg-action text-paper" : "text-muted hover:bg-ink/5 hover:text-ink"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
