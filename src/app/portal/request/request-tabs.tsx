"use client";

import { useId, useState } from "react";
import { IntakeChat, type IntakeTransport } from "@/components/intake-chat";
import { RequestForm } from "./request-form";

type Tab = "chat" | "note";

const tabs: { id: Tab; label: string }[] = [
  { id: "chat", label: "Chat to schedule" },
  { id: "note", label: "Send a note" },
];

export function RequestTabs({
  businessName,
  calendlyUrl,
  intakeTransport,
}: {
  businessName: string;
  calendlyUrl: string | null;
  intakeTransport: IntakeTransport;
}) {
  const [active, setActive] = useState<Tab>("chat");
  const baseId = useId();

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const idx = tabs.findIndex((t) => t.id === active);
    const next = tabs[(idx + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
    setActive(next.id);
    document.getElementById(`${baseId}-tab-${next.id}`)?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="How would you like to request service?"
        onKeyDown={onKeyDown}
        className="flex gap-2 border-b border-line"
      >
        {tabs.map((tab) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              id={`${baseId}-tab-${tab.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              className={`-mb-px border-b-2 px-3 py-2 text-[15px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-ink ${
                selected
                  ? "border-orange text-orange-ink"
                  : "border-transparent text-muted hover:text-char"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel-chat`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-chat`}
        hidden={active !== "chat"}
        className="mt-6"
      >
        {active === "chat" && <IntakeChat mode="portal" transport={intakeTransport} />}
      </div>
      <div
        id={`${baseId}-panel-note`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-note`}
        hidden={active !== "note"}
        className="mt-6"
      >
        <RequestForm businessName={businessName} calendlyUrl={calendlyUrl} />
      </div>
    </div>
  );
}
