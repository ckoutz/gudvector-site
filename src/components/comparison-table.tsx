export type ComparisonRow = {
  feature: string;
  gudVector: string;
  competitor: string;
};

export function ComparisonTable({
  competitorName,
  caption,
  rows,
}: {
  competitorName: string;
  caption?: string;
  rows: ComparisonRow[];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line">
      <table className="w-full min-w-[560px] border-collapse text-left text-[15px]">
        {caption && (
          <caption className="border-b border-line bg-chip px-5 py-3 text-left text-[13px] font-semibold uppercase tracking-wide text-orange-ink caption-top">
            {caption}
          </caption>
        )}
        <thead>
          <tr className="bg-peach-2">
            <th scope="col" className="px-5 py-3 font-semibold text-char">
              &nbsp;
            </th>
            <th scope="col" className="px-5 py-3 font-semibold text-char">
              Güd Vector
            </th>
            <th scope="col" className="px-5 py-3 font-semibold text-char">
              {competitorName}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.feature} className={i % 2 === 1 ? "bg-paper" : "bg-peach-2/40"}>
              <th scope="row" className="px-5 py-4 align-top font-medium text-char">
                {row.feature}
              </th>
              <td className="px-5 py-4 align-top text-muted">{row.gudVector}</td>
              <td className="px-5 py-4 align-top text-muted">{row.competitor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function WhenTheyreRight({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-line bg-peach-2 p-6">
      <p className="text-[13px] font-semibold uppercase tracking-wide text-orange-ink">
        When {name} is the right answer
      </p>
      <p className="mt-2 max-w-[65ch] text-[16px] leading-relaxed text-char">{children}</p>
    </div>
  );
}
