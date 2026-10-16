import type { Metadata } from "next";
import Link from "next/link";
import { QuoteForm } from "@/components/forms/quote-form";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { WhatsAppInlineLink } from "@/components/site/whatsapp-button";
import { getCategory, getProduct, products } from "@/data/catalog";
import { verified, whatsapp } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a quotation for printing",
  description:
    "Send your printing specification to Printing Zone Oman and receive a written quotation with price and lead time. Upload artwork, specify quantity, material and finishing.",
  alternates: { canonical: "/quote" },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function QuotePage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const productParam = Array.isArray(params.product) ? params.product[0] : params.product;
  const preselected = productParam ? getProduct(productParam) : undefined;

  const productOptions = [
    ...products.map((product) => ({
      value: product.name,
      label: `${product.name} — ${getCategory(product.categorySlug)?.shortName ?? ""}`.trim(),
    })),
    { value: "Custom print project", label: "Custom print project (not listed)" },
    { value: "Design / artwork support", label: "Design and artwork support" },
  ];

  return (
    <>
      <section className="border-b border-line bg-paper-100">
        <div className="container-page py-10 md:py-14">
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              ...(preselected ? [{ label: "Products", href: "/products" }] : []),
              { label: "Request a quote" },
            ]}
          />
          <div className="mt-5 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow">Quotation</p>
              <h1 className="display-lg mt-4">Tell us what you need printed</h1>
              <p className="lede mt-4">
                Printing is priced per job, so the fastest way to a firm figure is a clear
                specification. Send it here and the team replies with a written quotation —
                including material options if your first choice is not available.
              </p>
            </div>
            <div className="lg:col-span-5">
              {preselected ? (
                <div className="card p-5">
                  <p className="plate-label">Enquiring about</p>
                  <p className="mt-1 text-lg font-semibold text-ink-950">{preselected.name}</p>
                  <p className="mt-1 text-sm text-ink-600">{preselected.tagline}</p>
                  <Link href={`/products/${preselected.slug}`} className="link-underline mt-3 inline-block text-sm">
                    Review the product specification
                  </Link>
                </div>
              ) : (
                <div className="card p-5">
                  <p className="plate-label">Not sure what to ask for?</p>
                  <p className="mt-2 text-sm text-ink-700">
                    Describe the job in your own words — purpose, size, quantity and deadline. The
                    team will suggest the right material and production method.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-10">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <QuoteForm
                productOptions={productOptions}
                defaultProductSlug={preselected?.slug}
                defaultProductLabel={preselected?.name}
              />
            </div>

            <aside className="lg:col-span-4">
              <div className="card sticky top-28 p-6">
                <h2 className="display-sm">What helps us quote faster</h2>
                <ul className="mt-4 space-y-3 text-sm text-ink-700">
                  {[
                    "The finished size, or the size you want it to be.",
                    "Quantity — a range is fine if you are unsure.",
                    "Material and finishing preferences, if you have them.",
                    "Whether artwork exists already, and in what format.",
                    "Any fixed deadline, such as an event or exhibition date.",
                    "Where you will use it: indoor, outdoor, on packaging or by hand.",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-line pt-5">
                  <p className="plate-label">Prefer to talk?</p>
                  <div className="mt-3 space-y-2 text-sm">
                    {verified.phones.map((phone) => (
                      <p key={phone.tel}>
                        <a href={`tel:${phone.tel}`} className="link-underline mono">
                          {phone.display}
                        </a>
                        <span className="ml-2 text-ink-500">{phone.label}</span>
                      </p>
                    ))}
                    <p>
                      <a href={`mailto:${verified.emails[1].address}`} className="link-underline">
                        {verified.emails[1].address}
                      </a>
                    </p>
                  </div>
                  <div className="mt-4">
                    <WhatsAppInlineLink label="WhatsApp the shop" />
                  </div>
                </div>

                <p className="notice notice-info mt-6">
                  <span>
                    Your enquiry is saved with a reference number and sent to the team. No payment is
                    taken and no account is needed.
                  </span>
                </p>

                <p className="hint mt-4">
                  Uploading artwork? Our{" "}
                  <Link href="/policies/artwork" className="link-underline">
                    artwork guidelines
                  </Link>{" "}
                  explain the file setup that avoids delays. WhatsApp link opens a chat with{" "}
                  <span className="mono">{whatsapp.number}</span>.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
