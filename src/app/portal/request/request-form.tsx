"use client";

import { useActionState } from "react";
import { submitPortalRequestAction, type PortalRequestState } from "./actions";

const initialState: PortalRequestState = { status: "idle" };

export function RequestForm({
  businessName,
  calendlyUrl,
}: {
  businessName: string;
  calendlyUrl: string | null;
}) {
  const [state, action, pending] = useActionState(submitPortalRequestAction, initialState);

  if (state.status === "sent") {
    return (
      <div className="rounded-2xl border border-orange/30 bg-peach-2 p-8" aria-live="polite">
        <h2 className="font-display text-2xl font-semibold text-ink">Request sent.</h2>
        <p className="mt-2 text-[16px] leading-relaxed text-muted">
          {businessName} has your message and will follow up shortly.
        </p>
        {calendlyUrl && (
          <div className="mt-6 border-t border-orange/20 pt-6">
            <p className="text-[15px] text-char">
              In a hurry? You can also book a time directly.
            </p>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-orange px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-orange-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-ink"
            >
              Book a time
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <form action={action} noValidate className="space-y-5">
      <div>
        <label htmlFor="message" className="block text-[14px] font-semibold text-char">
          What do you need?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder={`Describe the job — what's going on, where, and anything ${businessName} should know.`}
          aria-invalid={Boolean(state.fieldErrors?.message)}
          aria-describedby={state.fieldErrors?.message ? "message-error" : undefined}
          className="mt-1.5 w-full rounded-lg border border-line bg-paper px-4 py-2.5 text-[16px] text-ink outline-none placeholder:text-muted/70 focus:border-orange focus:ring-2 focus:ring-orange/20"
        />
        {state.fieldErrors?.message && (
          <p id="message-error" className="mt-1 text-[13px] text-orange-ink">
            {state.fieldErrors.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="preferredDates" className="block text-[14px] font-semibold text-char">
          Preferred dates or times{" "}
          <span className="font-normal text-muted">(optional)</span>
        </label>
        <input
          id="preferredDates"
          name="preferredDates"
          type="text"
          placeholder="e.g. Tuesday afternoon, Friday morning"
          className="mt-1.5 w-full rounded-lg border border-line bg-paper px-4 py-2.5 text-[16px] text-ink outline-none placeholder:text-muted/70 focus:border-orange focus:ring-2 focus:ring-orange/20"
        />
        <p className="mt-1 text-[13px] text-muted">
          Separate multiple options with commas or new lines.
        </p>
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="text-[14px] text-orange-ink">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center rounded-full bg-orange px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-orange-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-ink disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send request"}
      </button>
    </form>
  );
}
