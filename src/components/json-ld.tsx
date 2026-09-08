import { siteConfig } from "@/lib/site-config";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    description:
      "Websites and owner-approved quoting systems for Bay Area local service businesses.",
    address: {
      "@type": "PostalAddress",
      addressRegion: "CA",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "Place",
      name: siteConfig.areaServed,
    },
    knowsAbout: [
      "Website building for small businesses",
      "Owner-approved quoting systems",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Güd Vector services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Website building for small business",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Owner-approved quoting systems",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
