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
};

export default nextConfig;
