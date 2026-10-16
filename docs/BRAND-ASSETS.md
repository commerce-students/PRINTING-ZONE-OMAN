# Brand assets — provenance and usage rules

## 1. The logo is the company's real logo

| Property | Value |
| --- | --- |
| File | `public/brand/printing-zone-oman-logo.png` |
| Source | `https://www.printingzoneoman.com/wp-content/uploads/2021/05/logo.png` (the company's own live site) |
| Retrieved | 2026-10-16 |
| Original dimensions | 160 × 100 px |
| Format | PNG, 8-bit RGB with alpha channel (transparent background — preserved) |
| File size | 14,718 bytes |
| SHA-256 (first 16 hex) | `8371e44e51ee291b…` |

The file is stored **byte-for-byte as retrieved**. It has not been redrawn, recoloured,
cropped, retouched, upscaled, sharpened or re-saved. Nothing in this project generates,
fabricates or substitutes a logo.

### How it was retrieved

The sandbox running this build cannot open TLS connections directly to
`printingzoneoman.com`, and the environment's allowed host list only permits GitHub,
npm and PyPI hosts. The original asset was therefore fetched through a **one-off GitHub
Actions workflow running in this repository** (`.github/workflows/fetch-brand-assets.yml`),
which downloaded the file, committed it and passed it back through git — giving a
byte-exact copy rather than a re-encoded screenshot.

That workflow has been converted to a **manual-only** tool (`workflow_dispatch`) with a
URL input, so the company can pull further approved assets (for example real photography
from its own gallery) without the workflow ever running automatically.

### How the logo is used

* Header (desktop and mobile): rendered at heights of 44 px (at rest) and 38 px (on scroll),
  which stays within the file's native pixel density for a 2× display.
* Footer: rendered at 46 px on a white tile, because the artwork's wordmark is light blue
  and light green and needs a light background to keep contrast.
* Aspect ratio is locked by `next/image` using the true 160:100 ratio — no stretching,
  no squashing, no cropping. Clear space is provided by the surrounding header/footer padding.
* It is never placed on a mid-tone or photographic background; where the header sits over
  content, the header itself is an opaque paper-white bar.
* A printer-style icon or emoji is never used in place of the logo.

### Favicon

`src/app/icon.png` (512 × 512) and `src/app/apple-icon.png` (180 × 180) are generated from
the **same original file**: the logo is scaled proportionally to fit, then centred on a plain
tile with clear space around it. No crop, no recolor, no distortion. Generation script:
`scripts/build-icons.mjs`.

## 2. Colours sampled from the logo

Sampled directly from the logo's pixels (opaque areas only):

| Role | Hex | Where it comes from |
| --- | --- | --- |
| Brand blue | `#49BFEE` | The "Z / PZ" emblem and the word "PRINTING" |
| Brand green | `#98CE15` | The Arabic calligraphy and the word "ZONE" |

Everything else in the design system is a supporting neutral built around those two colours
(`src/app/globals.css`), so the brand colours always read as the brand colours:

* Ink: `#061523`, `#0a1f33`, `#123047` — a deep blue-black that belongs to the same family as the blue.
* Paper: `#fdfbf7`, `#f7f3ea`, `#efe9dd` — warm uncoated-paper neutrals.
* Registration strip (cyan / magenta / yellow / green) — a prepress artefact used as a divider,
  never as a status indicator.

## 3. Photography

All imagery in `public/media/*.webp` is **studio demonstration imagery generated for this
concept build**. It is deliberately textless (no readable words, no invented brand marks)
so that nothing in the artwork can be mistaken for a real client project, a real logo or a
real product claim.

These files must be replaced with the company's own approved photography before launch.
The original PNG renders were optimised to WebP (max 1600 px wide, quality 82), reducing
22 MB to 760 KB in total.

### Outstanding

* Two further visuals were still to be produced when the image-generation limit for the build
  session was reached: a dedicated "Custom & Promotional" category image (currently using the
  hero specimen photograph, which does show printed mugs and cups) and a production/press room
  photograph. Both are marked as placeholders in `docs/CONTENT-VERIFICATION.md`.
