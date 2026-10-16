import Link from "next/link";
import { verified, whatsapp } from "@/lib/site";

export function CtaBand({
  eyebrow = "Next step",
  title = "Tell us what you need printed",
  body = "Send your specification, quantity and any artwork. The team prices it and comes back with a written quotation — no account required and no artwork published.",
  primary = { href: "/quote", label: "Request a quote" },
  secondary = { href: "/products", label: "Browse the catalogue" },
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="panel-paper">
      <div className="container-page py-14 md:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="display-md mt-4">{title}</h2>
            <p className="lede mt-4">{body}</p>
          </div>
          <div className="lg:col-span-5">
            <div className="card p-6">
              <div className="flex flex-wrap gap-3">
                <Link href={primary.href} className="btn btn-primary flex-1">
                  {primary.label}
                </Link>
                <Link href={secondary.href} className="btn btn-secondary flex-1">
                  {secondary.label}
                </Link>
              </div>
              <div className="mt-5 space-y-2 border-t border-line pt-5 text-sm">
                <p className="text-ink-600">
                  Direct line ·{" "}
                  <a href={`tel:${verified.phones[0].tel}`} className="link-underline mono">
                    {verified.phones[0].display}
                  </a>
                </p>
                <p className="text-ink-600">
                  Artwork files ·{" "}
                  <a href={`mailto:${verified.emails[2].address}`} className="link-underline">
                    {verified.emails[2].address}
                  </a>
                </p>
                <a
                  href={whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline inline-block"
                >
                  Or message the shop on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
