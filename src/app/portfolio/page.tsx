import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { PortfolioGrid } from "@/components/catalog/portfolio-grid";
import { CtaBand } from "@/components/home/cta-band";
import { portfolioItems } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Print examples & portfolio",
  description:
    "Examples of the print work Printing Zone Oman produces: stationery, marketing print, packaging, signage, promotional items and event stationery. Demonstration visuals pending the company's own photography.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <section className="border-b border-line bg-paper-100">
        <div className="container-page py-10 md:py-14">
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Portfolio" }]} />
          <p className="eyebrow mt-5">Print examples</p>
          <h1 className="display-lg mt-4">What the workshop produces</h1>
          <p className="lede mt-4">
            A sample of the formats, materials and finishing that Printing Zone Oman works with —
            from stationery sets and marketing print through to packaging, signage and promotional
            items.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/quote" className="btn btn-primary">
              Request a quote
            </Link>
            <Link href="/products" className="btn btn-secondary">
              Browse products
            </Link>
          </div>
        </div>
      </section>

      <section className="section pt-10">
        <div className="container-page">
          <div className="notice notice-warning">
            <span className="mono text-xs font-semibold uppercase">Please note</span>
            <span>
              These are <strong>demonstration visuals</strong> created for this website concept. They
              are not photographs of completed Printing Zone Oman client projects and no client is
              named or implied. The gallery structure is ready for the company&rsquo;s own approved
              photographs — see{" "}
              <Link href="/site-status" className="link-underline">
                site status
              </Link>
              .
            </span>
          </div>

          <div className="mt-8">
            <PortfolioGrid items={portfolioItems} />
          </div>

          <div className="card mt-10 grid gap-6 p-6 md:grid-cols-3 md:p-8">
            <div>
              <p className="plate-label">Materials</p>
              <p className="mt-2 text-sm text-ink-700">
                Uncoated and coated papers, folding carton board, kraft, vinyl, blockout film, printed
                fabric and cotton stock.
              </p>
            </div>
            <div>
              <p className="plate-label">Finishing</p>
              <p className="mt-2 text-sm text-ink-700">
                Matte, gloss and soft-touch lamination, spot UV, foil, deboss and emboss, die-cutting
                and creasing, hems and eyelets on banner material.
              </p>
            </div>
            <div>
              <p className="plate-label">Production</p>
              <p className="mt-2 text-sm text-ink-700">
                Digital and offset printing, screen printing for products and cups, flexography for
                roll work, and large format for signage.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Your project"
        title="Send the job you have in mind"
        body="Describe the format, quantity and deadline. The team will suggest the material and production method, then quote it."
      />
    </>
  );
}
