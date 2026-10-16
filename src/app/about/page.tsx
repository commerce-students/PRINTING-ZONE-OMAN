import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { CtaBand } from "@/components/home/cta-band";
import { ProcessSteps } from "@/components/home/process-steps";
import { SectionHeader } from "@/components/site/section-header";
import { verified } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Printing Zone Oman",
  description:
    "Printing Zone Oman is a commercial printing, publishing and packaging business in Al Maabilah North, Seeb, Muscat. Read what the company says about its work and capabilities.",
  alternates: { canonical: "/about" },
};

const capabilityGroups = [
  {
    title: "Printing",
    items: ["Commercial printing", "Digital printing", "Screen printing", "Flexography", "Large format & billboard"],
  },
  {
    title: "Packaging",
    items: ["Packaging design", "Packaging production", "Food & beverage packaging", "Labels and sleeves"],
  },
  {
    title: "Brand & design",
    items: ["Logotype work", "Graphic design", "Custom design", "Print ideas", "Advertising materials"],
  },
  {
    title: "Everyday business print",
    items: ["Business cards", "Stationery", "Brochures", "Signage", "Custom promotional items"],
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line bg-paper-100">
        <div className="container-page py-10 md:py-14">
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "About" }]} />
          <p className="eyebrow mt-5">About the company</p>
          <h1 className="display-lg mt-4">
            A printing, publishing and packaging business in Muscat
          </h1>
          <p className="lede mt-4">
            Printing Zone Oman works out of Al Maabilah North in Seeb, producing everything from
            everyday business print to screen-printed cups, packaging and billboard-scale signage.
            This page uses only what the company itself publishes — nothing about its history,
            size or certifications has been invented to fill it out.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="grid items-start gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHeader
                eyebrow="What we do"
                title="One workshop, several production routes"
                intro={
                  <p>
                    The practical advantage of a single workshop is that a job can move between
                    processes without leaving the building: a carton printed digitally, a run of
                    cups screen-printed, a banner produced large format and the label that goes on
                    the product finished in-house.
                  </p>
                }
              />

              <div className="mt-8 space-y-5 text-base leading-relaxed text-ink-700">
                <p>{verified.statements.affordable}</p>
                <p>{verified.statements.service}</p>
                <p>{verified.statements.mission}</p>
              </div>

              <div className="mt-8 rounded-lg border border-line bg-white p-6">
                <h2 className="display-sm">Where to find us</h2>
                <address className="mt-3 not-italic text-ink-700">
                  Printing Zone — {verified.address.line1}, {verified.address.area}, {verified.address.city}
                  <br />
                  {verified.address.country} · P.O. Box {verified.address.poBox}, P.C.{" "}
                  {verified.address.postalCode}, Seeb
                </address>
                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  {verified.phones.map((phone) => (
                    <a key={phone.tel} href={`tel:${phone.tel}`} className="link-underline mono">
                      {phone.display}
                    </a>
                  ))}
                  <a href={`mailto:${verified.emails[0].address}`} className="link-underline">
                    {verified.emails[0].address}
                  </a>
                </div>
                <Link href="/contact" className="btn btn-secondary btn-sm mt-5">
                  Contact details &amp; map
                </Link>
              </div>
            </div>

            <figure className="lg:col-span-5">
              <div className="crop-frame">
                <div className="overflow-hidden rounded-lg border border-line">
                  <Image
                    src="/media/category-packaging-boxes.webp"
                    alt="Printed folding cartons produced as part of packaging work"
                    width={1200}
                    height={896}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="h-auto w-full"
                  />
                </div>
              </div>
              <figcaption className="mt-3 plate-label">
                Packaging production · cartons and food packaging
              </figcaption>

              <p className="notice notice-info mt-6">
                <span>
                  Photographs on this site are demonstration studio visuals prepared for the
                  redesign, not photographs of completed client jobs. Replace them with the
                  company&rsquo;s own approved photographs before launch.
                </span>
              </p>
            </figure>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section panel-paper">
        <div className="container-page">
          <SectionHeader
            eyebrow="Capabilities"
            title="Named by the company itself"
            intro={
              <p>
                Every item below appears in Printing Zone Oman&rsquo;s own published service list or
                gallery captions. Nothing has been added to make the business sound larger than it
                is.
              </p>
            }
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {capabilityGroups.map((group) => (
              <div key={group.title} className="card p-6">
                <h3 className="display-sm">{group.title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-ink-700">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section">
        <div className="container-page">
          <SectionHeader
            eyebrow="How we work"
            title="A quotation before production, every time"
            intro={
              <p>
                Because print is priced per job, the workflow is deliberately front-loaded: the
                specification is agreed, quoted and approved before materials are committed.
              </p>
            }
          />
          <div className="mt-10">
            <ProcessSteps />
          </div>
        </div>
      </section>

      {/* Honest gaps */}
      <section className="section panel-paper">
        <div className="container-page">
          <div className="card p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="badge badge-neutral">Pending confirmation</span>
              <h2 className="display-sm">Facts we have not published for you</h2>
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-700">
              A company profile usually carries a founding year, team size, certifications and
              customer names. Printing Zone Oman has not supplied any of these, so this page does
              not state them — a fabricated history would be worse than an incomplete one. When the
              company provides the details, each one has a place ready on this page.
            </p>
            <ul className="mt-5 grid gap-3 text-sm text-ink-700 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Year established",
                "Team size and facilities",
                "Certifications and memberships",
                "Machine list and maximum sheet sizes",
                "Standard lead times",
                "Approved customer references",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 rounded-sm border border-line bg-white px-3 py-2">
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-ink-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/site-status" className="btn btn-secondary mt-6">
              See the full verification list
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Work with us"
        title="Start with the job you need printed"
        body="Send a specification and the team will come back with a price, a material recommendation and a lead time."
      />
    </>
  );
}
