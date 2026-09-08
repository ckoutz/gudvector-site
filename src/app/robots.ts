import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

const disallow = ["/portal", "/portal/", "/api/", "/q/"];

const searchAndRetrievalBots = [
  "Googlebot",
  "bingbot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
];

// Training crawlers. Citations do not depend on these — allowed by default;
// switch to disallow only if the owner wants a training opt-out.
const trainingBots = ["GPTBot", "ClaudeBot", "Google-Extended"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...[...searchAndRetrievalBots, ...trainingBots].map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow,
      })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
