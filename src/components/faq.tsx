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
        <details key={item.question} className="group py-5 first:pt-0 last:pb-0">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-semibold text-ink marker:content-none">
            <span>{item.question}</span>
            <span
              aria-hidden="true"
              className="shrink-0 text-2xl leading-none text-orange transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <dd className="mt-3 max-w-[70ch] text-[16px] leading-relaxed text-muted">
            {item.answer}
          </dd>
        </details>
      ))}
    </dl>
  );
}
