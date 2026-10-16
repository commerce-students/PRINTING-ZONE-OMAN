const customSteps = [
  {
    number: "01",
    title: "Describe the job",
    body: "Anything you have — a sketch, a photo of a sample, measurements or the purpose. There is no requirement to be technical.",
  },
  {
    number: "02",
    title: "Feasibility and material options",
    body: "The team confirms what can be produced, on which material, and suggests alternatives where a first choice is impractical.",
  },
  {
    number: "03",
    title: "Design or dieline, if needed",
    body: "If the artwork or packaging structure does not exist yet, it is prepared before pricing so the quotation is for a producible item.",
  },
  {
    number: "04",
    title: "Quotation and approval",
    body: "You receive a written price and lead time for the final specification. Production starts only after you approve it.",
  },
  {
    number: "05",
    title: "Production and handover",
    body: "The job runs on the agreed production route and is prepared for collection in Seeb or arranged delivery.",
  },
];

export function AcceleratedSteps() {
  return (
    <ol className="space-y-px overflow-hidden rounded-lg border border-line bg-line">
      {customSteps.map((step) => (
        <li key={step.number} className="flex gap-5 bg-white p-6">
          <span className="mono text-sm font-semibold text-brand-blue-deep">{step.number}</span>
          <div>
            <h3 className="text-lg font-semibold leading-snug text-ink-950">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
