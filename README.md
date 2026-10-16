# Printing Zone Oman — website concept

A premium e-commerce concept for **Printing Zone Oman**, a commercial printing, publishing and
packaging business in Al Maabilah North, Seeb, Muscat, Sultanate of Oman.

> **Preview build.** This is a redesign concept for review. Nothing has been published to the
> company's live domain, no price has been invented, and no payment is taken. The site explains
> its own status at `/site-status`, and the full content register is in
> [`docs/CONTENT-VERIFICATION.md`](docs/CONTENT-VERIFICATION.md).

---

## What is in here

| Route | Purpose |
| --- | --- |
| `/` | Homepage — hero, categories, featured products, services, company statements, ordering process |
| `/products` | Catalogue with server-side search, category filters, sorting and pagination |
| `/products/[slug]` | 20 product pages: gallery, specification options, quantity, artwork upload, add to cart or request a quote |
| `/cart` | Real cart: specification review per line, quantity updates, item removal, order summary |
| `/checkout` | Guest checkout — collection or delivery, validation, job notes; saves a real order request |
| `/orders/[reference]` | Confirmation page, readable only by the browser that submitted the request |
| `/quote` | Quotation request with artwork upload (entry point from every product page) |
| `/services` | Eight production routes, each mapped to the company's published capabilities |
| `/business-printing` | Business-oriented landing page |
| `/custom-printing` | Non-standard projects and how they are scoped |
| `/portfolio` | Filterable gallery — demonstration visuals, clearly labelled |
| `/about` | Verified company information only, with an explicit list of what is still missing |
| `/contact` | Verified phone numbers, emails, address, map (area-level) and message form |
| `/faq` | 16 questions, each honest about what depends on company confirmation |
| `/ordering` | How a print order comes together, step by step |
| `/policies/[privacy\|terms\|delivery\|artwork]` | Draft policies, visibly marked as requiring approval |
| `/site-status` | What works, what does not, and what must be integrated before launch |

## The brand asset

The header, footer and icons use the company's **existing logo**, retrieved byte-for-byte from
its own website and stored unmodified at `public/brand/printing-zone-oman-logo.png`. Its two
colours — blue `#49BFEE` and green `#98CE15` — are sampled from the logo's own pixels and form
the basis of the entire palette. See [`docs/BRAND-ASSETS.md`](docs/BRAND-ASSETS.md) for
provenance, dimensions and the exact usage rules (no crop, no stretch, no recolour, no substitute
icon).

## Tech stack

* **Next.js 15** (App Router, React 19, Server Actions) with TypeScript in strict mode.
* **Tailwind CSS v4** with a CSS-first design system in `src/app/globals.css` (colour, type,
  spacing, buttons, forms, badges, notices, print-craft details).
* **Self-hosted fonts** via Fontsource — Archivo Variable (display, with a width axis), Inter
  (body), JetBrains Mono (specifications and references) and Noto Sans Arabic (Arabic-ready, with
  a `[lang="ar"]` RTL hook in the base stylesheet).
* **Zod** for server-side validation of every form.
* **Sharp** for image optimisation (`scripts/build-icons.mjs`).
* **No external services** at build or run time: no CDN fonts, no third-party image hosts, no
  analytics.

## Getting started

```bash
npm install
cp .env.example .env.local     # optional locally
npm run dev                    # http://localhost:3000
```

Other scripts: `npm run build`, `npm start`, `npm run typecheck`.

## How the honest commerce flow works

```
product page → configure options + quantity + artwork
             → cart (server-side, HTTP-only cookie)
             → checkout (guest, validated with Zod)
             → order request saved with reference PZO-YYYY-####
             → confirmation page (readable only by that browser)
```

* **Prices:** none have been supplied, so nothing shows a number. `computeTotals()` in
  `src/lib/cart.ts` returns `null` until every line has a verified price — the UI then says
  "Price on quotation".
* **Payments:** no gateway is configured, no card details are requested, and the order status is
  always `received` with `paymentStatus: not-collected`. Nothing pretends otherwise.
* **Artwork:** validated by extension and a 10 MB limit, renamed, and written outside `public/`
  (`var/uploads`) so it is not reachable by URL.
* **Notifications:** submissions are stored but no email is sent yet — that is listed as a
  required integration.

## Project structure

```
src/
  app/
    actions/         server actions: cart, checkout order, enquiries
    products/        catalogue + product detail
    orders/          confirmation page (cookie-scoped)
    policies/        draft policy documents
    …                quote, contact, services, about, portfolio, faq, ordering, site-status
    globals.css      the whole design system
    sitemap.ts       routes, products, services, policies
    robots.ts        blocks private and draft routes
  components/
    site/            header, mega menu, mobile nav, footer, logo, breadcrumbs, WhatsApp
    catalog/         product card, category card, gallery, configurator, filters, portfolio grid
    cart/            cart line item
    forms/           shared field primitives, quote/contact/checkout forms, submit button
    home/            hero, process steps, statements band, CTA band
  data/              catalog, services, portfolio, faq, policies  ← content lives here
  lib/               site config, cart, store, orders, validation, formatting, artwork
docs/                brand assets, content verification, integrations
scripts/             icon generation from the original logo
```

Content is separated from presentation: editing `src/data/*.ts` changes what the site sells
without touching any page component.

## Accessibility and performance notes

* Semantic landmarks, a skip link, one `h1` per page, visible focus rings and `aria-live`
  regions on filter results and form errors.
* The catalogue filter and search are plain `GET` forms, so they work without JavaScript and
  produce shareable URLs.
* Forms use labelled inputs, `aria-invalid`, `aria-describedby` and inline error text.
* The mobile menu locks background scroll, moves focus into the panel, closes on `Escape` and
  returns focus to the trigger.
* Images are optimised to WebP (760 KB total) and served responsively through `next/image`.
* `prefers-reduced-motion` is respected globally.

## Contributing / next steps

The list of what the company must confirm — catalogue, prices, lead times, hours, delivery,
payment provider, policies, photography — is in
[`docs/INTEGRATIONS.md`](docs/INTEGRATIONS.md) and on the site's own `/site-status` page.
