"use client";

import Image from "next/image";
import { useState } from "react";
import { portfolioCategories, type PortfolioItem } from "@/data/portfolio";

export function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  const [active, setActive] = useState<string>("All");
  const filtered = active === "All" ? items : items.filter((item) => item.category === active);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter portfolio by category">
        {portfolioCategories.map((category) => {
          const isActive = category === active;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              aria-pressed={isActive}
              className={["badge", isActive ? "badge-ink" : "badge-neutral"].join(" ")}
            >
              {category}
            </button>
          );
        })}
        <p className="ml-auto text-sm text-ink-600" aria-live="polite">
          Showing <span className="mono font-semibold text-ink-900">{filtered.length}</span> of{" "}
          {items.length}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="card mt-8 p-8 text-center">
          <h2 className="display-sm">Nothing in this category yet</h2>
          <p className="lede mx-auto mt-2 text-center">
            Choose another filter, or browse the full set of examples.
          </p>
          <button type="button" onClick={() => setActive("All")} className="btn btn-secondary mt-5">
            Show all examples
          </button>
        </div>
      ) : (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <li key={item.id} className="card card-lift group overflow-hidden">
              <div className="relative aspect-4/3 overflow-hidden bg-paper-200">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute left-3 top-3 badge badge-ink">{item.category}</span>
                <span className="absolute right-3 top-3 badge badge-neutral">Demonstration visual</span>
              </div>
              <div className="p-5">
                <h3 className="display-sm">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {item.materials.map((material) => (
                    <li key={material} className="badge badge-neutral">
                      {material}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
