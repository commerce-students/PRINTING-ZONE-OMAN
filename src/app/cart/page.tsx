import type { Metadata } from "next";
import Link from "next/link";
import { clearCartAction } from "@/app/actions/cart";
import { CartItemRow } from "@/components/cart/cart-item-row";
import { SubmitButton } from "@/components/forms/submit-button";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { computeTotals } from "@/lib/cart";
import { getCart } from "@/lib/cart-session";
import { formatOmr, formatQuantity } from "@/lib/format";
import { verified } from "@/lib/site";

export const metadata: Metadata = {
  title: "Your cart",
  description:
    "Review the printing specification, quantities and artwork for each line before submitting your order request to Printing Zone Oman.",
  robots: { index: false, follow: true },
};

export default async function CartPage() {
  const cart = await getCart(false);
  const totals = computeTotals(cart);

  return (
    <>
      <section className="border-b border-line bg-paper-100">
        <div className="container-page py-10">
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
          <h1 className="display-lg mt-5">Your cart</h1>
          <p className="lede mt-4">
            Check the specification on each line before submitting — this is the detail the
            workshop produces from.
          </p>
        </div>
      </section>

      <section className="section pt-10">
        <div className="container-page">
          {cart.items.length === 0 ? (
            <div className="card p-8 text-center md:p-14">
              <span className="badge badge-neutral">Empty cart</span>
              <h2 className="display-md mt-4">Nothing to quote yet</h2>
              <p className="lede mx-auto mt-3 text-center">
                Add a product from the catalogue, or send us a description of the job and the team
                will quote it for you. You can also upload artwork on the quotation form.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link href="/products" className="btn btn-primary btn-lg">
                  Browse the catalogue
                </Link>
                <Link href="/quote" className="btn btn-secondary btn-lg">
                  Request a quote
                </Link>
              </div>
              <p className="hint mt-6">
                Need help choosing a product? Call{" "}
                <a href={`tel:${verified.phones[0].tel}`} className="link-underline">
                  <span className="mono">{verified.phones[0].display}</span>
                </a>
              </p>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <div className="card px-5 md:px-7">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line py-4">
                    <p className="text-sm text-ink-600">
                      <span className="mono font-semibold text-ink-900">{totals.itemCount}</span>{" "}
                      {totals.itemCount === 1 ? "line" : "lines"} ·{" "}
                      <span className="mono font-semibold text-ink-900">{formatQuantity(totals.unitCount)}</span>{" "}
                      units in total
                    </p>
                    <form action={clearCartAction}>
                      <SubmitButton
                        className="btn btn-ghost btn-sm text-danger-700"
                        pendingLabel="Clearing…"
                        confirm="Remove every item from your cart?"
                      >
                        Clear cart
                      </SubmitButton>
                    </form>
                  </div>
                  <ul>
                    {cart.items.map((item) => (
                      <CartItemRow key={item.key} item={item} />
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/products" className="btn btn-secondary">
                    ← Continue shopping
                  </Link>
                  <Link href="/policies/artwork" className="btn btn-secondary">
                    Artwork guidelines
                  </Link>
                </div>
              </div>

              {/* Order summary */}
              <aside className="lg:col-span-4" aria-labelledby="summary-heading">
                <div className="card sticky top-28 p-6">
                  <h2 id="summary-heading" className="display-sm">
                    Order summary
                  </h2>
                  <dl className="mt-5 space-y-3 text-sm">
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-ink-600">Lines</dt>
                      <dd className="mono font-semibold">{totals.itemCount}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-ink-600">Total units</dt>
                      <dd className="mono font-semibold">{formatQuantity(totals.unitCount)}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4 border-t border-line pt-3">
                      <dt className="text-ink-600">Subtotal</dt>
                      <dd className="font-semibold">{formatOmr(totals.subtotal)}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-ink-600">Delivery</dt>
                      <dd className="text-ink-700">Quoted with the job</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4 border-t border-line pt-3 text-base">
                      <dt className="font-semibold text-ink-900">Total</dt>
                      <dd className="font-semibold text-ink-900">{formatOmr(totals.subtotal)}</dd>
                    </div>
                  </dl>

                  {totals.requiresQuotation ? (
                    <p className="notice notice-info mt-5">
                      <span>
                        One or more lines are priced on quotation because the company has not
                        published a price list. Submitting this cart sends your specification to the
                        team for pricing.
                      </span>
                    </p>
                  ) : null}

                  <Link href="/checkout" className="btn btn-primary btn-lg btn-block mt-5">
                    Submit order request
                  </Link>
                  <p className="hint mt-3">
                    No payment is taken online. Nothing goes to production until you confirm the
                    quotation the team sends you.
                  </p>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
