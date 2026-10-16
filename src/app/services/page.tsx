import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { CtaBand } from "@/components/home/cta-band";
import { ProductCard } from "@/components/catalog/product-card";
import { getProduct } from "@/data/catalog";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Printing services in Muscat — digital, screen, large format, packaging",
  description:
    "Printing services from Printing Zone Oman in Seeb, Muscat: digital and offset printing, screen printing, flexography, large format and billboard print, packaging production and design support.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-line bg-paper-100">
        <div className="container-page py-10 md:py-14">
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Printing services" }]} />
          <p className="eyebrow mt-5">Services</p>
          <h1 className="display-lg mt-4">Printing services, end to end</h1>
          <p className="lede mt-4">
            Printing Zone Oman describes itself as a printing, publishing and packaging business.
            The production routes below are the ones it names publicly — plus the standard
            commercial work that surrounds them, marked clearly where the company has yet to confirm
            it.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/quote" className="btn btn-primary">
              Request a quote
            </Link>
            <Link href="/custom-printing" className="btn btn-secondary">
              Custom print projects
            </Link>
          </div>
        </div>
      </section>

      {/* Quick index */}
      <section className="border-b border-line bg-white">
        <div className="container-page py-6">
          <h2 className="plate-label">On this page</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {services.map((service) => (
              <li key={service.id}>
                <a href={`#${service.id}`} className="badge badge-neutral hover:border-ink-800">
                  {service.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="section space-y-16 md:space-y-24">
        {services.map((service, index) => {
          const related = service.relatedProductSlugs
            .map((slug) => getProduct(slug))
            .filter((product): product is NonNullable<typeof product> => Boolean(product));
          const reversed = index % 2 === 1;

          return (
            <section key={service.id} id={service.id} className="container-page scroll-mt-32">
              <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
                <figure className={reversed ? "lg:col-span-6 lg:order-2" : "lg:col-span-6"}>
                  <div className="crop-frame">
                    <div className="overflow-hidden rounded-lg border border-line">
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        width={1200}
                        height={896}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="h-auto w-full"
                      />
                    </div>
                  </div>
                  <figcaption className="mt-3 plate-label">
                    Fig. {String(index + 3).padStart(2, "0")} · {service.name}
                  </figcaption>
                </figure>

                <div className={reversed ? "lg:col-span-6 lg:order-1" : "lg:col-span-6"}>
                  <div className="flex flex-wrap items-center gap-2">
                    {service.dataStatus === "published-by-company" ? (
                      <span className="badge badge-green">Named by the company</span>
                    ) : (
                      <span className="badge badge-neutral">Awaiting confirmation</span>
                    )}
                  </div>
                  <h2 className="display-md mt-4">{service.name}</h2>
                  <p className="mt-3 text-lg font-medium text-brand-blue-deep">{service.tagline}</p>
                  <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-700">
                    {service.description.map((paragraph) => (
                      <p key={paragraph.slice(0, 20)}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="mt-6">
                    <h3 className="plate-label">Typical applications</h3>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {service.applications.map((application) => (
                        <li key={application} className="flex gap-2 text-sm text-ink-700">
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue"
                          />
                          <span>{application}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link href="/quote" className="btn btn-primary btn-sm">
                      Quote this service
                    </Link>
                    {related[0] ? (
                      <Link href={`/products/${related[0].slug}`} className="btn btn-secondary btn-sm">
                        See {related[0].name}
                      </Link>
                    ) : (
                      <Link href="/custom-printing" className="btn btn-secondary btn-sm">
                        Describe a custom job
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {related.length > 1 ? (
                <div className="mt-10">
                  <h3 className="plate-label mb-4">Products produced this way</h3>
                  <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {related.map((product) => (
                      <li key={product.slug} className="flex">
                        <ProductCard product={product} />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </section>
          );
        })}
      </div>

      <CtaBand
        eyebrow="Not listed?"
        title="If it is printed, ask us"
        body="Mixed sets, unusual materials, odd sizes and new packaging structures are quoted from your description. Send what you have — a sketch is enough to start."
        primary={{ href: "/quote", label: "Request a quote" }}
        secondary={{ href: "/contact", label: "Contact the team" }}
      />
    </>
  );
}
