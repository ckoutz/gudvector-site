"use client";

import { useActionState, type ReactNode } from "react";
import { submitContact, type ContactState } from "@/lib/actions/contact";
import { needLabels } from "@/lib/validations/contact";

const initialState: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState,
  );

  return (
    <form action={formAction} noValidate className="space-y-5">
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Field
        id="name"
        label="Name"
        error={state.fieldErrors?.name}
      >
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={state.fieldErrors?.name ? true : undefined}
          aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
          className="border-input min-h-11 w-full rounded-xl border bg-white px-3 text-base"
        />
      </Field>

      <Field
        id="email"
        label="Email"
        error={state.fieldErrors?.email}
      >
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={state.fieldErrors?.email ? true : undefined}
          aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
          className="border-input min-h-11 w-full rounded-xl border bg-white px-3 text-base"
        />
      </Field>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold">What do you need?</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {(["website", "systems", "both"] as const).map((value) => (
            <label
              key={value}
              className="border-input has-checked:border-brand has-checked:bg-wash flex min-h-11 items-center gap-2 rounded-xl border bg-white px-3 py-2 text-sm font-semibold"
            >
              <input
                type="radio"
                name="need"
                value={value}
                required
                className="accent-brand size-4"
              />
              {needLabels[value]}
            </label>
          ))}
        </div>
        {state.fieldErrors?.need ? (
          <p id="need-error" className="text-destructive mt-2 text-sm">
            {state.fieldErrors.need}
          </p>
        ) : null}
      </fieldset>

      <Field
        id="message"
        label="Message"
        error={state.fieldErrors?.message}
      >
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          aria-invalid={state.fieldErrors?.message ? true : undefined}
          aria-describedby={state.fieldErrors?.message ? "message-error" : undefined}
          className="border-input w-full rounded-xl border bg-white px-3 py-2 text-base"
        />
      </Field>

      {state.status === "success" ? (
        <p role="status" className="rounded-2xl bg-[#e8f6ec] px-4 py-3 text-sm font-semibold text-[#146c2e]">
          {state.message}
        </p>
      ) : null}
      {state.status === "error" && state.message ? (
        <p role="alert" className="bg-destructive/10 text-destructive rounded-2xl px-4 py-3 text-sm font-semibold">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="bg-brand hover:bg-brand-deep min-h-11 rounded-full px-6 py-2.5 font-semibold text-white disabled:opacity-70"
      >
        {pending ? "Sending…" : "Send"}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-destructive mt-2 text-sm">
          {error}
        </p>
      ) : null}
    </div>
  );
}
