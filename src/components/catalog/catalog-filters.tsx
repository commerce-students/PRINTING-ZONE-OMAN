import Link from "next/link";
import type { Category } from "@/lib/catalog-types";
import { sortOptions, type SortKey } from "@/data/catalog";

/**
 * Catalogue controls. This is a plain GET form — it works with JavaScript
 * disabled, keeps the URL shareable, and is keyboard/screen-reader friendly.
 */
export function CatalogFilters({
  categories,
  currentCategory,
  currentSort,
  currentSearch,
  total,
}: {
  categories: Category[];
  currentCategory?: string;
  currentSort: SortKey;
  currentSearch: string;
  total: number;
}) {
  const hasFilters = Boolean(currentSearch || currentCategory) || currentSort !== "featured";

  return (
    <div className="card p-5 md:p-6">
      <form action="/products" method="get" role="search" className="grid gap-4 lg:grid-cols-12 lg:items-end">
        <div className="field lg:col-span-5">
          <label htmlFor="catalog-search" className="label">
            Search products
          </label>
          <input
            id="catalog-search"
            name="q"
            type="search"
            defaultValue={currentSearch}
            placeholder="e.g. business cards, roll-up banner, carton"
            className="input"
          />
        </div>

        <div className="field lg:col-span-3">
          <label htmlFor="catalog-category" className="label">
            Category
          </label>
          <select id="catalog-category" name="category" defaultValue={currentCategory ?? ""} className="select">
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field lg:col-span-2">
          <label htmlFor="catalog-sort" className="label">
            Sort by
          </label>
          <select id="catalog-sort" name="sort" defaultValue={currentSort} className="select">
            {sortOptions.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-2">
          <button type="submit" className="btn btn-primary btn-block">
            Apply
          </button>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
        <p className="text-sm text-ink-600" aria-live="polite">
          <span className="mono font-semibold text-ink-900">{total}</span>{" "}
          {total === 1 ? "product" : "products"} match your filters
        </p>
        {hasFilters ? (
          <Link href="/products" className="text-sm font-semibold text-brand-blue-deep hover:underline">
            Clear filters
          </Link>
        ) : null}
      </div>

      {/* Category quick-jump chips (keyboard friendly, no script needed) */}
      <ul className="mt-4 flex flex-wrap gap-2">
        <li>
          <Link
            href="/products"
            className={[
              "badge",
              !currentCategory ? "badge-ink" : "badge-neutral",
            ].join(" ")}
          >
            All
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/products?category=${category.slug}${currentSearch ? `&q=${encodeURIComponent(currentSearch)}` : ""}`}
              className={[
                "badge",
                currentCategory === category.slug ? "badge-ink" : "badge-neutral",
              ].join(" ")}
            >
              {category.shortName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
