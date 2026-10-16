import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { getPolicy, policies } from "@/data/policies";
import { formatDate } from "@/lib/format";
import { site, verified } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return policies.map((policy) => ({ slug: policy.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) return { title: "Policy not found" };
  return {
    title: policy.title,
    description: policy.summary,
    alternates: { canonical: `/policies/${policy.slug}` },
  };
}

export default async function PolicyPage({ params }: { params: Params }) {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) notFound();

  return (
    <>
      <section className="border-b border-line bg-paper-100">
        <div className="container-page py-10 md:py-14">
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Policies", href: "/site-status" },
              { label: policy.title },
            ]}
          />
          <h1 className="display-lg mt-5">{policy.title}</h1>
          <p className="lede mt-4">{policy.summary}</p>
          <p className="plate-label mt-5">Last reviewed {formatDate(policy.lastReviewed)}</p>
        </div>
      </section>

      <section className="section pt-10">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="notice notice-warning">
                <span className="mono text-xs font-semibold uppercase">Draft</span>
                <span>
                  This page is a working draft prepared for the website concept. It describes how
                  this site actually behaves, but the company&rsquo;s legal and commercial terms have
                  not been supplied or reviewed. It must be approved by the business (and checked by
                  a lawyer) before the site goes live.
                </span>
              </div>

              <div className="mt-8 space-y-8">
                {policy.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="display-sm">{section.heading}</h2>
                    <div className="mt-3 space-y-3 text-base leading-relaxed text-ink-700">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                      ))}
                    </div>
                    {section.bullets ? (
                      <ul className="mt-4 space-y-2">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-2 text-sm text-ink-700">
                            <span
                              aria-hidden="true"
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue"
                            />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="card sticky top-28 p-6">
                <h2 className="display-sm">All policies</h2>
                <ul className="mt-4 space-y-2 text-sm">
                  {policies.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/policies/${item.slug}`}
                        aria-current={item.slug === policy.slug ? "page" : undefined}
                        className={
                          item.slug === policy.slug
                            ? "font-semibold text-ink-950"
                            : "text-ink-700 hover:text-brand-blue-deep hover:underline"
                        }
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-line pt-5 text-sm">
                  <p className="text-ink-600">Questions about this policy?</p>
                  <p className="mt-2">
                    <a href={`tel:${verified.phones[0].tel}`} className="link-underline mono">
                      {verified.phones[0].display}
                    </a>
                  </p>
                  <p>
                    <a href={`mailto:${verified.emails[0].address}`} className="link-underline">
                      {verified.emails[0].address}
                    </a>
                  </p>
                </div>

                <Link href="/site-status" className="btn btn-secondary btn-sm mt-5">
                  What is pending approval
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `${policy.title} — ${site.fullName}`,
            url: `${site.url}/policies/${policy.slug}`,
            dateModified: policy.lastReviewed,
            isPartOf: { "@type": "WebSite", url: site.url, name: site.fullName },
          }),
        }}
      />
    </>
  );
}
