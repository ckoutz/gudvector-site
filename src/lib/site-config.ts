export const siteConfig = {
  name: "Güd Vector",
  legalName: "Güd Vector Consulting Services",
  url: "https://gudvector.com",
  motto: "sending your company in the right direction",
  email: "cameron@gudvector.com",
  areaServed: "San Francisco Bay Area",
  portalUrl: "https://gudvector.com/portal",
  managerName: "Güd Manager",
} as const;

export type NavLink = {
  label: string;
  href: string;
};

export const headerNav: NavLink[] = [
  { label: "Websites", href: "/websites" },
  { label: siteConfig.managerName, href: "/manager" },
  { label: "Custom AI", href: "/custom-ai" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: {
  heading: string;
  links: NavLink[];
}[] = [
  {
    heading: "Product",
    links: [
      { label: "Websites", href: "/websites" },
      { label: siteConfig.managerName, href: "/manager" },
      { label: "Custom AI", href: "/custom-ai" },
      { label: "Compare", href: "/compare" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Customer portal", href: "/portal" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "SMS notifications", href: "/sms-opt-in" },
    ],
  },
];
