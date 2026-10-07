import { siteConfig } from "@/lib/site-config";

/**
 * Whose name and look a deployment wears, chosen at build time with
 * NEXT_PUBLIC_BRAND. Unset (the default) is Güd Vector's own site. Any other
 * brand serves only the portal, owner dashboard and quote pages, in the
 * business's colors, with a small "Powered by Güd Office" footer line.
 */
export type BrandId = "gudvector" | "larkspur";

export type Brand = {
  id: BrandId;
  name: string;
  legalName: string;
  homeUrl: string;
  homeLabel: string;
  email: string;
  demo: boolean;
};

const brands: Record<BrandId, Brand> = {
  gudvector: {
    id: "gudvector",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    homeUrl: "/",
    homeLabel: "gudvector.com",
    email: siteConfig.email,
    demo: false,
  },
  larkspur: {
    id: "larkspur",
    name: "Larkspur Lawn & Garden",
    legalName: "Larkspur Lawn & Garden",
    homeUrl: "https://larkspur-lawn-garden.netlify.app",
    homeLabel: "Larkspur's website",
    email: "hello@larkspur.example",
    demo: true,
  },
};

function isBrandId(value: string | undefined): value is BrandId {
  return value !== undefined && Object.hasOwn(brands, value);
}

const configured = process.env.NEXT_PUBLIC_BRAND;

export const brand: Brand = isBrandId(configured) ? brands[configured] : brands.gudvector;

export const isGudVector = brand.id === "gudvector";
