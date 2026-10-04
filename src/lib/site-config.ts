export const siteConfig = {
  name: "Güd Vector",
  legalName: "Güd Vector Consulting Services",
  url: "https://gudvector.com",
  motto: "sending your company in the right direction",
  email: "cameron@gudvector.com",
  areaServed: "San Francisco Bay Area",
  portalUrl: "https://gudvector.com/portal",
} as const;

export type NavLink = {
  label: string;
  href: string;
};

export const headerNav: NavLink[] = [
  { label: "Quoting", href: "/owner-approved-quoting" },
  { label: "Booking", href: "/website-booking" },
  { label: "Compare", href: "/compare" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: {
  heading: string;
  links: NavLink[];
}[] = [
  {
    heading: "Product",
    links: [
      { label: "Owner-approved quoting", href: "/owner-approved-quoting" },
      { label: "Website + booking", href: "/website-booking" },
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
