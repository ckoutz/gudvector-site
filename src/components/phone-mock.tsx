import Image from "next/image";
import { LogoMarkImage } from "@/components/logo";

/**
 * Blank iPhone frame + screen cutout. Screen-area inset was measured against
 * the source asset (public/brand/iphone-frame-v2.png, 658x1362) so the
 * fake status bar baked into the frame lines up with the content below it.
 * Two screens use this frame: the quote/portal mock (owner-approved quoting)
 * and the homepage mock (home hero) — same chrome, different job.
 */
export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[300px] sm:max-w-[320px]">
      <div className="relative aspect-[658/1362] w-full">
        <Image
          src="/brand/iphone-frame-v2.png"
          alt=""
          aria-hidden="true"
          fill
          preload
          sizes="(min-width: 640px) 320px, 300px"
          className="pointer-events-none select-none"
        />

        <div
          className="absolute overflow-hidden rounded-[22px] bg-paper"
          style={{ left: "5.93%", right: "5.78%", top: "7.93%", bottom: "5.43%" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * /owner-approved-quoting hero: the customer's quote/portal screen. Review,
 * accept or decline, then pay / pause / cancel — the flow described in
 * 05-writer-copy-pack.md step 4 and the owner-approved-quoting copy.
 * "Your Business" is a placeholder — never Güd Vector or a real client.
 */
export function QuoteMockScreen() {
  return (
    <div className="flex h-full flex-col px-4 py-3.5">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-chip text-[13px] font-bold text-orange-ink">
          Y
        </div>
        <p className="text-[14px] font-semibold text-ink">Your Business</p>
      </div>

      <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-muted">
        Quote
      </p>

      <div className="mt-2 rounded-xl border border-line bg-peach-2 p-3">
        <div className="flex items-center justify-between text-[13px] text-char">
          <span>Job estimate</span>
          <span className="font-semibold">$1,240</span>
        </div>
        <p className="mt-1 text-[11px] text-muted">Sent by Your Business</p>
      </div>

      <div className="mt-3 flex flex-col gap-2">
        <div className="rounded-full bg-orange py-2 text-center text-[13px] font-semibold text-white">
          Accept &amp; pay
        </div>
        <div className="rounded-full border border-ink/15 py-2 text-center text-[13px] font-medium text-char">
          Decline
        </div>
      </div>

      <div className="mt-auto flex items-center justify-center gap-3 border-t border-line pt-2.5 text-[11px] font-medium text-muted">
        <span>Manage service</span>
        <span aria-hidden="true">·</span>
        <span>Pause</span>
        <span aria-hidden="true">·</span>
        <span>Cancel</span>
      </div>
    </div>
  );
}

/**
 * Home hero: gudvector.com's own homepage, on a phone — "this is what gets
 * found," not the quote product. A browser address bar makes clear it's a
 * real website, not the portal app (which has no chrome). Static recreation
 * of the real hero content, not a live iframe — keeps the hero a still image
 * (LCP) instead of a nested app.
 */
export function HomeMockScreen() {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-paper">
      <div className="flex items-center gap-1.5 border-b border-line bg-peach-2 px-3 py-2">
        <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
          <path
            d="M2 5V3.5a3 3 0 0 1 6 0V5"
            stroke="currentColor"
            strokeWidth="1.1"
            className="text-muted"
          />
          <rect x="1" y="5" width="8" height="6" rx="1.2" className="fill-muted/70" />
        </svg>
        <div className="flex-1 rounded-md bg-paper py-1 text-center text-[10px] text-muted">
          gudvector.com
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-line px-3.5 py-2.5">
        <LogoMarkImage className="h-8 w-auto self-start" />
        <div className="rounded-full bg-orange px-3 py-1.5 text-[10px] font-semibold text-white">
          Get in touch
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-3.5 py-4">
        <div className="inline-block rounded-full border border-ink/15 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-wide text-char">
          San Francisco Bay Area
        </div>
        <p className="mt-2.5 text-[11px] font-medium leading-snug text-orange-ink">
          Güd Vector — sending your company in the right direction.
        </p>
        <p className="mt-2.5 font-display text-[21px] font-semibold leading-[1.15] text-ink">
          If they can&apos;t find you, they call someone else.
        </p>
        <p className="mt-2.5 text-[10.5px] leading-relaxed text-muted">
          We build a website and a system around how a Bay Area service shop already works.
          You send the quote. The site is yours.
        </p>
        <div className="mt-3.5 flex flex-col gap-1.5">
          <div className="rounded-full bg-orange py-2 text-center text-[11px] font-semibold text-white">
            Get in touch
          </div>
          <div className="rounded-full border border-ink/15 py-2 text-center text-[11px] font-medium text-char">
            See the steps
          </div>
        </div>
      </div>
    </div>
  );
}
