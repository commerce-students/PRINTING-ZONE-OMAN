/**
 * Catalogue types + helpers.
 *
 * The catalogue is plain typed data so the company can update products without
 * touching page code. Every product carries `dataStatus`, which the UI surfaces
 * as a visible "demonstration catalogue" note until the business confirms the
 * item — see /docs/CONTENT-VERIFICATION.md.
 */

export type DataStatus = "published-by-company" | "to-confirm";

export type PricingMode = "quote" | "fixed";

export interface OptionValue {
  id: string;
  label: string;
  /** Extra detail shown under the label, e.g. stock weight. */
  note?: string;
  /** Only used when a verified price list is loaded. */
  priceDelta?: number | null;
}

export interface OptionGroup {
  id: string;
  label: string;
  help?: string;
  type: "chips" | "select";
  required: boolean;
  values: OptionValue[];
}

export interface Category {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Categories that map to capabilities the company publishes on its own site. */
  dataStatus: DataStatus;
  order: number;
}

export interface Product {
  slug: string;
  name: string;
  categorySlug: string;
  tagline: string;
  summary: string;
  description: string[];
  image: string;
  imageAlt: string;
  gallery: { src: string; alt: string }[];
  pricingMode: PricingMode;
  /** Set only from a company-supplied price list. */
  priceFrom?: number | null;
  highlights: string[];
  specs: { label: string; value: string }[];
  options: OptionGroup[];
  quantityPresets: number[];
  minQuantity: number;
  artworkRequired: boolean;
  /** Free-text note shown on the product page about artwork/turnaround. */
  productionNote: string;
  dataStatus: DataStatus;
  featured?: boolean;
}

export const QUANTITY_GROUP_ID = "quantity";
