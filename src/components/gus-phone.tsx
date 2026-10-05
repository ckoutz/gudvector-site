import Image from "next/image";

// Bay Area Services and Jordan Alvarez are placeholders, never a real client.

type Card = { label: string; title: string; sub: string };
type Bubble = { from: "gus" | "me"; text: string; card?: Card; slots?: boolean } | { time: string };

const customerThread: Bubble[] = [
  { from: "gus", text: "Hi, I'm Gus with Bay Area Services. What do you need done?" },
  { from: "me", text: "My water heater is leaking. I'm in Walnut Creek." },
  { from: "gus", text: "Sorry to hear it. Pick a time for a free estimate:", slots: true },
  { from: "gus", text: "You're booked for Thu 9–11 AM. We'll text you a confirmation." },
];

const ownerThread: Bubble[] = [
  { time: "Mon 8:14 AM" },
  {
    from: "gus",
    text: "Estimate added to your calendar.",
    card: { label: "Calendar", title: "Thu 9–11 AM · Jordan Alvarez", sub: "Water heater leak, Walnut Creek" },
  },
  { from: "gus", text: "Jordan's a repeat customer, so I linked it to the March valve job." },
  { time: "Thu 11:02 AM" },
  { from: "me", text: "Quote $1,650 for the 50 gal plus $150 haul-away" },
  {
    from: "gus",
    text: "Here's the quote. Send it?",
    card: { label: "Quote", title: "Jordan Alvarez", sub: "$1,800.00 · 2 items" },
  },
  { from: "me", text: "Send it" },
  { from: "gus", text: "Quote sent to Jordan. I'll tell you when it's accepted." },
];

/** Blank iPhone frame; the screen inset was measured against the 658x1362 source. */
function PhoneFrame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div role="img" aria-label={label} className="relative mx-auto aspect-[658/1362] w-full max-w-[300px]">
      <Image
        src="/brand/iphone-frame-v2.png"
        alt=""
        fill
        sizes="300px"
        className="pointer-events-none select-none"
      />
      <div
        aria-hidden="true"
        className="absolute flex flex-col overflow-hidden rounded-[22px] bg-paper"
        style={{ left: "5.93%", right: "5.78%", top: "7.93%", bottom: "5.43%" }}
      >
        {children}
      </div>
    </div>
  );
}

function Avatar({ size = "h-7 w-7 text-[12px]" }: { size?: string }) {
  return (
    <span className={`inline-flex shrink-0 items-center justify-center rounded-full bg-orange font-semibold text-white ${size}`}>
      G
    </span>
  );
}

function Thread({ items }: { items: Bubble[] }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col justify-end gap-1.5 overflow-hidden px-2.5 pb-2">
      {items.map((m, i) =>
        "time" in m ? (
          <p key={i} className="pt-1 text-center text-[9.5px] text-muted">
            {m.time}
          </p>
        ) : (
          <div key={i} className={m.from === "me" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={
                m.from === "me"
                  ? "max-w-[78%] rounded-[16px] rounded-br-[5px] bg-orange px-2.5 py-1.5 text-[11px] leading-snug text-white"
                  : "max-w-[84%] rounded-[16px] rounded-bl-[5px] bg-[#e9e9eb] px-2.5 py-1.5 text-[11px] leading-snug text-ink"
              }
            >
              {m.text}
              {m.card && (
                <span className="mt-1.5 block rounded-[10px] bg-paper px-2.5 py-2">
                  <span className="block text-[8.5px] font-semibold uppercase tracking-wide text-orange-ink">
                    {m.card.label}
                  </span>
                  <span className="mt-0.5 block text-[11px] font-semibold">{m.card.title}</span>
                  <span className="block text-[10px] text-muted">{m.card.sub}</span>
                </span>
              )}
              {m.slots && (
                <span className="mt-1.5 flex flex-col gap-1">
                  <span className="rounded-full bg-orange px-2.5 py-1 text-center text-[10px] font-medium text-white">
                    Thu 9–11 AM
                  </span>
                  <span className="rounded-full border border-orange/50 bg-paper px-2.5 py-1 text-center text-[10px] font-medium text-orange-ink">
                    Thu 1–3 PM
                  </span>
                  <span className="rounded-full border border-orange/50 bg-paper px-2.5 py-1 text-center text-[10px] font-medium text-orange-ink">
                    Fri 9–11 AM
                  </span>
                </span>
              )}
            </div>
          </div>
        ),
      )}
    </div>
  );
}

