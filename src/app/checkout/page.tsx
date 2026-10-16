import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckoutForm } from "@/components/forms/checkout-form";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { computeTotals } from "@/lib/cart";
import { getCart } from "@/lib/cart-session";
import { formatOmr, formatQuantity } from "@/lib/format";
import { verified } from "@/lib/site";

export const metadata: Metadata = {
  title: "Submit an order request",
  description:
    "Send your printing specification to Printing Zone Oman. No online payment is taken; the team confirms price, lead time and production with you.",
  robots: { index: false, follow: true },
};

export default async function CheckoutPage() {
  const cart = await getCart(false);
  const totals = computeTotals(cart);

  if (cart.items.length === 0) {
    return (
      <section className="section">
        <div className="container-page max-w-2xl">
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Checkout" }]} />
          <div className="card mt-6 p-8 text-center">
            <h1 className="display-md">Your cart is empty</h1>
            <p className="lede mx-auto mt-3 text-center">
              Add a product first, or send the team a description of the job and they will quote it
              for you.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/products" className="btn btn-primary">
                Browse the catalogue
              </Link>
              <Link href="/quote" className="btn btn-secondary">
                Request a quote
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
            trail={[{ label: "Home", href: "/" }, { label: "Cart", href: "/cart" }, { label: "Checkout" }]}
          />
          <h1 className="display-lg mt-5">Submit your order request</h1>
          <p className="lede mt-4">
            The team receives your specification straight away and confirms price, lead time and any
            material questions before anything is produced.
          </p>
        </div>
      </section>

      <section className="section pt-10">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <CheckoutForm requiresQuotation={totals.requiresQuotation} />
            </div>

            <aside className="lg:col-span-5" aria-labelledby="order-summary-heading">
              <div className="card sticky top-28">
                <div className="border-b border-line p-6">
                  <h2 id="order-summary-heading" className="display-sm">
                    Your order
                  </h2>
                  <p className="hint mt-1">
                    {formatQuantity(totals.unitCount)} units across {totals.itemCount}{" "}
                    {totals.itemCount === 1 ? "line" : "lines"}
                  </p>
                </div>

                <ul className="max-h-[26rem] overflow-y-auto px-6">
                  {cart.items.map((item) => (
                    <li key={item.key} className="flex gap-4 border-b border-line py-4 last:border-b-0">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm border border-line bg-paper-200">
                        <Image src={item.image} alt="" fill sizes="64px" className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-ink-900">{item.productName}</p>
                        <p className="mt-0.5 text-xs text-ink-500">
                          {item.selections.map((s) => s.valueLabel).join(" · ")}
                        </p>
                        <p className="mt-1 text-xs text-ink-600">
                          Qty {formatQuantity(item.quantity)}
                          {item.artwork ? " · artwork attached" : ""}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm font-medium text-ink-800">
                        {formatOmr(item.lineTotal)}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-line p-6">
                  <dl className="space-y-2.5 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-ink-600">Subtotal</dt>
                      <dd className="font-semibold">{formatOmr(totals.subtotal)}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-ink-600">Delivery / collection</dt>
                      <dd className="text-ink-700">Confirmed with the job</dd>
                    </div>
                    <div className="flex justify-between gap-4 border-t border-line pt-2.5 text-base">
                      <dt className="font-semibold">Total now</dt>
                      <dd className="font-semibold">
                        {totals.subtotal === null ? "On quotation" : formatOmr(totals.subtotal)}
                      </dd>
                    </div>
                  </dl>

                  <p className="notice notice-warning mt-5">
                    <span>
                      <strong>No payment is taken on this website.</strong> Online payment has not
                      been configured, so no card, bank or wallet details are requested. Once the
                      quotation is agreed, the team confirms how payment is made.
                    </span>
                  </p>

                  <div className="mt-5 space-y-2 border-t border-line pt-5 text-sm">
                    <p className="text-ink-600">
                      Questions about this job? Call{" "}
                      <a href={`tel:${verified.phones[0].tel}`} className="link-underline mono">
                        {verified.phones[0].display}
                      </a>
                    </p>
                    <p className="text-ink-600">
                      Or email{" "}
                      <a href={`mailto:${verified.emails[1].address}`} className="link-underline">
                        {verified.emails[1].address}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
