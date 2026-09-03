import type { Metadata } from "next";
import { absoluteUrl, ENTITY } from "@/lib/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  index?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  ogTitle,
  index = true,
}: PageMeta): Metadata {
  const url = absoluteUrl(path);
  const openGraphTitle = ogTitle ?? title;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: ENTITY.alternateName,
      url,
      title: openGraphTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: openGraphTitle,
      description,
    },
  };
}
