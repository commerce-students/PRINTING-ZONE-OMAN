/**
 * Generates the favicon tiles from the company's original logo.
 *
 * The logo is scaled proportionally to fit inside the tile and centred with
 * clear space around it. It is never cropped, stretched or recoloured — only
 * padded, which keeps the mark recognisable at favicon sizes.
 *
 * Usage: node scripts/build-icons.mjs
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const source = path.join(root, "public/brand/printing-zone-oman-logo.png");

const tiles = [
  { out: "src/app/icon.png", size: 512, padding: 96, background: { r: 255, g: 255, b: 255, alpha: 1 } },
  { out: "src/app/apple-icon.png", size: 180, padding: 30, background: { r: 253, g: 251, b: 247, alpha: 1 } },
];

const meta = await sharp(source).metadata();

for (const tile of tiles) {
  const target = tile.size - tile.padding * 2;
  const scale = Math.min(target / meta.width, target / meta.height);
  const width = Math.round(meta.width * scale);
  const height = Math.round(meta.height * scale);

  const logo = await sharp(source).resize(width, height, { fit: "inside" }).png().toBuffer();

  await sharp({
    create: { width: tile.size, height: tile.size, channels: 4, background: tile.background },
  })
    .composite([
      {
        input: logo,
        left: Math.round((tile.size - width) / 2),
        top: Math.round((tile.size - height) / 2),
      },
    ])
    .png()
    .toFile(path.join(root, tile.out));

  console.log(`✓ ${tile.out} — ${tile.size}×${tile.size} with the logo at ${width}×${height}`);
}
