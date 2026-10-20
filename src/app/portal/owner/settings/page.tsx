import { isGvasError } from "@/lib/gvas";
import { getOwnerCommands, getOwnerSettings, type OwnerCommand, type OwnerSettings } from "@/lib/owner";
import { redirectOwnerOnUnauthorized, requireOwnerSessionToken } from "@/lib/owner-session";
import { Card, LoadError } from "../ui";
import { CommandLog } from "./command-log";
import { SettingsForm } from "./settings-form";

export const dynamic = "force-dynamic";

export default async function OwnerSettingsPage() {
  const token = await requireOwnerSessionToken();
  let settings: OwnerSettings | null = null;
  let commands: OwnerCommand[] | null = null;
  try {
    [settings, commands] = await Promise.all([
      getOwnerSettings(token),
      getOwnerCommands(token).catch((err: unknown) => {
        // Rethrown so the outer catch sends the owner to sign-in.
        if (isGvasError(err) && err.kind === "unauthorized") throw err;
        console.error("OwnerSettings: command log load failed", err);
        return null;
      }),
    ]);
  } catch (err) {
    redirectOwnerOnUnauthorized(err);
    console.error("OwnerSettings: load failed", err);
  }
  if (!settings) {
    return (
      <Card title="Settings">
        <LoadError label="your settings" />
      </Card>
    );
  }
  return (
    <div className="space-y-6">
      <SettingsForm settings={settings} />
      <CommandLog commands={commands} zone={settings.timezone || undefined} />
    </div>
  );
}
