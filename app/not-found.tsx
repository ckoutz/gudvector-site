import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found | Güd Vector",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="main" className="bg-cream mx-auto w-full max-w-3xl px-4 py-24 sm:px-6">
      <h1 className="text-4xl font-semibold">That page is not on this site.</h1>
      <p className="text-ink-soft mt-4 text-lg">
        The page you asked for is gone, or it never existed. Start at home or send a note.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="bg-brand inline-flex min-h-11 items-center rounded-full px-5 py-2.5 font-semibold text-white"
        >
          Back home
        </Link>
        <Link
          href="/#contact"
          className="inline-flex min-h-11 items-center rounded-full border border-[#f0d2b4] bg-white px-5 py-2.5 font-semibold"
        >
          Get in touch
        </Link>
      </div>
    </main>
  );
}
