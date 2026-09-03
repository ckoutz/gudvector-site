import Link from "next/link";

export function PhoneMockup() {
  return (
    <figure className="mx-auto w-[min(100%,18.5rem)]">
      <div className="relative mx-auto w-[16.75rem]">
        <span
          aria-hidden
          className="absolute top-24 -left-[7px] h-16 w-[7px] rounded-l-md bg-[#2b2b2b]"
        />
        <span
          aria-hidden
          className="absolute top-44 -left-[7px] h-10 w-[7px] rounded-l-md bg-[#2b2b2b]"
        />
        <span
          aria-hidden
          className="absolute top-36 -right-[7px] h-20 w-[7px] rounded-r-md bg-[#2b2b2b]"
        />
        <div className="rounded-[2.4rem] bg-[#1b1b1b] p-[0.7rem] shadow-[0_24px_50px_rgba(42,33,24,0.22)]">
          <div className="relative overflow-hidden rounded-[1.85rem] bg-[#fffdf9]">
            <div className="flex items-center justify-between px-5 pt-3 text-[0.7rem] font-semibold text-[#2a2118]">
              <span>9:41</span>
              <span className="flex items-center gap-1" aria-hidden>
                <span className="h-2 w-3 rounded-sm bg-[#2a2118]" />
                <span className="h-2 w-3 rounded-sm bg-[#2a2118]" />
                <span className="h-2 w-4 rounded-sm border border-[#2a2118]" />
              </span>
            </div>
            <div
              aria-hidden
              className="absolute top-2 left-1/2 h-[1.35rem] w-[6.4rem] -translate-x-1/2 rounded-full bg-black"
            />
            <div className="px-5 pt-8 pb-6">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="bg-brand-deep flex size-11 items-center justify-center rounded-2xl text-lg font-bold text-white"
                >
                  Y
                </span>
                <div>
                  <p className="font-heading text-lg leading-none">Your business</p>
                  <p className="text-ink-soft mt-1 text-xs">Bay Area · preview</p>
                </div>
              </div>
              <ul className="mt-5 space-y-2 text-sm">
                <li className="rounded-2xl bg-[#fff1e3] px-3 py-2.5">Yard cleanup</li>
                <li className="rounded-2xl bg-[#fff1e3] px-3 py-2.5">Weekly service</li>
                <li className="rounded-2xl bg-[#fff1e3] px-3 py-2.5">Ask for a quote</li>
              </ul>
              <Link
                href="#contact"
                className="bg-brand-deep mt-5 flex min-h-11 items-center justify-center rounded-full text-sm font-semibold text-white"
              >
                Book now
              </Link>
              <p className="text-ink-soft mt-3 text-center text-xs">
                You still approve the quote.
              </p>
            </div>
            <div
              aria-hidden
              className="mx-auto mb-2 h-1.5 w-28 rounded-full bg-[#2a2118]/80"
            />
          </div>
        </div>
      </div>
      <figcaption className="text-ink-soft mt-4 text-center text-sm">
        What a customer sees on their phone. Labeled preview — not a live client.
      </figcaption>
    </figure>
  );
}
