import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/lib/catalog-types";
import { getProductsByCategory } from "@/data/catalog";

export function CategoryCard({
  category,
  priority = false,
  variant = "grid",
}: {
  category: Category;
  priority?: boolean;
  variant?: "grid" | "wide";
}) {
  const count = getProductsByCategory(category.slug).length;

  return (
    <article
      className={[
        "card card-lift group flex overflow-hidden",
        variant === "wide" ? "flex-col sm:flex-row" : "flex-col",
      ].join(" ")}
    >
      <Link
        href={`/products?category=${category.slug}`}
        className={[
          "relative block overflow-hidden bg-paper-200",
          variant === "wide" ? "aspect-4/3 sm:aspect-auto sm:w-2/5" : "aspect-4/3",
        ].join(" ")}
      >
        <Image
          src={category.image}
          alt={category.imageAlt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="display-sm">
            <Link href={`/products?category=${category.slug}`} className="hover:text-brand-blue-deep">
              {category.name}
            </Link>
          </h3>
          {category.dataStatus === "published-by-company" ? (
            <span className="badge badge-green shrink-0" title="Capability published by the company">
              In-house
            </span>
          ) : null}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-ink-600">{category.description}</p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="plate-label">
            {count} {count === 1 ? "product" : "products"}
          </span>
          <Link
            href={`/products?category=${category.slug}`}
            className="text-sm font-semibold text-brand-blue-deep hover:underline"
          >
            Explore products →
          </Link>
        </div>
      </div>
    </article>
  );
}
