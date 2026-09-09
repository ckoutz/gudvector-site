"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  IntakeConversation,
  IntakeReplyResponse,
  IntakeSlot,
  IntakeStartResponse,
  IntakeState,
} from "@/lib/gvas";
import { INTAKE_SLOT_PREFIX } from "@/lib/gvas";

type ChatMessage = {
  id: string;
  role: "user" | "agent" | "owner";
  content: string;
};

type Phase = "booting" | "ready" | "sending" | "expired" | "error";

type Stored = { conversationId: string; conversationToken: string };

const STORAGE_KEY = "gv_intake_conversation";

const TERMINAL_COPY: Partial<Record<IntakeState, { title: string; body: string }>> = {
  awaiting_owner: {
    title: "Request sent.",
    body: "Thanks — Cameron will confirm by email or text shortly.",
  },
  approved: {
    title: "You're booked.",
    body: "Cameron approved your time. A confirmation is on its way by email or text.",
  },
  declined: {
    title: "That time didn't work out.",
    body: "Cameron couldn't make that slot. Reply to the confirmation email or text to find another time.",
  },
  closed: {
    title: "This conversation is closed.",
    body: "Start a new one below if you still need to book.",
  },
};

let nextId = 0;
function mid(): string {
  nextId += 1;
  return `m${nextId}`;
}

function readStored(key: string): Stored | null {
  try {
    const raw = window.sessionStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Stored>;
    if (parsed.conversationId && parsed.conversationToken) {
      return { conversationId: parsed.conversationId, conversationToken: parsed.conversationToken };
    }
  } catch {
    // ignore
  }
  return null;
}

function writeStored(key: string, value: Stored | null): void {
  try {
    if (value) window.sessionStorage.setItem(key, JSON.stringify(value));
    else window.sessionStorage.removeItem(key);
  } catch {
    // ignore
  }
}

class HttpError extends Error {
  readonly status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function api<T>(path: string, init: RequestInit & { token?: string } = {}): Promise<T> {
  const { token, ...rest } = init;
  const res = await fetch(`/api/intake${path}`, {
    ...rest,
    headers: {
      accept: "application/json",
      ...(rest.body ? { "content-type": "application/json" } : {}),
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) {
    let message = `Request failed (${res.status}).`;
    try {
      const body = (await res.json()) as { error?: string };
      if (body?.error) message = body.error;
    } catch {
      // keep default
    }
    throw new HttpError(res.status, message);
  }
  return (await res.json()) as T;
}

function errorCopy(err: unknown): string {
  if (err instanceof HttpError) {
    if (err.status === 429) return "Too many messages — please try again in a minute.";
    if (err.status >= 500) return "The booking assistant is unavailable right now. Please try again shortly.";
    return err.message;
  }
  return "Couldn't reach the booking assistant. Check your connection and try again.";
}

const slotFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: "short",
  month: "short",
  day: "numeric",
});
const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: "numeric",
  minute: "2-digit",
});
const zoneFormatter = new Intl.DateTimeFormat(undefined, {
  hour: "numeric",
  timeZoneName: "short",
});

export function formatSlot(slot: IntakeSlot): string {
  const start = new Date(slot.start);
  const end = new Date(slot.end);
  const zone = zoneFormatter.formatToParts(start).find((p) => p.type === "timeZoneName")?.value;
  return `${slotFormatter.format(start)}, ${timeFormatter.format(start)}–${timeFormatter.format(end)}${zone ? ` ${zone}` : ""}`;
}

type Booted = {
  stored: Stored;
  state: IntakeState;
  slots: IntakeSlot[] | null;
  messages: ChatMessage[];
};

async function startConversation(mode: "anonymous" | "portal", storageKey: string): Promise<Booted> {
  const res = await api<IntakeStartResponse>("/conversations", {
    method: "POST",
    body: JSON.stringify(mode === "portal" ? { portal: true } : {}),
  });
  const stored = { conversationId: res.conversationId, conversationToken: res.conversationToken };
  writeStored(storageKey, stored);
  return {
    stored,
    state: res.state,
    slots: res.slots,
    messages: res.reply ? [{ id: mid(), role: "agent", content: res.reply }] : [],
  };
}

