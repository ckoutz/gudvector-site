"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "./actions";

const initialState: ContactState = { status: "idle" };

const needOptions = [
  { value: "website", label: "Website" },
  { value: "quoting", label: "Automating business systems" },
  { value: "both", label: "Both" },
];

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-orange/30 bg-peach-2 p-8">
        <h2 className="font-display text-2xl font-semibold text-ink">Message sent.</h2>
        <p className="mt-2 text-[16px] leading-relaxed text-muted">
          We&apos;ll reply from info@gudvector.com.
        </p>
        {state.bookingUrl && (
          <div className="mt-6 border-t border-orange/20 pt-6">
            <p className="text-[15px] text-char">
              Want to skip the back-and-forth? Pick a time now — your name and email are
              already filled in.
            </p>
            <a
              href={state.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-orange px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-orange-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-ink"
            >
              Book your inspection
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <form action={action} noValidate className="space-y-5">
      {/* Honeypot — hidden from real visitors via CSS, not display:none, so it's still focusable by bots. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Leave this field blank</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="block text-[14px] font-semibold text-char">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          aria-invalid={Boolean(state.fieldErrors?.name)}
          aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
          className="mt-1.5 w-full rounded-lg border border-line bg-paper px-4 py-2.5 text-[16px] text-ink outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
        />
        {state.fieldErrors?.name && (
          <p id="name-error" className="mt-1 text-[13px] text-orange-ink">
            {state.fieldErrors.name}
          </p>
        )}
      </div>

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
          aria-invalid={Boolean(state.fieldErrors?.email)}
          aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
          className="mt-1.5 w-full rounded-lg border border-line bg-paper px-4 py-2.5 text-[16px] text-ink outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
        />
        {state.fieldErrors?.email && (
          <p id="email-error" className="mt-1 text-[13px] text-orange-ink">
            {state.fieldErrors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="business" className="block text-[14px] font-semibold text-char">
          Business name <span className="font-normal text-muted">(optional)</span>
        </label>
        <input
          id="business"
          name="business"
          type="text"
          className="mt-1.5 w-full rounded-lg border border-line bg-paper px-4 py-2.5 text-[16px] text-ink outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
        />
      </div>

      <fieldset>
        <legend className="text-[14px] font-semibold text-char">What do you need?</legend>
        <div className="mt-2 flex flex-wrap gap-4">
          {needOptions.map((opt) => (
            <label key={opt.value} className="inline-flex items-center gap-2 text-[15px] text-char">
              <input
                type="radio"
                name="need"
                value={opt.value}
                required
                className="h-4 w-4 accent-orange"
              />
              {opt.label}
            </label>
          ))}
        </div>
        {state.fieldErrors?.need && (
          <p className="mt-1 text-[13px] text-orange-ink">{state.fieldErrors.need}</p>
        )}
      </fieldset>

      <div>
        <label htmlFor="message" className="block text-[14px] font-semibold text-char">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-invalid={Boolean(state.fieldErrors?.message)}
          aria-describedby={state.fieldErrors?.message ? "message-error" : undefined}
          className="mt-1.5 w-full rounded-lg border border-line bg-paper px-4 py-2.5 text-[16px] text-ink outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
        />
        {state.fieldErrors?.message && (
          <p id="message-error" className="mt-1 text-[13px] text-orange-ink">
            {state.fieldErrors.message}
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
        className="inline-flex items-center justify-center rounded-full bg-orange px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-orange-deep disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
