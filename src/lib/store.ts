import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

/**
 * Local persistence layer.
 *
 * This concept build ships with a real, working server-side store so that order
 * requests, quotations and contact messages are genuinely saved rather than
 * simulated. It writes JSON to a private directory (default `./var`, override
 * with DATA_DIR) which is:
 *   - git-ignored,
 *   - outside `public/`, so nothing stored here is reachable by URL.
 *
 * BEFORE LIVE COMMERCE: swap this module for the production backend (a hosted
 * database or the company's e-commerce platform). Every caller uses only the
 * functions exported below, so the rest of the app does not change.
 */

const DATA_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.join(process.cwd(), "var");

export const paths = {
  root: DATA_DIR,
  carts: path.join(DATA_DIR, "carts"),
  orders: path.join(DATA_DIR, "orders"),
  enquiries: path.join(DATA_DIR, "enquiries"),
  uploads: path.join(DATA_DIR, "uploads"),
  counters: path.join(DATA_DIR, "counters"),
};

export async function ensureStore(): Promise<void> {
  await Promise.all(
    [paths.root, paths.carts, paths.orders, paths.enquiries, paths.uploads, paths.counters].map(
      (dir) => fs.mkdir(dir, { recursive: true }),
    ),
  );
}

async function writeJsonAtomic(filePath: string, data: unknown): Promise<void> {
  await ensureStore();
  const tmp = `${filePath}.${crypto.randomBytes(4).toString("hex")}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmp, filePath);
}

async function readJson<T>(filePath: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function newId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}${crypto.randomBytes(4).toString("hex")}`;
}

/** Sequential, human-quotable reference: PZO-2026-0001 */
export async function nextReference(): Promise<string> {
  await ensureStore();
  const year = new Date().getFullYear();
  const file = path.join(paths.counters, `order-${year}.json`);
  const current = (await readJson<{ count: number }>(file)) ?? { count: 0 };
  const count = current.count + 1;
  await writeJsonAtomic(file, { count });
  return `PZO-${year}-${String(count).padStart(4, "0")}`;
}

export async function saveRecord<T extends object>(
  collection: "orders" | "enquiries",
  id: string,
  record: T,
): Promise<T> {
  await writeJsonAtomic(path.join(paths[collection], `${id}.json`), record);
  return record;
}

export async function readRecord<T>(
  collection: "orders" | "enquiries",
  id: string,
): Promise<T | null> {
  return readJson<T>(path.join(paths[collection], `${id}.json`));
}

export async function readCart<T>(cartId: string): Promise<T | null> {
  if (!/^cart_[a-z0-9]+$/i.test(cartId)) return null;
  return readJson<T>(path.join(paths.carts, `${cartId}.json`));
}

export async function writeCart<T>(cartId: string, cart: T): Promise<void> {
  await writeJsonAtomic(path.join(paths.carts, `${cartId}.json`), cart);
}

export async function deleteCart(cartId: string): Promise<void> {
  try {
    await fs.unlink(path.join(paths.carts, `${cartId}.json`));
  } catch {
    /* nothing to remove */
  }
}

const SAFE_EXT = new Set([".pdf", ".ai", ".eps", ".svg", ".png", ".jpg", ".jpeg", ".tif", ".tiff", ".zip"]);

export interface StoredFile {
  id: string;
  originalName: string;
  storedName: string;
  size: number;
  type: string;
  uploadedAt: string;
}

/**
 * Saves an uploaded artwork file outside the public directory.
 * The returned `storedName` is a random filename — the original name is kept
 * only as metadata for staff.
 */
export async function storeUpload(file: File): Promise<StoredFile> {
  await ensureStore();
  const original = file.name.replace(/[\u0000-\u001f/\\]/g, "_").slice(0, 180);
  const ext = path.extname(original).toLowerCase();
  if (!SAFE_EXT.has(ext)) {
    throw new Error(`Unsupported file type: ${ext || "unknown"}`);
  }
  const id = newId("file");
  const storedName = `${id}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(paths.uploads, storedName), buffer);
  return {
    id,
    originalName: original,
    storedName,
    size: buffer.byteLength,
    type: file.type || "application/octet-stream",
    uploadedAt: new Date().toISOString(),
  };
}
