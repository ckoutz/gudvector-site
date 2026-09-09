import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/section";
import { getPortalMe, type PortalMe } from "@/lib/gvas";
import { redirectOnUnauthorized, requirePortalSessionToken } from "@/lib/portal-session";
import { RequestTabs } from "./request-tabs";

export const metadata: Metadata = {
  title: "Request a service — customer portal",
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

export default async function PortalRequestPage() {
  const sessionToken = await requirePortalSessionToken();

  let me: PortalMe | null = null;
  try {
    me = await getPortalMe(sessionToken);
  } catch (err) {
    redirectOnUnauthorized(err);
    // The form still works without /me — it just lacks the Calendly shortcut.
    console.error("PortalRequest: /me failed", err);
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-14 sm:px-6 sm:py-20">
      <Eyebrow>{me?.business.displayName ?? "Customer portal"}</Eyebrow>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
        Request a service.
      </h1>
      <p className="mt-4 text-[16px] leading-relaxed text-muted">
        Chat to schedule a visit — {me?.business.displayName ?? "the business"} confirms
        every booking — or just send a note and they&apos;ll get back to you.
      </p>

      <div className="mt-8 rounded-2xl border border-line bg-paper p-6 sm:p-8">
        <RequestTabs
          businessName={me?.business.displayName ?? "The business"}
          calendlyUrl={me?.business.calendlyUrl ?? null}
        />
      </div>

      <p className="mt-6 text-[14px] text-muted">
        <Link
          href="/portal"
          className="font-medium text-orange-ink underline underline-offset-2"
        >
          Back to your portal
        </Link>
      </p>
    </div>
  );
}
