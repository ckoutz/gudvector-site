export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://gudvector.com";

export const ENTITY = {
  name: "Güd Vector Consulting Services",
  alternateName: "Güd Vector",
  email: "info@gudvector.com",
  url: SITE_URL,
  areaServed: "San Francisco Bay Area",
  areaServedShort: "Bay Area",
  motto: "sending your company in the right direction.",
  h1: "If they can't find you, they call someone else.",
  tagline: "One site, one system, less to manage.",
} as const;

export const LIVE_PORTAL = "https://gudvector.com/portal";

export type NavLink = {
  href: string;
  label: string;
};

export const headerNav: NavLink[] = [
  { href: "/concord", label: "Concord" },
  { href: "/owner-approved-quoting", label: "Owner-approved quoting" },
  { href: "/landscapers", label: "Landscapers" },
];

export const footerNav: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/concord", label: "Concord & Contra Costa" },
  { href: "/landscapers", label: "Landscapers" },
  { href: "/plumbers", label: "Plumbers" },
  { href: "/home-inspectors", label: "Home inspectors" },
  { href: "/environmental-testing", label: "Environmental testing" },
  { href: "/website-booking", label: "Website + booking" },
  { href: "/owner-approved-quoting", label: "Owner-approved quoting" },
  { href: "/dont-want-to-learn-software", label: "I don't want to learn software" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export const comparisonNav: NavLink[] = [
  { href: "/jobber-alternative", label: "Jobber alternative" },
  { href: "/housecall-pro-alternative", label: "Housecall Pro alternative" },
  { href: "/servicetitan-alternative", label: "ServiceTitan alternative" },
  {
    href: "/jobber-housecall-site-builder",
    label: "Site builder vs a site you own",
  },
];

export const publicPaths = [
  "/",
  "/privacy",
  "/terms",
  "/landscapers",
  "/plumbers",
  "/home-inspectors",
  "/website-booking",
  "/owner-approved-quoting",
  "/jobber-alternative",
  "/housecall-pro-alternative",
  "/servicetitan-alternative",
  "/jobber-housecall-site-builder",
  "/dont-want-to-learn-software",
  "/environmental-testing",
  "/concord",
] as const;

export function absoluteUrl(path: string) {
  if (path === "/") return SITE_URL;
  return `${SITE_URL}${path}`;
}
