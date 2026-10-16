const steps = [
  {
    number: "01",
    title: "Choose a product or describe the job",
    body: "Pick from the catalogue, or send a description if the job is unusual. Every product page lists the specification options the workshop works with.",
  },
  {
    number: "02",
    title: "Send your specification and artwork",
    body: "Select size, stock, finish and quantity, then attach artwork if you have it. No artwork yet? Design support is available in-house.",
  },
  {
    number: "03",
    title: "Confirm the quotation",
    body: "The team prices the exact specification and confirms lead time. Nothing goes to press until you confirm the quotation.",
  },
  {
    number: "04",
    title: "Production and handover",
    body: "Once approved, the job moves into production with the agreed method — digital, offset, screen, flexo or large format — then it is ready for collection or delivery.",
  },
];

export function ProcessSteps() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2 xl:grid-cols-4">
      {steps.map((step) => (
        <li key={step.number} className="bg-white p-6 lg:p-7">
          <div className="flex items-center gap-3">
            <span className="mono text-sm font-semibold text-brand-blue-deep">{step.number}</span>
            <span aria-hidden="true" className="h-px flex-1 bg-line" />
          </div>
          <h3 className="mt-4 text-lg font-semibold leading-snug text-ink-950">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
