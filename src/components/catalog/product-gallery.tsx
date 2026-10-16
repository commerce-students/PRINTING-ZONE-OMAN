"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({
  images,
  productName,
}: {
  images: { src: string; alt: string }[];
  productName: string;
}) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div>
      <div className="crop-frame">
        <div className="relative aspect-4/3 overflow-hidden rounded-lg border border-line bg-paper-200">
          <Image
            key={current.src + active}
            src={current.src}
            alt={current.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover animate-fade-in"
          />
        </div>
      </div>

      {images.length > 1 ? (
        <div className="mt-4">
          <p className="plate-label mb-2">
            Views · {productName} ({active + 1} of {images.length})
          </p>
          <ul className="grid grid-cols-4 gap-3">
            {images.map((image, index) => (
              <li key={image.src + index}>
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  aria-pressed={index === active}
                  className={[
                    "relative block aspect-4/3 w-full overflow-hidden rounded-md border transition-all",
                    index === active
                      ? "border-ink-900 ring-2 ring-brand-blue/50"
                      : "border-line hover:border-ink-400",
                  ].join(" ")}
                >
                  <Image
                    src={image.src}
                    alt={`View ${index + 1} of ${productName}`}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                  <span className="sr-only">Show view {index + 1}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <p className="hint mt-3">
        Product photography shown is demonstration imagery for this concept build. Replace with the
        company&rsquo;s own photographs of its work before launch.
      </p>
    </div>
  );
}
