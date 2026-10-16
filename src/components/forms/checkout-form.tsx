"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { placeOrderAction } from "@/app/actions/orders";
import { ConsentCheckbox, Field, FormAlert, TextArea, TextInput } from "@/components/forms/fields";
import { SubmitButton } from "@/components/forms/submit-button";
import type { FormState } from "@/lib/validation";

const initialState: FormState = { status: "idle" };

export function CheckoutForm({ requiresQuotation }: { requiresQuotation: boolean }) {
  const [state, formAction] = useActionState(placeOrderAction, initialState);
  useEffect(() => {
    if (state.status === "success") toast.success(state.message);
    if (state.status === "error" && state.message) toast.error(state.message);
  }, [state]);
  const [fulfilment, setFulfilment] = useState<"collection" | "delivery">("collection");
  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};

  return (
    <form action={formAction} className="space-y-8" noValidate>
      {state.status === "error" ? <FormAlert status="error" message={state.message} /> : null}

      <fieldset className="card p-6">
        <legend className="px-2 text-lg font-semibold text-ink-950">Your details</legend>
        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <Field id="fullName" label="Full name" required errors={errors.fullName}>
            <TextInput
              id="fullName"
              name="fullName"
              required
              autoComplete="name"
              errors={errors.fullName}
              placeholder="e.g. Fatma Al Balushi"
            />
          </Field>
          <Field id="companyName" label="Company name" errors={errors.companyName}>
            <TextInput
              id="companyName"
              name="companyName"
              autoComplete="organization"
              errors={errors.companyName}
              placeholder="Optional"
            />
          </Field>
          <Field
            id="email"
            label="Email address"
            required
            errors={errors.email}
            hint="The quotation and job updates are sent here."
          >
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
        <p className="hint mt-4">
          No account is required — you can order as a guest. Your details are used only to quote and
          produce this job.
        </p>
      </fieldset>

      <fieldset className="card p-6">
        <legend className="px-2 text-lg font-semibold text-ink-950">Collection or delivery</legend>
        <p className="hint mt-2">
          Collection is from the workshop in Al Maabilah North, Seeb. Delivery is arranged with the
          job, and the charge is confirmed with your quotation.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {(
            [
              {
                id: "collection",
                title: "Collect from the workshop",
                body: "Al Maabilah North, Seeb, Muscat. We will agree a collection time with you.",
              },
              {
                id: "delivery",
                title: "Deliver to an address",
                body: "Delivery in Oman arranged per job; cost and timing confirmed on the quotation.",
              },
            ] as const
          ).map((option) => (
            <label
              key={option.id}
              className={[
                "flex cursor-pointer flex-col rounded-md border p-4 transition-all",
                fulfilment === option.id
                  ? "border-ink-900 bg-paper-50 shadow-card"
                  : "border-line-strong bg-white hover:border-ink-400",
              ].join(" ")}
            >
              <span className="flex items-center gap-3">
                <input
                  type="radio"
                  name="fulfilment"
                  value={option.id}
                  checked={fulfilment === option.id}
                  onChange={() => setFulfilment(option.id)}
                  className="h-5 w-5 accent-ink-950"
                />
                <span className="font-semibold text-ink-900">{option.title}</span>
              </span>
              <span className="mt-2 text-sm text-ink-600">{option.body}</span>
            </label>
          ))}
        </div>

        {fulfilment === "delivery" ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 animate-fade-in">
            <Field
              id="addressLine1"
              label="Address line 1"
              required
              errors={errors.addressLine1}
              className="sm:col-span-2"
            >
              <TextInput
                id="addressLine1"
                name="addressLine1"
                autoComplete="address-line1"
                errors={errors.addressLine1}
                placeholder="Building, street"
              />
            </Field>
            <Field id="addressLine2" label="Address line 2" errors={errors.addressLine2} className="sm:col-span-2">
              <TextInput
                id="addressLine2"
                name="addressLine2"
                autoComplete="address-line2"
                errors={errors.addressLine2}
                placeholder="Area, landmark, notes for the driver"
              />
            </Field>
            <Field id="city" label="Town / city" required errors={errors.city}>
              <TextInput id="city" name="city" autoComplete="address-level2" errors={errors.city} />
            </Field>
            <Field id="governorate" label="Governorate" required errors={errors.governorate}>
              <TextInput
                id="governorate"
                name="governorate"
                autoComplete="address-level1"
                errors={errors.governorate}
                placeholder="e.g. Muscat"
              />
            </Field>
          </div>
        ) : null}

        <div className="mt-6">
          <Field
            id="requiredDate"
            label="Required date"
            errors={errors.requiredDate}
            hint="For events and exhibitions, give us the date you must have it in hand."
          >
            <TextInput id="requiredDate" name="requiredDate" type="date" errors={errors.requiredDate} />
          </Field>
        </div>
      </fieldset>

      <fieldset className="card p-6">
        <legend className="px-2 text-lg font-semibold text-ink-950">Job notes</legend>
        <div className="mt-4">
          <Field
            id="notes"
            label="Anything the workshop should know"
            errors={errors.notes}
            hint="Pantone references, colour matching, folding preference, artwork still to come, delivery instructions."
          >
            <TextArea
              id="notes"
              name="notes"
              rows={5}
              errors={errors.notes}
              placeholder="e.g. Match the navy from our last print run; artwork to follow by email."
            />
          </Field>
        </div>
      </fieldset>

      <div className="card p-6">
        <h2 className="text-lg font-semibold text-ink-950">Before you submit</h2>
        <ul className="mt-3 space-y-2 text-sm text-ink-700">
          <li className="flex gap-2">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
            <span>
              This sends an order <strong>request</strong>. It is not a paid order, and no card
              details are collected anywhere on this site.
            </span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
            <span>
              {requiresQuotation
                ? "Because prices are quoted per job, the team confirms the price and lead time with you before production."
                : "The team confirms the order and lead time with you before production."}
            </span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
            <span>You will receive a reference number on the next screen to quote in any follow-up.</span>
          </li>
        </ul>

        <div className="mt-6">
          <ConsentCheckbox errors={errors.terms}>
            I have read the{" "}
            <Link href="/policies/terms" className="link-underline">
              terms
            </Link>{" "}
            and{" "}
            <Link href="/policies/privacy" className="link-underline">
              privacy notice
            </Link>
            , and I confirm the specification above is what I want produced. I understand no payment
            is taken online.
          </ConsentCheckbox>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <SubmitButton className="btn btn-primary btn-lg" pendingLabel="Saving your request…">
            Submit order request
          </SubmitButton>
          <Link href="/cart" className="btn btn-secondary btn-lg">
            Back to cart
          </Link>
        </div>
      </div>
    </form>
  );
}
