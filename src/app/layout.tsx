import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans, Figtree } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BrandFooter, BrandHeader } from "@/components/brand-chrome";
import { ChatBubble } from "@/components/chat-bubble";
import { OrganizationJsonLd } from "@/components/json-ld";
import { siteConfig } from "@/lib/site-config";
import { brand, isGudVector } from "@/lib/brand";
import { intakeTransport } from "@/lib/gvas";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const fontVariables = isGudVector ? figtree.variable : `${bricolage.variable} ${dmSans.variable}`;

const gudVectorMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Websites & Automation for Local Service Businesses`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Websites built for search and AI, booking and owner-approved quoting, and custom AI tools for local service businesses.",
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_US",
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
  },
};

// A client deployment serves only the portal, dashboard and quote pages.
const brandMetadata: Metadata = {
  title: { default: brand.name, template: `%s | ${brand.name}` },
  robots: { index: false, follow: false },
};

export const metadata: Metadata = isGudVector ? gudVectorMetadata : brandMetadata;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-brand={brand.id}
      className={`${fontVariables} h-full antialiased`}
    >
      <body
        className={`flex min-h-full flex-col font-sans text-ink ${isGudVector ? "bg-paper" : "bg-peach-2"}`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-orange focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        {isGudVector ? (
          <>
            <OrganizationJsonLd />
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
            <ChatBubble transport={intakeTransport()} />
          </>
        ) : (
          <>
            <BrandHeader />
            <main id="main" className="flex-1">
              {children}
            </main>
            <BrandFooter />
          </>
        )}
      </body>
    </html>
  );
}
