/** Formatting helpers. Locale-aware values stay explicit so nothing is guessed. */

export const OMR = new Intl.NumberFormat("en-OM", {
  style: "currency",
  currency: "OMR",
  currencyDisplay: "code",
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
});

export function formatOmr(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || Number.isNaN(amount)) return "Price on quotation";
  return OMR.format(amount);
}

export function formatQuantity(value: number): string {
  return new Intl.NumberFormat("en-OM").format(value);
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function formatDate(value: string | Date): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Muscat",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatDateTime(value: string | Date): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Muscat",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

/** "1 item" / "3 items" */
export function pluralise(count: number, singular: string, plural?: string): string {
  return `${count} ${count === 1 ? singular : (plural ?? `${singular}s`)}`;
}
