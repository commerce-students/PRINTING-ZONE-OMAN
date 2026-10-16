/**
 * Portfolio / print examples.
 *
 * IMPORTANT: these are demonstration visuals produced for this website concept.
 * They are NOT photographs of completed Printing Zone Oman client projects, and
 * the page says so on screen. Replace each entry's `image` with a real,
 * approved photograph of the company's own work before launch — see
 * /docs/CONTENT-VERIFICATION.md.
 */

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  materials: string[];
  isDemonstration: true;
}

export const portfolioCategories = [
  "All",
  "Stationery",
  "Marketing",
  "Packaging",
  "Signage",
  "Promotional",
  "Events",
] as const;

export const portfolioItems: PortfolioItem[] = [
  {
    id: "stationery-identity-set",
    title: "Corporate identity print set",
    category: "Stationery",
    description:
      "Matching letterheads, folders and cards printed in one run so colour stays identical across the set.",
    image: "/media/category-corporate-stationery.webp",
    imageAlt: "Printed corporate stationery set arranged as a flat lay",
    materials: ["Uncoated 120 gsm", "300 gsm cards", "Matte lamination"],
    isDemonstration: true,
  },
  {
    id: "business-card-heavyweight",
    title: "Heavyweight card finish study",
    category: "Stationery",
    description:
      "400 gsm cards comparing matte lamination, spot UV and uncoated stocks side by side.",
    image: "/media/category-business-cards.webp",
    imageAlt: "Business cards showing thick edges and different finishes",
    materials: ["400 gsm board", "Spot UV", "Soft-touch"],
    isDemonstration: true,
  },
  {
    id: "brochure-campaign",
    title: "Multi-panel brochure campaign",
    category: "Marketing",
    description:
      "Folded brochures and a bound catalogue built from one campaign layout across two formats.",
    image: "/media/category-brochures-catalogues.webp",
    imageAlt: "Open brochure and bound catalogue from the same campaign",
    materials: ["170 gsm text", "250 gsm cover", "Perfect bound"],
    isDemonstration: true,
  },
  {
    id: "flyer-distribution",
    title: "A5 flyer distribution run",
    category: "Marketing",
    description:
      "Short-run A5 flyers intended for counter handouts and neighbourhood distribution.",
    image: "/media/category-flyers-leaflets.webp",
    imageAlt: "Printed A5 flyers fanned across a surface",
    materials: ["150 gsm", "Double sided", "Matte"],
    isDemonstration: true,
  },
  {
    id: "poster-set",
    title: "Retail poster set",
    category: "Marketing",
    description:
      "Large-format posters produced as a series for in-store and window display.",
    image: "/media/category-posters.webp",
    imageAlt: "Large-format printed posters shown on a wall",
    materials: ["200 gsm poster paper", "Matte lamination"],
    isDemonstration: true,
  },
  {
    id: "carton-structure",
    title: "Retail carton structure",
    category: "Packaging",
    description:
      "A die-cut folding carton shown closed and open to demonstrate the structure and inside print.",
    image: "/media/category-packaging-boxes.webp",
    imageAlt: "Printed folding cartons open and closed",
    materials: ["350 gsm carton board", "Inside print", "Matte"],
    isDemonstration: true,
  },
  {
    id: "label-roll",
    title: "Roll label and sticker range",
    category: "Packaging",
    description:
      "Die-cut vinyl stickers and roll labels prepared for a product launch range.",
    image: "/media/category-stickers-labels.webp",
    imageAlt: "Roll of labels and die-cut vinyl stickers",
    materials: ["Gloss vinyl", "Clear film", "Roll supplied"],
    isDemonstration: true,
  },
  {
    id: "banner-exhibition",
    title: "Exhibition banner system",
    category: "Signage",
    description:
      "Roll-up stand and printed large-format panels designed for a trade exhibition.",
    image: "/media/category-banners-large-format.webp",
    imageAlt: "Roll-up banner stand set up in an exhibition space",
    materials: ["Blockout film", "80 × 200 cm", "Aluminium base"],
    isDemonstration: true,
  },
  {
    id: "promotional-cups",
    title: "Café cup and mug branding",
    category: "Promotional",
    description:
      "Screen-printed cups and mugs produced as an everyday branding set for a café counter.",
    image: "/media/hero-print-collateral.webp",
    imageAlt: "Screen-printed paper cups and a printed mug",
    materials: ["Screen printing", "Food-safe ink", "One colour"],
    isDemonstration: true,
  },
  {
    id: "invitation-foil",
    title: "Foil-finished invitation",
    category: "Events",
    description:
      "Invitation cards finished with metallic foil and blind deboss on heavy cotton stock.",
    image: "/media/category-invitations-events.webp",
    imageAlt: "Invitation cards with gold foil detailing",
    materials: ["450 gsm cotton", "Gold foil", "Deboss"],
    isDemonstration: true,
  },
];
