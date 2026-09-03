"use client";

import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { headerNav, LIVE_PORTAL } from "@/lib/site";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            size="icon-lg"
            className="border-border min-h-11 min-w-11 bg-white"
            aria-label="Open menu"
          />
        }
      >
        <MenuIcon className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="bg-cream w-[min(100%,22rem)]">
        <SheetHeader>
          <SheetTitle className="font-heading text-left text-xl">
            Menu
          </SheetTitle>
        </SheetHeader>
        <nav aria-label="Mobile" className="flex flex-col gap-1 px-4 pb-8">
          {headerNav.map((item) => (
            <SheetClose
              key={item.href}
              render={<Link href={item.href} />}
              className="min-h-11 rounded-xl px-3 py-2.5 text-base font-semibold"
            >
              {item.label}
            </SheetClose>
          ))}
          <SheetClose
            render={<a href={LIVE_PORTAL} />}
            className="min-h-11 rounded-xl px-3 py-2.5 text-base font-semibold"
          >
            Client portal login
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
