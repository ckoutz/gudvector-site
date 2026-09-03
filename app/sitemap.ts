import type { MetadataRoute } from "next";
import { absoluteUrl, publicPaths } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-03");

  return publicPaths.map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/privacy" || path === "/terms" ? 0.3 : 0.7,
  }));
}
