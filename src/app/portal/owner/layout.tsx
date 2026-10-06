import type { Metadata } from "next";
import { getOwnerMe, type OwnerMe } from "@/lib/owner";
import { redirectOwnerOnUnauthorized, requireOwnerSessionToken } from "@/lib/owner-session";
import { signOutOwner } from "./actions";
import { OwnerNav } from "./nav";
import { buttonSecondary } from "./ui";

export const metadata: Metadata = {
  title: "Owner dashboard",
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

export default async function OwnerLayout({ children }: { children: React.ReactNode }) {
  const token = await requireOwnerSessionToken();
  let me: OwnerMe | null = null;
  try {
    me = await getOwnerMe(token);
  } catch (err) {
    redirectOwnerOnUnauthorized(err);
    console.error("OwnerLayout: /me failed", err);
  }
  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-14">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-orange-ink">
            Güd Office
          </p>
          <h1 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
            {me?.business.displayName ?? "Owner dashboard"}
          </h1>
          {me && <p className="mt-1 text-[13px] text-muted">Signed in as {me.owner.email}</p>}
        </div>
        <form action={signOutOwner}>
          <button type="submit" className={buttonSecondary}>
            Sign out
          </button>
        </form>
      </div>
      <div className="mt-6 border-b border-line pb-3">
        <OwnerNav />
      </div>
      <div className="mt-5 sm:mt-8">{children}</div>
    </div>
  );
}
