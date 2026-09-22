"use client";

import { useActionState } from "react";
import { requestPortalLoginAction, type PortalLoginState } from "./actions";

const initialState: PortalLoginState = { status: "idle" };

export function LoginForm({ mockDevHref }: { mockDevHref: string | null }) {
  const [state, action, pending] = useActionState(requestPortalLoginAction, initialState);

  if (state.status === "sent") {
    return (
      <div className="rounded-2xl border border-orange/30 bg-peach-2 p-8" aria-live="polite">
        <h2 className="font-display text-2xl font-semibold text-ink">Check your email.</h2>
        <p className="mt-2 text-[16px] leading-relaxed text-muted">
          If an account exists for that address, we&apos;ve sent a sign-in link. It opens
          your customer portal — no password needed.
        </p>
        {mockDevHref && (
          <p className="mt-4 border-t border-orange/20 pt-4 text-[14px] text-muted">
            <span className="font-semibold text-char">Mock mode:</span> no email is sent —{" "}
            <a
              href={mockDevHref}
              className="font-medium text-orange-ink underline underline-offset-2"
            >
              use the dev sign-in link
            </a>{" "}
            instead.
          </p>
        )}
      </div>
    );
  }

  return (
    <form action={action} noValidate className="space-y-5">
      <div>
        <label htmlFor="email" className="block text-[14px] font-semibold text-char">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          aria-invalid={Boolean(state.fieldError)}
          aria-describedby={state.fieldError ? "email-error" : undefined}
          className="mt-1.5 w-full rounded-lg border border-line bg-paper px-4 py-2.5 text-[16px] text-ink outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
        />
        {state.fieldError && (
          <p id="email-error" className="mt-1 text-[13px] text-orange-ink">
            {state.fieldError}
          </p>
        )}
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
        {pending ? "Sending…" : "Email me a sign-in link"}
      </button>
    </form>
  );
}
