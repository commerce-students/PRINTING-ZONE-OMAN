"use server";

import { MAX_ARTWORK_BYTES, saveArtworkFile } from "@/lib/artwork";
import { newId, nextReference, saveRecord } from "@/lib/store";
import {
  contactMessageSchema,
  quoteRequestSchema,
  toFieldErrors,
  bool,
  file,
  str,
  type FormState,
} from "@/lib/validation";

export interface EnquiryRecord {
  id: string;
  reference: string;
  kind: "quotation" | "contact";
  createdAt: string;
  status: "received";
  contact: {
    fullName: string;
    companyName?: string;
    email: string;
    phone: string;
  };
  job?: {
    productSlug?: string;
    productLabel?: string;
    quantity?: string;
    sizeSpecs?: string;
    materialPreferences?: string;
    requiredDate?: string;
    details: string;
  };
  message?: string;
  subject?: string;
  artwork: { originalName: string; size: number; storedName: string } | null;
  /** Where the enquiry came from, so staff know which channel to reply on. */
  source: "website-form";
}

async function handleArtwork(formData: FormData): Promise<EnquiryRecord["artwork"]> {
  const upload = file(formData, "artwork");
  if (!upload) return null;
  if (upload.size > MAX_ARTWORK_BYTES) {
    throw new Error(
      `That artwork file is larger than ${Math.round(MAX_ARTWORK_BYTES / (1024 * 1024))} MB. Please email it to printme@printingzoneoman.com instead.`,
    );
  }
  const stored = await saveArtworkFile(upload);
  return { originalName: stored.originalName, size: stored.size, storedName: stored.storedName };
}

export async function submitQuoteAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = quoteRequestSchema.safeParse({
    fullName: str(formData, "fullName"),
    companyName: str(formData, "companyName"),
    email: str(formData, "email"),
    phone: str(formData, "phone"),
    productSlug: str(formData, "productSlug"),
    productLabel: str(formData, "productLabel"),
    quantity: str(formData, "quantity"),
    sizeSpecs: str(formData, "sizeSpecs"),
    materialPreferences: str(formData, "materialPreferences"),
    requiredDate: str(formData, "requiredDate"),
    details: str(formData, "details"),
    consent: bool(formData, "consent"),
    artwork: file(formData, "artwork"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  let artwork: EnquiryRecord["artwork"] = null;
  try {
    artwork = await handleArtwork(formData);
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "The artwork file could not be stored. Please try again.",
      fieldErrors: { artwork: ["Upload failed."] },
    };
  }

  const reference = await nextReference();
  const id = newId("enq");
  const record: EnquiryRecord = {
    id,
    reference,
    kind: "quotation",
    createdAt: new Date().toISOString(),
    status: "received",
    contact: {
      fullName: parsed.data.fullName,
      companyName: parsed.data.companyName || undefined,
      email: parsed.data.email,
      phone: parsed.data.phone,
    },
    job: {
      productSlug: parsed.data.productSlug || undefined,
      productLabel: parsed.data.productLabel || undefined,
      quantity: parsed.data.quantity,
      sizeSpecs: parsed.data.sizeSpecs || undefined,
      materialPreferences: parsed.data.materialPreferences || undefined,
      requiredDate: parsed.data.requiredDate || undefined,
      details: parsed.data.details,
    },
    artwork,
    source: "website-form",
  };

  await saveRecord("enquiries", id, record);

  return {
    status: "success",
    reference,
    message:
      "Your quotation request has been saved and given the reference below. The team will contact you using the details you provided.",
  };
}

export async function submitContactAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = contactMessageSchema.safeParse({
    fullName: str(formData, "fullName"),
    email: str(formData, "email"),
    phone: str(formData, "phone"),
    subject: str(formData, "subject"),
    message: str(formData, "message"),
    consent: bool(formData, "consent"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  const reference = await nextReference();
  const id = newId("msg");
  const record: EnquiryRecord = {
    id,
    reference,
    kind: "contact",
    createdAt: new Date().toISOString(),
    status: "received",
    contact: {
      fullName: parsed.data.fullName,
      email: parsed.data.email,
      phone: parsed.data.phone || "",
    },
    subject: parsed.data.subject,
    message: parsed.data.message,
    artwork: null,
    source: "website-form",
  };

  await saveRecord("enquiries", id, record);

  return {
    status: "success",
    reference,
    message: "Your message has been saved and sent to the team. You will get a reply on the contact details you provided.",
  };
}
