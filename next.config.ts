import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/portal",
        destination: "https://gudvector.com/portal",
        permanent: false,
      },
      {
        source: "/portal/:path*",
        destination: "https://gudvector.com/portal/:path*",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/portal",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/portal/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
