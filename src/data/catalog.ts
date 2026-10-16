import type { Category, OptionGroup, OptionValue, Product } from "@/lib/catalog-types";

/* ------------------------------------------------------------------ *
 * Reusable option-group builders
 * ------------------------------------------------------------------ */

const val = (id: string, label: string, note?: string): OptionValue => ({ id, label, note });

const size = (values: OptionValue[]): OptionGroup => ({
  id: "size",
  label: "Size",
  help: "Pick the finished trimmed size. Custom sizes are quoted on request.",
  type: "chips",
  required: true,
  values,
});

const stock = (values: OptionValue[], help?: string): OptionGroup => ({
  id: "stock",
  label: "Paper / stock",
  help: help ?? "Stock availability is confirmed by our team on the quotation.",
  type: "chips",
  required: true,
  values,
});

const finish = (values: OptionValue[]): OptionGroup => ({
  id: "finish",
  label: "Finish",
  help: "Finishing options depend on the stock selected.",
  type: "chips",
  required: true,
  values,
});

const sides = (): OptionGroup => ({
  id: "sides",
  label: "Printing sides",
  type: "chips",
  required: true,
  values: [val("single", "Single sided"), val("double", "Double sided")],
});

/* ------------------------------------------------------------------ *
 * Categories
 * ------------------------------------------------------------------ */

export const categories: Category[] = [
  {
    slug: "business-cards",
    name: "Business Cards",
    shortName: "Business cards",
    description:
      "Heavyweight cards with crisp edge definition — the first piece of print most customers hand over.",
    image: "/media/category-business-cards.webp",
    imageAlt:
      "Studio photograph of thick printed business cards in matte and glossy finishes",
    dataStatus: "to-confirm",
    order: 1,
  },
  {
    slug: "flyers-leaflets",
    name: "Flyers & Leaflets",
    shortName: "Flyers & leaflets",
    description:
      "Fast, affordable print for offers, launches and door-to-door distribution.",
    image: "/media/category-flyers-leaflets.webp",
    imageAlt: "Studio photograph of printed A5 flyers and leaflets fanned out",
    dataStatus: "to-confirm",
    order: 2,
  },
  {
    slug: "brochures-catalogues",
    name: "Brochures & Catalogues",
    shortName: "Brochures",
    description:
      "Stitched, folded and perfect-bound documents for sales teams and showrooms.",
    image: "/media/category-brochures-catalogues.webp",
    imageAlt: "Studio photograph of an open printed brochure and a bound catalogue",
    dataStatus: "to-confirm",
    order: 3,
  },
  {
    slug: "posters",
    name: "Posters",
    shortName: "Posters",
    description:
      "Single-sheet large print for retail windows, noticeboards and promotions.",
    image: "/media/category-posters.webp",
    imageAlt: "Studio photograph of large-format printed posters on a wall",
    dataStatus: "to-confirm",
    order: 4,
  },
  {
    slug: "banners-signage",
    name: "Banners & Large Format",
    shortName: "Banners & large format",
    description:
      "Roll-up stands, PVC banners and billboard-scale print the company already produces.",
    image: "/media/category-banners-large-format.webp",
    imageAlt:
      "Photograph of a roll-up banner stand and rolled large-format print in an exhibition space",
    dataStatus: "published-by-company",
    order: 5,
  },
  {
    slug: "stickers-labels",
    name: "Stickers & Labels",
    shortName: "Stickers & labels",
    description:
      "Die-cut vinyl, roll labels and product seals in matte, gloss or clear.",
    image: "/media/category-stickers-labels.webp",
    imageAlt: "Studio photograph of die-cut vinyl stickers and printed label rolls",
    dataStatus: "to-confirm",
    order: 6,
  },
  {
    slug: "packaging-boxes",
    name: "Packaging & Boxes",
    shortName: "Packaging & boxes",
    description:
      "Printed cartons, food packaging and tubes, supported by packaging design.",
    image: "/media/category-packaging-boxes.webp",
    imageAlt: "Studio photograph of printed folding cartons and packaging boxes",
    dataStatus: "published-by-company",
    order: 7,
  },
  {
    slug: "corporate-stationery",
    name: "Corporate Stationery",
    shortName: "Stationery",
    description:
      "Letterheads, envelopes, folders and notebooks kept consistent across a company.",
    image: "/media/category-corporate-stationery.webp",
    imageAlt: "Flat-lay photograph of a printed corporate stationery set",
    dataStatus: "to-confirm",
    order: 8,
  },
  {
    slug: "invitations-events",
    name: "Invitations & Events",
    shortName: "Invitations & events",
    description:
      "Invitations, menus and event cards finished with foil, deboss and specialty paper.",
    image: "/media/category-invitations-events.webp",
    imageAlt: "Studio photograph of luxury printed invitations with foil detailing",
    dataStatus: "to-confirm",
    order: 9,
  },
  {
    slug: "custom-promotional",
    name: "Custom & Promotional",
    shortName: "Custom & promotional",
    description:
      "Screen-printed mugs, cups and promotional items — a capability the company already runs.",
    image: "/media/hero-print-collateral.webp",
    imageAlt:
      "Photograph of custom printed mugs, paper cups and branded promotional items",
    dataStatus: "published-by-company",
    order: 10,
  },
];

/* ------------------------------------------------------------------ *
 * Products
 * ------------------------------------------------------------------ */

