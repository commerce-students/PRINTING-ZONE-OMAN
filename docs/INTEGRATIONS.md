# Integrations required before real commerce

This concept build is honest about its own boundaries: it saves orders and enquiries for real,
but it takes no money and sends no email. Everything below must be connected, in the company's
own accounts, before the site is used by paying customers.

---

## 1. Orders, enquiries and carts — currently a private file store

**Where it lives:** `src/lib/store.ts`

Orders, quotation requests, contact messages, carts and uploaded artwork are written as JSON
files under `./var` (override with the `DATA_DIR` environment variable). That directory is
git-ignored and sits outside `public/`, so nothing in it is reachable by URL — verified:
`/var/uploads/…` returns **404**.

**Why it was built this way:** it gives a genuinely working cart → checkout → persisted order
flow with a sequential reference (`PZO-YYYY-####`) for the preview, without requiring a database
in an environment that has none.

**What to do before launch:** swap the six exported functions in `store.ts` for a hosted
database (PostgreSQL, MySQL or a managed service) or for the company's commerce platform API.
No other file needs to change — every caller imports only:

```
ensureStore, newId, nextReference,
saveRecord, readRecord, readCart, writeCart, deleteCart, storeUpload
```

## 2. Payments — not configured

**Current behaviour:** the checkout collects no payment details, the order status is always
`received`, and `paymentStatus` is always `not-collected`. The site never renders a "paid" or
"payment successful" state.

**What is needed:**

1. A merchant account opened in the company's own legal name with a payment provider licensed
   to operate in Oman (or the company's bank's online gateway).
2. Server-side integration: create the payment session on the server, redirect to the provider's
   hosted checkout, and verify the result through the provider's webhook before changing any
   order status.
3. Secrets (API keys, webhook signing keys) stored as environment variables on the hosting
   platform — never in front-end code, never in this repository.
4. A written refund/cancellation position from the company, since print jobs are usually
   non-cancellable once they go to press (that wording is currently a draft in
   `/policies/terms`).

Anything less than this leaves the site taking **order requests**, which it already does well.

## 3. Email / notification — not configured

Submissions are saved but nobody is alerted. Before launch:

* Connect a transactional email service (with SPF/DKIM on the company's domain).
* Send the business an internal notification per order/enquiry, and the customer a copy of
  their reference number.
* Decide the monitored mailbox (sales@printingzoneoman.com and printme@printingzoneoman.com are
  the company's published addresses).

## 4. Artwork storage and retention

Uploads currently land in the private `var/uploads` directory with a random file name, validated
by extension and a 10 MB limit (`src/lib/artwork.ts`, `src/lib/store.ts`).

For production: move to access-controlled object storage, set a retention period agreed with the
company (how long customer artwork is kept on file for reorders), and record consent for
retaining it. The privacy draft references this.

## 5. Hosting, domain and HTTPS

* Deploy to a preview URL for review; **do not publish** to `printingzoneoman.com` until the
  owner authorises it.
* When authorised: point the domain, enable HTTPS, configure backups for the data store, and
  connect an error-reporting hook in `src/app/error.tsx` (currently it logs to the server console).
* Set `NEXT_PUBLIC_SITE_URL` to the production URL so canonical tags, the sitemap and
  structured data use the correct domain.

## 6. Catalogue source of truth

`src/data/catalog.ts` is the single source for categories, products, options, specifications and
minimum quantities. If the company prefers to manage products itself (for example inside an
existing WordPress/WooCommerce installation), export this file's shape into that system and fetch
it server-side — the `Product` type in `src/lib/catalog-types.ts` is the contract the UI expects.

## 7. Price list

No prices are displayed because none were supplied. Once the company provides a price list:

1. Set `currency.pricesPublished = true` in `src/lib/site.ts`.
2. Give each product `pricingMode: "fixed"` and a `priceFrom` value, or add a pricing table per
   quantity break.
3. The cart totals, order summaries and product cards then switch from "Price on quotation" to
   real figures automatically — the calculation already exists in `src/lib/cart.ts`
   (`computeTotals` only returns a subtotal when every line has a price).

## 8. Analytics and consent

No analytics, advertising or tracking tags are included. If any are added later they require a
consent mechanism and an updated privacy notice.

## 9. Environment variables

| Variable | Purpose | Required |
| --- | --- | --- |
| `DATA_DIR` | Absolute path for the order/enquiry/upload store. Defaults to `./var`. | Optional (required in production) |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL used in metadata, sitemap and structured data. | Yes in production |

Copy `.env.example` to `.env.local` to start.

## 10. Launch checklist

- [ ] Catalogue confirmed by the company; demonstration entries removed.
- [ ] Price list supplied and enabled (or quotations kept as the only route to purchase).
- [ ] Lead times, minimum orders and delivery terms confirmed.
- [ ] Payment provider live with the company's merchant account and webhook verification.
- [ ] Transactional email connected, with the business inboxes monitored.
- [ ] Policies approved by the company and reviewed legally.
- [ ] Opening hours, social profiles and (optionally) exact location pin supplied.
- [ ] Real photography supplied; portfolio items approved for publication.
- [ ] Database or commerce platform connected; backups and monitoring in place.
- [ ] Domain switched over with HTTPS, with the owner's explicit authorisation.
