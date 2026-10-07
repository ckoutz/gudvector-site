export const brandIds = ["gudvector", "larkspur"] as const;

export type BrandId = (typeof brandIds)[number];

/** The deployment's brand; unset or unknown NEXT_PUBLIC_BRAND is Güd Vector. */
export function configuredBrandId(value: string | undefined = process.env.NEXT_PUBLIC_BRAND): BrandId {
  return (brandIds as readonly string[]).includes(value ?? "") ? (value as BrandId) : "gudvector";
}
