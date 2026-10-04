"use client";

import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IntakeChat, type IntakeTransport } from "@/components/intake-chat";
import { siteConfig } from "@/lib/site-config";

const OPEN_KEY = "gv_chat_bubble_open";
const OPEN_EVENT = "gv:open-chat";
const CHANGE_EVENT = "gv:chat-bubble-change";

/** Routes with their own chat (portal) or no marketing chrome (quote links). */
export function isChatBubbleHidden(pathname: string): boolean {
  return /^\/(portal|q)(\/|$)/.test(pathname);
}

function readOpen(): boolean {
  try {
    return window.sessionStorage.getItem(OPEN_KEY) === "1";
  } catch {
    return false;
  }
}

function writeOpen(open: boolean): void {
  try {
    if (open) window.sessionStorage.setItem(OPEN_KEY, "1");
    else window.sessionStorage.removeItem(OPEN_KEY);
  } catch {
    // ignore
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CHANGE_EVENT, onChange);
}

/** Opens the floating chat from anywhere on the page. */
export function openChatBubble(): void {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

/**
 * A "Book a call" trigger for nav/CTAs. On routes without the bubble it marks
 * the chat open and sends the visitor to /contact, where the bubble restores.
 */
export function OpenChatButton({
  className = "",
  children = "Book a call",
  onClick,
}: {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onClick?.();
        if (isChatBubbleHidden(pathname)) {
          writeOpen(true);
          router.push("/contact");
        } else {
          openChatBubble();
        }
      }}
    >
      {children}
    </button>
  );
}

function ChatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.2 3.6A.5.5 0 0 1 5 19.2V16A2.5 2.5 0 0 1 4 13.5v-8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M8.5 8.5h7M8.5 11.5h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ChatBubble({ transport }: { transport: IntakeTransport }) {
  const pathname = usePathname();
  const open = useSyncExternalStore(subscribe, readOpen, () => false);
  // Mount the chat on first open only (it starts a conversation on mount),
  // then keep it mounted while minimised so the transcript stays put.
  const [chatMounted, setChatMounted] = useState(false);
  if (open && !chatMounted) setChatMounted(true);

  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pendingFocus = useRef<"panel" | "launcher" | null>(null);
  const panelId = useId();
  const titleId = useId();
  const hidden = isChatBubbleHidden(pathname);

  const setOpen = useCallback((next: boolean) => {
    pendingFocus.current = next ? "panel" : "launcher";
    writeOpen(next);
  }, []);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, [setOpen]);

  useEffect(() => {
    const target = pendingFocus.current;
    pendingFocus.current = null;
    if (target === "panel" && open) {
      const input = panelRef.current?.querySelector<HTMLInputElement>("input:not([disabled])");
      (input ?? closeRef.current)?.focus();
    } else if (target === "launcher" && !open) {
      launcherRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open || hidden) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, hidden, setOpen]);

  if (hidden) return null;

  return (
    <>
      <div
        ref={panelRef}
        id={panelId}
        role="dialog"
        aria-modal="false"
        aria-labelledby={titleId}
        hidden={!open}
        className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-paper pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[600px] sm:max-h-[calc(100dvh-8rem)] sm:w-[380px] sm:rounded-2xl sm:border sm:border-line sm:p-0 sm:shadow-2xl"
      >
        <div className="flex items-center gap-3 bg-ink px-5 py-3 text-white">
          <span
            aria-hidden="true"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange text-[13px] font-semibold text-white"
          >
            GV
          </span>
          <div className="min-w-0 flex-1">
            <p id={titleId} className="text-[15px] font-semibold">
              {siteConfig.name}
            </p>
            <p className="text-[13px] text-peach">Book a call</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
          >
            <CloseIcon />
          </button>
        </div>
        <p className="border-b border-line bg-peach-2 px-5 py-2.5 text-[14px] leading-snug text-char">
          Tell us what you&apos;re looking for — a website, automation, or both — and pick a time
          for a quick call.
        </p>
        <div className="min-h-0 flex-1">
          {chatMounted && <IntakeChat transport={transport} embedded className="h-full" />}
        </div>
      </div>

      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close chat" : "Chat with us to book a call"}
        className={`fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))] z-50 items-center gap-2 rounded-full bg-orange p-4 text-[15px] font-semibold text-white shadow-lg transition-colors hover:bg-orange-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-ink sm:bottom-6 sm:right-6 sm:px-5 sm:py-3.5 ${
          open ? "hidden sm:inline-flex" : "inline-flex"
        }`}
      >
        {open ? <CloseIcon /> : <ChatIcon />}
        <span className="hidden sm:inline">{open ? "Close" : "Chat with us"}</span>
      </button>
    </>
  );
}
