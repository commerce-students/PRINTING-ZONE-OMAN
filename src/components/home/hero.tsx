import Image from "next/image";
import Link from "next/link";
import { verified } from "@/lib/site";

const proofPoints = [
  { label: "In-house", value: "Screen printing & cups" },
  { label: "In-house", value: "Large format & billboards" },
  { label: "In-house", value: "Packaging production" },
  { label: "Supported", value: "Design & logotype work" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper-100">
      <div className="absolute inset-0 grid-blueprint-light" aria-hidden="true" />
      <div className="container-page relative">
        <div className="grid items-center gap-12 py-14 md:py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
          {/* Copy */}
          <div className="lg:col-span-6 xl:col-span-5">
            <p className="eyebrow">Commercial print · Muscat, Oman</p>

            <h1 className="display-xl mt-5">
              Printing that brings
              <br />
              your brand to life.
            </h1>

            <p className="lede mt-6">
              Explore printing solutions for businesses, events, packaging, marketing and everyday
              business needs. Find the right product, send your specification and our team will come
              back with a price and a production plan.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/products" className="btn btn-primary btn-lg">
                Explore products
              </Link>
              <Link href="/quote" className="btn btn-secondary btn-lg">
                Request a quote
              </Link>
            </div>

            <p className="mt-5 text-sm text-ink-600">
              Studio in{" "}
              <span className="font-semibold text-ink-900">
                Al Maabilah North, Seeb — Muscat
              </span>
              . Talk to the team on{" "}
              <a href={`tel:${verified.phones[0].tel}`} className="link-underline">
                <span className="mono">{verified.phones[0].display}</span>
              </a>
              .
            </p>

            <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6">
              {proofPoints.map((point) => (
                <div key={point.value}>
                  <dt className="plate-label">{point.label}</dt>
                  <dd className="mt-1 text-sm font-semibold text-ink-900">{point.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Print plate */}
          <div className="lg:col-span-6 lg:col-start-7 xl:col-span-7">
            <div className="relative mx-auto max-w-2xl lg:max-w-none">
              <figure className="crop-frame relative">
                <div className="overflow-hidden rounded-lg border border-line bg-ink-950 shadow-sheet">
                  <Image
                    src="/media/hero-print-collateral.webp"
                    alt="Professionally printed business cards, brochures, packaging, stickers and printed cups arranged on a studio surface"
                    width={1200}
                    height={896}
                    priority
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="h-auto w-full object-cover"
                  />
                </div>
                <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="plate-label">Specimen set · digital, offset & screen printing</span>
                  <span className="plate-label">Fig. 01</span>
                </figcaption>
              </figure>

              {/* Overlapping spec card: cues taken from a real prepress job bag */}
              <div className="absolute -bottom-6 left-4 hidden w-60 rounded-md border border-line bg-white/97 p-4 shadow-lift backdrop-blur sm:block lg:-left-8">
                <p className="plate-label">Job specification</p>
                <dl className="mt-2 space-y-1.5 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-500">Stock</dt>
                    <dd className="font-medium text-ink-900">400 gsm board</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-500">Finish</dt>
                    <dd className="font-medium text-ink-900">Matte + spot UV</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-500">Pricing</dt>
                    <dd className="font-medium text-brand-blue-deep">On quotation</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
