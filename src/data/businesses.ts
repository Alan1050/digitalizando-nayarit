import businessesData from "./businesses.json";
import type { Business } from "../types/business";

const businessAssets = import.meta.glob<string>(
  "../businesses/*/images/*.{avif,gif,jpeg,jpg,png,svg,webp}",
  {
    eager: true,
    import: "default",
    query: "?url",
  },
);

export const businesses = businessesData as Business[];

export function getBusinessLogoUrl(business: Business) {
  if (/^(?:https?:)?\/\//.test(business.logo) || business.logo.startsWith("/")) {
    return business.logo;
  }

  return businessAssets[`../businesses/${business.logo}`] ?? business.logo;
}
