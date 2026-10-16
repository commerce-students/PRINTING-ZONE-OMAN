"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { submitQuoteAction } from "@/app/actions/enquiries";
import {
  ConsentCheckbox,
  Field,
  FormAlert,
  SelectInput,
  TextArea,
  TextInput,
} from "@/components/forms/fields";
import { SubmitButton } from "@/components/forms/submit-button";
import { ACCEPTED_ARTWORK, ACCEPTED_ARTWORK_LABEL, MAX_ARTWORK_BYTES } from "@/lib/artwork-constants";
import { formatFileSize } from "@/lib/format";
import type { FormState } from "@/lib/validation";

const initialState: FormState = { status: "idle" };

export function QuoteForm({
  productOptions,
  defaultProductSlug,
  defaultProductLabel,
}: {
  productOptions: { value: string; label: string }[];
  defaultProductSlug?: string;
  defaultProductLabel?: string;
}) {
  const [state, formAction] = useActionState(submitQuoteAction, initialState);
  const [fileInfo, setFileInfo] = useState<{ name: string; size: number } | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState(defaultProductSlug ?? "");
  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};

  if (state.status === "success") {
    return (
      <div className="card p-6 md:p-8" role="status">
        <FormAlert status="success" message={state.message} reference={state.reference} />
        <div className="mt-6 space-y-4">
          <h2 className="display-sm">What happens next</h2>
          <ol className="space-y-3 text-sm leading-relaxed text-ink-700">
            <li>1. The team checks the specification, material availability and quantity breaks.</li>
            <li>2. You receive a written quotation with price and lead time.</li>
            <li>3. On your approval the job is scheduled into production.</li>
          </ol>
          <p className="hint">
            Keep the reference above — quote it in any follow-up call, email or WhatsApp message.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/products" className="btn btn-secondary">
              Keep browsing products
            </Link>
            <Link href="/" className="btn btn-ghost">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6" noValidate>
      {state.status === "error" ? <FormAlert status="error" message={state.message} /> : null}

      <fieldset className="card p-6">
        <legend className="px-2 text-lg font-semibold text-ink-950">Your details</legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field id="fullName" label="Full name" required errors={errors.fullName}>
            <TextInput id="fullName" name="fullName" required autoComplete="name" errors={errors.fullName} />
          </Field>
          <Field id="companyName" label="Company / organisation" errors={errors.companyName}>
            <TextInput
              id="companyName"
              name="companyName"
              autoComplete="organization"
              errors={errors.companyName}
              placeholder="Optional"
            />
          </Field>
          <Field id="email" label="Email address" required errors={errors.email}>
            <TextInput
              id="email"
              name="email"
              type="email"
              inputMode="email"
              required
              autoComplete="email"
              errors={errors.email}
              placeholder="name@company.com"
            />
          </Field>
          <Field id="phone" label="Phone / WhatsApp" required errors={errors.phone}>
            <TextInput
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              required
              autoComplete="tel"
              errors={errors.phone}
              placeholder="+968 9xxx xxxx"
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className="card p-6">
        <legend className="px-2 text-lg font-semibold text-ink-950">What you need printed</legend>

        <div className="mt-4 grid gap-5">
          <Field
            id="productLabel"
            label="Product or service"
            required
            errors={errors.productLabel}
            hint="Choose the closest match — or leave it as “Something else” and describe the job below."
          >
            <SelectInput
              id="productLabel"
              name="productLabel"
              required
              defaultValue={defaultProductLabel ?? productOptions[0]?.label}
              options={productOptions}
              errors={errors.productLabel}
            />
          </Field>

          {/* Hidden slug so the team knows which product page the enquiry came from */}
          <input type="hidden" name="productSlug" value={selectedProduct || defaultProductSlug || ""} />

          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="quantity" label="Quantity required" required errors={errors.quantity}>
              <TextInput
                id="quantity"
                name="quantity"
                required
                errors={errors.quantity}
                placeholder="e.g. 1,000"
                inputMode="numeric"
              />
            </Field>
            <Field
              id="requiredDate"
              label="Required date"
              errors={errors.requiredDate}
              hint="Only if you have a fixed deadline."
            >
              <TextInput id="requiredDate" name="requiredDate" type="date" errors={errors.requiredDate} />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              id="sizeSpecs"
              label="Size / dimensions"
              errors={errors.sizeSpecs}
              hint="Finished size, or the size you want."
            >
              <TextInput
                id="sizeSpecs"
                name="sizeSpecs"
                errors={errors.sizeSpecs}
                placeholder="e.g. A5, 90 × 50 mm"
              />
            </Field>
            <Field
              id="materialPreferences"
              label="Material / finishing"
              errors={errors.materialPreferences}
              hint="Paper, board, lamination, foil — whatever you have in mind."
            >
              <TextInput
                id="materialPreferences"
                name="materialPreferences"
                errors={errors.materialPreferences}
                placeholder="e.g. 400 gsm, matte, spot UV"
              />
            </Field>
          </div>

          <Field
            id="details"
            label="Job details"
            required
            errors={errors.details}
            hint="Describe the job: purpose, deliverables, colour references, whether artwork exists, and how it will be used."
          >
            <TextArea
              id="details"
              name="details"
              rows={6}
              required
              errors={errors.details}
              placeholder="e.g. We need 500 double-sided A5 flyers for a clinic opening in Seeb, artwork exists in Canva, must match our navy logo colour."
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className="card p-6">
        <legend className="px-2 text-lg font-semibold text-ink-950">Artwork (optional)</legend>
        <div className="mt-4">
          <label htmlFor="artwork" className="label">
            Attach artwork or a reference file
          </label>
          <p className="hint" id="artwork-hint">
            {ACCEPTED_ARTWORK_LABEL}. One file per submission — larger files can go to
            printme@printingzoneoman.com. Files are stored privately and used only to quote and
            produce your job.
          </p>
          <input
            id="artwork"
            name="artwork"
            type="file"
            accept={ACCEPTED_ARTWORK}
            aria-describedby="artwork-hint"
            aria-invalid={errors.artwork ? true : undefined}
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
                  `That file is ${formatFileSize(file.size)} — the upload limit is ${formatFileSize(MAX_ARTWORK_BYTES)}.`,
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
              <span className="mono text-xs uppercase">Attached</span>
              <span>
                {fileInfo.name} · {formatFileSize(fileInfo.size)}
              </span>
            </p>
          ) : null}
          {errors.artwork ? (
            <p className="error-text mt-2" role="alert">
              {errors.artwork[0]}
            </p>
          ) : null}
        </div>
      </fieldset>

      <div className="card p-6">
        <ConsentCheckbox errors={errors.consent}>
          You may contact me about this enquiry using the details above. I have read the{" "}
          <Link href="/policies/privacy" className="link-underline">
            privacy notice
          </Link>
          .
        </ConsentCheckbox>
        <div className="mt-5 flex flex-wrap gap-3">
          <SubmitButton className="btn btn-primary btn-lg" pendingLabel="Sending your request…">
            Send quotation request
          </SubmitButton>
          <Link href="/products" className="btn btn-secondary btn-lg">
            Browse products instead
          </Link>
        </div>
        <p className="hint mt-4">
          Submitting this form saves your request on the website&rsquo;s server and sends it to the
          team — it does not place a paid order.
        </p>
      </div>
    </form>
  );
}
