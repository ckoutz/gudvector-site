import Link from "next/link";

type PortalLoginLinkProps = {
  className?: string;
};

export function PortalLoginLink({ className }: PortalLoginLinkProps) {
  return (
    <Link href="/portal" className={className}>
      Customer portal
    </Link>
  );
}
