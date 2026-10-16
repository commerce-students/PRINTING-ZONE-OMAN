import Link from "next/link";
import { Logo } from "@/components/site/logo";
import { footerNav, site, verified, whatsapp } from "@/lib/site";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="mt-auto">
      <div className="colorbar" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="panel-ink grid-blueprint">
        <div className="container-page py-14 md:py-16">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="inline-flex rounded-md bg-white/95 p-3">
                <Logo href={null} height={46} />
              </div>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
                Commercial printing, publishing and packaging in Muscat — from business print and
                branding to large-format, packaging production and custom print projects.
              </p>

              <dl className="mt-6 space-y-3 text-sm">
                <div>
                  <dt className="plate-label text-white/45">Address</dt>
                  <dd className="mt-1 text-white/80">
                    Al Maabilah North, Seeb, Muscat
                    <br />
                    P.O. Box 887, P.C. 121, Seeb, Sultanate of Oman
                  </dd>
                </div>
                <div>
                  <dt className="plate-label text-white/45">Phone</dt>
                  <dd className="mt-1 flex flex-col gap-1">
                    {verified.phones.map((phone) => (
                      <a key={phone.tel} href={`tel:${phone.tel}`} className="text-white/85 hover:text-white">
                        <span className="mono">{phone.display}</span>
                        <span className="ml-2 text-white/50">{phone.label}</span>
                      </a>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="plate-label text-white/45">Email</dt>
                  <dd className="mt-1 flex flex-col gap-1">
                    {verified.emails.map((email) => (
                      <a
                        key={email.address}
                        href={`mailto:${email.address}`}
                        className="text-white/85 hover:text-white"
                      >
                        {email.address}
                      </a>
                    ))}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-wrap gap-2">
                <Link href="/quote" className="btn btn-accent btn-sm">
                  Request a quote
                </Link>
                <a
                  href={whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-light btn-sm"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            <nav aria-label="Products" className="lg:col-span-2">
              <h2 className="font-sans text-sm font-semibold tracking-wide text-white">Products</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {footerNav.products.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-white/70 hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Services" className="lg:col-span-2">
              <h2 className="font-sans text-sm font-semibold tracking-wide text-white">Services</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {footerNav.services.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-white/70 hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Support" className="lg:col-span-2">
              <h2 className="font-sans text-sm font-semibold tracking-wide text-white">Support</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {footerNav.support.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-white/70 hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="lg:col-span-2">
              <h2 className="font-sans text-sm font-semibold tracking-wide text-white">Policies</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {footerNav.legal.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-white/70 hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/site-status" className="text-white/70 hover:text-white">
                    Site status &amp; integrations
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
            <p>
              © {year} {site.fullName}. All rights reserved.
            </p>
            <p className="md:text-right">
              Website concept build · catalogue, policies and integration points are pending
              confirmation by the company —{" "}
              <Link href="/site-status" className="underline hover:text-white/80">
                see status
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
