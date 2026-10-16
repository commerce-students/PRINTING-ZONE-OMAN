# Content verification register

Every factual claim on this website is listed below with its source and status.

**Sources** — all retrieved from the company's own live website on 2026-10-16, via
`printingzoneoman.com`'s pages and its WordPress REST API (`/wp-json/wp/v2/…`):

| Code | Source |
| --- | --- |
| `S1` | Contact Us page — `/contact-us/` |
| `S2` | Special Services page — `/special-services/` |
| `S3` | Home page — `/` |
| `S4` | Site gallery captions — `/gallery/`, `/gallery-main/`, `/gallery-joined/` |
| `S5` | Logo asset — `/wp-content/uploads/2021/05/logo.png` |
| `S6` | Site inventory — page sitemap and REST page list |

**Status** — `VERIFIED` (published by the company, safe to display), `CONFIRM` (standard
commercial-print assumption awaiting the company's approval), `PENDING` (unknown; displayed as
a visible placeholder), `DEMO` (demonstration content created for this concept build).

---

## 1. Company identity and contact details

| Item | Value used on the site | Source | Status |
| --- | --- | --- | --- |
| Trading name | Printing Zone / Printing Zone Oman | S3, S5 | VERIFIED |
| Existing logo | Original file, unmodified (`public/brand/printing-zone-oman-logo.png`) | S5 | VERIFIED |
| Brand colours | Blue `#49BFEE`, green `#98CE15` — sampled from the logo pixels | S5 | VERIFIED |
| Address | Sultanate of Oman – Muscat – Seeb – Al Maabilah North, P.O. Box 887, P.C. 121, Seeb | S1 | VERIFIED |
| Shop phone | +968 7178 8128 (company states it is also on WhatsApp) | S1 | VERIFIED |
| Admin phone | +968 9901 0291 | S1 | VERIFIED |
| Emails | info@, sales@, printme@printingzoneoman.com | S1 | VERIFIED |
| WhatsApp link | `wa.me/96871788128` using the published shop number | S1 | VERIFIED (company states the shop line is on WhatsApp) |
| Precise location pin | Not published — the site maps the Al Maabilah **area** only, with a disclaimer | S1 | PENDING |
| Opening hours | Not published anywhere | S6 | PENDING — rendered as an explicit placeholder |
| Social profiles | None verified | S6 | PENDING — omitted entirely |
| Founding year, team size, certifications, references | Not published anywhere | S6 | PENDING — omitted, listed on the About page as missing |

## 2. Capabilities claimed

| Capability | Where it is used | Source | Status |
| --- | --- | --- | --- |
| "Printing, publishing and packaging" | Home, Services, About | S2 | VERIFIED |
| Digital printing | Services | S4 ("Digital print" gallery tag) | VERIFIED |
| Screen printing / printed paper cups | Services, Custom & Promotional category, cup product | S2-era content; paper-cup print design found on the company's own site | VERIFIED |
| Custom mug printing | Services, promotional products | S4 ("Custom mugs") | VERIFIED |
| Large format & billboard printing | Services, Banners category | S4 ("Billboard print") | VERIFIED |
| Flexography | Services (named "Flexography" in the capability list) | S4 | VERIFIED |
| Packaging design & production | Services, Packaging category | S4 ("Packaging design"), S2 | VERIFIED |
| Logotype / branding / graphic design | Services, About | S4 ("Logotype", "Graphic design", "Branding") | VERIFIED |
| Custom design & print ideas | Services | S4 ("Custom design", "Print ideas") | VERIFIED |
| Advertising materials | Services | S4 ("Advertising") | VERIFIED |
| Offset printing | Services | Not named explicitly | CONFIRM |
| Business cards, flyers, brochures, posters, stickers, invitations, stationery | Catalogue categories | Standard for a commercial printer, not named explicitly | CONFIRM — catalogue is flagged as demonstration data |

### Statements quoted from the company (used verbatim, and labelled as such)

* "New way to print your projects with best results." — S3
* "Affordable price for printing, publishing & packaging services" — S2
* "We provide you with quick & accurate prices which are competitive & guaranteed." — S2
* "Our business managers are dedicated and willing to know your business and help you achieve your goals." — S2
* "Our mission is to deliver quality products that you need to help enhance your business." — S2

The home page presents these inside a section titled "In the company's own words" so nobody
reads them as marketing copy written for this redesign.

## 3. Commerce data

| Item | Status | How the site handles it |
| --- | --- | --- |
| Prices | PENDING — none supplied | Every product shows "Price on quotation"; cart subtotal and total render as "Price on quotation" rather than a number; no structured-data `offers` block is emitted |
| Currency | OMR — correct for an Oman-based business, but no price list exists to confirm it | Formatting helper is ready (`formatOmr`); no amount is displayed anywhere |
| Minimum order quantities | PENDING | Catalogue values are demonstration defaults, described as "typical" and confirmed on quotation |
| Lead times | PENDING | Always stated as "confirmed on quotation" |
| Payment methods | PENDING | Checkout states that no payment is taken online and none is requested; nothing claims Visa, cash, or transfer support |
| Delivery / collection | PENDING | Collection location is verified (Seeb); delivery zones and charges are described as arranged per job |
| Stock levels | PENDING | Never displayed; nothing claims availability |
| Discounts, stock counts, urgency messaging | Not used anywhere | Deliberately absent |
| Reviews and testimonials | PENDING | No testimonials are shown; no review scores or aggregate ratings exist in the markup |
| Client logos / awards / partnerships | PENDING | None displayed anywhere |

## 4. Legal pages

The company's live site has pages for Terms & Conditions, Shipping Policy, Delivery Policy
and FAQs whose **content is empty** (verified through the REST API), and no privacy policy
exists at all. This build therefore ships four clearly-marked **draft** documents
(`/policies/privacy`, `/policies/terms`, `/policies/delivery`, `/policies/artwork`) that
describe only what this website actually does — server-side storage of submissions, private
artwork handling, no payment collection — plus a visible "draft, requires approval" banner.
No commercial terms, liability limits or governing law have been invented.

## 5. Demonstration content to replace before launch

| Item | Where | Action required |
| --- | --- | --- |
| Product catalogue (10 categories, 20 products) | `src/data/catalog.ts` | Confirm which products the workshop actually offers; delete the rest |
| Product specifications, options and minimum quantities | `src/data/catalog.ts` | Confirm per product |
| Studio photography (9 images) | `public/media/*.webp` | Replace with the company's own approved photographs |
| Two imagery placeholders | "Custom & Promotional" category currently uses the hero specimen image; a production/press-room photograph is still to be produced | Produce/replace |
| Portfolio examples (10 items) | `src/data/portfolio.ts` | Replace with real, approved project photographs and permission |
| Service groupings | `src/data/services.ts` | Confirm the CONFIRM entries (offset/commercial printing) |
| FAQ answers flagged "contains points pending company confirmation" | `src/data/faq.ts` | Confirm wording with the company |

## 6. What this build deliberately does not do

* It does not publish or deploy anything to the company's live domain.
* It does not create, redraw or approximate the company's logo.
* It does not state a founding year, staff count, production capacity, certification, award,
  partnership or customer testimonial.
* It does not present demonstration imagery as photographs of completed client work.
* It does not simulate a payment, an order confirmation or an email delivery that never happened.
* It does not display a price, discount or stock figure that has not been supplied.
