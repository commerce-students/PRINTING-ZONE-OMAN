import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { CtaBand } from "@/components/home/cta-band";
import { ProductCard } from "@/components/catalog/product-card";
import { getProduct, getProductsByCategory } from "@/data/catalog";
import { verified } from "@/lib/site";

export const metadata: Metadata = {
  title: "Business printing in Muscat — stationery, marketing and packaging",
  description:
    "Business printing from Printing Zone Oman: stationery sets, marketing print, labels and packaging for offices, retailers, hospitality and agencies in Muscat, quoted per job.",
  alternates: { canonical: "/business-printing" },
};

const slugs = [
  "corporate-stationery-set",
  "premium-business-cards",
  "perfect-bound-catalogues",
  "product-labels-rolls",
  "folding-cartons",
  "a5-flyers",
];

const needs = [
  {
    title: "Consistency across a company",
    body: "Stationery printed in one run keeps colour identical on letterheads, folders, cards and envelopes — which is what makes a brand look managed rather than assembled.",
    link: { href: "/products/corporate-stationery-set", label: "Corporate stationery set" },
  },
  {
    title: "Repeat runs that match",
    body: "Artwork is kept on file for reorders, so a second print run matches the first instead of drifting in colour or trim.",
    link: { href: "/products", label: "Reordable products" },
  },
  {
    title: "Retail-ready packaging",
    body: "Cartons, labels and sleeves produced together means the pack, the label and the seal all arrive as one coherent unit.",
    link: { href: "/products/folding-cartons", label: "Printed folding cartons" },
  },
  {
    title: "Marketing print that keeps up",
    body: "Flyers, brochures and posters for launches, season menus and promotions — printed short-run so material can change without waste.",
    link: { href: "/products?category=flyers-leaflets", label: "Flyers & leaflets" },
  },
];

export default function BusinessPrintingPage() {
  const products = slugs
    .map((slug) => getProduct(slug))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));
  const labelRange = getProductsByCategory("stickers-labels");

  return (
    <>
      <section className="border-b border-line bg-paper-100">
        <div className="container-page py-10 md:py-14">
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Business printing" }]} />
          <p className="eyebrow mt-5">Business printing</p>
          <h1 className="display-lg mt-4">Print that keeps a business looking consistent</h1>
          <p className="lede mt-4">
            For offices, retailers, cafés, clinics, hotels and agencies printing on a regular basis:
            the work is quoting a specification once, agreeing it, and then being able to repeat it
            without matching colours by eye every time.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/quote" className="btn btn-primary">
              Request a business quote
            </Link>
            <Link href="/services" className="btn btn-secondary">
              See printing services
            </Link>
          </div>
        </div>
      </section>

      <section className="section pt-12">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-2">
            {needs.map((need) => (
              <div key={need.title} className="card p-6 md:p-7">
                <h2 className="display-sm">{need.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{need.body}</p>
                <Link href={need.link.href} className="link-underline mt-4 inline-block text-sm">
                  {need.link.label}
                </Link>
              </div>
            ))}
          </div>

          <section className="mt-14" aria-labelledby="business-products">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Frequently ordered</p>
                <h2 id="business-products" className="display-md mt-3">
                  Business print we quote most often
                </h2>
              </div>
              <Link href="/products" className="btn btn-secondary">
                Full catalogue
              </Link>
            </div>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <li key={product.slug} className="flex">
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-14 grid gap-6 lg:grid-cols-12">
            <div className="card p-6 md:p-8 lg:col-span-7">
              <h2 className="display-sm">Working with the team on repeat business</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-700">
                {[
                  "Tell us the items you print regularly and the team can note them on a single quotation.",
                  "Send master artwork once — logos in vector format, plus a template for each item.",
                  "For multi-branch or multi-brand work, say so up front so quantities and versions are priced together.",
                  "For deadline-driven work (exhibitions, openings, seasonal menus) give the date at quotation stage.",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="notice notice-info mt-6">
                <span>
                  Account terms, credit facilities and volume agreements have not been published by
                  the company, so this page does not promise them. They can be discussed directly on{" "}
                  <a href={`tel:${verified.phones[1].tel}`} className="link-underline">
                    <span className="mono">{verified.phones[1].display}</span>
                  </a>{" "}
                  (admin line).
                </span>
              </p>
            </div>

            <div className="card p-6 md:p-8 lg:col-span-5">
              <h2 className="display-sm">Labels are where business print meets packaging</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                Product labels, seal stickers and shelf labels are produced alongside packaging, so a
                product range can be finished in one place — including the details customers handle.
              </p>
              <ul className="mt-5 space-y-3">
                {labelRange.map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={`/products/${product.slug}`}
                      className="flex items-center justify-between gap-4 rounded-sm border border-line px-4 py-3 transition-colors hover:border-ink-400 hover:bg-paper-50"
                    >
                      <span className="text-sm font-semibold text-ink-900">{product.name}</span>
                      <span aria-hidden="true" className="text-ink-400">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Business accounts"
        title="Send the specification you print regularly"
        body="Include the items, quantities and how often you reorder. The team will quote the set and keep your artwork on file for repeat runs."
        primary={{ href: "/quote", label: "Request a quote" }}
        secondary={{ href: "/contact", label: "Talk to the team" }}
      />
    </>
  );
}
