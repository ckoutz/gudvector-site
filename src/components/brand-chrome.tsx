import { brand } from "@/lib/brand";
import { siteConfig } from "@/lib/site-config";

function LarkspurMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="var(--color-orange)" />
      <path
        d="M20 31V16M20 22c-5 0-8-3-8-8 5 0 8 3 8 8zM20 19c0-4 3-7 8-7 0 5-3 7-8 7z"
        stroke="#f7f8f4"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BrandHeader() {
  return (
    <header className="border-b border-line bg-peach-2">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:h-[72px] sm:px-6">
        <a
          href={brand.homeUrl}
          className="inline-flex min-h-11 items-center gap-3 font-display text-[18px] font-extrabold tracking-tight text-ink sm:text-[20px]"
        >
          <LarkspurMark />
          {brand.name}
        </a>
      </div>
    </header>
  );
}

export function BrandFooter() {
  return (
    <footer className="border-t border-line bg-peach-2">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-8 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {brand.legalName}
          {brand.demo && " · fictional demo business"}
        </p>
        <p>Powered by {siteConfig.officeName}</p>
      </div>
    </footer>
  );
}
