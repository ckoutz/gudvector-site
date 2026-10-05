export type Mark = "yes" | "maybe" | "no";
export type Cell = Mark | { text: string };

const markStyles: Record<Mark, { symbol: string; label: string; className: string }> = {
  yes: { symbol: "✓", label: "Yes", className: "font-semibold text-orange-ink" },
  maybe: { symbol: "~", label: "Depends", className: "text-muted" },
  no: { symbol: "—", label: "No", className: "text-muted/60" },
};

export function ComparisonTable({
  columns,
  rows,
}: {
  columns: readonly string[];
  rows: { feature: string; marks: Cell[] }[];
}) {
  const hasText = rows.some((row) => row.marks.some((mark) => typeof mark !== "string"));
  return (
    <div className="relative -mx-5 overflow-x-auto sm:mx-0">
      <table className={`w-full ${hasText ? "min-w-[760px]" : "min-w-[600px]"} border-collapse text-left text-[15px]`}>
        <thead>
          <tr className="border-b border-ink/80">
            <th scope="col" className="sticky left-0 z-10 bg-paper py-3 pl-5 pr-4 font-medium text-muted sm:static sm:pl-0">
              <span className="sr-only">Feature</span>
            </th>
            {columns.map((name, i) => (
              <th
                key={name}
                scope="col"
                className={`px-4 py-3 text-center font-semibold ${i === 0 ? "text-orange-ink" : "text-ink"}`}
              >
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.feature} className="border-b border-line">
              <th scope="row" className="sticky left-0 z-10 bg-paper py-4 pl-5 pr-4 font-medium text-char sm:static sm:pl-0">
                {row.feature}
              </th>
              {row.marks.map((mark, j) => {
                if (typeof mark !== "string") {
                  return (
                    <td
                      key={columns[j]}
                      className={`px-4 py-4 align-top text-[14px] leading-snug ${j === 0 ? "bg-chip/50 font-medium text-ink" : "text-char"}`}
                    >
                      {mark.text}
                    </td>
                  );
                }
                const { symbol, label, className } = markStyles[mark];
                return (
                  <td
                    key={columns[j]}
                    className={`px-4 py-4 text-center text-[17px] ${className} ${j === 0 ? "bg-chip/50" : ""}`}
                  >
                    <span aria-hidden="true">{symbol}</span>
                    <span className="sr-only">{label}</span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