/** Resume the stored conversation via GET, falling back to a fresh start when it expired. */
async function bootConversation(mode: "anonymous" | "portal", storageKey: string): Promise<Booted> {
  const stored = readStored(storageKey);
  if (!stored) return startConversation(mode, storageKey);
  try {
    const res = await api<IntakeConversation>(
      `/conversations/${encodeURIComponent(stored.conversationId)}`,
      { token: stored.conversationToken },
    );
    return {
      stored,
      state: res.state,
      slots: res.slots,
      messages: res.messages.map((m) => ({ id: mid(), role: m.role, content: m.content })),
    };
  } catch (err) {
    if (err instanceof HttpError && (err.status === 401 || err.status === 404)) {
      writeStored(storageKey, null);
      return startConversation(mode, storageKey);
    }
    throw err;
  }
}

export function IntakeChat({
  mode = "anonymous",
  className = "",
}: {
  /** `portal` starts the conversation with the signed-in customer's session. */
  mode?: "anonymous" | "portal";
  className?: string;
}) {
  const [phase, setPhase] = useState<Phase>("booting");
  const [conversation, setConversation] = useState<Stored | null>(null);
  const [state, setState] = useState<IntakeState>("collecting");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [slots, setSlots] = useState<IntakeSlot[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const storageKey = `${STORAGE_KEY}:${mode}`;

  const applyReply = useCallback((reply: IntakeReplyResponse) => {
    setState(reply.state);
    setSlots(reply.slots);
    if (reply.reply) {
      setMessages((prev) => [...prev, { id: mid(), role: "agent", content: reply.reply }]);
    }
  }, []);

  const [bootCount, setBootCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    bootConversation(mode, storageKey).then(
      (booted) => {
        if (cancelled) return;
        setConversation(booted.stored);
        setState(booted.state);
        setSlots(booted.slots);
        setMessages(booted.messages);
        setError(null);
        setPhase("ready");
      },
      (err: unknown) => {
        if (cancelled) return;
        setError(errorCopy(err));
        setPhase("error");
      },
    );
    return () => {
      cancelled = true;
    };
  }, [mode, storageKey, bootCount]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, slots, phase]);

  const send = useCallback(
    async (message: string, echo: string = message) => {
      if (!conversation || phase === "sending") return;
      setError(null);
      setMessages((prev) => [...prev, { id: mid(), role: "user", content: echo }]);
      setSlots(null);
      setPhase("sending");
      try {
        const res = await api<IntakeReplyResponse>(
          `/conversations/${encodeURIComponent(conversation.conversationId)}/messages`,
          {
            method: "POST",
            token: conversation.conversationToken,
            body: JSON.stringify({ message }),
          },
        );
        applyReply(res);
        setPhase("ready");
        requestAnimationFrame(() => inputRef.current?.focus());
      } catch (err) {
        if (err instanceof HttpError && err.status === 401) {
          writeStored(storageKey, null);
          setPhase("expired");
          return;
        }
        setError(errorCopy(err));
        setPhase("ready");
      }
    },
    [applyReply, conversation, phase, storageKey],
  );

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    void send(text);
  }

  function restart() {
    writeStored(storageKey, null);
    setConversation(null);
    setState("collecting");
    setSlots(null);
    setMessages([]);
    setError(null);
    setPhase("booting");
    setBootCount((n) => n + 1);
  }

  const terminal = TERMINAL_COPY[state];
  const inputDisabled = phase !== "ready" || Boolean(terminal) || state === "proposing_slots";

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-2xl border border-line bg-paper ${className}`}
      data-intake-state={state}
    >
      <div className="flex items-center gap-3 border-b border-line bg-peach-2 px-5 py-3">
        <span
          aria-hidden="true"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange text-[13px] font-semibold text-white"
        >
          GV
        </span>
        <div>
          <p className="text-[15px] font-semibold text-ink">Book an inspection</p>
          <p className="text-[13px] text-muted">
            A few quick questions, then pick a time. Cameron confirms every booking.
          </p>
        </div>
      </div>

      <div
        ref={listRef}
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        aria-label="Booking conversation"
        className="flex max-h-[26rem] min-h-[16rem] flex-col gap-3 overflow-y-auto px-5 py-4"
      >
        {phase === "booting" && messages.length === 0 && (
          <p className="text-[14px] text-muted">Starting your conversation…</p>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
          >
            <div
              className={
                m.role === "user"
                  ? "max-w-[85%] rounded-2xl rounded-br-sm bg-orange px-4 py-2.5 text-[15px] leading-relaxed text-white"
                  : m.role === "owner"
                    ? "max-w-[85%] rounded-2xl rounded-bl-sm border border-orange/30 bg-peach-2 px-4 py-2.5 text-[15px] leading-relaxed text-ink"
                    : "max-w-[85%] rounded-2xl rounded-bl-sm bg-chip px-4 py-2.5 text-[15px] leading-relaxed text-ink"
              }
            >
              {m.role === "owner" && (
                <span className="block text-[12px] font-semibold uppercase tracking-wide text-orange-ink">
                  Cameron
                </span>
              )}
              <span className="whitespace-pre-wrap">{m.content}</span>
            </div>
          </div>
        ))}

        {phase === "sending" && (
          <div className="flex justify-start" aria-label="Assistant is typing">
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-chip px-4 py-3">
              <span className="h-2 w-2 animate-bounce rounded-full bg-orange-ink [animation-delay:-0.3s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-orange-ink [animation-delay:-0.15s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-orange-ink" />
            </div>
          </div>
        )}

        {slots && slots.length > 0 && phase === "ready" && (
          <div className="mt-1" role="group" aria-label="Proposed times">
            <p className="text-[13px] font-semibold text-char">Pick a time that works:</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {slots.map((slot) => (
                <button
                  key={slot.start}
                  type="button"
                  onClick={() => void send(`${INTAKE_SLOT_PREFIX}${slot.start}`, formatSlot(slot))}
                  className="rounded-full border border-orange/50 bg-paper px-4 py-2 text-[14px] font-medium text-orange-ink transition-colors hover:bg-peach-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-ink"
                >
                  {formatSlot(slot)}
                </button>
              ))}
            </div>
            <p className="mt-2 text-[12px] text-muted">Times shown in your local time zone.</p>
          </div>
        )}

        {terminal && phase === "ready" && (
          <div
            className="mt-2 rounded-xl border border-orange/30 bg-peach-2 p-4"
            role="status"
          >
            <p className="font-display text-[18px] font-semibold text-ink">{terminal.title}</p>
            <p className="mt-1 text-[14px] leading-relaxed text-muted">{terminal.body}</p>
            {(state === "closed" || state === "declined") && (
              <button
                type="button"
                onClick={restart}
                className="mt-3 text-[14px] font-medium text-orange-ink underline underline-offset-2"
              >
                Start a new conversation
              </button>
            )}
          </div>
        )}

        {phase === "expired" && (
          <div className="mt-2 rounded-xl border border-line bg-peach-2 p-4" role="status">
            <p className="text-[15px] font-semibold text-ink">This conversation expired.</p>
            <button
              type="button"
              onClick={restart}
              className="mt-2 text-[14px] font-medium text-orange-ink underline underline-offset-2"
            >
              Start over
            </button>
          </div>
        )}

        {error && (
          <p role="alert" className="text-[14px] text-orange-ink">
            {error}
            {phase === "error" && (
              <>
                {" "}
                <button
                  type="button"
                  onClick={restart}
                  className="font-medium underline underline-offset-2"
                >
                  Try again
                </button>
              </>
            )}
          </p>
        )}
      </div>

      <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-line px-4 py-3">
        <label htmlFor="intake-message" className="sr-only">
          Your message
        </label>
        <input
          ref={inputRef}
          id="intake-message"
          type="text"
          autoComplete="off"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          disabled={inputDisabled}
          placeholder={
            terminal
              ? "This conversation is complete."
              : state === "proposing_slots"
                ? "Pick a time above."
                : "Type your reply…"
          }
          className="min-w-0 flex-1 rounded-full border border-line bg-paper px-4 py-2.5 text-[16px] text-ink outline-none placeholder:text-muted/70 focus:border-orange focus:ring-2 focus:ring-orange/20 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={inputDisabled || !draft.trim()}
          className="inline-flex items-center justify-center rounded-full bg-orange px-5 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-orange-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-ink disabled:opacity-60"
        >
          Send
        </button>
      </form>
    </div>
  );
}
