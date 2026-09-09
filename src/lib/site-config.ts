export const siteConfig = {
  name: "Güd Vector",
  legalName: "Güd Vector Consulting Services",
  url: "https://gudvector.com",
  motto: "sending your company in the right direction",
  email: "info@gudvector.com",
  areaServed: "San Francisco Bay Area",
  servedCities: [
    "Concord",
    "Walnut Creek",
    "Pleasant Hill",
    "Martinez",
    "Clayton",
    "Pittsburg",
    "Antioch",
  ],
  portalUrl: "https://gudvector.com/portal",
} as const;

export type NavLink = {
  label: string;
  href: string;
};

// Tight header nav per owner note — full IA still exists as routes / in the footer,
// just not all linked from the header.
export const headerNav: NavLink[] = [
  { label: "Bay Area", href: "/bay-area" },
  { label: "Owner-approved quoting", href: "/owner-approved-quoting" },
  { label: "Service businesses", href: "/service-businesses" },
];

export const footerNav: {
  heading: string;
  links: NavLink[];
}[] = [
  {
    heading: "Product",
    links: [
      { label: "Service businesses", href: "/service-businesses" },
      { label: "Owner-approved quoting", href: "/owner-approved-quoting" },
      { label: "Website + booking", href: "/website-booking" },
      { label: "Bay Area", href: "/bay-area" },
      { label: "“I don’t want to learn software”", href: "/dont-want-to-learn-software" },
    ],
  },
  {
    heading: "Compare",
    links: [
      { label: "Güd Vector vs. Jobber vs. Housecall Pro vs. ServiceTitan", href: "/compare" },
      { label: "Jobber/Housecall site builder", href: "/jobber-housecall-site-builder" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Customer portal", href: "/portal" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];
