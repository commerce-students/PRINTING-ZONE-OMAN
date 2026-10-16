import { verified } from "@/lib/site";

/**
 * The company's own words about how it works, quoted from its published
 * "Special Services" page rather than written for this site.
 */
const points = [
  {
    label: "Quoted quickly",
    text: verified.statements.pricing,
  },
  {
    label: "A named contact",
    text: verified.statements.managers,
  },
  {
    label: "Built around your business",
    text: verified.statements.mission,
  },
];

export function StatementsBand() {
  return (
    <section className="panel-ink grid-blueprint">
      <div className="container-page py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow eyebrow--light">In the company&rsquo;s words</p>
            <h2 className="display-md mt-4 text-white">
              A printing partner that prices the job properly
            </h2>
          </div>
          <div className="lg:col-span-8">
            <dl className="grid gap-px overflow-hidden rounded-lg border border-white/12 bg-white/12 sm:grid-cols-3">
              {points.map((point) => (
                <div key={point.label} className="bg-ink-950 p-6">
                  <dt className="plate-label text-brand-blue">{point.label}</dt>
                  <dd className="mt-3 text-sm leading-relaxed text-white/80">{point.text}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-white/50">
              Quoted from Printing Zone Oman&rsquo;s own published service description.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
