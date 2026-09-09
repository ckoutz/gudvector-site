import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

const routes = [
  { path: "/", priority: 1, changeFrequency: "monthly" as const },
  { path: "/bay-area", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/service-businesses", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/website-booking", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/owner-approved-quoting", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/dont-want-to-learn-software", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/compare", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/jobber-housecall-site-builder", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/sms-opt-in", priority: 0.3, changeFrequency: "yearly" as const },
];

// Intentionally excluded: /q/[token] (private, per-customer quote links; also
// disallowed in robots.ts) and /portal (redirect).

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
