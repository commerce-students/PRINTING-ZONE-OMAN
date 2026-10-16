import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { ProductGallery } from "@/components/catalog/product-gallery";
import { ProductConfigurator } from "@/components/catalog/product-configurator";
import { ProductCard } from "@/components/catalog/product-card";
import { WhatsAppInlineLink } from "@/components/site/whatsapp-button";
import { getCategory, getProduct, getRelatedProducts, products } from "@/data/catalog";
import { site, verified } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  const category = getCategory(product.categorySlug);

  return {
    title: `${product.name} — ${product.tagline}`,
    description: `${product.summary} Configure size, stock, finish and quantity, upload artwork and request a quotation from Printing Zone Oman in Muscat.`,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} — ${site.fullName}`,
      description: product.summary,
      images: [{ url: product.image, width: 1200, height: 896, alt: product.imageAlt }],
      type: "website",
    },
    other: category ? { "product:category": category.name } : undefined,
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.categorySlug);
  const related = getRelatedProducts(product.slug, 3);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    image: `${site.url}${product.image}`,
    category: category?.name,
    brand: { "@type": "Brand", name: site.fullName },
    manufacturer: { "@type": "Organization", name: site.fullName, url: site.url },
    // No `offers` block: the company has not published prices, and inventing one
    // would be inaccurate structured data.
    additionalProperty: product.specs.map((spec) => ({
      "@type": "PropertyValue",
      name: spec.label,
      value: spec.value,
    })),
  };

  return (
    <>
      <section className="border-b border-line bg-paper-100">
        <div className="container-page py-6">
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              ...(category ? [{ label: category.name, href: `/products?category=${category.slug}` }] : []),
              { label: product.name },
            ]}
          />
        </div>
      </section>

      <section className="section pt-8">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Gallery */}
            <div className="lg:col-span-6">
              <ProductGallery images={product.gallery} productName={product.name} />
            </div>

            {/* Configuration */}
            <div className="lg:col-span-6">
              <div className="flex flex-wrap items-center gap-2">
                {category ? (
                  <Link href={`/products?category=${category.slug}`} className="badge badge-blue">
                    {category.name}
                  </Link>
                ) : null}
                {product.dataStatus === "published-by-company" ? (
                  <span className="badge badge-green">In-house capability</span>
                ) : (
                  <span className="badge badge-neutral">Awaiting company confirmation</span>
                )}
              </div>

              <h1 className="display-lg mt-4">{product.name}</h1>
              <p className="mt-3 text-lg font-medium text-brand-blue-deep">{product.tagline}</p>
              <p className="lede mt-4">{product.summary}</p>

              <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2 rounded-md border border-line bg-white px-5 py-4">
                <div>
                  <p className="plate-label">Pricing</p>
                  <p className="mt-1 font-semibold text-ink-900">Price on quotation</p>
                </div>
                <div>
                  <p className="plate-label">Minimum order</p>
                  <p className="mt-1 font-semibold text-ink-900">
                    {product.minQuantity.toLocaleString("en-OM")} units
                  </p>
                </div>
                <div>
                  <p className="plate-label">Lead time</p>
                  <p className="mt-1 font-semibold text-ink-900">Confirmed on quotation</p>
                </div>
              </div>

              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {product.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2 text-sm text-ink-700">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-lg border border-line bg-white p-5 md:p-6">
                <h2 className="display-sm">Configure your order</h2>
                <p className="hint mt-1 mb-5">
                  Select the specification, add artwork if you have it, then add the job to your
                  cart to submit it as an order request.
                </p>
                <ProductConfigurator product={product} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description + specifications */}
      <section className="section panel-paper pt-12">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="display-md">About this product</h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-700">
                {product.description.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>

              <div className="notice notice-info mt-6">
                <span className="mono text-xs font-semibold uppercase">Production note</span>
                <span>{product.productionNote}</span>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="card p-5">
                  <p className="plate-label">Artwork</p>
                  <p className="mt-2 text-sm text-ink-700">
                    {product.artworkRequired
                      ? "Artwork can be uploaded here or sent later by email. Vector files are preferred for logos."
                      : "Our team reviews the specification with you before production starts."}
                  </p>
                  <Link href="/policies/artwork" className="link-underline mt-3 inline-block text-sm">
                    Artwork guidelines
                  </Link>
                </div>
                <div className="card p-5">
                  <p className="plate-label">Need it produced differently?</p>
                  <p className="mt-2 text-sm text-ink-700">
                    Non-standard sizes, materials or quantities are quoted as a custom job.
                  </p>
                  <Link href="/custom-printing" className="link-underline mt-3 inline-block text-sm">
                    Custom printing
                  </Link>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="card p-6">
                <h3 className="display-sm">Specifications</h3>
                <table className="spec-table mt-4">
                  <caption className="sr-only">
                    Standard specifications for {product.name}
                  </caption>
                  <tbody>
                    {product.specs.map((spec) => (
                      <tr key={spec.label}>
                        <th scope="row">{spec.label}</th>
                        <td>{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="hint mt-4">
                  Specifications are typical for this product type and are confirmed against your
                  final artwork and material availability.
                </p>
              </div>

              <div className="card mt-6 p-6">
                <h3 className="display-sm">Talk to the team</h3>
                <p className="mt-2 text-sm text-ink-700">
                  Quantities, deadlines and unusual specifications are easier to discuss. The shop
                  line is also on WhatsApp.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a href={`tel:${verified.phones[0].tel}`} className="btn btn-primary btn-sm">
                    Call <span className="mono">{verified.phones[0].display}</span>
                  </a>
                  <WhatsAppInlineLink label="WhatsApp the shop" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 ? (
        <section className="section" aria-labelledby="related-heading">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Related products</p>
                <h2 id="related-heading" className="display-md mt-3">
                  Often quoted together
                </h2>
              </div>
              <Link href="/products" className="btn btn-secondary">
                All products
              </Link>
            </div>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug} className="flex">
                  <ProductCard product={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
    </>
  );
}
