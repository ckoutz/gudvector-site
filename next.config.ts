import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/book", destination: "/contact", permanent: true },
      { source: "/bay-area", destination: "/", permanent: true },
      { source: "/service-businesses", destination: "/", permanent: true },
      { source: "/dont-want-to-learn-software", destination: "/compare", permanent: true },
      { source: "/jobber-housecall-site-builder", destination: "/compare", permanent: true },
      { source: "/owner-approved-quoting", destination: "/office", permanent: true },
      { source: "/website-booking", destination: "/office", permanent: true },
    ];
  },
};

export default nextConfig;
