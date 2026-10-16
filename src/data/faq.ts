export interface FaqItem {
  question: string;
  answer: string;
  /** True when the answer contains something the company must confirm. */
  needsConfirmation?: boolean;
}

export interface FaqGroup {
  id: string;
  title: string;
  items: FaqItem[];
}

export const faqs: FaqGroup[] = [
  {
    id: "ordering",
    title: "Ordering & quotations",
    items: [
      {
        question: "How do I get a price?",
        answer:
          "Add what you need to the cart and submit an order request, or use the quotation form on any product page. The company's own policy is to give quick and accurate prices, so a member of the team comes back to you with a written quotation for the specification you sent.",
      },
      {
        question: "Why are there no prices on the website?",
        answer:
          "Printing is priced per job: quantity, paper, size, finishing and ink coverage all change the cost. This website has not been given a verified price list yet, so it deliberately shows “Price on quotation” instead of a figure that could be wrong. Once the company supplies its price list, prices can be enabled per product.",
        needsConfirmation: true,
      },
      {
        question: "Can I place an order online and pay online now?",
        answer:
          "No. Online payment is not configured yet. When you submit an order request or quotation on this site, the details are saved and passed to the team — no payment is taken and no payment details are collected in the browser. Payment method is agreed with the team when the quotation is confirmed.",
        needsConfirmation: true,
      },
      {
        question: "What happens after I submit an order request?",
        answer:
          "Your specification, contact details and any artwork you attached are saved against a reference number. The team reviews the job, confirms price and lead time, and contacts you on the phone number or email you supplied. The order only goes into production once you confirm the quotation.",
      },
      {
        question: "Is there a minimum order?",
        answer:
          "Each product page lists a typical starting quantity, and the exact minimum is confirmed on the quotation because it depends on the material and the production method used.",
        needsConfirmation: true,
      },
    ],
  },
  {
    id: "artwork",
    title: "Artwork & files",
    items: [
      {
        question: "Do I need print-ready artwork?",
        answer:
          "It helps, and it is the fastest route. If you do not have artwork, the company offers graphic design and logotype services, so the team can prepare or correct the file before printing.",
      },
      {
        question: "What file types should I send?",
        answer:
          "PDF, AI, EPS or SVG are preferred for print. Vector files (AI, EPS, SVG) are needed for logos and anything that has to be scaled, because they can be enlarged without losing quality. Accepted upload types are listed on the upload field.",
      },
      {
        question: "Can I upload artwork on this website?",
        answer:
          "Yes — artwork can be attached on product pages, and on the quotation form. Files are stored privately on the server and are only used to price and produce your job. They are never published or listed publicly.",
      },
      {
        question: "What resolution and bleed should I use?",
        answer:
          "Print-ready files are normally supplied at 300 dpi at final size with 3 mm bleed and crop marks. See the artwork guidelines page for the standard this site works to. The exact requirements for your job are confirmed in the quotation.",
        needsConfirmation: true,
      },
    ],
  },
  {
    id: "production",
    title: "Production & collection",
    items: [
      {
        question: "How long does production take?",
        answer:
          "Lead time depends on the product and quantity, so it is stated on the quotation rather than on the website. If you have a fixed deadline — an exhibition or an event — tell us the date in the order notes and the team will confirm whether it can be met.",
        needsConfirmation: true,
      },
      {
        question: "Can I collect from the shop?",
        answer:
          "The company is based in Al Maabilah North, Seeb, Muscat, and the team can confirm collection arrangements when the job is quoted. Delivery arrangements in Oman are also confirmed per job.",
        needsConfirmation: true,
      },
      {
        question: "Can you produce a sample or proof first?",
        answer:
          "For larger jobs the team can discuss a proof or a material sample before the full run. Ask for it in the order notes and it will be included in the quotation.",
        needsConfirmation: true,
      },
    ],
  },
  {
    id: "company",
    title: "About the company",
    items: [
      {
        question: "What does Printing Zone Oman do?",
        answer:
          "The company describes itself as a printing, publishing and packaging business. Its published capabilities include digital printing, screen printing (including printed paper cups), flexography, billboard and large-format printing, packaging design and production, logotype work, graphic design and custom promotional items such as printed mugs.",
      },
      {
        question: "Where are you located?",
        answer:
          "Al Maabilah North, Seeb, in Muscat, Sultanate of Oman — P.O. Box 887, P.C. 121, Seeb. The contact page has the phone numbers, email addresses and a map centred on the area.",
      },
      {
        question: "Can I speak to someone on WhatsApp?",
        answer:
          "Yes. The company lists +968 7178 8128 as its shop line and states that it is also on WhatsApp. The floating WhatsApp button on this site opens a chat with that number and a pre-written enquiry message.",
      },
      {
        question: "What are your opening hours?",
        answer:
          "Opening hours are not published anywhere and have not been supplied for this site, so they are shown as a placeholder rather than guessed. Please phone before visiting.",
        needsConfirmation: true,
      },
    ],
  },
];
