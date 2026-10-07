import type { NextConfig } from "next";

// A client deployment (NEXT_PUBLIC_BRAND set, see src/lib/brand.ts) serves only
// the portal, owner dashboard and quote pages; Güd Vector's own pages go to sign-in.
const gudVectorPages = ["/", "/websites", "/office", "/custom-ai", "/contact", "/privacy", "/terms", "/sms-opt-in"];
const isClientBrand = Boolean(process.env.NEXT_PUBLIC_BRAND) && process.env.NEXT_PUBLIC_BRAND !== "gudvector";

const nextConfig: NextConfig = {
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
