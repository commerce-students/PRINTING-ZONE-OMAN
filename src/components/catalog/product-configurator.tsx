"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { addToCartAction } from "@/app/actions/cart";
import { SubmitButton } from "@/components/forms/submit-button";
import { FormAlert } from "@/components/forms/fields";
import { ACCEPTED_ARTWORK, ACCEPTED_ARTWORK_LABEL, MAX_ARTWORK_BYTES } from "@/lib/artwork-constants";
import type { Product } from "@/lib/catalog-types";
import type { FormState } from "@/lib/validation";
import { formatFileSize } from "@/lib/format";

const initialState: FormState = { status: "idle" };

export function ProductConfigurator({ product }: { product: Product }) {
  const [state, formAction] = useActionState(addToCartAction, initialState);
  const [quantity, setQuantity] = useState(product.minQuantity);
  const [selected, setSelected] = useState<Record<string, string>>(() =>
    Object.fromEntries(product.options.map((group) => [group.id, group.values[0]?.id ?? ""])),
  );
  const [fileInfo, setFileInfo] = useState<{ name: string; size: number } | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const fieldErrors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const quantityError = fieldErrors.quantity?.[0];

  return (
    <form action={formAction} className="space-y-6" noValidate>
      <input type="hidden" name="productSlug" value={product.slug} />

      {state.status === "success" ? (
        <div className="space-y-3">
          <FormAlert status="success" message={state.message} />
          <div className="flex flex-wrap gap-3">
            <Link href="/cart" className="btn btn-primary">
              Review cart &amp; submit request
            </Link>
            <Link href="/products" className="btn btn-secondary">
              Continue browsing
            </Link>
          </div>
        </div>
      ) : null}
      {state.status === "error" ? <FormAlert status="error" message={state.message} /> : null}

      {/* Options */}
      <fieldset className="space-y-6">
        <legend className="sr-only">Product options</legend>
        {product.options.map((group) => {
          const error = fieldErrors[`option_${group.id}`]?.[0];
          return (
            <div key={group.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="label">
                  {group.label}
                  {group.required ? (
                    <span className="req" aria-hidden="true">
                      {" "}
                      *
                    </span>
                  ) : null}
                </p>
                {group.help ? <p className="hint">{group.help}</p> : null}
              </div>
              <div
                role="radiogroup"
                aria-label={group.label}
                aria-invalid={error ? true : undefined}
                className="mt-2.5 flex flex-wrap gap-2"
              >
                {group.values.map((value) => {
                  const inputId = `${product.slug}-${group.id}-${value.id}`;
                  const checked = selected[group.id] === value.id;
                  return (
                    <span key={value.id}>
                      <input
                        type="radio"
                        id={inputId}
                        name={`option_${group.id}`}
                        value={value.id}
                        checked={checked}
                        onChange={() => setSelected((prev) => ({ ...prev, [group.id]: value.id }))}
                        className="peer sr-only"
                      />
                      <label
                        htmlFor={inputId}
                        className={[
                          "flex cursor-pointer flex-col rounded-sm border px-3.5 py-2.5 text-sm transition-all",
                          checked
                            ? "border-ink-900 bg-ink-950 text-white shadow-card"
                            : "border-line-strong bg-white text-ink-800 hover:border-ink-400",
                        ].join(" ")}
                      >
                        <span className="font-semibold">{value.label}</span>
                        {value.note ? (
                          <span className={checked ? "text-white/65 text-xs" : "text-ink-500 text-xs"}>
                            {value.note}
                          </span>
                        ) : null}
                      </label>
                    </span>
                  );
                })}
              </div>
              {error ? (
                <p className="error-text mt-2" role="alert">
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}
      </fieldset>

      {/* Quantity */}
      <div>
        <p className="label">
          Quantity
          <span className="req" aria-hidden="true">
            {" "}
            *
          </span>
        </p>
        <p className="hint">Minimum order for this product is {product.minQuantity.toLocaleString("en-OM")}.</p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {product.quantityPresets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setQuantity(preset)}
              aria-pressed={quantity === preset}
              className={[
                "badge",
                quantity === preset ? "badge-ink" : "badge-neutral",
              ].join(" ")}
            >
              {preset.toLocaleString("en-OM")}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="quantity" className="hint">
              Exact quantity
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              inputMode="numeric"
              min={product.minQuantity}
              step={1}
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
              aria-invalid={quantityError ? true : undefined}
              aria-describedby={quantityError ? "quantity-error" : undefined}
              className="input w-36"
            />
          </div>
          <p className="hint pb-2">
            Prices are quoted per job — quantity, stock and finishing all affect the cost, so no
            estimate is shown here.
          </p>
        </div>
        {quantityError ? (
          <p className="error-text mt-2" id="quantity-error" role="alert">
            {quantityError}
          </p>
        ) : null}
      </div>

      {/* Artwork */}
      {product.artworkRequired ? (
        <div>
          <label htmlFor="artwork" className="label">
            Artwork file
            <span className="ml-1 text-xs font-normal text-ink-400">(optional at this stage)</span>
          </label>
          <p className="hint" id="artwork-hint">
            {ACCEPTED_ARTWORK_LABEL}. Files are stored privately and only used to produce your job.
            You can also send artwork later by email or WhatsApp.
          </p>
          <input
            id="artwork"
            name="artwork"
            type="file"
            accept={ACCEPTED_ARTWORK}
            aria-describedby="artwork-hint"
            aria-invalid={fieldErrors.artwork ? true : undefined}
            onChange={(event) => {
              const file = event.target.files?.[0];
              setFileError(null);
              if (!file) {
                setFileInfo(null);
                return;
              }
              if (file.size > MAX_ARTWORK_BYTES) {
                setFileInfo(null);
                setFileError(
                  `That file is ${formatFileSize(file.size)} — the limit is ${formatFileSize(MAX_ARTWORK_BYTES)}. Email larger files to printme@printingzoneoman.com.`,
                );
                event.target.value = "";
                return;
              }
              setFileInfo({ name: file.name, size: file.size });
            }}
            className="mt-2 block w-full rounded-sm border border-line-strong bg-white p-2.5 text-sm file:mr-3 file:rounded-xs file:border-0 file:bg-ink-950 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-ink-800"
          />
          {fileError ? (
            <p className="error-text mt-2" role="alert">
              {fileError}
            </p>
          ) : null}
          {fileInfo ? (
            <p className="notice notice-info mt-3" role="status">
              <span className="mono text-xs uppercase">Selected</span>
              <span>
                {fileInfo.name} · {formatFileSize(fileInfo.size)}
              </span>
            </p>
          ) : null}
          {fieldErrors.artwork ? (
            <p className="error-text mt-2" role="alert">
              {fieldErrors.artwork[0]}
            </p>
          ) : null}
        </div>
      ) : null}

      {/* Notes */}
      <div className="field">
        <label htmlFor="itemNote" className="label">
          Job notes
          <span className="ml-1 text-xs font-normal text-ink-400">(optional)</span>
        </label>
        <textarea
          id="itemNote"
          name="itemNote"
          rows={3}
          maxLength={600}
          placeholder="Colours, Pantone references, deadlines, delivery preference…"
          className="textarea"
        />
      </div>

      <div className="space-y-3 border-t border-line pt-5">
        <div className="flex flex-wrap gap-3">
          <SubmitButton className="btn btn-primary btn-lg" pendingLabel="Adding…">
            Add to cart
          </SubmitButton>
          <Link href={`/quote?product=${product.slug}`} className="btn btn-secondary btn-lg">
            Request a quotation instead
          </Link>
        </div>
        <p className="hint">
          Adding to cart creates an order request — no payment is taken online and nothing goes to
          press until the team confirms price and lead time with you.
        </p>
      </div>
    </form>
  );
}
