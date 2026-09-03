import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  variant?: "wordmark" | "full";
  priority?: boolean;
  className?: string;
};

export function BrandLogo({
  variant = "wordmark",
  priority = false,
  className,
}: BrandLogoProps) {
  if (variant === "full") {
    return (
      <Image
        src="/brand/logo.png"
        alt="Güd Vector Consulting Services"
        width={1254}
        height={1254}
        priority={priority}
        className={cn("h-auto w-full", className)}
      />
    );
  }

  return (
    <Image
      src="/brand/logo-wordmark.png"
      alt="Güd Vector"
      width={1019}
      height={781}
      priority={priority}
      className={cn("h-auto w-full", className)}
    />
  );
}
