import Link from "next/link";
import { whatsapp } from "@/lib/site";

/** The approved floating enquiry action. Uses the company's own WhatsApp link. */
export function WhatsAppButton() {
  return (
    <a
      href={whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#128c4a] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(6,21,35,0.6)] transition-transform hover:-translate-y-0.5 focus-visible:outline-3 md:bottom-7 md:right-7"
      aria-label="Enquire on WhatsApp — opens a chat with Printing Zone Oman"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5 shrink-0 fill-current"
        role="presentation"
      >
        <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.35-1.4c1.45.79 3.08 1.2 4.69 1.2h.01c5.43 0 9.84-4.4 9.84-9.84C21.89 6.4 17.47 2 12.04 2Zm5.76 14.06c-.24.68-1.4 1.3-1.93 1.35-.53.05-1.03.24-3.47-.72-2.94-1.16-4.78-4.2-4.92-4.4-.14-.2-1.16-1.55-1.16-2.96 0-1.4.73-2.1 1-2.38.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.8 1.99.87 2.13.07.15.12.32.02.51-.1.19-.15.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.29-.12.58.17.29.75 1.23 1.6 2 1.1.98 2.03 1.29 2.32 1.43.29.15.46.12.63-.07.17-.19.72-.85.92-1.14.19-.29.38-.24.65-.14.26.1 1.67.79 1.96.93.29.15.48.22.55.34.07.13.07.75-.17 1.43Z" />
      </svg>
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}

/** Compact in-line WhatsApp call to action used on contact and product pages. */
export function WhatsAppInlineLink({ label = "Enquire on WhatsApp" }: { label?: string }) {
  return (
    <a
      href={whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-secondary"
    >
      {label}
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.35-1.4c1.45.79 3.08 1.2 4.69 1.2h.01c5.43 0 9.84-4.4 9.84-9.84C21.89 6.4 17.47 2 12.04 2Zm5.76 14.06c-.24.68-1.4 1.3-1.93 1.35-.53.05-1.03.24-3.47-.72-2.94-1.16-4.78-4.2-4.92-4.4-.14-.2-1.16-1.55-1.16-2.96 0-1.4.73-2.1 1-2.38.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.8 1.99.87 2.13.07.15.12.32.02.51-.1.19-.15.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.29-.12.58.17.29.75 1.23 1.6 2 1.1.98 2.03 1.29 2.32 1.43.29.15.46.12.63-.07.17-.19.72-.85.92-1.14.19-.29.38-.24.65-.14.26.1 1.67.79 1.96.93.29.15.48.22.55.34.07.13.07.75-.17 1.43Z" />
      </svg>
    </a>
  );
}

/**
 * Where a form cannot accept artwork or where a customer prefers a human,
 * this points at the published business email.
 */
export function EmailFallback({ email, label }: { email: string; label?: string }) {
  return (
    <p className="hint">
      {label ?? "Prefer email?"}{" "}
      <Link href={`mailto:${email}`} className="link-underline">
        {email}
      </Link>
    </p>
  );
}
