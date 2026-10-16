"use client";

import Link from "next/link";
import { useActionState } from "react";
import { submitContactAction } from "@/app/actions/enquiries";
import {
  ConsentCheckbox,
  Field,
  FormAlert,
  SelectInput,
  TextArea,
  TextInput,
} from "@/components/forms/fields";
import { SubmitButton } from "@/components/forms/submit-button";
import type { FormState } from "@/lib/validation";

const initialState: FormState = { status: "idle" };

const subjects = [
  { value: "Quotation for a print job", label: "Quotation for a print job" },
  { value: "Question about a product or material", label: "Question about a product or material" },
  { value: "Artwork and file preparation", label: "Artwork and file preparation" },
  { value: "Existing order follow-up", label: "Existing order follow-up" },
  { value: "Bulk or business account enquiry", label: "Bulk or business account enquiry" },
  { value: "Something else", label: "Something else" },
];

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactAction, initialState);
  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};

  if (state.status === "success") {
    return (
      <div className="card p-6 md:p-8" role="status">
        <FormAlert status="success" message={state.message} reference={state.reference} />
        <p className="mt-4 text-sm text-ink-700">
          For anything urgent — an exhibition deadline, a reprint, a material question — phone the
          shop and quote the reference above.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/quote" className="btn btn-primary">
            Request a quotation
          </Link>
          <Link href="/products" className="btn btn-secondary">
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6" noValidate>
      {state.status === "error" ? <FormAlert status="error" message={state.message} /> : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="fullName" label="Full name" required errors={errors.fullName}>
          <TextInput id="fullName" name="fullName" required autoComplete="name" errors={errors.fullName} />
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
        <Field id="phone" label="Phone / WhatsApp" errors={errors.phone}>
          <TextInput
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            errors={errors.phone}
            placeholder="+968 9xxx xxxx"
          />
        </Field>
        <Field id="subject" label="Subject" required errors={errors.subject}>
          <SelectInput id="subject" name="subject" required options={subjects} errors={errors.subject} />
        </Field>
      </div>

      <Field
        id="message"
        label="Your message"
        required
        errors={errors.message}
        hint="Include the product, quantity and deadline if you already know them."
      >
        <TextArea
          id="message"
          name="message"
          rows={6}
          required
          errors={errors.message}
          placeholder="Tell us what you need and when you need it."
        />
      </Field>

      <ConsentCheckbox errors={errors.consent}>
        You may contact me about this message using the details above. I have read the{" "}
        <Link href="/policies/privacy" className="link-underline">
          privacy notice
        </Link>
        .
      </ConsentCheckbox>

      <div className="flex flex-wrap gap-3">
        <SubmitButton className="btn btn-primary btn-lg" pendingLabel="Sending…">
          Send message
        </SubmitButton>
        <Link href="/quote" className="btn btn-secondary btn-lg">
          I need a quotation instead
        </Link>
      </div>
      <p className="hint">
        Your message is saved on the website&rsquo;s server so nothing is lost if the phone line is
        busy. Prefer to talk? The shop number is on the left.
      </p>
    </form>
  );
}
