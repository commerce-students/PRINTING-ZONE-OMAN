/**
 * Artwork upload limits shared by client and server code.
 * Kept separate from `lib/artwork.ts` (which is server-only) so client
 * components can validate before a file ever leaves the browser.
 */
export const MAX_ARTWORK_BYTES = 10 * 1024 * 1024; // 10 MB
export const ACCEPTED_ARTWORK = ".pdf,.ai,.eps,.svg,.png,.jpg,.jpeg,.tif,.tiff,.zip";
export const ACCEPTED_ARTWORK_LABEL = "PDF, AI, EPS, SVG, PNG, JPG, TIFF or ZIP up to 10 MB";
export const MAX_ARTWORK_LABEL = "10 MB";
