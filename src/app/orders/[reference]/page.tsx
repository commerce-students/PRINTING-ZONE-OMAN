import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { getRememberedOrders } from "@/lib/cart-session";
import { formatDateTime, formatFileSize, formatOmr, formatQuantity } from "@/lib/format";
import { getOrder } from "@/lib/orders";
import { verified, whatsapp } from "@/lib/site";

export const metadata: Metadata = {
  title: "Order request received",
  robots: { index: false, follow: false },
};

type Params = Promise<{ reference: string }>;

export default async function OrderConfirmationPage({ params }: { params: Params }) {
  const { reference } = await params;
  const remembered = await getRememberedOrders();
  const order = await getOrder(reference);

  // An order is only visible to the browser that submitted it.
  if (!order || !remembered.includes(reference)) {
    return (
      <section className="section">
        <div className="container-page max-w-2xl">
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Order" }]} />
          <div className="card mt-6 p-8">
            <span className="badge badge-neutral">Not available here</span>
            <h1 className="display-md mt-4">We can&rsquo;t show that reference in this browser</h1>
            <p className="lede mt-3">
              Order references are private to the browser that submitted them. If you saved your
              reference, quote it to the team and they can look the job up directly.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`tel:${verified.phones[0].tel}`} className="btn btn-primary">
                Call the shop
              </a>
              <a href={`mailto:${verified.emails[1].address}`} className="btn btn-secondary">
                Email sales
              </a>
              <Link href="/" className="btn btn-ghost">
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="border-b border-line bg-paper-100">
        <div className="container-page py-10">
          <Breadcrumbs
            trail={[{ label: "Home", href: "/" }, { label: "Order request" }, { label: order.reference }]}
          />
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="badge badge-green">Order request received</span>
            <span className="plate-label">Saved {formatDateTime(order.createdAt)} (GST)</span>
          </div>
          <h1 className="display-lg mt-4">Thank you — your request is with the team</h1>
          <p className="lede mt-4">
            Your specification has been saved and given the reference below. A member of the team
            will confirm the price, the lead time and any material questions using the contact
            details you provided.
          </p>
          <p className="mono mt-5 inline-block rounded-sm border border-line bg-white px-4 py-2 text-lg font-semibold text-ink-950">
            {order.reference}
          </p>
        </div>
      </section>

      <section className="section pt-10">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="card p-6">
                <h2 className="display-sm">What happens next</h2>
                <ol className="mt-4 space-y-4">
                  {[
                    "The team reviews your specification and checks material availability.",
                    "You receive a written quotation with price and lead time by email or phone.",
                    "On your approval the job is scheduled into production at the agreed method.",
                    "When it is ready you collect from Seeb or the delivery is arranged with you.",
                  ].map((step, index) => (
                    <li key={step} className="flex gap-3">
                      <span className="mono mt-0.5 h-6 w-6 shrink-0 rounded-full bg-ink-950 text-center text-xs font-semibold leading-6 text-white">
                        {index + 1}
                      </span>
                      <span className="text-sm leading-relaxed text-ink-700">{step}</span>
                    </li>
                  ))}
                </ol>
                <p className="notice notice-warning mt-6">
                  <span>
                    <strong>Status: request received.</strong> This is not yet a paid order — the
                    website takes no payment and no card details were collected. It becomes a
                    confirmed production order when you approve the quotation.
                  </span>
                </p>
              </div>

              <div className="card mt-6 p-6">
                <h2 className="display-sm">Your specification</h2>
                <ul className="mt-4 divide-y divide-line">
                  {order.items.map((item) => (
                    <li key={item.key} className="py-4 first:pt-0 last:pb-0">
                      <p className="font-semibold text-ink-900">{item.productName}</p>
                      <dl className="mt-2 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                        {item.selections.map((selection) => (
                          <div key={selection.groupId} className="flex gap-2">
                            <dt className="text-ink-500">{selection.groupLabel}:</dt>
                            <dd className="font-medium text-ink-800">{selection.valueLabel}</dd>
                          </div>
                        ))}
                        <div className="flex gap-2">
                          <dt className="text-ink-500">Quantity:</dt>
                          <dd className="font-medium text-ink-800">{formatQuantity(item.quantity)}</dd>
                        </div>
                        <div className="flex gap-2">
                          <dt className="text-ink-500">Line price:</dt>
                          <dd className="font-medium text-ink-800">{formatOmr(item.lineTotal)}</dd>
                        </div>
                      </dl>
                      {item.artwork ? (
                        <p className="mt-2 text-sm text-ink-600">
                          <span className="badge badge-green mr-2">Artwork received</span>
                          <span className="mono">{item.artwork.originalName}</span> (
                          {formatFileSize(item.artwork.size)})
                        </p>
                      ) : (
                        <p className="mt-2 text-sm text-ink-500">
                          No artwork attached yet — send it to {verified.emails[2].address} quoting{" "}
                          {order.reference}.
                        </p>
                      )}
                      {item.itemNote ? (
                        <p className="mt-2 rounded-sm bg-paper-100 px-3 py-2 text-sm text-ink-700">
                          <span className="font-semibold">Job note:</span> {item.itemNote}
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="card p-6">
                <h2 className="display-sm">Request summary</h2>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-600">Reference</dt>
                    <dd className="mono font-semibold">{order.reference}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-600">Submitted</dt>
                    <dd className="text-right font-medium">{formatDateTime(order.createdAt)}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-600">Fulfilment</dt>
                    <dd className="text-right font-medium">
                      {order.fulfilment.method === "collection"
                        ? "Collection — Al Maabilah North, Seeb"
                        : "Delivery"}
                    </dd>
                  </div>
                  {order.fulfilment.requiredDate ? (
                    <div className="flex justify-between gap-4">
                      <dt className="text-ink-600">Required date</dt>
                      <dd className="text-right font-medium">{order.fulfilment.requiredDate}</dd>
                    </div>
                  ) : null}
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-600">Subtotal</dt>
                    <dd className="font-medium">{formatOmr(order.totals.subtotal)}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-600">Payment</dt>
                    <dd className="text-right font-medium">Agreed with the team</dd>
                  </div>
                </dl>

                <div className="mt-5 border-t border-line pt-5 text-sm">
                  <p className="text-ink-600">Contact on file</p>
                  <p className="mt-1 font-medium text-ink-900">
                    {order.contact.fullName}
                    {order.contact.companyName ? ` · ${order.contact.companyName}` : ""}
                  </p>
                  <p className="text-ink-700">{order.contact.email}</p>
                  <p className="text-ink-700 mono">{order.contact.phone}</p>
                </div>

                {order.fulfilment.address ? (
                  <div className="mt-4 border-t border-line pt-4 text-sm text-ink-700">
                    <p className="text-ink-600">Delivery address</p>
                    <p className="mt-1">
                      {order.fulfilment.address.line1}
                      {order.fulfilment.address.line2 ? <>, {order.fulfilment.address.line2}</> : null}
                      <br />
                      {order.fulfilment.address.city}, {order.fulfilment.address.governorate}
                    </p>
                  </div>
                ) : null}

                {order.notes ? (
                  <div className="mt-4 border-t border-line pt-4 text-sm">
                    <p className="text-ink-600">Your notes</p>
                    <p className="mt-1 text-ink-700">{order.notes}</p>
                  </div>
                ) : null}

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    WhatsApp the shop
                  </a>
                  <a href={`tel:${verified.phones[0].tel}`} className="btn btn-secondary btn-sm">
                    Call the shop
                  </a>
                  <Link href="/products" className="btn btn-ghost btn-sm">
                    Keep browsing
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
