import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const disallow = ["/portal", "/portal/", "/api", "/api/", "/q", "/q/"];

const retrievalBots = [
  "Googlebot",
  "bingbot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      ...retrievalBots.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
