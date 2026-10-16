import { z } from "zod";

/** Oman-local phone acceptance: digits, spaces, dashes and an optional +968 prefix. */
const phone = z
  .string()
  .trim()
  .min(6, "Please enter a phone number the team can reach you on.")
  .max(24, "That phone number looks too long.")
  .regex(/^[+()\d\s-]+$/, "Use digits, spaces, brackets and + only.")
  .refine((value) => value.replace(/\D/g, "").length >= 8, "Enter at least 8 digits.");

const email = z
  .string()
  .trim()
  .min(1, "Please enter your email address.")
  .email("Enter a valid email address, for example name@company.com")
  .max(160);

const name = z
  .string()
  .trim()
  .min(2, "Please enter your full name.")
  .max(120, "That name is too long.");

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Please keep this under ${max} characters.`)
    .optional()
    .or(z.literal(""));

/** Artwork attached to a form. Empty file inputs arrive as a 0-byte File. */
const artworkFile = z
  .custom<File>((value) => value === undefined || value === null || (value instanceof File && value.size >= 0))
  .optional();

export const quoteRequestSchema = z.object({
  fullName: name,
  companyName: optionalText(120),
  email,
  phone,
  productSlug: optionalText(120),
  productLabel: optionalText(160),
  quantity: z
    .string()
    .trim()
    .min(1, "Please give an approximate quantity."),
  sizeSpecs: optionalText(300),
  materialPreferences: optionalText(300),
  requiredDate: optionalText(40),
  details: z
    .string()
    .trim()
    .min(10, "Tell us a little about the job so we can quote accurately.")
    .max(4000, "Please keep the description under 4000 characters."),
  consent: z.literal(true, {
    error: "Please confirm we may contact you about this enquiry.",
  }),
  artwork: artworkFile,
});

export const contactMessageSchema = z.object({
  fullName: name,
  email,
  phone: phone.optional().or(z.literal("")),
  subject: z.string().trim().min(3, "Please choose or enter a subject.").max(160),
  message: z
    .string()
    .trim()
    .min(10, "Please write a short message so we can help.")
    .max(4000, "Please keep the message under 4000 characters."),
  consent: z.literal(true, {
    error: "Please confirm we may contact you about this message.",
  }),
});

export const checkoutSchema = z
  .object({
    fullName: name,
    companyName: optionalText(120),
    email,
    phone,
    fulfilment: z.enum(["collection", "delivery"], {
      error: "Choose collection or delivery.",
    }),
    addressLine1: optionalText(160),
    addressLine2: optionalText(160),
    city: optionalText(80),
    governorate: optionalText(80),
    requiredDate: optionalText(40),
    notes: optionalText(2000),
    terms: z.literal(true, {
      error: "Please confirm you have read the terms and privacy notice.",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.fulfilment === "delivery") {
      const required = [
        ["addressLine1", "Please add the street or building for delivery."],
        ["city", "Please add the town or city for delivery."],
        ["governorate", "Please add the governorate for delivery."],
      ] as const;
      for (const [field, message] of required) {
        if (!data[field] || String(data[field]).trim().length < 2) {
          ctx.addIssue({ code: "custom", path: [field], message });
        }
      }
    }
  });

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;
export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;

export type FormState =
  | { status: "idle" }
  | { status: "error"; message: string; fieldErrors?: Record<string, string[]> }
  | { status: "success"; message: string; reference?: string };

/** Flattens a ZodError into the field -> messages shape the forms render. */
export function toFieldErrors(error: z.ZodError): Record<string, string[]> {
  const errors: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";
    errors[key] = [...(errors[key] ?? []), issue.message];
  }
  return errors;
}

/** Converts a FormData entry to a trimmed string. */
export function str(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function bool(formData: FormData, key: string): boolean {
  const value = formData.get(key);
  return value === "on" || value === "true" || value === "1";
}

export function file(formData: FormData, key: string): File | undefined {
  const value = formData.get(key);
  if (value instanceof File && value.size > 0) return value;
  return undefined;
}
