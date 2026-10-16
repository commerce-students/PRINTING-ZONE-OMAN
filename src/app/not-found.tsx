import Link from "next/link";
import { footerNav } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-page max-w-3xl">
        <span className="badge badge-neutral">404</span>
        <h1 className="display-lg mt-4">That page is not on the press</h1>
        <p className="lede mt-4">
          The link may be old or mistyped. You can jump straight to the catalogue, or use one of the
          routes below.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/products" className="btn btn-primary btn-lg">
            Browse the catalogue
          </Link>
          <Link href="/quote" className="btn btn-secondary btn-lg">
            Request a quote
          </Link>
          <Link href="/contact" className="btn btn-ghost btn-lg">
            Contact
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="card p-5">
            <h2 className="font-semibold text-ink-950">Popular products</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {footerNav.products.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-ink-700 hover:text-brand-blue-deep hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-5">
            <h2 className="font-semibold text-ink-950">Support pages</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {footerNav.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-ink-700 hover:text-brand-blue-deep hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
