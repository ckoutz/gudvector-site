"use client";

import { useState } from "react";

const field =
  "min-h-11 w-full rounded-xl border border-line bg-paper px-3 text-[15px] text-ink focus:border-ink/40 focus:outline-none";

function money(cents: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

/** Months and amount, with the difference from months × price shown as he types. */
export function PlanAmount({
  priceCents,
  currency,
  interval,
}: {
  priceCents: number;
  currency: string;
  interval: "month" | "year";
}) {
  const yearly = interval === "year";
  const options = yearly ? [12, 24] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 18, 24];
  const due = (count: number) => (yearly ? priceCents * (count / 12) : priceCents * count);
  const [months, setMonths] = useState(options[0]);
  const [amount, setAmount] = useState((due(options[0]) / 100).toFixed(2));
  const [edited, setEdited] = useState(false);
  const expected = due(months);
  const cents = /^\d+(\.\d{1,2})?$/.test(amount) ? Math.round(Number(amount) * 100) : null;
  const diff = cents === null ? 0 : cents - expected;
  const periods = yearly ? months / 12 : months;
  return (
    <>
      <label className="grid gap-1 text-[13px] text-muted">
        Covers
        <select
          name="months"
          required
          value={months}
          onChange={(event) => {
            const next = Number(event.target.value);
            setMonths(next);
            if (!edited) setAmount((due(next) / 100).toFixed(2));
          }}
          className={field}
        >
          {options.map((count) => (
            <option key={count} value={count}>
              {yearly ? `${count / 12} year${count > 12 ? "s" : ""}` : `${count} month${count > 1 ? "s" : ""}`}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 text-[13px] text-muted">
        Amount received
        <input
          name="amount"
          required
          inputMode="decimal"
          pattern="\d+(\.\d{1,2})?"
          value={amount}
          onChange={(event) => {
            setAmount(event.target.value);
            setEdited(true);
          }}
          className={field}
        />
      </label>
      <p aria-live="polite" className="text-[12px] text-muted sm:col-span-2">
        {periods} × {money(priceCents, currency)} = {money(expected, currency)}
        {diff !== 0 && ` · ${money(Math.abs(diff), currency)} ${diff < 0 ? "less (discount)" : "more"}`}
      </p>
    </>
  );
}
