import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LIVE_PORTAL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Client portal login | Güd Vector",
  robots: { index: false, follow: false },
};

export default function PortalPage() {
  redirect(LIVE_PORTAL);
}
