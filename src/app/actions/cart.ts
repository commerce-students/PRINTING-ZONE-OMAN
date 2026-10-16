"use server";

import { revalidatePath } from "next/cache";
import { getProduct } from "@/data/catalog";
import { MAX_ARTWORK_BYTES, saveArtworkFile } from "@/lib/artwork";
import { buildSelections, addItemToCart, createCartItem, updateCartItemQuantity, removeCartItem } from "@/lib/cart";
import { getCart, saveCart } from "@/lib/cart-session";
import type { FormState } from "@/lib/validation";
import { file, str } from "@/lib/validation";

/** Adds a configured product to the cart from the product page. */
export async function addToCartAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const slug = str(formData, "productSlug");
  const product = getProduct(slug);
  if (!product) {
    return { status: "error", message: "That product could not be found. Please pick it from the catalogue again." };
  }

  const quantity = Number.parseInt(str(formData, "quantity") || "0", 10);
  if (!Number.isFinite(quantity) || quantity < product.minQuantity) {
    return {
      status: "error",
      message: `Please enter a quantity of ${product.minQuantity} or more.`,
      fieldErrors: { quantity: [`Minimum quantity for this product is ${product.minQuantity}.`] },
    };
  }

  // Collect the selected option values (one form field per option group).
  const chosen: Record<string, string> = {};
  for (const group of product.options) {
    const value = str(formData, `option_${group.id}`);
    if (value) chosen[group.id] = value;
  }
  const missing = product.options.filter((g) => g.required && !chosen[g.id]);
  if (missing.length > 0) {
    return {
      status: "error",
      message: "Please complete the required options before adding this to your cart.",
      fieldErrors: Object.fromEntries(missing.map((g) => [`option_${g.id}`, [`Choose a ${g.label.toLowerCase()}.`]])),
    };
  }

  const selections = buildSelections(product, chosen);
  const itemNote = str(formData, "itemNote").slice(0, 600);

  let artwork = null;
  if (product.artworkRequired) {
    const upload = file(formData, "artwork");
    if (upload) {
      if (upload.size > MAX_ARTWORK_BYTES) {
        return {
          status: "error",
          message: `That artwork file is larger than ${Math.round(MAX_ARTWORK_BYTES / (1024 * 1024))} MB. Email larger files to printme@printingzoneoman.com instead.`,
          fieldErrors: { artwork: ["File is too large."] },
        };
      }
      try {
        const stored = await saveArtworkFile(upload);
        artwork = {
          id: stored.id,
          originalName: stored.originalName,
          size: stored.size,
          uploadedAt: stored.uploadedAt,
        };
      } catch (error) {
        return {
          status: "error",
          message:
            error instanceof Error
              ? `${error.message} Please attach a PDF, AI, EPS, SVG, PNG, JPG, TIFF or ZIP file.`
              : "That artwork file could not be saved. Please try another file.",
          fieldErrors: { artwork: ["Unsupported or unreadable file."] },
        };
      }
    }
  }

  const cart = await getCart(true);
  const item = createCartItem(product, quantity, selections, artwork, itemNote);
  const next = addItemToCart(cart, item);
  await saveCart(next);

  revalidatePath("/cart");
  revalidatePath("/", "layout");

  return {
    status: "success",
    message: `${product.name} was added to your cart.`,
  };
}

export async function updateQuantityAction(formData: FormData): Promise<void> {
  const key = str(formData, "key");
  const quantity = Number.parseInt(str(formData, "quantity") || "1", 10);
  if (!key) return;
  const cart = await getCart(true);
  await saveCart(updateCartItemQuantity(cart, key, quantity));
  revalidatePath("/cart");
  revalidatePath("/", "layout");
}

export async function removeItemAction(formData: FormData): Promise<void> {
  const key = str(formData, "key");
  if (!key) return;
  const cart = await getCart(true);
  await saveCart(removeCartItem(cart, key));
  revalidatePath("/cart");
  revalidatePath("/", "layout");
}

export async function clearCartAction(): Promise<void> {
  const cart = await getCart(true);
  await saveCart({ ...cart, items: [] });
  revalidatePath("/cart");
  revalidatePath("/", "layout");
}