export const products: Product[] = [
  {
    slug: "premium-business-cards",
    name: "Premium Business Cards",
    categorySlug: "business-cards",
    tagline: "400 gsm cards with a finish that gets kept",
    summary:
      "Thick, rigid cards with precise trimming and a choice of matte, gloss or soft-touch lamination.",
    description: [
      "Premium business cards are printed on heavyweight board so the card feels substantial in the hand and holds a crisp trim edge. Choose a smooth finish for a classic look, or matte lamination with spot UV for a tactile contrast.",
      "Send us print-ready artwork or ask our design team to prepare the card layout — the company already offers graphic design and logotype work in-house.",
    ],
    image: "/media/category-business-cards.webp",
    imageAlt: "Printed premium business cards stacked and fanned on a paper backdrop",
    gallery: [
      { src: "/media/category-business-cards.webp", alt: "Stack of printed business cards showing thick edges" },
      { src: "/media/category-corporate-stationery.webp", alt: "Business cards arranged with matching stationery" },
      { src: "/media/category-invitations-events.webp", alt: "Close detail of card finishing and foil texture" },
    ],
    pricingMode: "quote",
    priceFrom: null,
    highlights: [
      "Heavyweight board with a rigid, premium feel",
      "Matte, gloss, soft-touch or spot UV finishing",
      "Single or double-sided print",
      "Manual artwork check before production",
    ],
    specs: [
      { label: "Typical size", value: "90 × 50 mm (other sizes on request)" },
      { label: "Stock", value: "250–450 gsm board" },
      { label: "Printing", value: "Digital or offset, both sides available" },
      { label: "Finishing", value: "Lamination, spot UV, rounded corners" },
      { label: "Packaging", value: "Boxed in quantities of 100" },
      { label: "Minimum order", value: "Confirmed on quotation" },
    ],
    options: [
      size([val("90x50", "90 × 50 mm", "Standard"), val("85x55", "85 × 55 mm", "European"), val("square-55", "55 × 55 mm", "Square"), val("custom", "Custom size", "Quoted on request")]),
      stock([val("300", "300 gsm", "Standard matt"), val("400", "400 gsm", "Heavy"), val("cotton", "Cotton-textured", "Specialty")]),
      finish([val("matte", "Matte lamination"), val("gloss", "Gloss lamination"), val("soft-touch", "Soft-touch"), val("spot-uv", "Spot UV on matte"), val("none", "Uncoated, no lamination")]),
      sides(),
    ],
    quantityPresets: [100, 250, 500, 1000, 2000],
    minQuantity: 100,
    artworkRequired: true,
    productionNote:
      "Please supply a print-ready PDF or AI file with 3 mm bleed. Our team confirms the final specification and lead time on the quotation.",
    dataStatus: "to-confirm",
    featured: true,
  },
  {
    slug: "eco-business-cards",
    name: "Recycled & Eco Business Cards",
    categorySlug: "business-cards",
    tagline: "Uncoated, recycled stocks for a natural finish",
    summary:
      "Uncoated recycled board printed with a natural, warm tone for brands built on sustainability.",
    description: [
      "These cards use uncoated recycled board that takes ink with a soft, matte appearance. The natural fibre of the sheet becomes part of the design, which suits studios, cafés, wellness brands and any business making a sustainability statement.",
      "Edge colouring and letterpress-style detailing are available as finishing options where the stock allows.",
    ],
    image: "/media/category-business-cards.webp",
    imageAlt: "Recycled uncoated business cards with visible paper fibre texture",
    gallery: [
      { src: "/media/category-business-cards.webp", alt: "Recycled board business cards on a neutral backdrop" },
      { src: "/media/category-corporate-stationery.webp", alt: "Recycled cards shown with matching printed stationery" },
      { src: "/media/hero-print-collateral.webp", alt: "Printed cards and collateral in natural paper tones" },
    ],
    pricingMode: "quote",
    priceFrom: null,
    highlights: [
      "Recycled, uncoated stock",
      "Warm natural tone, no surface sheen",
      "Optional coloured edges",
      "Works with one or two ink colours",
    ],
    specs: [
      { label: "Typical size", value: "90 × 50 mm" },
      { label: "Stock", value: "300–350 gsm recycled uncoated board" },
      { label: "Printing", value: "Digital or offset" },
      { label: "Finishing", value: "Edge colouring, deboss" },
      { label: "Minimum order", value: "Confirmed on quotation" },
    ],
    options: [
      size([val("90x50", "90 × 50 mm"), val("85x55", "85 × 55 mm"), val("custom", "Custom size")]),
      stock([val("300", "300 gsm recycled"), val("350", "350 gsm recycled", "Heavier sheet")]),
      finish([val("none", "Uncoated"), val("edge", "Coloured edges"), val("deboss", "Deboss detail")]),
      sides(),
    ],
    quantityPresets: [100, 250, 500, 1000],
    minQuantity: 100,
    artworkRequired: true,
    productionNote:
      "Uncoated recycled sheets print slightly softer than coated stock. Send your artwork and we will confirm how it behaves on this material.",
    dataStatus: "to-confirm",
  },
  {
    slug: "a5-flyers",
    name: "A5 Flyers",
    categorySlug: "flyers-leaflets",
    tagline: "High-impact handouts, quick to produce",
    summary:
      "A5 flyers for promotions, menus, events and distribution — single or double sided.",
    description: [
      "A5 is the workhorse of printed promotion: big enough to carry an offer, small enough to hand out. Printed double sided on 130–170 gsm stock, they hold their shape in a stack or a shop counter.",
      "Flyers work well as a first print job for a new business — pair them with our graphic design support if you do not yet have artwork.",
    ],
    image: "/media/category-flyers-leaflets.webp",
    imageAlt: "Printed A5 flyers overlapping in a fan on a studio backdrop",
    gallery: [
      { src: "/media/category-flyers-leaflets.webp", alt: "Fan of printed A5 flyers" },
      { src: "/media/category-posters.webp", alt: "Matching poster printed from the same campaign artwork" },
      { src: "/media/hero-print-collateral.webp", alt: "Flyers shown with other printed marketing collateral" },
    ],
    pricingMode: "quote",
    priceFrom: null,
    highlights: [
      "Fast digital production",
      "Single or double sided",
      "Gloss, matte or uncoated stock",
      "Bulk quantities for distribution",
    ],
    specs: [
      { label: "Size", value: "A5 (148 × 210 mm)" },
      { label: "Other sizes", value: "A6, A4, DL available" },
      { label: "Stock", value: "115–170 gsm" },
      { label: "Printing", value: "Full colour both sides" },
      { label: "Minimum order", value: "Confirmed on quotation" },
    ],
    options: [
      size([val("a5", "A5", "148 × 210 mm"), val("a6", "A6", "105 × 148 mm"), val("dl", "DL", "99 × 210 mm"), val("a4", "A4", "210 × 297 mm")]),
      stock([val("130", "130 gsm"), val("150", "150 gsm"), val("170", "170 gsm")]),
      finish([val("uncoated", "Uncoated"), val("matte", "Matte lamination"), val("gloss", "Gloss lamination")]),
      sides(),
    ],
    quantityPresets: [250, 500, 1000, 2500, 5000],
    minQuantity: 250,
    artworkRequired: true,
    productionNote:
      "Supply artwork with 3 mm bleed and all fonts embedded. Our team checks the file before printing.",
    dataStatus: "to-confirm",
    featured: true,
  },
  {
    slug: "leaflets-rack-cards",
    name: "Leaflets & Rack Cards",
    categorySlug: "flyers-leaflets",
    tagline: "Folded leaflets and tourist rack cards",
    summary:
      "Folded leaflets and slim rack cards for hotel lobbies, clinics and tour operators.",
    description: [
      "Folded leaflets give you more panels without a bigger footprint — ideal for service lists, menus in hotels, clinic information and activity brochures for tour operators.",
      "Rack cards are cut to the standard DL display size so they sit cleanly in leaflet stands.",
    ],
    image: "/media/category-flyers-leaflets.webp",
    imageAlt: "Folded printed leaflets and slim rack cards",
    gallery: [
      { src: "/media/category-flyers-leaflets.webp", alt: "Folded leaflets and rack cards" },
      { src: "/media/category-brochures-catalogues.webp", alt: "Multi-panel printed document open on a surface" },
      { src: "/media/category-posters.webp", alt: "Poster printed from the same campaign artwork" },
    ],
    pricingMode: "quote",
    priceFrom: null,
    highlights: [
      "Bi-fold and tri-fold options",
      "Rack-card size for display stands",
      "Matte or gloss finishing",
      "Fold lines checked before trimming",
    ],
    specs: [
      { label: "Rack card size", value: "100 × 210 mm" },
      { label: "Folded leaflet", value: "A4 folded to A5 or DL" },
      { label: "Stock", value: "150–250 gsm" },
      { label: "Folding", value: "Bi-fold, tri-fold, roll fold" },
      { label: "Minimum order", value: "Confirmed on quotation" },
    ],
    options: [
      size([val("rack", "Rack card", "100 × 210 mm"), val("a4-fold", "A4 to A5 fold"), val("a4-dl", "A4 to DL fold"), val("a3-fold", "A3 to A4 fold")]),
      stock([val("170", "170 gsm"), val("200", "200 gsm"), val("250", "250 gsm")]),
      finish([val("matte", "Matte"), val("gloss", "Gloss"), val("uncoated", "Uncoated")]),
      sides(),
    ],
    quantityPresets: [250, 500, 1000, 2500],
    minQuantity: 250,
    artworkRequired: true,
    productionNote:
      "Fold lines must be marked in the artwork. If they are not, our design team can set them up for you.",
    dataStatus: "to-confirm",
  },
  {
    slug: "tri-fold-brochures",
    name: "Tri-Fold Brochures",
    categorySlug: "brochures-catalogues",
    tagline: "Six panels, one neat folded document",
    summary:
      "Six-panel brochures that fit in a pocket but carry a full service list or product range.",
    description: [
      "Tri-fold brochures give you six printable panels for a price close to flat print. They suit service lists, product ranges, clinic information and company profiles.",
      "We confirm the fold type and panel order on the quotation so the layout reads correctly when the brochure is opened.",
    ],
    image: "/media/category-brochures-catalogues.webp",
    imageAlt: "Tri-fold printed brochures, one open showing the centre spread",
    gallery: [
      { src: "/media/category-brochures-catalogues.webp", alt: "Open tri-fold brochure showing printed pages" },
      { src: "/media/category-flyers-leaflets.webp", alt: "Brochures shown alongside matching leaflet print" },
      { src: "/media/category-corporate-stationery.webp", alt: "Brochure placed with matching corporate stationery" },
    ],
    pricingMode: "quote",
    priceFrom: null,
    highlights: [
      "Three-fold, six-panel layout",
      "Matte or gloss lamination",
      "Folded and creased on the press line",
      "Bulk quantities for sales teams",
    ],
    specs: [
      { label: "Folded size", value: "A4 folded to DL" },
      { label: "Open size", value: "A4 (297 × 210 mm)" },
      { label: "Stock", value: "150–250 gsm" },
      { label: "Finishing", value: "Lamination, creasing, folding" },
      { label: "Minimum order", value: "Confirmed on quotation" },
    ],
    options: [
      size([val("a4-dl", "A4 → DL"), val("a4-a5", "A4 → A5", "Bi-fold"), val("a3-a4", "A3 → A4")]),
      stock([val("170", "170 gsm"), val("200", "200 gsm"), val("250", "250 gsm")]),
      finish([val("matte", "Matte lamination"), val("gloss", "Gloss lamination"), val("uncoated", "Uncoated")]),
      sides(),
    ],
    quantityPresets: [250, 500, 1000, 2500],
    minQuantity: 250,
    artworkRequired: true,
    productionNote:
      "Let us know which panel should appear on the outside cover. We will confirm panel order before printing.",
    dataStatus: "to-confirm",
  },
  {
    slug: "perfect-bound-catalogues",
    name: "Perfect-Bound Catalogues",
    categorySlug: "brochures-catalogues",
    tagline: "Multi-page catalogues with a printed spine",
    summary:
      "Multi-page product catalogues and company profiles with a square, printed spine.",
    description: [
      "When a document runs beyond a folded brochure, perfect binding gives you a square spine, a printed title on the edge and a document that sits properly on a shelf.",
      "Ideal for product ranges, annual profiles and training manuals. Page counts are confirmed at quotation, as binding requires pages in multiples of four.",
    ],
    image: "/media/category-brochures-catalogues.webp",
    imageAlt: "Perfect-bound printed catalogue standing open to show its spine",
    gallery: [
      { src: "/media/category-brochures-catalogues.webp", alt: "Perfect-bound catalogue with visible spine" },
      { src: "/media/category-corporate-stationery.webp", alt: "Catalogue shown with a corporate stationery set" },
      { src: "/media/category-posters.webp", alt: "Printed spread detail" },
    ],
    pricingMode: "quote",
    priceFrom: null,
    highlights: [
      "Square printed spine",
      "Suitable for 16 pages and above",
      "Cover lamination optional",
      "Ideal for product ranges and profiles",
    ],
    specs: [
      { label: "Common sizes", value: "A4 or A5 portrait" },
      { label: "Page counts", value: "Multiples of four" },
      { label: "Cover stock", value: "250–300 gsm" },
      { label: "Text stock", value: "115–170 gsm" },
      { label: "Binding", value: "Perfect bound" },
      { label: "Minimum order", value: "Confirmed on quotation" },
    ],
    options: [
      size([val("a4", "A4 portrait"), val("a5", "A5 portrait"), val("square", "Square 210 × 210 mm")]),
      stock([val("130", "130 gsm text", "Lighter, thinner spine"), val("150", "150 gsm text"), val("170", "170 gsm text", "Heavier feel")]),
      finish([val("matte", "Matte cover lamination"), val("gloss", "Gloss cover lamination"), val("soft-touch", "Soft-touch cover")]),
      {
        id: "pages",
        label: "Approximate page count",
        help: "Final page count is confirmed once artwork is checked.",
        type: "chips",
        required: true,
        values: [val("16", "16 pages"), val("24", "24 pages"), val("32", "32 pages"), val("48+", "48+ pages")],
      },
    ],
    quantityPresets: [100, 250, 500, 1000],
    minQuantity: 100,
    artworkRequired: true,
    productionNote:
      "Send a single PDF with pages in reading order plus a separate cover file. We will confirm the spine width after checking the page count.",
    dataStatus: "to-confirm",
  },
  {
    slug: "large-format-posters",
    name: "Large-Format Posters",
    categorySlug: "posters",
    tagline: "A2 to A0 single-sheet print",
    summary:
      "Sharp, saturated single-sheet posters for windows, noticeboards and retail promotions.",
    description: [
      "Large-format posters are printed for impact at viewing distance, on paper or on a durable synthetic sheet for areas where moisture or handling is a factor.",
      "Common uses include retail window promotions, event announcements, school and campus notices and in-store offers.",
    ],
    image: "/media/category-posters.webp",
    imageAlt: "Large-format printed posters displayed on a wall and rolled",
    gallery: [
      { src: "/media/category-posters.webp", alt: "Large posters shown pinned and rolled" },
      { src: "/media/category-banners-large-format.webp", alt: "Large format print on display in an exhibition space" },
      { src: "/media/category-flyers-leaflets.webp", alt: "Matching handheld print from the same campaign" },
    ],
    pricingMode: "quote",
    priceFrom: null,
    highlights: [
      "A2, A1 and A0 sizes",
      "Paper or synthetic sheet",
      "Strong colour saturation for distance viewing",
      "Single sheet or short runs",
    ],
    specs: [
      { label: "Sizes", value: "A2, A1, A0 (custom sizes available)" },
      { label: "Stock", value: "170–250 gsm poster paper or synthetic" },
      { label: "Printing", value: "Large-format inkjet" },
      { label: "Finishing", value: "Trimmed to size, optional lamination" },
      { label: "Minimum order", value: "Confirmed on quotation" },
    ],
    options: [
      size([val("a2", "A2", "420 × 594 mm"), val("a1", "A1", "594 × 841 mm"), val("a0", "A0", "841 × 1189 mm"), val("custom", "Custom size")]),
      stock([val("170", "170 gsm poster paper"), val("250", "250 gsm poster paper"), val("synthetic", "Synthetic sheet", "Tear resistant")]),
      finish([val("none", "None"), val("matte-lam", "Matte lamination"), val("gloss-lam", "Gloss lamination")]),
    ],
    quantityPresets: [10, 25, 50, 100, 250],
    minQuantity: 10,
    artworkRequired: true,
    productionNote:
      "Supply artwork at final size where possible. Scaling up a small file will soften the print, so we check resolution before producing.",
    dataStatus: "to-confirm",
  },
  {
    slug: "roll-up-banner-stands",
    name: "Roll-Up Banner Stands",
    categorySlug: "banners-signage",
    tagline: "Reusable stands for exhibitions and receptions",
    summary:
      "Printed fabric or film in a retractable stand — quick to set up, easy to reuse.",
    description: [
      "Roll-up stands are the standard for exhibitions, receptions and roadshows: the print retracts into the base, so the same stand can be reused when your message changes. Only the printed panel needs replacing.",
      "Standard widths are 80 cm and 100 cm, with a printed panel that shows a taut, flat surface when the stand is raised.",
    ],
    image: "/media/category-banners-large-format.webp",
    imageAlt: "Roll-up banner stand with printed panel in an exhibition space",
    gallery: [
      { src: "/media/category-banners-large-format.webp", alt: "Roll-up banner stand set up in an exhibition" },
      { src: "/media/category-posters.webp", alt: "Printed panel detail" },
      { src: "/media/hero-print-collateral.webp", alt: "Large-format print shown with other printed collateral" },
    ],
    pricingMode: "quote",
    priceFrom: null,
    highlights: [
      "Retractable aluminium base",
      "Standard 80 cm and 100 cm widths",
      "Panel can be replaced when messaging changes",
      "Carry bag available",
    ],
    specs: [
      { label: "Standard widths", value: "80 cm and 100 cm" },
      { label: "Panel height", value: "Approx. 200 cm visible" },
      { label: "Material", value: "Blockout film or printed fabric" },
      { label: "Base", value: "Aluminium retractable" },
      { label: "Lead time", value: "Confirmed on quotation" },
    ],
    options: [
      size([val("80x200", "80 × 200 cm"), val("100x200", "100 × 200 cm"), val("custom", "Custom size")]),
      stock([val("film", "Blockout film"), val("fabric", "Printed fabric", "Softer, matte look")]),
      finish([val("standard", "Standard base"), val("deluxe", "Deluxe base with carry bag")]),
    ],
    quantityPresets: [1, 2, 5, 10],
    minQuantity: 1,
    artworkRequired: true,
    productionNote:
      "The bottom 100 mm of the panel is held inside the cassette and is not visible — keep key content away from that area.",
    dataStatus: "published-by-company",
    featured: true,
  },
  {
    slug: "vinyl-banners-billboards",
    name: "PVC Banners & Billboard Print",
    categorySlug: "banners-signage",
    tagline: "Outdoor banners and billboard-scale work",
    summary:
      "Reinforced outdoor banners and billboard-scale print for facades, hoardings and events.",
    description: [
      "The company already produces billboard-scale printing, so signage is handled in-house rather than outsourced. PVC banners are supplied with welded hems and eyelets for fixing, and can be finished with pole pockets where the frame requires it.",
      "Suitable for shopfronts, construction hoardings, event perimeters and vehicle-adjacent signage.",
    ],
    image: "/media/category-banners-large-format.webp",
    imageAlt: "Large outdoor PVC banner print and exhibition graphics",
    gallery: [
      { src: "/media/category-banners-large-format.webp", alt: "Large format outdoor banner" },
      { src: "/media/category-posters.webp", alt: "Printed graphic detail at large scale" },
      { src: "/media/category-stickers-labels.webp", alt: "Self-adhesive signage material sample" },
    ],
    pricingMode: "quote",
    priceFrom: null,
    highlights: [
      "Welded hems and eyelets",
      "Pole pockets available",
      "Outdoor weather-resistant ink",
      "Billboard-scale production",
    ],
    specs: [
      { label: "Material", value: "PVC banner, 440–510 gsm mesh or solid" },
      { label: "Sizes", value: "Custom, quoted by square metre" },
      { label: "Finishing", value: "Hem, eyelets, pole pockets" },
      { label: "Uses", value: "Outdoor and event signage" },
      { label: "Lead time", value: "Confirmed on quotation" },
    ],
    options: [
      size([val("2x1", "2 × 1 m"), val("3x1", "3 × 1 m"), val("4x2", "4 × 2 m"), val("custom", "Custom size", "Quoted per square metre")]),
      stock([val("440", "440 gsm solid PVC"), val("510", "510 gsm heavy PVC"), val("mesh", "Mesh banner", "For windy locations")]),
      finish([val("eyelets", "Hem + eyelets"), val("pole", "Pole pockets"), val("both", "Hem, eyelets and pole pockets")]),
    ],
    quantityPresets: [1, 2, 4, 10, 25],
    minQuantity: 1,
    artworkRequired: true,
    productionNote:
      "Send artwork at a scale of 1:10 for large banners and we will confirm viewing resolution before production.",
    dataStatus: "published-by-company",
  },
  {
    slug: "die-cut-vinyl-stickers",
    name: "Die-Cut Vinyl Stickers",
    categorySlug: "stickers-labels",
    tagline: "Custom shapes on a peel-off sheet",
    summary:
      "Cut-to-shape vinyl stickers in custom outlines, printed in full colour.",
    description: [
      "Die-cut stickers are cut to your own outline rather than a rectangle, which makes them work as packaging seals, laptop stickers, wall decals and promotional giveaways.",
      "Choose a matte, gloss or clear material depending on whether the sticker should stand out or disappear into the surface underneath.",
    ],
    image: "/media/category-stickers-labels.webp",
    imageAlt: "Die-cut vinyl stickers on a peel-off backing sheet",
    gallery: [
      { src: "/media/category-stickers-labels.webp", alt: "Sheet of die-cut stickers with glossy finish" },
      { src: "/media/category-packaging-boxes.webp", alt: "Stickers applied to packaging" },
      { src: "/media/category-corporate-stationery.webp", alt: "Branded stickers shown with stationery" },
    ],
    pricingMode: "quote",
    priceFrom: null,
    highlights: [
      "Custom die-cut outlines",
      "Matte, gloss or clear vinyl",
      "Indoor and short-term outdoor use",
      "Supplied on peel-off sheets or rolls",
    ],
    specs: [
      { label: "Sizes", value: "From 30 mm up to A4 sheets" },
      { label: "Material", value: "Vinyl with adhesive backing" },
      { label: "Cutting", value: "Die-cut to your outline" },
      { label: "Finishing", value: "Laminated or unlaminated" },
      { label: "Minimum order", value: "Confirmed on quotation" },
    ],
    options: [
      size([val("30", "30–50 mm"), val("60", "60–90 mm"), val("100", "100–150 mm"), val("custom", "Custom size")]),
      stock([val("matte", "Matte vinyl"), val("gloss", "Gloss vinyl"), val("clear", "Clear vinyl"), val("kraft", "Kraft paper sticker")]),
      finish([val("sheet", "Supplied on sheets"), val("roll", "Supplied on rolls")]),
    ],
    quantityPresets: [100, 250, 500, 1000, 5000],
    minQuantity: 100,
    artworkRequired: true,
    productionNote:
      "Send artwork with a separate cutting outline (a spot colour or vector path) so we can set up the die line accurately.",
    dataStatus: "to-confirm",
  },
  {
    slug: "product-labels-rolls",
    name: "Product Labels on Roll",
    categorySlug: "stickers-labels",
    tagline: "Roll labels for jars, bottles and tubes",
    summary:
      "Roll-fed labels sized for production filling lines and hand application.",
    description: [
      "Roll labels suit food producers, cosmetics makers and anyone applying labels at volume. We supply the roll direction and core size to match how you apply them, by hand or on a filling line.",
      "Materials include paper, vinyl and clear film, with a write-on or grease-resistant option for products stored in kitchens.",
    ],
    image: "/media/category-stickers-labels.webp",
    imageAlt: "Roll of printed product labels partially unwound",
    gallery: [
      { src: "/media/category-stickers-labels.webp", alt: "Roll of printed labels and applied containers" },
      { src: "/media/category-packaging-boxes.webp", alt: "Labels shown with printed packaging" },
      { src: "/media/hero-print-collateral.webp", alt: "Label and packaging print detail" },
    ],
    pricingMode: "quote",
    priceFrom: null,
    highlights: [
      "Roll direction matched to your applicator",
      "Paper, vinyl and clear film materials",
      "Water-resistant options",
      "Suits food and cosmetic packaging",
    ],
    specs: [
      { label: "Sizes", value: "Custom cut to your container" },
      { label: "Roll core", value: "Matched to your applicator" },
      { label: "Materials", value: "Paper, vinyl, clear film, kraft" },
      { label: "Finishing", value: "Gloss or matte varnish" },
      { label: "Minimum order", value: "Confirmed on quotation" },
    ],
    options: [
      size([val("small", "Up to 40 mm"), val("medium", "40–80 mm"), val("large", "80–120 mm"), val("custom", "Custom size")]),
      stock([val("paper", "Paper label"), val("vinyl", "Vinyl label", "Water resistant"), val("clear", "Clear film"), val("kraft", "Kraft paper")]),
      finish([val("matte", "Matte varnish"), val("gloss", "Gloss varnish"), val("none", "Unvarnished")]),
    ],
    quantityPresets: [500, 1000, 2500, 5000, 10000],
    minQuantity: 500,
    artworkRequired: true,
    productionNote:
      "Tell us the container shape and the roll core size you need — both affect how the label sits when applied.",
    dataStatus: "to-confirm",
  },
  {
    slug: "folding-cartons",
    name: "Printed Folding Cartons",
    categorySlug: "packaging-boxes",
    tagline: "Retail cartons built from your own structure",
    summary:
      "Printed cartons with die-cut structures, produced alongside packaging design support.",
    description: [
      "Folding cartons are produced from a die-cut structure, so the first step is agreeing the box dimensions and how it opens. Our team can work from your existing dieline or design a new structure with you.",
      "Common uses include retail product boxes, gift boxes, food packaging and subscription packaging.",
    ],
    image: "/media/category-packaging-boxes.webp",
    imageAlt: "Printed folding cartons shown closed and open with visible die-cut structure",
    gallery: [
      { src: "/media/category-packaging-boxes.webp", alt: "Printed folding cartons closed and open" },
      { src: "/media/category-stickers-labels.webp", alt: "Labels and stickers for the same packaging range" },
      { src: "/media/hero-print-collateral.webp", alt: "Packaging shown with other printed collateral" },
    ],
    pricingMode: "quote",
    priceFrom: null,
    highlights: [
      "Die-cut structures to your dimensions",
      "Single or double-sided print inside and out",
      "Matte, gloss or soft-touch finishes",
      "Packaging design support available",
    ],
    specs: [
      { label: "Board", value: "300–450 gsm folding carton board" },
      { label: "Structure", value: "Straight tuck-end, reverse tuck, custom" },
      { label: "Printing", value: "Full colour, inside and out available" },
      { label: "Finishing", value: "Lamination, spot UV, embossing" },
      { label: "Minimum order", value: "Confirmed on quotation" },
    ],
    options: [
      size([val("small", "Small", "Up to 100 mm"), val("medium", "Medium", "100–200 mm"), val("large", "Large", "200 mm +"), val("custom", "Custom structure")]),
      stock([val("300", "300 gsm board"), val("350", "350 gsm board"), val("400", "400 gsm board"), val("450", "450 gsm board", "Rigid")]),
      finish([val("matte", "Matte lamination"), val("gloss", "Gloss lamination"), val("soft-touch", "Soft-touch"), val("spot-uv", "Spot UV")]),
      {
        id: "structure",
        label: "Structure",
        type: "chips",
        required: true,
        values: [val("tuck-end", "Straight tuck-end"), val("reverse-tuck", "Reverse tuck-end"), val("sleeve", "Sleeve and tray"), val("existing", "Use our existing dieline")],
      },
    ],
    quantityPresets: [250, 500, 1000, 2500, 5000],
    minQuantity: 250,
    artworkRequired: true,
    productionNote:
      "A production dieline is required. If you already have one, send it as a vector file; if not, our design team can prepare it.",
    dataStatus: "published-by-company",
    featured: true,
  },
  {
    slug: "food-beverage-packaging",
    name: "Food & Beverage Packaging",
    categorySlug: "packaging-boxes",
    tagline: "Cups, boxes and sleeves for food service",
    summary:
      "Printed cups, takeaway boxes and sleeves in food-grade materials.",
    description: [
      "The company already screen-prints paper cups, which makes this one of the clearest examples of in-house production: the same workshop prints the cup and the box it goes in.",
      "Food-grade boards and barrier linings are specified per product, and the exact material is confirmed on the quotation.",
    ],
    image: "/media/category-packaging-boxes.webp",
    imageAlt: "Printed food packaging boxes and cups",
    gallery: [
      { src: "/media/category-packaging-boxes.webp", alt: "Printed food packaging boxes" },
      { src: "/media/hero-print-collateral.webp", alt: "Printed paper cups with geometric branding" },
      { src: "/media/category-stickers-labels.webp", alt: "Seal stickers for food packaging" },
    ],
    pricingMode: "quote",
    priceFrom: null,
    highlights: [
      "Printed paper cups and cups printing",
      "Takeaway boxes and sleeves",
      "Food-grade materials",
      "Screen printing for solid colours",
    ],
    specs: [
      { label: "Products", value: "Cups, boxes, sleeves, bags" },
      { label: "Materials", value: "Food-grade board, kraft, coated" },
      { label: "Printing", value: "Screen or offset printing" },
      { label: "Finishing", value: "Food-safe varnish where required" },
      { label: "Minimum order", value: "Confirmed on quotation" },
    ],
    options: [
      size([val("cup", "Paper cup"), val("box", "Takeaway box"), val("sleeve", "Cup sleeve"), val("bag", "Paper bag")]),
      stock([val("kraft", "Kraft board"), val("coated", "Coated white board"), val("foodg", "Food-grade barrier board")]),
      finish([val("matte", "Matte"), val("gloss", "Gloss"), val("none", "Uncoated")]),
    ],
    quantityPresets: [1000, 2500, 5000, 10000, 25000],
    minQuantity: 1000,
    artworkRequired: true,
    productionNote:
      "Food packaging often needs to meet food-contact requirements. Share how the product is stored and we will confirm a suitable material.",
    dataStatus: "published-by-company",
  },
  {
    slug: "corporate-stationery-set",
    name: "Corporate Stationery Set",
    categorySlug: "corporate-stationery",
    tagline: "One order, one consistent identity",
    summary:
      "Letterheads, envelopes, folders and notepads printed together on the same stock and ink.",
    description: [
      "Printing a stationery set in one run keeps colours consistent across documents and avoids the mismatch that appears when items are ordered separately.",
      "Sets are typically built around a company's existing identity, supported by the company's own logotype and graphic design services.",
    ],
    image: "/media/category-corporate-stationery.webp",
    imageAlt: "Printed corporate stationery set arranged as a flat lay",
    gallery: [
      { src: "/media/category-corporate-stationery.webp", alt: "Flat lay of a printed corporate stationery set" },
      { src: "/media/category-business-cards.webp", alt: "Matching business cards from the same identity" },
      { src: "/media/category-brochures-catalogues.webp", alt: "Company profile printed for the same brand" },
    ],
    pricingMode: "quote",
    priceFrom: null,
    highlights: [
      "Consistent colour across all items",
      "Letterheads, envelopes, folders, notepads",
      "Uncoated or laid paper options",
      "Design support available",
    ],
    specs: [
      { label: "Letterhead", value: "A4, 100–120 gsm" },
      { label: "Envelopes", value: "DL, C5, C4" },
      { label: "Folders", value: "A4 with business card slit" },
      { label: "Notepads", value: "A5 or A4, glued or wire bound" },
      { label: "Minimum order", value: "Confirmed on quotation" },
    ],
    options: [
      {
        id: "items",
        label: "Items required",
        help: "Choose the main item — tell us about the rest in the order notes.",
        type: "chips",
        required: true,
        values: [val("letterhead", "Letterheads"), val("envelope", "Envelopes"), val("folder", "Presentation folders"), val("notepad", "Notepads"), val("full-set", "Full set")],
      },
      size([val("a4", "A4"), val("a5", "A5"), val("dl", "DL"), val("mixed", "Mixed sizes")]),
      stock([val("100", "100 gsm uncoated"), val("120", "120 gsm uncoated"), val("laid", "Laid / textured"), val("recycled", "Recycled")]),
      sides(),
    ],
    quantityPresets: [250, 500, 1000, 2500, 5000],
    minQuantity: 250,
    artworkRequired: true,
    productionNote:
      "Send master artwork for each item plus your logo in vector format. We keep your files on record so reorders match.",
    dataStatus: "to-confirm",
  },
  {
    slug: "letterheads-envelopes",
    name: "Letterheads & Envelopes",
    categorySlug: "corporate-stationery",
    tagline: "Everyday business print on reliable stock",
    summary:
      "Letterheads and matching envelopes printed on uncoated paper that takes pen and printer ink well.",
    description: [
      "Correspondence print has to work with everyday office equipment, so it is printed on uncoated papers that feed cleanly through laser printers and accept a signature.",
      "Envelopes are supplied in standard DL, C5 and C4 sizes with window options where required.",
    ],
    image: "/media/category-corporate-stationery.webp",
    imageAlt: "Printed letterheads and envelopes on a paper-toned surface",
    gallery: [
      { src: "/media/category-corporate-stationery.webp", alt: "Letterheads and envelopes arranged together" },
      { src: "/media/category-business-cards.webp", alt: "Business cards from the same identity" },
      { src: "/media/hero-print-collateral.webp", alt: "Printed stationery shown with other collateral" },
    ],
    pricingMode: "quote",
    priceFrom: null,
    highlights: [
      "Uncoated stock suitable for office printers",
      "DL, C5 and C4 envelope sizes",
      "Window envelopes available",
      "Bulk runs for regular use",
    ],
    specs: [
      { label: "Letterhead", value: "A4, 100 gsm uncoated" },
      { label: "Envelopes", value: "DL, C5, C4" },
      { label: "Printing", value: "Full colour or single colour" },
      { label: "Finishing", value: "Folded, boxed, banded" },
      { label: "Minimum order", value: "Confirmed on quotation" },
    ],
    options: [
      size([val("a4", "A4 letterhead"), val("dl", "DL envelope"), val("c5", "C5 envelope"), val("c4", "C4 envelope")]),
      stock([val("100", "100 gsm"), val("120", "120 gsm"), val("80", "80 gsm", "Economical")]),
      finish([val("standard", "Standard"), val("window", "Window envelope"), val("banded", "Banded in packs")]),
      sides(),
    ],
    quantityPresets: [500, 1000, 2500, 5000, 10000],
    minQuantity: 500,
    artworkRequired: true,
    productionNote:
      "Keep margins clear on letterheads — the printable area differs between digital and offset production.",
    dataStatus: "to-confirm",
  },
  {
    slug: "invitations-cards",
    name: "Invitations & Cards",
    categorySlug: "invitations-events",
    tagline: "Foil, deboss and specialty paper",
    summary:
      "Invitations and greeting cards finished with foil, deboss and thick specialty paper.",
    description: [
      "Event print allows for finishing that would be impractical on everyday business print: metallic foil, blind deboss and heavy cotton papers with a deckled edge.",
      "Send the wording and any ornament, and we confirm which finishes suit the design before production.",
    ],
    image: "/media/category-invitations-events.webp",
    imageAlt: "Luxury printed invitation cards with gold foil detailing",
    gallery: [
      { src: "/media/category-invitations-events.webp", alt: "Foil-finished invitation cards" },
      { src: "/media/category-business-cards.webp", alt: "Card finishing detail" },
      { src: "/media/category-corporate-stationery.webp", alt: "Invitations shown with matching envelopes" },
    ],
    pricingMode: "quote",
    priceFrom: null,
    highlights: [
      "Gold, silver and coloured foil",
      "Blind deboss and emboss",
      "Heavy cotton and textured papers",
      "Matching envelopes",
    ],
    specs: [
      { label: "Common sizes", value: "A6, 5×7 inch, DL" },
      { label: "Stock", value: "300–600 gsm, cotton or textured" },
      { label: "Finishing", value: "Foil, deboss, emboss, deckled edge" },
      { label: "Envelopes", value: "Matching colours available" },
      { label: "Minimum order", value: "Confirmed on quotation" },
    ],
    options: [
      size([val("a6", "A6"), val("5x7", "5 × 7 inch"), val("dl", "DL"), val("custom", "Custom size")]),
      stock([val("300", "300 gsm board"), val("450", "450 gsm heavy"), val("cotton", "Cotton paper", "Textured, thick")]),
      finish([val("foil", "Foil"), val("deboss", "Blind deboss"), val("emboss", "Emboss"), val("flat", "Flat print only")]),
    ],
    quantityPresets: [50, 100, 250, 500, 1000],
    minQuantity: 50,
    artworkRequired: true,
    productionNote:
      "Foil and deboss need a separate single-colour artwork layer. We will confirm what to send when you share your design.",
    dataStatus: "to-confirm",
  },
  {
    slug: "event-menu-printing",
    name: "Event & Menu Printing",
    categorySlug: "invitations-events",
    tagline: "Menus, programmes and place cards",
    summary:
      "Menus, programmes and table cards printed to match an event or venue.",
    description: [
      "Venues and event organisers need menus and programmes that survive handling and look consistent with the rest of the event stationery.",
      "Laminated menus are wipeable for daily service, while guests' menus can be printed on heavier uncoated stock with a folded presentation.",
    ],
    image: "/media/category-invitations-events.webp",
    imageAlt: "Printed event menus and place cards arranged on a table",
    gallery: [
      { src: "/media/category-invitations-events.webp", alt: "Printed event stationery" },
      { src: "/media/category-corporate-stationery.webp", alt: "Event print alongside corporate stationery" },
      { src: "/media/category-brochures-catalogues.webp", alt: "Folded event programme detail" },
    ],
    pricingMode: "quote",
    priceFrom: null,
    highlights: [
      "Wipeable laminated menus",
      "Folded programmes",
      "Place and table cards",
      "Short reprint runs for menu changes",
    ],
    specs: [
      { label: "Menu sizes", value: "A4, A5, DL, custom" },
      { label: "Stock", value: "200–350 gsm" },
      { label: "Finishing", value: "Lamination, folding, round corners" },
      { label: "Reprints", value: "Short runs for seasonal changes" },
      { label: "Minimum order", value: "Confirmed on quotation" },
    ],
    options: [
      size([val("a4", "A4 menu"), val("a5", "A5 menu"), val("dl", "DL card"), val("place", "Place card")]),
      stock([val("250", "250 gsm"), val("300", "300 gsm"), val("350", "350 gsm")]),
      finish([val("matte-lam", "Matte lamination"), val("gloss-lam", "Gloss lamination", "Wipeable"), val("uncoated", "Uncoated")]),
    ],
    quantityPresets: [50, 100, 250, 500, 1000],
    minQuantity: 50,
    artworkRequired: true,
    productionNote:
      "Menu wording changes often — ask us to keep your artwork on file so reprints are quick.",
    dataStatus: "to-confirm",
  },
  {
    slug: "custom-mug-printing",
    name: "Custom Mug Printing",
    categorySlug: "custom-promotional",
    tagline: "Promotional mugs printed to your design",
    summary:
      "Printed mugs for offices, corporate gifts and café retail — a service the company already provides.",
    description: [
      "Custom mug printing is one of the company's published services and suits corporate gifts, office kitchens and café retail lines.",
      "Send your artwork or logo and we confirm the printable area on the mug shape you choose before printing.",
    ],
    image: "/media/hero-print-collateral.webp",
    imageAlt: "Custom printed ceramic mugs with abstract branding",
    gallery: [
      { src: "/media/hero-print-collateral.webp", alt: "Printed mug and paper cups on a studio surface" },
      { src: "/media/category-stickers-labels.webp", alt: "Printed promotional sticker details" },
      { src: "/media/category-packaging-boxes.webp", alt: "Printed packaging for a promotional range" },
    ],
    pricingMode: "quote",
    priceFrom: null,
    highlights: [
      "Single or full-wrap printing",
      "Corporate gift quantities",
      "Logo printing in solid colours",
      "Matches printed cups and packaging",
    ],
    specs: [
      { label: "Mug types", value: "Standard ceramic, confirm availability" },
      { label: "Print area", value: "Confirmed against the mug shape" },
      { label: "Printing", value: "Full colour or single colour" },
      { label: "Packaging", value: "Individual boxes available" },
      { label: "Minimum order", value: "Confirmed on quotation" },
    ],
    options: [
      {
        id: "item",
        label: "Item",
        type: "chips",
        required: true,
        values: [val("mug", "Ceramic mug"), val("cup", "Paper cups"), val("bottle", "Drink bottle"), val("other", "Other item")],
      },
      {
        id: "print-area",
        label: "Print area",
        help: "Wrap-around printing needs artwork in a curved layout.",
        type: "chips",
        required: true,
        values: [val("front", "Front print"), val("wrap", "Wrap-around"), val("two-sided", "Two-sided")],
      },
      {
        id: "colours",
        label: "Print colours",
        type: "chips",
        required: true,
        values: [val("one", "One colour"), val("two", "Two colours"), val("full", "Full colour")],
      },
    ],
    quantityPresets: [50, 100, 250, 500, 1000],
    minQuantity: 50,
    artworkRequired: true,
    productionNote:
      "Send your logo as a vector file (AI, EPS, SVG or PDF). If you only have a low-resolution image, our design team can advise on redrawing.",
    dataStatus: "published-by-company",
    featured: true,
  },
  {
    slug: "screen-printed-paper-cups",
    name: "Screen-Printed Paper Cups",
    categorySlug: "custom-promotional",
    tagline: "Cups printed in-house",
    summary:
      "Paper cups screen-printed in the company's own workshop for cafés, events and offices.",
    description: [
      "Cup printing is produced in-house using screen printing, so single-colour and solid-colour designs come out with the strong, flat look that screen printing is known for.",
      "Cafés, kiosks, event caterers and offices use printed cups as everyday branding that survives the whole drink service.",
    ],
    image: "/media/hero-print-collateral.webp",
    imageAlt: "Screen-printed paper cups with geometric branding",
    gallery: [
      { src: "/media/hero-print-collateral.webp", alt: "Printed paper cups in a group" },
      { src: "/media/category-packaging-boxes.webp", alt: "Printed food packaging" },
      { src: "/media/category-stickers-labels.webp", alt: "Lid and seal sticker details" },
    ],
    pricingMode: "quote",
    priceFrom: null,
    highlights: [
      "Screen printing in-house",
      "Solid and flat colour reproduction",
      "Café, event and office volumes",
      "Matches printed sleeves and boxes",
    ],
    specs: [
      { label: "Sizes", value: "Single, double and jumbo cup sizes" },
      { label: "Printing", value: "Screen printing, usually one to three colours" },
      { label: "Ink", value: "Food-safe inks appropriate to the cup" },
      { label: "Lids", value: "Matching lids available" },
      { label: "Minimum order", value: "Confirmed on quotation" },
    ],
    options: [
      size([val("single", "Single wall cup"), val("double", "Double wall cup"), val("jumbo", "Jumbo cup"), val("mixed", "Mixed sizes")]),
      {
        id: "colours",
        label: "Print colours",
        help: "Screen printing is quoted per colour.",
        type: "chips",
        required: true,
        values: [val("one", "One colour"), val("two", "Two colours"), val("three", "Three colours")],
      },
      finish([val("standard", "Standard finish"), val("sleeve", "With matching printed sleeve"), val("lid", "With matching lid")]),
    ],
    quantityPresets: [1000, 2500, 5000, 10000, 25000],
    minQuantity: 1000,
    artworkRequired: true,
    productionNote:
      "Screen printing reproduces solid spot colours best. Send vector artwork and Pantone references if your brand has them.",
    dataStatus: "published-by-company",
    featured: true,
  },
];

