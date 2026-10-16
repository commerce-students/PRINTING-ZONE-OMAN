import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/catalog-types";
import { getCategory } from "@/data/catalog";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const category = getCategory(product.categorySlug);

  return (
    <article className="card card-lift group flex h-full flex-col overflow-hidden">
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-4/3 overflow-hidden bg-paper-200"
      >
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 badge badge-ink">{category?.shortName}</span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="display-sm">
          <Link href={`/products/${product.slug}`} className="hover:text-brand-blue-deep">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm font-medium text-brand-blue-deep">{product.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-ink-600">{product.summary}</p>

        <ul className="mt-4 space-y-1.5 text-sm text-ink-600">
          {product.highlights.slice(0, 3).map((highlight) => (
            <li key={highlight} className="flex gap-2">
              <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-green" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between gap-3 border-t border-line pt-4">
            <div>
              <p className="plate-label">Price</p>
              <p className="mt-0.5 text-sm font-semibold text-ink-900">
                {product.pricingMode === "fixed" && product.priceFrom
                  ? `From ${product.priceFrom.toFixed(3)} OMR`
                  : "On quotation"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/products/${product.slug}`} className="btn btn-secondary btn-sm">
                Details
              </Link>
              <Link href={`/quote?product=${product.slug}`} className="btn btn-primary btn-sm">
                Get a quote
              </Link>
            </div>
          </div>
          <p className="hint mt-3">
            Minimum {product.minQuantity.toLocaleString("en-OM")} units ·{" "}
            {product.artworkRequired ? "artwork can be uploaded" : "specification reviewed by our team"}
          </p>
        </div>
      </div>
    </article>
  );
}
