import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/home/hero";
import { ProcessSteps } from "@/components/home/process-steps";
import { StatementsBand } from "@/components/home/statements-band";
import { CtaBand } from "@/components/home/cta-band";
import { SectionHeader } from "@/components/site/section-header";
import { CategoryCard } from "@/components/catalog/category-card";
import { ProductCard } from "@/components/catalog/product-card";
import { getCategories, getFeaturedProducts } from "@/data/catalog";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Printing Zone Oman — commercial printing, packaging & large format, Muscat",
  description:
    "Printing Zone Oman prints business cards, brochures, packaging, labels, banners and custom promotional items from its Seeb workshop in Muscat. Request a quotation for your specification.",
  alternates: { canonical: "/" },
};

const showcaseServices = services.filter((service) =>
  ["digital", "large-format", "screen", "packaging"].includes(service.id),
);

export default function HomePage() {
  const categories = getCategories();
  const featured = getFeaturedProducts(6);

  return (
    <>
      <Hero />

      {/* Categories */}
      <section className="section" aria-labelledby="categories-heading">
        <div className="container-page">
          <SectionHeader
            id="categories-heading"
            eyebrow="Product categories"
            title="Start with the format you need"
            intro={
              <p>
                Ten product families, each with the specification options the workshop actually
                works with — size, stock, finishing and quantity. Prices are quoted per job because
                paper, ink coverage and finishing change the cost.
              </p>
            }
            action={
              <Link href="/products" className="btn btn-secondary">
                View full catalogue
              </Link>
            }
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <CategoryCard key={category.slug} category={category} priority={index < 3} />
            ))}
          </div>

          <p className="notice notice-info mt-8">
            <span aria-hidden="true" className="mono font-semibold">
              Note
            </span>
            <span>
              Categories marked <strong>In-house</strong> map to capabilities Printing Zone Oman
              publishes on its own website. The remaining categories are standard commercial print
              services shown as a demonstration catalogue — they are listed in{" "}
              <Link href="/site-status" className="link-underline">
                site status
              </Link>{" "}
              for the company to confirm before launch.
            </span>
          </p>
        </div>
      </section>

      {/* Featured products */}
      <section className="section panel-paper" aria-labelledby="featured-heading">
        <div className="container-page">
          <SectionHeader
            id="featured-heading"
            eyebrow="Popular requests"
            title="Frequently quoted jobs"
            intro={
              <p>
                At the quantity you need. Every item below can be configured, uploaded with artwork
                and submitted as an order request in a few steps.
              </p>
            }
            action={
              <Link href="/products?sort=featured" className="btn btn-secondary">
                See all products
              </Link>
            }
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section" aria-labelledby="capabilities-heading">
        <div className="container-page">
          <div className="grid items-start gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeader
                id="capabilities-heading"
                eyebrow="Printing services"
                title="Six production routes under one roof"
                intro={
                  <p>
                    A job is produced on the method that suits it — digital for short runs, offset
                    for volume, screen printing onto products, flexo for roll work and large format
                    for signage. Packaging and design support the whole process.
                  </p>
                }
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/services" className="btn btn-primary">
                  All printing services
                </Link>
                <Link href="/custom-printing" className="btn btn-secondary">
                  Custom print projects
                </Link>
              </div>

              <figure className="crop-frame mt-10">
                <div className="overflow-hidden rounded-lg border border-line">
                  <Image
                    src="/media/category-brochures-catalogues.webp"
                    alt="Open printed brochure beside a bound catalogue produced in the workshop"
                    width={1200}
                    height={896}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="h-auto w-full"
                  />
                </div>
                <figcaption className="mt-3 plate-label">
                  Fig. 02 · Brochure and catalogue production
                </figcaption>
              </figure>
            </div>

            <div className="lg:col-span-7">
              <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
                {showcaseServices.map((service) => (
                  <li key={service.id} className="bg-white">
                    <Link
                      href={`/services#${service.id}`}
                      className="group flex h-full flex-col p-6 transition-colors hover:bg-paper-50"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-semibold text-ink-950 group-hover:text-brand-blue-deep">
                          {service.name}
                        </h3>
                        {service.dataStatus === "published-by-company" ? (
                          <span className="badge badge-green shrink-0">In-house</span>
                        ) : (
                          <span className="badge badge-neutral shrink-0">To confirm</span>
                        )}
                      </div>
                      <p className="mt-2 text-sm font-medium text-brand-blue-deep">{service.tagline}</p>
                      <p className="mt-3 text-sm leading-relaxed text-ink-600">
                        {service.description[0]}
                      </p>
                      <span className="mt-auto pt-4 text-sm font-semibold text-ink-900">
                        Learn more →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Design support", value: "Logotype, artwork setup, dielines" },
                  { label: "Materials", value: "Paper, board, vinyl, fabric, kraft" },
                  { label: "Finishing", value: "Lamination, foil, deboss, die-cutting" },
                ].map((item) => (
                  <div key={item.label} className="card p-5">
                    <p className="plate-label">{item.label}</p>
                    <p className="mt-2 text-sm font-medium text-ink-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatementsBand />

      {/* Process */}
      <section className="section" aria-labelledby="process-heading">
        <div className="container-page">
          <SectionHeader
            id="process-heading"
            eyebrow="How ordering works"
            title="Four steps from enquiry to finished print"
            intro={
              <p>
                Printing is quoted per job, so the process is built around confirming a
                specification before anything is produced. You approve the quotation first.
              </p>
            }
            action={
              <Link href="/ordering" className="btn btn-secondary">
                Read the full process
              </Link>
            }
          />
          <div className="mt-10">
            <ProcessSteps />
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="card p-6 md:p-8">
              <p className="eyebrow">For business customers</p>
              <h3 className="display-sm mt-3">Repeat work, kept consistent</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                For offices, hotels, clinics, retailers and agencies that print regularly, we hold
                your artwork on file so a reorder matches the previous run. Ask for a business
                printing account note in your quotation request.
              </p>
              <Link href="/business-printing" className="btn btn-primary mt-5">
                Business printing
              </Link>
            </div>
            <div className="card p-6 md:p-8">
              <p className="eyebrow">For custom projects</p>
              <h3 className="display-sm mt-3">Jobs that do not fit a catalogue line</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                Non-standard sizes, unusual materials, mixed sets or new packaging structures are
                quoted from your description. Bring a sketch, a sample or a reference — the team
                works from the requirement, not from a template.
              </p>
              <Link href="/custom-printing" className="btn btn-primary mt-5">
                Custom printing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
