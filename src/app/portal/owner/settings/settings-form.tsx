"use client";

import { useActionState } from "react";
import type { OwnerSettings } from "@/lib/owner";
import { saveSettingsAction, type SettingsState } from "../actions";
import { Card, Pill, buttonPrimary } from "../ui";

const input =
  "mt-1.5 w-full rounded-xl border border-line bg-paper px-3.5 py-2.5 text-[14px] text-ink placeholder:text-muted/60 focus:border-ink/40 focus:outline-none";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block px-5 py-4">
      <span className="text-[14px] font-medium text-ink">{label}</span>
      {hint && <span className="mt-0.5 block text-[12px] text-muted">{hint}</span>}
      {children}
    </label>
  );
}

const providers = [
  {
    name: "Google Calendar",
    steps:
      "On a computer, open Google Calendar → Settings (gear) → pick your calendar under “Settings for my calendars” → Integrate calendar → copy “Secret address in iCal format”.",
  },
  {
    name: "Apple / iCloud",
    steps:
      "In the Calendar app on a Mac (or iCloud.com), right-click the calendar → Share Calendar → tick “Public Calendar” → copy the webcal:// link.",
  },
  {
    name: "Outlook / Microsoft 365",
    steps:
      "In Outlook on the web: Settings → Calendar → Shared calendars → Publish a calendar → choose the calendar and “Can view all details” → Publish → copy the ICS link.",
  },
  {
    name: "Other calendars",
    steps:
      "Look for “subscribe”, “publish” or “iCal / ICS link” in the calendar’s sharing settings. Any link ending in .ics or starting with webcal:// works.",
  },
];

export function SettingsForm({ settings }: { settings: OwnerSettings }) {
  const [state, action, pending] = useActionState<SettingsState, FormData>(saveSettingsAction, {
    status: "idle",
  });

  return (
    <form action={action} className="space-y-6">
      <Card title="Business">
        <div className="divide-y divide-line">
          <Field label="Business name" hint="Shown to customers on quotes, the portal and texts.">
            <input name="displayName" defaultValue={settings.displayName} required maxLength={255} className={input} />
          </Field>
          <Field label="Booking link" hint="Your Calendly link. Customers who can't use the chat book here.">
            <input name="calendlyUrl" type="url" defaultValue={settings.calendlyUrl ?? ""} placeholder="https://calendly.com/…" className={input} />
          </Field>
          <Field label="Notification email" hint="Gets a copy of every booking request, payment and customer message.">
            <input name="notificationEmail" type="email" defaultValue={settings.notificationEmail ?? ""} className={input} />
          </Field>
          <div className="px-5 py-4 text-[13px] text-muted">
            <p>
              Owner sign-in: <span className="font-medium text-ink">{settings.ownerEmail ?? "—"}</span>
              {settings.siteUrl && (
                <>
                  {" "}· Website: <span className="font-medium text-ink">{settings.siteUrl}</span>
                </>
              )}
            </p>
            <p className="mt-1">Contact Güd Vector to change these.</p>
          </div>
        </div>
      </Card>

      <Card title="Your calendar">
        <div className="px-5 py-4 text-[14px] text-muted">
          <p>
            Keep using the calendar you already have. Bookings land in it through Calendly: in
            Calendly, open <span className="font-medium text-ink">Availability → Calendar settings</span> and
            connect Google, Outlook, iCloud or Exchange so estimates show up there and Calendly avoids
            your busy times.
          </p>
          <p className="mt-3">
            To see your whole calendar here too, paste its private link below. The dashboard only
            reads it and never changes anything.
          </p>
          <p className="mt-3 flex flex-wrap items-center gap-2">
            {settings.calendarFeed.connected ? (
              <>
                <Pill tone="green">Connected</Pill>
                <span>{settings.calendarFeed.host}</span>
              </>
            ) : (
              <Pill tone="muted">Not connected</Pill>
            )}
          </p>
        </div>
        <Field
          label={settings.calendarFeed.connected ? "Replace calendar link" : "Calendar link"}
          hint="Starts with https:// or webcal://. Kept private: it's never shown again after you save."
        >
          <input name="calendarFeedUrl" autoComplete="off" placeholder="webcal://… or https://….ics" className={input} />
        </Field>
        {settings.calendarFeed.connected && (
          <label className="flex items-center gap-2 px-5 pb-4 text-[14px] text-ink">
            <input type="checkbox" name="disconnectCalendar" className="h-4 w-4 accent-[var(--color-orange)]" />
            Disconnect my calendar
          </label>
        )}
        <details className="border-t border-line px-5 py-4 text-[14px]">
          <summary className="cursor-pointer font-medium text-ink">Where do I find my calendar link?</summary>
          <dl className="mt-3 space-y-3 text-muted">
            {providers.map((provider) => (
              <div key={provider.name}>
                <dt className="font-medium text-ink">{provider.name}</dt>
                <dd className="mt-0.5">{provider.steps}</dd>
              </div>
            ))}
          </dl>
        </details>
      </Card>

      <Card title="What Gus says in your website chat">
        <div className="divide-y divide-line">
          <Field label="About your business" hint="1–3 sentences: what you do and what Gus books.">
            <textarea name="intakeBrief" rows={3} maxLength={1000} defaultValue={settings.intakeBrief ?? ""} className={input} />
          </Field>
          <Field label="What Gus should ask" hint="Beyond name, email and phone. For example: the city, what needs fixing, how soon.">
            <textarea name="intakeQuestions" rows={3} maxLength={2000} defaultValue={settings.intakeQuestions ?? ""} className={input} />
          </Field>
          <Field label="First message" hint="What a visitor reads when they open the chat.">
            <input name="intakeOpening" maxLength={600} defaultValue={settings.intakeOpening ?? ""} className={input} />
          </Field>
        </div>
      </Card>

      <Card title="Connections">
        <ul className="divide-y divide-line text-[14px]">
          <li className="flex items-center justify-between px-5 py-3">
            <span className="text-ink">Website chat and customer portal</span>
            <Pill tone={settings.connections.website ? "green" : "muted"}>
              {settings.connections.website ? "On" : "Not set up"}
            </Pill>
          </li>
        </ul>
      </Card>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={pending} className={buttonPrimary}>
          {pending ? "Saving…" : "Save changes"}
        </button>
        {state.message && (
          <p role="status" className={`text-[14px] ${state.status === "error" ? "text-red-700" : "text-muted"}`}>
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
