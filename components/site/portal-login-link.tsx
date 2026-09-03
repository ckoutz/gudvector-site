import { LIVE_PORTAL, portalLoginLabel } from "@/lib/site";

type PortalLoginLinkProps = {
  host: string | null;
  className?: string;
};

export function PortalLoginLink({ host, className }: PortalLoginLinkProps) {
  return (
    <a href={LIVE_PORTAL} className={className}>
      {portalLoginLabel(host)}
    </a>
  );
}
