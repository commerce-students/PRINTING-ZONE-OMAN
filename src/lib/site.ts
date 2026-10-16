/**
 * Verified business information — Printing Zone Oman.
 *
 * EVERYTHING in `verified` was taken from the company's own live website
 * (printingzoneoman.com: Contact Us page, About/Special Services pages and the
 * site's own gallery captions) on 2026-10-16. Nothing here may be changed
 * without confirmation from the business.
 *
 * EVERYTHING in `pendingConfirmation` is intentionally unknown: the company's
 * current site publishes no hours, no payment terms, no delivery rules, no
 * prices and no policies. The website renders these as visible placeholders
 * instead of inventing answers.
 */

export const site = {
  name: "Printing Zone",
  legalSuffix: "Oman",
  fullName: "Printing Zone Oman",
  domain: "printingzoneoman.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://printingzoneoman.com",
  tagline: "Printing that brings your brand to life",
  shortDescription:
    "Commercial printing, publishing and packaging in Muscat — business print, branding, large-format and custom production.",
  /** Sampled from the supplied logo file (brand asset provenance in /docs/BRAND-ASSETS.md) */
  logo: {
    src: "/brand/printing-zone-oman-logo.png",
    width: 160,
    height: 100,
    alt: "Printing Zone — the company's existing logo",
  },
} as const;

/** Facts published by the company itself. Safe to display. */
export const verified = {
  address: {
    line1: "Al Maabilah North",
    area: "Seeb",
    city: "Muscat",
    country: "Sultanate of Oman",
    poBox: "887",
    postalCode: "121",
    formatted:
      "Sultanate of Oman – Muscat – Seeb – Al Maabilah North, P.O. Box 887, P.C. 121, Seeb",
    /** City-level only: the exact shopfront pin has not been supplied. */
    mapQuery: "Al Maabilah, Seeb, Muscat, Oman",
  },
  phones: [
    {
      label: "Shop",
      display: "+968 7178 8128",
      tel: "+96871788128",
      whatsapp: true,
      note: "The company states this number is also on WhatsApp.",
    },
    {
      label: "Admin",
      display: "+968 9901 0291",
      tel: "+96899010291",
      whatsapp: false,
      note: null,
    },
  ],
  emails: [
    { address: "info@printingzoneoman.com", purpose: "General enquiries" },
    { address: "sales@printingzoneoman.com", purpose: "Sales & quotations" },
    { address: "printme@printingzoneoman.com", purpose: "Order artwork & job files" },
  ],
  capabilities: [
    "Commercial printing, publishing and packaging",
    "Digital printing",
    "Screen printing (including printed paper cups)",
    "Flexography",
    "Large-format / billboard printing",
    "Packaging design and production",
    "Logotype and brand identity work",
    "Graphic design and custom design",
    "Custom promotional items, including printed mugs",
    "Advertising materials and print ideas",
  ],
  /** Wording the company uses about itself. */
  statements: {
    hero: "New way to print your projects with best results.",
    affordable:
      "Affordable pricing for printing, publishing and packaging services.",
    service:
      "We are ready to listen to your needs and would like to talk about how we can grow your business through printing.",
    pricing:
      "We provide quick and accurate prices which are competitive and guaranteed.",
    managers:
      "Our business managers are dedicated, willing to learn about your business and help you achieve your goals.",
    mission:
      "Our mission is to deliver the quality products you need to help enhance your business.",
  },
} as const;

/**
 * Not published anywhere by the company. Rendered as editable placeholders.
 * Tracked in /docs/CONTENT-VERIFICATION.md.
 */
export const pendingConfirmation = {
  businessHours: null,
  paymentMethods: null,
  deliveryOptions: null,
  collectionPoint: null,
  minimumOrderValues: null,
  standardLeadTimes: null,
  socialProfiles: [],
  certifications: [],
  foundingYear: null,
  teamSize: null,
  customerTestimonials: [],
} as const;

export const whatsapp = {
  /** Derived from the company's own "Shop" line, which it lists as WhatsApp-enabled. */
  number: "96871788128",
  get href() {
    const message =
      "Hello Printing Zone Oman, I would like to enquire about your printing products and services.";
    return `https://wa.me/${this.number}?text=${encodeURIComponent(message)}`;
  },
} as const;

export const currency = {
  code: "OMR",
  symbol: "OMR",
  label: "Omani Rial",
  /**
   * Prices are only ever shown when the company supplies them. Until then every
   * product in the catalogue is quotation-based, which is how the site renders
   * prices: "Price on quotation".
   */
  pricesPublished: false,
} as const;

export const nav = [
  {
    label: "Products",
    href: "/products",
    columns: [
      {
        title: "Marketing print",
        links: [
          { label: "Business Cards", href: "/products?category=business-cards" },
          { label: "Flyers & Leaflets", href: "/products?category=flyers-leaflets" },
          { label: "Brochures & Catalogues", href: "/products?category=brochures-catalogues" },
          { label: "Posters", href: "/products?category=posters" },
        ],
      },
      {
        title: "Signage & packaging",
        links: [
          { label: "Banners & Large Format", href: "/products?category=banners-signage" },
          { label: "Stickers & Labels", href: "/products?category=stickers-labels" },
          { label: "Packaging & Boxes", href: "/products?category=packaging-boxes" },
        ],
      },
      {
        title: "Business & events",
        links: [
          { label: "Corporate Stationery", href: "/products?category=corporate-stationery" },
          { label: "Invitations & Events", href: "/products?category=invitations-events" },
          { label: "Custom & Promotional", href: "/products?category=custom-promotional" },
        ],
      },
    ],
  },
  { label: "Printing Services", href: "/services" },
  { label: "Business Printing", href: "/business-printing" },
  { label: "Custom Printing", href: "/custom-printing" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = {
  products: [
    { label: "Business Cards", href: "/products?category=business-cards" },
    { label: "Flyers & Leaflets", href: "/products?category=flyers-leaflets" },
    { label: "Brochures & Catalogues", href: "/products?category=brochures-catalogues" },
    { label: "Packaging & Boxes", href: "/products?category=packaging-boxes" },
    { label: "Banners & Large Format", href: "/products?category=banners-signage" },
    { label: "All products", href: "/products" },
  ],
  services: [
    { label: "Digital printing", href: "/services#digital" },
    { label: "Screen printing", href: "/services#screen" },
    { label: "Large format & billboards", href: "/services#large-format" },
    { label: "Packaging production", href: "/services#packaging" },
    { label: "Branding & design", href: "/services#design" },
    { label: "Custom print projects", href: "/custom-printing" },
  ],
  support: [
    { label: "Request a quotation", href: "/quote" },
    { label: "Business printing", href: "/business-printing" },
    { label: "Ordering & process", href: "/ordering" },
    { label: "Frequently asked questions", href: "/faq" },
    { label: "Contact", href: "/contact" },
    { label: "Portfolio", href: "/portfolio" },
  ],
  legal: [
    { label: "Privacy policy", href: "/policies/privacy" },
    { label: "Terms & conditions", href: "/policies/terms" },
    { label: "Delivery & collection", href: "/policies/delivery" },
    { label: "Artwork guidelines", href: "/policies/artwork" },
  ],
} as const;
