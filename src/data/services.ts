import type { DataStatus } from "@/lib/catalog-types";

export interface Service {
  id: string;
  name: string;
  tagline: string;
  description: string[];
  applications: string[];
  image: string;
  imageAlt: string;
  relatedProductSlugs: string[];
  dataStatus: DataStatus;
}

/**
 * Service groupings. Each one is tagged with where it came from:
 *  - "published-by-company": the capability is named on printingzoneoman.com
 *    (About/Special Services copy or gallery captions such as "Billboard print",
 *    "Flexography", "Custom mugs", "Packaging design", "Graphic design").
 *  - "to-confirm": a standard commercial-printing service that the company has
 *    not explicitly published. Marked in the UI for the owner to approve.
 */
export const services: Service[] = [
  {
    id: "digital",
    name: "Digital Printing",
    tagline: "Short runs, fast turnaround, no plate costs",
    description: [
      "Digital printing is the practical route for short runs and jobs that may need reprinting: there are no printing plates to make, so small quantities stay affordable and amendments are quick to turn around.",
      "It covers most of the day-to-day commercial work — cards, flyers, stationery, short-run brochures and labels — and is also how we produce personalised or variable-data items.",
    ],
    applications: [
      "Business cards and stationery",
      "Flyers, leaflets and short-run brochures",
      "Labels and stickers",
      "Short-run and reprint work",
    ],
    image: "/media/category-flyers-leaflets.webp",
    imageAlt: "Short-run digitally printed flyers fanned across a studio surface",
    relatedProductSlugs: ["a5-flyers", "premium-business-cards", "product-labels-rolls"],
    dataStatus: "published-by-company",
  },
  {
    id: "commercial",
    name: "Commercial & Offset Printing",
    tagline: "Volume work with consistent colour",
    description: [
      "For larger quantities, offset production brings the cost per sheet down and holds colour consistent across a long run — which matters when a brochure or catalogue has to look identical in every branch or on every trade counter.",
      "Long runs are quoted individually so paper, plate set-up and finishing are priced against your actual specification.",
    ],
    applications: [
      "Brochures and catalogues",
      "High-volume flyers and leaflets",
      "Corporate stationery runs",
      "Multi-part documents",
    ],
    image: "/media/category-brochures-catalogues.webp",
    imageAlt: "Printed brochures and a bound catalogue produced in a long run",
    relatedProductSlugs: ["perfect-bound-catalogues", "tri-fold-brochures", "letterheads-envelopes"],
    dataStatus: "to-confirm",
  },
  {
    id: "large-format",
    name: "Large Format & Billboard Printing",
    tagline: "Signage that is produced in-house",
    description: [
      "Large-format work is handled as its own production line, from exhibition roll-up stands to outdoor banner material and billboard-scale print. The company already names billboard printing among its services.",
      "Because large print is viewed from a distance, we check resolution and colour at the intended viewing size before production rather than after.",
    ],
    applications: [
      "Exhibition roll-up stands",
      "Outdoor PVC banners and hoardings",
      "Billboard-scale advertising",
      "Retail posters and window graphics",
    ],
    image: "/media/category-banners-large-format.webp",
    imageAlt: "Roll-up banner stand and large-format print in an exhibition space",
    relatedProductSlugs: ["roll-up-banner-stands", "vinyl-banners-billboards", "large-format-posters"],
    dataStatus: "published-by-company",
  },
  {
    id: "screen",
    name: "Screen Printing & Promotional Items",
    tagline: "Solid, flat colour on everyday objects",
    description: [
      "Screen printing is used for promotional items where the ink is laid onto a physical product: paper cups and printed mugs are both services the company already advertises.",
      "It suits bold, solid designs and brand colours, and it is quoted per printed colour and per item.",
    ],
    applications: [
      "Printed paper cups",
      "Custom mugs and drinkware",
      "Promotional giveaways",
      "Café and event branding",
    ],
    image: "/media/hero-print-collateral.webp",
    imageAlt: "Screen-printed paper cups and a printed mug on a studio surface",
    relatedProductSlugs: [
      "screen-printed-paper-cups",
      "custom-mug-printing",
      "food-beverage-packaging",
    ],
    dataStatus: "published-by-company",
  },
  {
    id: "packaging",
    name: "Packaging Printing & Production",
    tagline: "From dieline to finished carton",
    description: [
      "Packaging is one of the three disciplines the company names in its own introduction — printing, publishing and packaging — so packaging design and production are supported together with the print itself.",
      "Typical jobs run from printed folding cartons and food packaging through to labels and sleeves that complete the pack.",
    ],
    applications: [
      "Retail folding cartons",
      "Food and beverage packaging",
      "Labels and sleeves",
      "Counter display packaging",
    ],
    image: "/media/category-packaging-boxes.webp",
    imageAlt: "Printed folding cartons shown open and closed",
    relatedProductSlugs: ["folding-cartons", "food-beverage-packaging", "product-labels-rolls"],
    dataStatus: "published-by-company",
  },
  {
    id: "design",
    name: "Branding, Logotype & Graphic Design",
    tagline: "Design support before the print",
    description: [
      "Many customers arrive with a logo but no print-ready artwork. The company's own services include logotype, graphic design and packaging design work, so artwork can be prepared or corrected in-house before it goes to press.",
      "That includes setting up bleed and dielines, redrawing low-resolution logos as vector files, and adapting an existing identity to a new format.",
    ],
    applications: [
      "Logotype and identity work",
      "Artwork preparation and preflight",
      "Packaging design and dielines",
      "Campaign adaptation across formats",
    ],
    image: "/media/category-corporate-stationery.webp",
    imageAlt: "Designed corporate stationery set laid out with printed components",
    relatedProductSlugs: ["corporate-stationery-set", "premium-business-cards", "folding-cartons"],
    dataStatus: "published-by-company",
  },
  {
    id: "flexo",
    name: "Flexography",
    tagline: "Continuous printing for labels and packaging",
    description: [
      "Flexography is named among the company's capabilities. It is used where artwork repeats across a web of material — label stock, flexible packaging and other roll-fed work.",
      "Because flexo needs its own tooling, it is best suited to repeat and volume orders rather than one-offs, and is quoted per job.",
    ],
    applications: [
      "Roll-fed label production",
      "Flexible packaging",
      "Repeat volume runs",
      "Tape and film printing",
    ],
    image: "/media/category-stickers-labels.webp",
    imageAlt: "Roll of printed labels, a typical flexographic product",
    relatedProductSlugs: ["product-labels-rolls", "die-cut-vinyl-stickers", "food-beverage-packaging"],
    dataStatus: "published-by-company",
  },
  {
    id: "custom",
    name: "Custom Print Projects",
    tagline: "Jobs that do not fit a standard product",
    description: [
      "Some requirements do not map to a catalogue item: odd sizes, unusual materials, mixed sets or a format that has to be built from scratch. These are quoted from your description rather than from a preset specification.",
      "Describe what you need on the quotation form — including a sketch or reference photo if that is easier than words — and the team will come back with options.",
    ],
    applications: [
      "Non-standard sizes and formats",
      "Mixed print sets",
      "Specialty materials and finishes",
      "New product packaging",
    ],
    image: "/media/category-posters.webp",
    imageAlt: "Custom large-format print being prepared",
    relatedProductSlugs: [],
    dataStatus: "to-confirm",
  },
];
