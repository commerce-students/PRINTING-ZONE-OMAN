import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { whatsapp } from "@/lib/site";

export const metadata: Metadata = {
  title: "Site status — what works, what needs confirmation",
  description:
    "An honest status page for this Printing Zone Oman website concept: what is genuinely functional, what is demonstration content, and which integrations are required before real online ordering and payment can go live.",
  alternates: { canonical: "/site-status" },
  robots: { index: false, follow: true },
};

const working = [
  {
    title: "Catalogue browsing, search and filters",
    body: "Search, category filtering, sorting and pagination all run on the server, so results are shareable by URL and work with JavaScript disabled.",
  },
  {
    title: "Product configuration",
    body: "Size, stock, finishing, printing sides, quantity and job notes are selected per product and carried into the cart line exactly as chosen.",
  },
  {
    title: "Working cart",
    body: "Add an item, change quantities, remove lines and clear the cart. The cart is stored server-side against an HTTP-only cookie — not in localStorage.",
  },
  {
    title: "Order requests are really saved",
    body: "Checkout validates your details, writes a real order record with a sequential reference (PZO-YYYY-####), and redirects to a confirmation page that reads the record back.",
  },
  {
    title: "Quotation and contact messages are stored",
    body: "Both forms save the enquiry with its own reference number, and the quotation form accepts an artwork attachment.",
  },
  {
    title: "Artwork uploads are private",
    body: "Uploads are limited to 10 MB, checked against an extension allow-list, renamed, and written outside the public web directory. They are not reachable by URL (verified: /var/uploads/… returns 404).",
  },
];

const notOperational = [
  {
    title: "Online payment",
    body: "No payment provider is connected. The site never asks for card, bank or wallet details, and never reports a payment as taken. Payment is agreed with the team once the quotation is confirmed.",
  },
  {
    title: "Automatic pricing",
    body: "No price list has been supplied, so every product shows “Price on quotation” and cart totals stay blank instead of inventing a number.",
  },
  {
    title: "Email or SMS notification",
    body: "Submissions are saved on the server, but outbound email/SMS is not configured. Until it is, the team must check the order and enquiry records or receive a separate alert.",
  },
  {
    title: "Customer accounts, stock levels, delivery rates",
    body: "None of these are published by the company, so none are implemented or promised. Orders are placed as a guest, availability is confirmed by the team, and delivery is quoted per job.",
  },
];

const pending = [
  "Catalogue: which products, sizes, stocks and finishes the workshop actually offers.",
  "Price list and quantity breaks — required before any price can be displayed.",
  "Minimum order quantities per product.",
  "Standard production lead times.",
  "Opening hours (not published anywhere by the company).",
  "Delivery zones, charges and collection arrangements.",
  "Payment methods accepted.",
  "Privacy, terms, delivery and artwork policy wording — drafted, needs company and legal approval.",
  "Approved photography of real work, and permission to show named client projects.",
  "Social media profiles (omitted until verified).",
  "Company facts: founding year, team size, certifications, references.",
];

const integrations = [
  {
    title: "Production database or commerce platform",
    body: "The concept build stores orders and enquiries as private JSON files on the server (see src/lib/store.ts). For live trading this module should be swapped for a hosted database or the company's commerce platform — the rest of the app is written against that interface and does not change.",
  },
  {
    title: "Payment provider with a merchant account",
    body: "Choose a licensed provider operating in Oman, open the merchant account in the company's own name, and collect payment through the provider's hosted checkout. No secret keys are ever placed in front-end code, and no payment status is ever invented by the site.",
  },
  {
    title: "Transactional email",
    body: "Connect an email service so order requests, quotations and contact messages reach the right inbox immediately, and so customers get a copy of their reference.",
  },
  {
    title: "Artwork storage and retention policy",
    body: "Move uploads to access-controlled object storage with an agreed retention period, before handling real customer files at volume.",
  },
  {
    title: "Domain, hosting and monitoring",
    body: "Deploy to the company's own domain once authorised, with HTTPS, backups, uptime monitoring and an error-reporting hook in src/app/error.tsx.",
  },
];

export default function SiteStatusPage() {
  return (
    <>
      <section className="border-b border-line bg-paper-100">
        <div className="container-page py-10 md:py-14">
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Site status" }]} />
          <p className="eyebrow mt-5">Preview build</p>
          <h1 className="display-lg mt-4">What this website actually does</h1>
          <p className="lede mt-4">
            This is a redesign concept for Printing Zone Oman, built to be demonstrated and
            reviewed. Below is a plain statement of what is genuinely functional today, what is not
            operational yet, and what the company needs to supply before real online commerce can
            launch.
          </p>
        </div>
      </section>

      <section className="section pt-10">
        <div className="container-page space-y-14">
          <div>
            <h2 className="display-md">Working today</h2>
            <p className="lede mt-3">
              These features were tested end-to-end in this build, not mocked up.
            </p>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {working.map((item) => (
                <li key={item.title} className="card p-5">
                  <div className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-green" />
                    <h3 className="font-semibold text-ink-950">{item.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="display-md">Not operational — and not presented as if it is</h2>
            <p className="lede mt-3">
              Each of these is visible on the site as a clearly-labelled pending state rather than
              an implied capability.
            </p>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {notOperational.map((item) => (
                <li key={item.title} className="card p-5">
                  <div className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-warning-700" />
                    <h3 className="font-semibold text-ink-950">{item.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="display-md">Content awaiting company confirmation</h2>
            <p className="lede mt-3">
              Every item below is currently rendered as a placeholder or an explicit “to confirm”
              state — nothing on the site asserts it as fact.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {pending.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-sm border border-line bg-white px-4 py-3 text-sm text-ink-700"
                >
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="hint mt-4">
              The full list, with the source of every verified fact, is in{" "}
              <span className="mono">docs/CONTENT-VERIFICATION.md</span> in the project repository.
            </p>
          </div>

          <div>
            <h2 className="display-md">Integrations required before real commerce launches</h2>
            <ol className="mt-6 space-y-px overflow-hidden rounded-lg border border-line bg-line">
              {integrations.map((item, index) => (
                <li key={item.title} className="flex gap-5 bg-white p-6">
                  <span className="mono text-sm font-semibold text-brand-blue-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="card p-6 md:p-8">
            <h2 className="display-sm">Before this goes anywhere near the live domain</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-700">
              This build should stay on a preview URL until the company has confirmed the product
              catalogue, prices, order workflow, payment provider, delivery options, legal pages,
              brand assets and domain access. Nothing here has been published to
              printingzoneoman.com.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/quote" className="btn btn-primary">
                Try the quotation flow
              </Link>
              <Link href="/products" className="btn btn-secondary">
                Review the catalogue
              </Link>
              <a
                href={whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                WhatsApp the shop
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
