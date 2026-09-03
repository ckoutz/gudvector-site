import type { ReactNode } from "react";
import { JsonLd } from "@/components/site/json-ld";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd />
      {children}
    </>
  );
}
