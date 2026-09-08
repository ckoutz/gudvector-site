import Image from "next/image";
import Link from "next/link";

export function LogoMarkImage({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/brand/logo-mark.png"
      alt="Güd Vector"
      width={938}
      height={730}
      className={className}
    />
  );
}

export function LogoMark({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <Link href="/" className="inline-flex items-center" aria-label="Güd Vector home">
      <LogoMarkImage className={className} />
    </Link>
  );
}

export function LogoLockup({ className = "h-20 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/brand/logo.png"
      alt="Güd Vector Consulting Services — automating business systems, website building for small business"
      width={938}
      height={924}
      className={className}
    />
  );
}
