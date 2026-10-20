import type { OwnerCommand, OwnerCommandState } from "@/lib/owner";
import { Card, Empty, LoadError, Pill, formatDateTime } from "../ui";

const stateLabel: Record<OwnerCommandState, [string, "orange" | "green" | "red" | "muted"]> = {
  proposed: ["Waiting for YES", "orange"],
  applying: ["Unfinished", "orange"],
  done: ["Done", "green"],
  failed: ["Failed", "red"],
  cancelled: ["Cancelled", "muted"],
  expired: ["Expired", "muted"],
};

/** Every change asked for by text: what the owner wrote, Gus's exact
 * proposal, and how it ended. Read only; the texts are the controls. */
export function CommandLog({ commands, zone }: { commands: OwnerCommand[] | null; zone?: string }) {
  return (
    <Card title="Changes by text">
      {commands === null ? (
        <LoadError label="the text log" />
      ) : commands.length === 0 ? (
        <Empty>No changes asked for by text yet. When you text Gus a change, it shows here.</Empty>
      ) : (
        <ul className="divide-y divide-line">
          {commands.map((command) => {
            const [label, tone] = stateLabel[command.state];
            return (
              <li key={command.id} className="px-5 py-4 [overflow-wrap:anywhere]">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[12px] text-muted">{formatDateTime(command.createdAt, zone)}</p>
                  <Pill tone={tone}>{label}</Pill>
                </div>
                <p className="mt-1 text-[13px] text-muted">You: &ldquo;{command.requestedText}&rdquo;</p>
                <p className="mt-1 text-[14px] text-ink">{command.summary}</p>
                {command.outcome && <p className="mt-1 text-[13px] text-muted">{command.outcome}</p>}
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
