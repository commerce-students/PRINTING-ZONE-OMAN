/**
 * Policy pages.
 *
 * The company's current website publishes empty Terms, Shipping, Delivery and
 * FAQ pages, so no legal or commercial policy text exists to reuse. Every page
 * below therefore carries `status: "draft"`, which the UI renders as a visible
 * "pending approval" banner. The wording only describes what this website
 * actually does; it makes no claim about the company's commercial terms.
 */

export interface PolicySection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface PolicyDoc {
  slug: string;
  title: string;
  summary: string;
  lastReviewed: string;
  status: "draft" | "approved";
  sections: PolicySection[];
}

export const policies: PolicyDoc[] = [
  {
    slug: "privacy",
    title: "Privacy policy",
    summary:
      "What this website records when you submit an order request, quotation or message — and what it does not do with it.",
    lastReviewed: "2026-10-16",
    status: "draft",
    sections: [
      {
        heading: "What this website collects",
        paragraphs: [
          "When you submit a quotation request, an order request or a contact message, the website stores the details you entered — your name, company name (if you gave one), email address, phone number, the specification you selected and any notes you wrote.",
        ],
        bullets: [
          "Contact details you type into a form",
          "The product, quantity and options you selected",
          "Any artwork or reference file you attached",
          "The date and time of the submission and a reference number",
        ],
      },
      {
        heading: "How it is used",
        paragraphs: [
          "The information is used only to price and produce the job you asked about, and to contact you about it. It is stored on the website's own server storage and is not published publicly anywhere on the site.",
        ],
      },
      {
        heading: "Artwork files",
        paragraphs: [
          "Uploaded artwork is stored outside the public web directory, so it cannot be reached by a URL. Only staff processing your job are intended to open it. If you would prefer not to upload artwork through the website, send it by email or WhatsApp instead — both are listed on the contact page.",
        ],
      },
      {
        heading: "Payments",
        paragraphs: [
          "This website does not take payments and never asks for card details. No payment credentials are collected, transmitted or stored by the site.",
        ],
      },
      {
        heading: "Not yet finalised",
        paragraphs: [
          "This document is a draft prepared for the website concept. Retention periods, the named data controller and the company's registration details must be added and legally reviewed before the site goes live.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms & conditions",
    summary:
      "The basis on which a quotation, order request and print job are handled once the company confirms them.",
    lastReviewed: "2026-10-16",
    status: "draft",
    sections: [
      {
        heading: "Quotations",
        paragraphs: [
          "Submitting an order request or quotation through this website does not create a contract. Prices shown as “on quotation” are confirmed in writing by the company, based on the specification you supplied. A job enters production only after you confirm the quotation.",
        ],
      },
      {
        heading: "Specifications and artwork",
        paragraphs: [
          "You are responsible for checking the specification, spelling, dimensions and artwork you approve. Reprints required because of an error in approved artwork are treated as a new job unless the error was made by the company.",
        ],
      },
      {
        heading: "Colour and material variation",
        paragraphs: [
          "Print production involves small tolerances: colour can vary slightly between runs and between digital and offset processes, and paper shades can vary between batches. Industry-standard tolerances apply to every job.",
        ],
      },
      {
        heading: "Cancellation",
        paragraphs: [
          "Once a job has gone to press it generally cannot be cancelled, because materials have been cut and press time has been committed. Cancellation terms are stated on the individual quotation.",
        ],
      },
      {
        heading: "Not yet finalised",
        paragraphs: [
          "Payment terms, liability limits, governing law and dispute resolution must be supplied by the company and reviewed by a lawyer before publication. The sections above describe standard trade practice and are provided as a working draft only.",
        ],
      },
    ],
  },
  {
    slug: "delivery",
    title: "Delivery & collection",
    summary:
      "How a completed job is handed over, and the details still to be confirmed with the company.",
    lastReviewed: "2026-10-16",
    status: "draft",
    sections: [
      {
        heading: "Collection",
        paragraphs: [
          "Printing Zone is based in Al Maabilah North, Seeb, Muscat. Collection from the shop can be arranged when the job is booked; the team confirms the address and timing on the quotation.",
        ],
      },
      {
        heading: "Delivery in Oman",
        paragraphs: [
          "Delivery can be arranged for completed jobs. Coverage areas, charges and timing depend on the destination and the size of the job, so they are quoted with the job rather than published here.",
        ],
      },
      {
        heading: "Large-format and heavy items",
        paragraphs: [
          "Banners, boards and bulk paper are delivered by arrangement because they need suitable transport. This is confirmed when the quotation is issued.",
        ],
      },
      {
        heading: "Still to be confirmed",
        paragraphs: [
          "The company has not published its delivery zones, delivery charges or lead times. These are placeholders until the business supplies them, and no delivery promise should be inferred from this page.",
        ],
      },
    ],
  },
  {
    slug: "artwork",
    title: "Artwork guidelines",
    summary:
      "The file setup that makes a print job go smoothly — useful before you upload anything.",
    lastReviewed: "2026-10-16",
    status: "draft",
    sections: [
      {
        heading: "Preferred file types",
        paragraphs: [
          "Print-ready PDF is the most reliable format. Vector artwork (AI, EPS, SVG) is required for logos and anything that must be scaled without losing quality.",
        ],
        bullets: [
          "PDF — preferred for finished, multi-page and print-ready files",
          "AI / EPS / SVG — required for logos and scalable artwork",
          "High-resolution TIFF or JPEG — accepted where no vector file exists",
          "Do not send screenshots, Word documents or web images for production",
        ],
      },
      {
        heading: "Setup",
        paragraphs: [
          "Supply artwork at final size with 3 mm bleed on every edge, crop marks, and all fonts embedded or outlined. Keep important text and logos at least 5 mm inside the trim line.",
        ],
      },
      {
        heading: "Resolution and colour",
        paragraphs: [
          "Supply photographic images at 300 dpi at the size they will print. Files are best supplied in CMYK for print production. Pantone references are helpful when a brand colour has to match exactly, particularly for screen printing and flexography.",
        ],
      },
      {
        heading: "Sending large files",
        paragraphs: [
          "Uploads through this website accept one artwork file per submission up to the stated size limit. Larger or multiple files are best sent by email to printme@printingzoneoman.com, or by WeTransfer link, using the reference number from your request.",
        ],
      },
      {
        heading: "Not yet finalised",
        paragraphs: [
          "These guidelines reflect common commercial print practice. The company should confirm its preferred preflight settings and the maximum upload size before launch.",
        ],
      },
    ],
  },
];

export function getPolicy(slug: string): PolicyDoc | undefined {
  return policies.find((p) => p.slug === slug);
}
