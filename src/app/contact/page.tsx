import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { WhatsAppInlineLink } from "@/components/site/whatsapp-button";
import { site, verified, whatsapp } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Printing Zone Oman — Seeb, Muscat",
  description:
    "Contact Printing Zone Oman: shop and admin phone numbers, sales and artwork email addresses, and the workshop location in Al Maabilah North, Seeb, Muscat.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-line bg-paper-100">
        <div className="container-page py-10 md:py-14">
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          <p className="eyebrow mt-5">Contact</p>
          <h1 className="display-lg mt-4">Talk to the print team</h1>
          <p className="lede mt-4">
            Call the shop for anything urgent, email artwork and specification files, or send a
            message below and it will reach the team. Every number and address on this page was
            taken from the company&rsquo;s own published details.
          </p>
        </div>
      </section>

      <section className="section pt-10">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-5">
              <div className="card p-6">
                <h2 className="display-sm">Phone &amp; WhatsApp</h2>
                <ul className="mt-4 space-y-4">
                  {verified.phones.map((phone) => (
                    <li key={phone.tel}>
                      <p className="plate-label">{phone.label}</p>
                      <a
                        href={`tel:${phone.tel}`}
                        className="mono mt-1 block text-xl font-semibold text-ink-950 hover:text-brand-blue-deep"
                      >
                        {phone.display}
                      </a>
                      {phone.note ? <p className="hint mt-1">{phone.note}</p> : null}
                    </li>
                  ))}
                </ul>
                <div className="mt-5">
                  <WhatsAppInlineLink />
                </div>
              </div>

              <div className="card p-6">
                <h2 className="display-sm">Email</h2>
                <ul className="mt-4 space-y-3 text-sm">
                  {verified.emails.map((email) => (
                    <li key={email.address}>
                      <a href={`mailto:${email.address}`} className="link-underline">
                        {email.address}
                      </a>
                      <span className="ml-2 text-ink-500">{email.purpose}</span>
                    </li>
                  ))}
                </ul>
                <p className="hint mt-4">
                  Send large artwork files to{" "}
                  <a href={`mailto:${verified.emails[2].address}`} className="link-underline">
                    {verified.emails[2].address}
                  </a>{" "}
                  and quote your reference number so the team can match it to your job.
                </p>
              </div>

              <div className="card p-6">
                <h2 className="display-sm">Workshop address</h2>
                <address className="mt-3 not-italic text-ink-700">
                  {verified.address.line1}
                  <br />
                  {verified.address.area}, {verified.address.city}
                  <br />
                  {verified.address.country}
                  <br />
                  P.O. Box {verified.address.poBox}, P.C. {verified.address.postalCode}, Seeb
                </address>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Al Maabilah North, Seeb, Muscat, Oman")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm mt-4"
                >
                  Open in Maps
                </a>
                <p className="hint mt-3">
                  The company publishes its address at area level. The exact shopfront pin has not
                  been supplied, so the map shows the Al Maabilah area rather than a pinpoint.
                </p>
              </div>

              <div className="card p-6">
                <h2 className="display-sm">Opening hours</h2>
                <p className="mt-3 text-sm text-ink-700">
                  <span className="badge badge-neutral mr-2">Pending confirmation</span>
                  Opening hours are not published anywhere by the company and have not been supplied
                  for this site, so they are deliberately left blank rather than guessed. Please
                  phone the shop before visiting.
                </p>
                <Link href="/site-status" className="link-underline mt-3 inline-block text-sm">
                  See everything pending confirmation
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="card overflow-hidden">
                <div className="border-b border-line p-6">
                  <h2 className="display-sm">Send a message</h2>
                  <p className="hint mt-1">
                    Your message is saved with a reference number so it cannot be lost if the phone
                    line is busy.
                  </p>
                </div>
                <div className="p-6">
                  <ContactForm />
                </div>
              </div>

              <div className="card mt-6 overflow-hidden">
                <div className="border-b border-line p-6">
                  <h2 className="display-sm">Find the workshop</h2>
                  <p className="hint mt-1">
                    Approximate area view — Al Maabilah North, Seeb, Muscat.
                  </p>
                </div>
                <div className="aspect-16/9 w-full bg-paper-200">
                  <iframe
                    title="Map showing the Al Maabilah area of Seeb, Muscat"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=58.1200%2C23.6200%2C58.2600%2C23.7300&layer=mapnik"
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="border-t border-line p-4">
                  <p className="hint">
                    Map data © OpenStreetMap contributors. Area-level view only — the business has
                    not supplied a precise pin.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: `Contact ${site.fullName}`,
            url: `${site.url}/contact`,
            mainEntity: {
              "@type": "PrintingService",
              name: site.fullName,
              telephone: verified.phones.map((p) => p.tel),
              email: verified.emails[0].address,
              address: {
                "@type": "PostalAddress",
                streetAddress: `${verified.address.line1}, ${verified.address.area}`,
                addressLocality: verified.address.city,
                postalCode: verified.address.postalCode,
                addressCountry: "OM",
              },
              sameAs: whatsapp.href,
            },
          }),
        }}
      />
    </>
  );
}
