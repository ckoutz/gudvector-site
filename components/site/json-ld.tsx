import { ENTITY, SITE_URL } from "@/lib/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: ENTITY.name,
    alternateName: ENTITY.alternateName,
    url: SITE_URL,
    email: ENTITY.email,
    description:
      "Güd Vector Consulting Services builds custom websites and owner-approved quoting for local service businesses in the San Francisco Bay Area.",
    areaServed: {
      "@type": "AdministrativeArea",
      name: ENTITY.areaServed,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: ENTITY.areaServed,
      addressRegion: "CA",
      addressCountry: "US",
    },
    knowsAbout: [
      "Website building for small businesses",
      "Owner-approved quoting",
      "Customer portal for review, payment, pause, and cancel",
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
            areaServed: ENTITY.areaServed,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Automating business systems",
            areaServed: ENTITY.areaServed,
          },
        },
      ],
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: ENTITY.email,
      contactType: "customer service",
      areaServed: "US-CA",
      availableLanguage: "English",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
