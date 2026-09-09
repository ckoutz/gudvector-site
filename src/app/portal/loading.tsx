export default function PortalLoading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20" aria-busy="true">
      <div className="h-4 w-40 animate-pulse rounded bg-ink/10" />
      <div className="mt-4 h-10 w-64 animate-pulse rounded bg-ink/10" />
      <div className="mt-10 space-y-4">
        <div className="h-28 animate-pulse rounded-2xl bg-ink/5" />
        <div className="h-28 animate-pulse rounded-2xl bg-ink/5" />
        <div className="h-40 animate-pulse rounded-2xl bg-ink/5" />
      </div>
      <p className="sr-only" role="status">
        Loading your portal…
      </p>
    </div>
  );
}
