import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ChatBubble } from "@/components/chat-bubble";
import { OrganizationJsonLd } from "@/components/json-ld";
import { siteConfig } from "@/lib/site-config";
import { intakeTransport } from "@/lib/gvas";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Websites & Automation for Local Service Businesses`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Websites, owner-approved quoting and an AI booking chat for plumbers, HVAC, cleaners and contractors.",
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_US",
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-orange focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <OrganizationJsonLd />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <ChatBubble transport={intakeTransport()} />
      </body>
    </html>
  );
}
