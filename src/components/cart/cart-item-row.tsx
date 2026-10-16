import Image from "next/image";
import Link from "next/link";
import { removeItemAction, updateQuantityAction } from "@/app/actions/cart";
import { SubmitButton } from "@/components/forms/submit-button";
import type { CartItem } from "@/lib/cart";
import { formatFileSize, formatOmr, formatQuantity } from "@/lib/format";

export function CartItemRow({ item }: { item: CartItem }) {
  return (
    <li className="border-b border-line py-6 last:border-b-0">
      <div className="flex flex-col gap-5 sm:flex-row">
        <Link
          href={`/products/${item.productSlug}`}
          className="relative block h-32 w-full shrink-0 overflow-hidden rounded-md border border-line bg-paper-200 sm:h-28 sm:w-40"
        >
          <Image
            src={item.image}
            alt={item.productName}
            fill
            sizes="180px"
            className="object-cover"
          />
        </Link>

        <div className="flex flex-1 flex-col">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-ink-950">
                <Link href={`/products/${item.productSlug}`} className="hover:text-brand-blue-deep">
                  {item.productName}
                </Link>
              </h3>
              <p className="plate-label mt-1">Line item · {item.key.slice(0, 18)}…</p>
            </div>
            <div className="text-right">
              <p className="plate-label">Line total</p>
              <p className="font-semibold text-ink-900">{formatOmr(item.lineTotal)}</p>
            </div>
          </div>

          {/* Specification summary — the whole point of a print order being checked */}
          <dl className="mt-3 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
            {item.selections.map((selection) => (
              <div key={selection.groupId} className="flex gap-2">
                <dt className="text-ink-500">{selection.groupLabel}:</dt>
                <dd className="font-medium text-ink-800">
                  {selection.valueLabel}
                  {selection.note ? <span className="text-ink-500"> · {selection.note}</span> : null}
                </dd>
              </div>
            ))}
            <div className="flex gap-2">
              <dt className="text-ink-500">Quantity:</dt>
              <dd className="font-medium text-ink-800">{formatQuantity(item.quantity)}</dd>
            </div>
          </dl>

          {item.itemNote ? (
            <p className="mt-3 rounded-sm bg-paper-100 px-3 py-2 text-sm text-ink-700">
              <span className="font-semibold">Job note:</span> {item.itemNote}
            </p>
          ) : null}

          {item.artwork ? (
            <p className="mt-3 flex flex-wrap items-center gap-2 text-sm text-ink-700">
              <span className="badge badge-green">Artwork attached</span>
              <span className="mono">{item.artwork.originalName}</span>
              <span className="text-ink-500">({formatFileSize(item.artwork.size)})</span>
            </p>
          ) : (
            <p className="mt-3 text-sm text-ink-500">
              No artwork attached to this line — you can send it by email after submitting, or
              upload it on the product page.
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
            <form action={updateQuantityAction} className="flex items-end gap-2">
              <input type="hidden" name="key" value={item.key} />
              <div className="field">
                <label htmlFor={`qty-${item.key}`} className="hint">
                  Update quantity
                </label>
                <input
                  id={`qty-${item.key}`}
                  name="quantity"
                  type="number"
                  min={1}
                  step={1}
                  defaultValue={item.quantity}
                  className="input w-28"
                />
              </div>
              <SubmitButton className="btn btn-secondary btn-sm" pendingLabel="Saving…">
                Update
              </SubmitButton>
            </form>

            <form action={removeItemAction}>
              <input type="hidden" name="key" value={item.key} />
              <SubmitButton
                className="btn btn-ghost btn-sm text-danger-700"
                pendingLabel="Removing…"
                confirm="Remove this item from your cart?"
              >
                Remove item
              </SubmitButton>
            </form>
          </div>
        </div>
      </div>
    </li>
  );
}
