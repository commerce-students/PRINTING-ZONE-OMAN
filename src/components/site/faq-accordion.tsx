import Link from "next/link";
import type { FaqGroup } from "@/data/faq";

/**
 * FAQ list built on native <details>/<summary> — keyboard accessible and it
 * works with JavaScript disabled. The heading text and answer are both read by
 * screen readers in the correct order.
 */
export function FaqAccordion({ groups }: { groups: FaqGroup[] }) {
  return (
    <div className="space-y-12">
      {groups.map((group) => (
        <section key={group.id} id={group.id} aria-labelledby={`${group.id}-heading`} className="scroll-mt-32">
          <h2 id={`${group.id}-heading`} className="display-sm">
            {group.title}
          </h2>
          <div className="mt-4 divide-y divide-line overflow-hidden rounded-lg border border-line bg-white">
            {group.items.map((item) => (
              <details key={item.question} className="group px-5 py-4 md:px-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-semibold text-ink-950 [&::-webkit-details-marker]:hidden">
                  <span>{item.question}</span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 12 12"
                    className="mt-1.5 h-3 w-3 shrink-0 fill-current text-ink-500 transition-transform group-open:rotate-180"
                  >
                    <path d="M6 8.5 1.5 4h9L6 8.5Z" />
                  </svg>
                </summary>
                <div className="mt-3 max-w-3xl space-y-3">
                  <p className="text-sm leading-relaxed text-ink-700">{item.answer}</p>
                  {item.needsConfirmation ? (
                    <p className="badge badge-neutral">Contains points pending company confirmation</p>
                  ) : null}
                </div>
              </details>
            ))}
          </div>
        </section>
      ))}

      <div className="card p-6 md:p-8">
        <h2 className="display-sm">Still unsure?</h2>
        <p className="mt-2 text-sm text-ink-700">
          Ask directly — the team would rather answer a question before a job is produced than
          correct it afterwards.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/contact" className="btn btn-primary">
            Contact the team
          </Link>
          <Link href="/quote" className="btn btn-secondary">
            Request a quote
          </Link>
          <Link href="/ordering" className="btn btn-ghost">
            Ordering process
          </Link>
        </div>
      </div>
    </div>
  );
}
