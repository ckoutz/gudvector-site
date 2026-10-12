import type { NextConfig } from "next";

import { configuredBrandId, proxyHosts } from "./src/lib/brand-ids";

// A client deployment (a known NEXT_PUBLIC_BRAND, see src/lib/brand.ts) serves only
// the portal, owner dashboard and quote pages; Güd Vector's own pages go to sign-in.
const gudVectorPages = ["/", "/websites", "/office", "/custom-ai", "/contact", "/privacy", "/terms", "/sms-opt-in"];
const isClientBrand = configuredBrandId() !== "gudvector";
// Forms (server actions) posted from a proxying site arrive with that site's Origin.
const allowedOrigins = [...proxyHosts[configuredBrandId()]];

const nextConfig: NextConfig = {
  ...(allowedOrigins.length ? { experimental: { serverActions: { allowedOrigins } } } : {}),
  async redirects() {
    return [
      ...(isClientBrand
        ? gudVectorPages.map((source) => ({ source, destination: "/portal/login", permanent: false }))
        : []),
      { source: "/book", destination: "/contact", permanent: true },
      { source: "/bay-area", destination: "/", permanent: true },
      { source: "/service-businesses", destination: "/", permanent: true },
      { source: "/dont-want-to-learn-software", destination: "/websites", permanent: true },
      { source: "/jobber-housecall-site-builder", destination: "/websites", permanent: true },
      { source: "/compare", destination: "/websites", permanent: true },
      { source: "/owner-approved-quoting", destination: "/office", permanent: true },
      { source: "/website-booking", destination: "/office", permanent: true },
    ];
  },
};

export default nextConfig;
