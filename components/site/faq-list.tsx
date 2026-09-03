import type { ReactNode } from "react";

export type FaqItem = {
  question: string;
  answer: ReactNode;
};

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-2xl border border-[#f0d2b4] bg-white px-5 py-2"
        >
          <summary className="font-heading min-h-11 cursor-pointer list-none py-3 text-lg font-medium marker:content-none">
            <span className="flex items-center justify-between gap-4">
              {item.question}
              <span aria-hidden className="text-brand text-2xl leading-none group-open:hidden">
                +
              </span>
              <span aria-hidden className="text-brand hidden text-2xl leading-none group-open:inline">
                −
              </span>
            </span>
          </summary>
          <div className="text-ink-soft pb-4 text-base leading-7">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
