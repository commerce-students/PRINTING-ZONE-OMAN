import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { computeTotals } from "@/lib/cart";
import { getCart } from "@/lib/cart-session";
import { site, verified } from "@/lib/site";

const description =
  "Printing Zone Oman — commercial printing, publishing and packaging in Muscat. Business cards, brochures, banners, packaging, labels and custom print, quoted to your specification.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} — Commercial printing, packaging & large format in Muscat`,
    template: `%s | ${site.fullName}`,
  },
  description,
  applicationName: site.fullName,
  keywords: [
    "printing Oman",
    "printing press Muscat",
    "commercial printing Seeb",
    "packaging printing Oman",
    "large format printing Muscat",
    "screen printing paper cups Oman",
    "business card printing Muscat",
  ],
  authors: [{ name: site.fullName }],
  openGraph: {
    type: "website",
    locale: "en_OM",
    url: site.url,
    siteName: site.fullName,
    title: `${site.fullName} — printing that brings your brand to life`,
    description,
    images: [
      {
        url: "/media/hero-print-collateral.webp",
        width: 1200,
        height: 896,
        alt: "Printed business cards, brochures, packaging and cups arranged on a studio surface",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "PrintingService",
  name: site.fullName,
  url: site.url,
  description,
  image: `${site.url}/media/hero-print-collateral.webp`,
  telephone: verified.phones.map((p) => p.tel),
  email: verified.emails[0].address,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${verified.address.line1}, ${verified.address.area}`,
    addressLocality: verified.address.city,
    addressRegion: verified.address.city,
    postalCode: verified.address.postalCode,
    postOfficeBoxNumber: verified.address.poBox,
    addressCountry: "OM",
  },
  areaServed: { "@type": "Country", name: "Oman" },
  knowsAbout: verified.capabilities,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cart = await getCart(false);
  const totals = computeTotals(cart);

  return (
    <html lang="en" dir="ltr">
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Header cartCount={totals.itemCount} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <script
          type="application/ld+json"
          // Structured data uses only facts published by the company itself.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
      </body>
    </html>
  );
}
