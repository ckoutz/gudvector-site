export type FaqItem = {
  question: string;
  answer: React.ReactNode;
};

/**
 * Visible HTML FAQ only — no FAQPage/QAPage JSON-LD. Google retired FAQ rich
 * results; a native <details> keeps the full Q&A in View Source for crawlers
 * that don't execute JS, while staying keyboard- and screen-reader-friendly
 * with zero client JS.
 */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <dl className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.question} className="group py-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[18px] font-semibold tracking-[-0.01em] text-ink marker:content-none">
            <span>{item.question}</span>
            <span
              aria-hidden="true"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-[18px] leading-none text-muted transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <dd className="mt-3 max-w-[65ch] text-[16px] leading-relaxed text-muted">
            {item.answer}
          </dd>
        </details>
      ))}
    </dl>
  );
}
