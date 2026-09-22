import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Eyebrow } from "@/components/section";
import { gvasEnv } from "@/lib/gvas";
import { getPortalSessionToken } from "@/lib/portal-session";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Customer portal — sign in",
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

const notices: Record<string, string> = {
  link: "That sign-in link didn't work — it may be expired or already used. Request a new one below.",
  expired: "Your session has expired. Sign in again below.",
  unavailable: "The portal is temporarily unavailable. Try again in a few minutes.",
};

export default async function PortalLoginPage({
  searchParams,
}: PageProps<"/portal/login">) {
  const { token, error, expired } = await searchParams;

  // Magic links from GVAS land here as /portal/login?token=… — hand the token to
  // the session route handler, which exchanges it and sets the httpOnly cookie.
  if (typeof token === "string" && token) {
    redirect(`/portal/session?token=${encodeURIComponent(token)}`);
  }

  const hasSession = Boolean(await getPortalSessionToken());
  const notice =
    expired === "1"
      ? notices.expired
      : typeof error === "string"
        ? (notices[error] ?? null)
        : null;

  return (
    <div className="mx-auto max-w-xl px-4 py-14 sm:px-6 sm:py-20">
      <Eyebrow>Customer portal</Eyebrow>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
        Sign in to your portal.
      </h1>
      <p className="mt-4 text-[16px] leading-relaxed text-muted">
        Enter the email you gave the business. We&apos;ll send a one-time sign-in link —
        your quotes, payments, and requests live behind it.
      </p>

      {notice && (
        <p role="alert" className="mt-6 rounded-xl border border-orange/30 bg-peach-2 px-4 py-3 text-[14px] text-orange-ink">
          {notice}
        </p>
      )}

      <div className="mt-8 rounded-2xl border border-line bg-paper p-6 sm:p-8">
        <LoginForm mockDevHref={gvasEnv.mock ? "/portal/login?token=mock" : null} />
      </div>

      {hasSession && (
        <p className="mt-6 text-[14px] text-muted">
          Already signed in on this device?{" "}
          <Link
            href="/portal"
            className="font-medium text-orange-ink underline underline-offset-2"
          >
            Go to your portal
          </Link>
          .
        </p>
      )}
    </div>
  );
}
