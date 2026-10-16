import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { CtaBand } from "@/components/home/cta-band";
import { AcceleratedSteps } from "@/components/home/accelerated-steps";
import { SectionHeader } from "@/components/site/section-header";
import { verified } from "@/lib/site";

export const metadata: Metadata = {
  title: "Custom printing in Oman — non-standard formats, materials and projects",
  description:
    "Custom print projects from Printing Zone Oman: non-standard sizes, unusual materials, mixed sets and new packaging structures, quoted from your description.",
  alternates: { canonical: "/custom-printing" },
};

const projectTypes = [
  {
    title: "Non-standard formats",
    body: "Odd sizes, unusual proportions, shaped die-cuts and formats that do not map to a catalogue item.",
    examples: ["Shaped stickers", "Custom box sizes", "Oversized sheets", "Bespoke door hangers"],
  },
  {
    title: "Specialty materials",
    body: "Thicker boards, textured and recycled stocks, synthetic and outdoor materials, plus finishes that need a specialist process.",
    examples: ["Cotton stock", "Kraft board", "Vinyl & film", "Foil and deboss"],
  },
  {
    title: "Mixed print sets",
    body: "Jobs that combine several items into one production run so colour and finishing stay aligned.",
    examples: ["Launch kits", "Conference packs", "Retail displays", "Welcome packs"],
  },
  {
    title: "New packaging projects",
    body: "Packaging that has to be designed before it can be printed, including the dieline and the structure.",
    examples: ["Retail cartons", "Food packaging", "Gift boxes", "Subscription mailers"],
  },
];

export default function CustomPrintingPage() {
  return (
    <>
      <section className="border-b border-line bg-paper-100">
        <div className="container-page py-10 md:py-14">
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Custom printing" }]} />
          <div className="mt-5 grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="eyebrow">Custom projects</p>
              <h1 className="display-lg mt-4">Printing that does not fit a catalogue line</h1>
              <p className="lede mt-4">
                Some jobs cannot be ordered from a list: a new packaging structure, an unusual size,
                a material nobody stocks, a set of items that must match exactly. Those are quoted
                from your description rather than from a preset specification.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/quote" className="btn btn-primary">
                  Describe your project
                </Link>
                <Link href="/services" className="btn btn-secondary">
                  Printing services
                </Link>
              </div>
              <p className="hint mt-4">
                A sketch, a reference photo or a competitor&rsquo;s sample is enough to start —
                the team can work out the production route from there.
              </p>
            </div>
            <figure className="lg:col-span-6">
              <div className="crop-frame">
                <div className="overflow-hidden rounded-lg border border-line">
                  <Image
                    src="/media/category-invitations-events.webp"
                    alt="Custom-printed invitation with foil detailing and specialty paper"
                    width={1200}
                    height={896}
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="h-auto w-full"
                  />
                </div>
              </div>
              <figcaption className="mt-3 plate-label">
                Demonstration visual · foil and specialty paper finishing
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section pt-12">
        <div className="container-page">
          <SectionHeader
            eyebrow="Project types"
            title="What “custom” usually means in practice"
            intro={
              <p>
                Most custom jobs fall into one of these four groups. If yours does not, that is
                still a valid starting point — describe it and the team will come back with options.
              </p>
            }
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {projectTypes.map((type) => (
              <article key={type.title} className="card p-6 md:p-7">
                <h3 className="display-sm">{type.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{type.body}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {type.examples.map((example) => (
                    <li key={example} className="badge badge-neutral">
                      {example}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section panel-paper">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeader
                eyebrow="How a custom job is quoted"
                title="From description to production plan"
                intro={
                  <p>
                    Custom work is quoted in stages because design and production decisions affect
                    the price. You see the plan before committing to it.
                  </p>
                }
              />
              <div className="mt-6 rounded-lg border border-line bg-white p-6">
                <p className="plate-label">Design support</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">
                  Where no artwork exists, logotype, graphic design and packaging design are
                  services the company already offers — including dielines for new packaging
                  structures.
                </p>
                <Link href="/services#design" className="link-underline mt-3 inline-block text-sm">
                  Design and artwork services
                </Link>
              </div>
            </div>
            <div className="lg:col-span-7">
              <AcceleratedSteps />
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Start the project"
        title="Send a sketch, a sample or a rough description"
        body="Nothing needs to be print-ready at this stage. Tell the team what the item is for, roughly how large it is and how many you need, and they will scope the production route."
        primary={{ href: "/quote", label: "Start a custom enquiry" }}
        secondary={{ href: "/contact", label: "Contact the team" }}
      />
    </>
  );
}
