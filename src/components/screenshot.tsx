import Image from "next/image";

// Captured from the real app in GVAS_MOCK mode (see public/screenshots/).
// Width/height are the PNGs' pixel size (2x captures).
export const screenshots = {
  chat: {
    src: "/screenshots/chat.png",
    width: 760,
    height: 1200,
    alt: "Bay Area Services booking chat offering a customer times for an estimate",
  },
  quote: {
    src: "/screenshots/quote.png",
    width: 1536,
    height: 1200,
    alt: "A quote page with line items, total, and Accept and Decline buttons",
  },
  portal: {
    src: "/screenshots/portal.png",
    width: 1536,
    height: 1200,
    alt: "A customer portal listing quotes and an active monthly subscription",
  },
  fieldNotes: {
    src: "/screenshots/field-notes-ipad-pro.png",
    width: 2400,
    height: 1740,
    alt: "Illustrative example on an iPad, in a #field-notes channel for an invented Example Building. A technician's voice note says: Area 1, floor tile and mastic, twelve-by-twelve tan tile, rooms 104 and 114, intact, samples 01-1 and 01-2. The assistant asks: Is the tile friable or non-friable? The technician answers: Non-friable. Done. The assistant replies: Area 1 complete. Your finished form is posted to the channel. The finished form lists rooms 104 and 114, floor tile 12 by 12 inches tan, mastic, intact, non-friable, and 2 samples.",
  },
} as const;

export type ScreenshotName = keyof typeof screenshots;

export function Screenshot({
  name,
  sizes,
  preload = false,
  bare = false,
  className = "",
}: {
  name: ScreenshotName;
  sizes: string;
  preload?: boolean;
  bare?: boolean;
  className?: string;
}) {
  const shot = screenshots[name];
  const frame = bare
    ? ""
    : "overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_1px_2px_rgba(12,10,9,0.04),0_24px_48px_-24px_rgba(12,10,9,0.18)]";
  return (
    <div className={`${frame} ${className}`}>
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        sizes={sizes}
        preload={preload}
        className="h-auto w-full"
      />
    </div>
  );
}

export function Figure({
  name,
  caption,
  sizes,
  preload,
  bare,
  className = "",
}: {
  name: ScreenshotName;
  caption: { title: string; body: string };
  sizes: string;
  preload?: boolean;
  bare?: boolean;
  className?: string;
}) {
  return (
    <figure className={className}>
      <Screenshot name={name} sizes={sizes} preload={preload} bare={bare} />
      <figcaption className="mt-5">
        <span className="font-semibold text-ink">{caption.title}.</span>{" "}
        <span className="text-muted">{caption.body}</span>
      </figcaption>
    </figure>
  );
}
