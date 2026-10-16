import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { ProcessSteps } from "@/components/home/process-steps";
import { CtaBand } from "@/components/home/cta-band";
import { verified } from "@/lib/site";

export const metadata: Metadata = {
  title: "How ordering works — specifications, quotations and production",
  description:
    "The ordering process at Printing Zone Oman: choose or describe the job, send specifications and artwork, confirm the quotation, then production and handover.",
  alternates: { canonical: "/ordering" },
};

const stages = [
  {
    title: "1. Choose the product or describe the job",
    body: [
      "Every product page lists the options the workshop works with: size, paper or material, finishing, printing sides and quantity. If none of the catalogue items match, the custom printing route lets you describe the requirement instead.",
      "You can add more than one line to the cart — for example business cards plus a folder plus printed cups — and submit them together as one request.",
    ],
  },
  {
    title: "2. Send the specification and any artwork",
    body: [
      "Artwork can be attached on a product page or on the quotation form. Files are stored privately and are only used to price and produce the job; they are never published on the site.",
      "If you do not have print-ready artwork, the company offers design and logotype services, so the file can be prepared or corrected before printing. Vector files (AI, EPS, SVG) are needed for logos.",
    ],
  },
  {
    title: "3. Confirm the quotation",
    body: [
      "Printing is priced per job, so the team prices the exact specification: paper, ink coverage, finishing, quantity break and production method. You receive that in writing and nothing is produced until you approve it.",
      "If a material is unavailable or better suited to the job, the team will say so and offer the alternative before production, not after.",
    ],
  },
  {
    title: "4. Production and handover",
    body: [
      "Once approved, the job is scheduled into the appropriate production route — digital for short runs, offset for volume, screen printing for items like cups and mugs, flexography for roll work, large format for signage.",
      "Completed jobs can be collected from the workshop in Al Maabilah North, Seeb, or delivered. Delivery arrangements and timing are confirmed with the job.",
    ],
  },
];

export default function OrderingPage() {
  return (
    <>
      <section className="border-b border-line bg-paper-100">
        <div className="container-page py-10 md:py-14">
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Ordering" }]} />
          <p className="eyebrow mt-5">Ordering</p>
          <h1 className="display-lg mt-4">How a print order comes together</h1>
          <p className="lede mt-4">
            Commercial print is quoted per job rather than sold from a fixed price list. This page
            explains the steps, what the website does by itself and what the team does with you.
          </p>
        </div>
      </section>

      <section className="section pt-10">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <ol className="space-y-10">
                {stages.map((stage) => (
                  <li key={stage.title} className="border-l-2 border-line pl-6">
                    <h2 className="display-sm">{stage.title}</h2>
                    <div className="mt-3 space-y-3 text-base leading-relaxed text-ink-700">
                      {stage.body.map((paragraph) => (
                        <p key={paragraph.slice(0, 20)}>{paragraph}</p>
                      ))}
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <aside className="lg:col-span-4">
              <div className="card sticky top-28 p-6">
                <h2 className="display-sm">At a glance</h2>
                <dl className="mt-4 space-y-3 text-sm">
                  <div>
                    <dt className="text-ink-500">Account needed</dt>
                    <dd className="font-medium text-ink-900">No — guest ordering</dd>
                  </div>
                  <div>
                    <dt className="text-ink-500">Payment online</dt>
                    <dd className="font-medium text-ink-900">
                      Not configured — agreed with the team
                    </dd>
                  </div>
                  <div>
                    <dt className="text-ink-500">Prices</dt>
                    <dd className="font-medium text-ink-900">Per job, in writing</dd>
                  </div>
                  <div>
                    <dt className="text-ink-500">Artwork upload</dt>
                    <dd className="font-medium text-ink-900">Yes, up to 10 MB per file</dd>
                  </div>
                  <div>
                    <dt className="text-ink-500">Collection</dt>
                    <dd className="font-medium text-ink-900">Al Maabilah North, Seeb</dd>
                  </div>
                </dl>

                <div className="mt-6 border-t border-line pt-5 text-sm">
                  <p className="text-ink-600">Talk it through with the team:</p>
                  <div className="mt-2 space-y-1.5">
                    {verified.phones.map((phone) => (
                      <p key={phone.tel}>
                        <a href={`tel:${phone.tel}`} className="link-underline mono">
                          {phone.display}
                        </a>
                        <span className="ml-2 text-ink-500">{phone.label}</span>
                      </p>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-2">
                  <Link href="/quote" className="btn btn-primary">
                    Request a quote
                  </Link>
                  <Link href="/products" className="btn btn-secondary">
                    Browse products
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-14">
            <h2 className="display-md">The four steps in short</h2>
            <div className="mt-6">
              <ProcessSteps />
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
