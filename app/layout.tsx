import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { SkipLink } from "@/components/site/skip-link";
import { ENTITY, SITE_URL } from "@/lib/site";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
  weight: ["500", "600", "700"],
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Güd Vector | Websites & Systems for Bay Area Service Businesses",
    template: "%s",
  },
  description:
    "Fast, mobile-first websites and simple business systems for local service companies in the San Francisco Bay Area. Email info@gudvector.com.",
  applicationName: ENTITY.alternateName,
  authors: [{ name: ENTITY.name, url: SITE_URL }],
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${nunito.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-cream font-sans text-ink">
        <SkipLink />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
