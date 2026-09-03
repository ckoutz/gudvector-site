export type ComparisonRow = {
  label: string;
  values: string[];
};

export function ComparisonTable({
  caption,
  columns,
  rows,
}: {
  caption: string;
  columns: string[];
  rows: ComparisonRow[];
}) {
  return (
    <div className="overflow-x-auto rounded-3xl bg-white p-2">
      <table className="w-full min-w-[40rem] border-separate border-spacing-0 text-left text-sm">
        <caption className="text-ink-soft px-3 pt-3 pb-4 text-left text-base">
          {caption}
        </caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="border-border bg-wash text-ink border-b px-3 py-3 font-heading text-base font-semibold first:rounded-tl-2xl last:rounded-tr-2xl"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="align-top">
              <th
                scope="row"
                className="border-border border-b px-3 py-3 font-semibold"
              >
                {row.label}
              </th>
              {row.values.map((value, index) => (
                <td key={`${row.label}-${index}`} className="border-border text-ink-soft border-b px-3 py-3 leading-6">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
