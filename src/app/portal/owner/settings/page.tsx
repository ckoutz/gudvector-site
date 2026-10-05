import { getOwnerSettings, type OwnerSettings } from "@/lib/owner";
import { redirectOwnerOnUnauthorized, requireOwnerSessionToken } from "@/lib/owner-session";
import { Card, LoadError } from "../ui";
import { SettingsForm } from "./settings-form";

export const dynamic = "force-dynamic";

export default async function OwnerSettingsPage() {
  const token = await requireOwnerSessionToken();
  let settings: OwnerSettings | null = null;
  try {
    settings = await getOwnerSettings(token);
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
  return <SettingsForm settings={settings} />;
}
