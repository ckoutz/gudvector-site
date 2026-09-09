"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { acceptQuoteAction, declineQuoteAction } from "./actions";

const primary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-orange px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-orange-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-ink disabled:cursor-not-allowed disabled:opacity-60";

const ghost =
  "inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-[15px] font-semibold text-ink transition-colors hover:border-ink/40 hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-ink disabled:cursor-not-allowed disabled:opacity-60";

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
    />
  );
}

export function QuoteActions({ token }: { token: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState<"accept" | "decline" | null>(null);
  const [confirmDecline, setConfirmDecline] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const pending = busy !== null;

  async function onAccept() {
    setError(null);
    setBusy("accept");
    const result = await acceptQuoteAction(token);
    if (result.ok) {
      window.location.assign(result.data.checkoutUrl);
      return;
    }
    setError(result.error);
    setBusy(null);
  }

  async function onDecline() {
    setError(null);
    setBusy("decline");
    const result = await declineQuoteAction(token);
    if (result.ok) {
      startTransition(() => router.refresh());
      return;
    }
    setError(result.error);
    setBusy(null);
    setConfirmDecline(false);
  }

  return (
    <div className="space-y-4">
      {confirmDecline ? (
        <div className="rounded-xl border border-line bg-peach-2 p-5">
          <p className="text-[15px] font-semibold text-ink">Decline this quote?</p>
          <p className="mt-1 text-[14px] text-muted">
            The business will be notified. You can still reach out to them if you change
            your mind.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onDecline}
              disabled={pending}
              className={primary}
            >
              {busy === "decline" && <Spinner />}
              {busy === "decline" ? "Declining…" : "Yes, decline"}
            </button>
            <button
              type="button"
              onClick={() => setConfirmDecline(false)}
              disabled={pending}
              className={ghost}
            >
              Keep quote
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={onAccept} disabled={pending} className={primary}>
            {busy === "accept" && <Spinner />}
            {busy === "accept" ? "Starting checkout…" : "Accept & pay"}
          </button>
          <button
            type="button"
            onClick={() => setConfirmDecline(true)}
            disabled={pending}
            className={ghost}
          >
            Decline
          </button>
        </div>
      )}

      {error && (
        <p role="alert" className="text-[14px] text-orange-ink">
          {error}
        </p>
      )}

      <p className="text-[13px] text-muted">
        Payment is handled securely by Stripe. You&apos;ll be redirected to complete it.
      </p>
    </div>
  );
}
