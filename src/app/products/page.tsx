import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { CatalogFilters } from "@/components/catalog/catalog-filters";
import { ProductCard } from "@/components/catalog/product-card";
import { getCategories, queryCatalog, sortOptions, type SortKey } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Product catalogue — printing products quoted to your specification",
  description:
    "Browse the Printing Zone Oman catalogue: business cards, flyers, brochures, posters, banners, stickers, packaging, stationery, event print and custom promotional items. Configure your specification and request a quotation.",
  alternates: { canonical: "/products" },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const first = (value: string | string[] | undefined): string =>
  Array.isArray(value) ? (value[0] ?? "") : (value ?? "");

export default async function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const search = first(params.q);
  const categorySlug = first(params.category);
  const sortRaw = first(params.sort);
  const sort: SortKey = (sortOptions.find((option) => option.key === sortRaw)?.key ?? "featured") as SortKey;
  const page = Number.parseInt(first(params.page) || "1", 10);

  const categories = getCategories();
  const result = queryCatalog({ search, category: categorySlug, sort, page, perPage: 9 });
  const selectedCategory = categories.find((category) => category.slug === categorySlug);

  const buildPageHref = (targetPage: number) => {
    const query = new URLSearchParams();
    if (search) query.set("q", search);
    if (categorySlug) query.set("category", categorySlug);
    if (sort !== "featured") query.set("sort", sort);
    if (targetPage > 1) query.set("page", String(targetPage));
    const queryString = query.toString();
    return `/products${queryString ? `?${queryString}` : ""}`;
  };

  return (
    <>
      {/* Page header */}
      <section className="border-b border-line bg-paper-100">
        <div className="container-page py-10 md:py-14">
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Products", href: selectedCategory ? "/products" : undefined },
              ...(selectedCategory ? [{ label: selectedCategory.name }] : []),
            ]}
          />
          <h1 className="display-lg mt-5">
            {selectedCategory ? selectedCategory.name : "Product catalogue"}
          </h1>
          <p className="lede mt-4">
            {selectedCategory
              ? selectedCategory.description
              : "Every product below is produced to order. Configure size, stock, finishing and quantity, then submit an order request or ask for a quotation — prices are confirmed per job rather than guessed at."}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/quote" className="btn btn-primary">
              Request a quote
            </Link>
            <Link href="/policies/artwork" className="btn btn-secondary">
              Artwork guidelines
            </Link>
          </div>
        </div>
      </section>

      <section className="section pt-10">
        <div className="container-page">
          <CatalogFilters
            categories={categories}
            currentCategory={selectedCategory?.slug}
            currentSort={sort}
            currentSearch={search}
            total={result.total}
          />

          {result.items.length > 0 ? (
            <>
              <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {result.items.map((product, index) => (
                  <li key={product.slug} className="flex">
                    <ProductCard product={product} priority={index < 3} />
                  </li>
                ))}
              </ul>

              {result.totalPages > 1 ? (
                <nav aria-label="Catalogue pagination" className="mt-10 flex flex-wrap items-center justify-center gap-2">
                  {result.page > 1 ? (
                    <Link href={buildPageHref(result.page - 1)} className="btn btn-secondary btn-sm">
                      ← Previous
                    </Link>
                  ) : null}
                  {Array.from({ length: result.totalPages }, (_, index) => index + 1).map((pageNumber) => (
                    <Link
                      key={pageNumber}
                      href={buildPageHref(pageNumber)}
                      aria-current={pageNumber === result.page ? "page" : undefined}
                      className={[
                        "btn btn-sm min-w-11",
                        pageNumber === result.page ? "btn-primary" : "btn-secondary",
                      ].join(" ")}
                    >
                      {pageNumber}
                    </Link>
                  ))}
                  {result.page < result.totalPages ? (
                    <Link href={buildPageHref(result.page + 1)} className="btn btn-secondary btn-sm">
                      Next →
                    </Link>
                  ) : null}
                </nav>
              ) : null}
            </>
          ) : (
            <div className="card mt-8 p-8 text-center md:p-12">
              <h2 className="display-sm">No products match that search</h2>
              <p className="lede mx-auto mt-3 text-center">
                Try a different term, or clear the filters to see the whole catalogue. If what you
                need is not listed, the team can quote it as a custom job.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="/products" className="btn btn-primary">
                  Clear filters
                </Link>
                <Link href="/custom-printing" className="btn btn-secondary">
                  Describe a custom job
                </Link>
              </div>
            </div>
          )}

          <p className="notice notice-info mt-8">
            <span className="mono text-xs font-semibold uppercase">Catalogue status</span>
            <span>
              Catalogue entries are demonstration data prepared for this redesign. The company&rsquo;s
              own published capabilities — screen printing, cup printing, large format and
              billboards, packaging and design — are marked{" "}
              <strong>In-house</strong>; everything else awaits confirmation in{" "}
              <Link href="/site-status" className="link-underline">
                site status
              </Link>
              . No prices are published because none have been supplied.
            </span>
          </p>
        </div>
      </section>
    </>
  );
}