/* ------------------------------------------------------------------ *
 * Accessors
 * ------------------------------------------------------------------ */

export const sortedCategories = [...categories].sort((a, b) => a.order - b.order);

export function getCategories(): Category[] {
  return sortedCategories;
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProducts(): Product[] {
  return products;
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.categorySlug === slug);
}

export function getFeaturedProducts(limit = 6): Product[] {
  const featured = products.filter((p) => p.featured);
  return featured.slice(0, limit);
}

export function getRelatedProducts(slug: string, limit = 4): Product[] {
  const current = getProduct(slug);
  if (!current) return [];
  const sameCategory = products.filter(
    (p) => p.categorySlug === current.categorySlug && p.slug !== slug,
  );
  const others = products.filter(
    (p) => p.categorySlug !== current.categorySlug && p.slug !== slug,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export type SortKey = "featured" | "name-asc" | "name-desc" | "category";

export const sortOptions: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured first" },
  { key: "name-asc", label: "Name A–Z" },
  { key: "name-desc", label: "Name Z–A" },
  { key: "category", label: "Category" },
];

export interface CatalogQuery {
  search?: string;
  category?: string;
  sort?: SortKey;
  page?: number;
  perPage?: number;
}

export interface CatalogResult {
  items: Product[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
  category?: Category;
}

/** Server-side search, filtering, sorting and pagination for the catalogue page. */
export function queryCatalog({
  search = "",
  category = "",
  sort = "featured",
  page = 1,
  perPage = 9,
}: CatalogQuery): CatalogResult {
  const term = search.trim().toLowerCase();
  let items = [...products];

  if (category) {
    items = items.filter((p) => p.categorySlug === category);
  }

  if (term) {
    items = items.filter((p) => {
      const haystack = [
        p.name,
        p.tagline,
        p.summary,
        getCategory(p.categorySlug)?.name ?? "",
        ...p.specs.map((s) => `${s.label} ${s.value}`),
        ...p.highlights,
      ]
        .join(" ")
        .toLowerCase();
      return term
        .split(/\s+/)
        .filter(Boolean)
        .every((word) => haystack.includes(word));
    });
  }

  const collator = new Intl.Collator("en");
  switch (sort) {
    case "name-asc":
      items.sort((a, b) => collator.compare(a.name, b.name));
      break;
    case "name-desc":
      items.sort((a, b) => collator.compare(b.name, a.name));
      break;
    case "category":
      items.sort(
        (a, b) =>
          (getCategory(a.categorySlug)?.order ?? 99) - (getCategory(b.categorySlug)?.order ?? 99) ||
          collator.compare(a.name, b.name),
      );
      break;
    case "featured":
    default:
      items.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
      break;
  }

  const total = items.length;
  const safePerPage = Math.max(1, Math.min(24, perPage));
  const totalPages = Math.max(1, Math.ceil(total / safePerPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * safePerPage;

  return {
    items: items.slice(start, start + safePerPage),
    total,
    page: safePage,
    perPage: safePerPage,
    totalPages,
    category: category ? getCategory(category) : undefined,
  };
}