function CustomerScreen() {
  return (
    <>
      <div className="flex items-center justify-center gap-1 bg-peach-2 px-3 py-1.5 text-[10px] text-muted">
        <svg width="8" height="10" viewBox="0 0 10 12" fill="none">
          <path d="M2 5V3.5a3 3 0 0 1 6 0V5" stroke="currentColor" strokeWidth="1.2" />
          <rect x="1" y="5" width="8" height="6" rx="1.2" fill="currentColor" />
        </svg>
        Bay Area Services
      </div>
      <div className="flex items-center justify-between border-b border-line px-3 py-2">
        <span className="text-[12px] font-bold tracking-tight text-ink">Bay Area Services</span>
        <span className="rounded-full bg-ink px-2.5 py-1 text-[9px] font-semibold text-white">Book an estimate</span>
      </div>
      <div className="px-3 py-3">
        <p className="text-[15px] font-semibold leading-tight tracking-tight text-ink">
          Water heater trouble? We&apos;ll be right out.
        </p>
        <p className="mt-1 text-[10px] text-muted">Plumbing across the East Bay. Free estimates.</p>
      </div>
      <div className="flex items-center gap-2 border-y border-line bg-peach-2 px-3 py-2">
        <Avatar />
        <span className="leading-tight">
          <span className="block text-[11px] font-semibold text-ink">Gus</span>
          <span className="block text-[9.5px] text-muted">Bay Area Services · online</span>
        </span>
      </div>
      <Thread items={customerThread} />
      <div className="border-t border-line px-2.5 py-2">
        <span className="block rounded-full border border-line px-3 py-1 text-[10.5px] text-muted">Message Gus</span>
      </div>
    </>
  );
}

function OwnerScreen() {
  return (
    <>
      <div className="flex flex-col items-center border-b border-line bg-peach-2 pb-2 pt-1">
        <Avatar size="h-9 w-9 text-[15px]" />
        <span className="mt-1 text-[11px] font-medium text-ink">Gus ›</span>
      </div>
      <Thread items={ownerThread} />
      <div className="flex items-center gap-1.5 border-t border-line px-2.5 py-2">
        <span className="flex-1 rounded-full border border-line px-3 py-1 text-[10.5px] text-muted">Text Message</span>
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange text-[12px] font-semibold text-white">
          ↑
        </span>
      </div>
    </>
  );
}

export function GusPhones({ className = "" }: { className?: string }) {
  return (
    <div className={`mx-auto grid max-w-[760px] gap-14 sm:grid-cols-2 sm:gap-10 ${className}`}>
      <div>
        <PhoneFrame label="A customer books a free estimate with Gus in the chat on a service company's website.">
          <CustomerScreen />
        </PhoneFrame>
        <p className="mt-5 text-center text-[15px] text-muted">
          <span className="font-semibold text-ink">What your customer sees.</span> They book on your website.
        </p>
      </div>
      <div>
        <PhoneFrame label="Gus texts the owner that the estimate is on the calendar, then sends the quote once the owner OKs it.">
          <OwnerScreen />
        </PhoneFrame>
        <p className="mt-5 text-center text-[15px] text-muted">
          <span className="font-semibold text-ink">What you see.</span> Gus texts you. You OK the quote.
        </p>
      </div>
    </div>
  );
}
