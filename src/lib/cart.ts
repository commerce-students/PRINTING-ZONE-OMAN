import type { Product } from "@/lib/catalog-types";
import { QUANTITY_GROUP_ID } from "@/lib/catalog-types";

export interface CartSelection {
  groupId: string;
  groupLabel: string;
  valueId: string;
  valueLabel: string;
  note?: string;
}

export interface CartArtwork {
  id: string;
  originalName: string;
  size: number;
  uploadedAt: string;
}

export interface CartItem {
  /** Deterministic id from product + selected options. */
  key: string;
  productSlug: string;
  productName: string;
  categorySlug: string;
  image: string;
  quantity: number;
  selections: CartSelection[];
  /** null means "quotation required" — no invented prices are ever shown. */
  unitPrice: number | null;
  lineTotal: number | null;
  artwork: CartArtwork | null;
  itemNote: string;
}

export interface Cart {
  id: string;
  items: CartItem[];
  updatedAt: string;
}

export interface CartTotals {
  itemCount: number;
  unitCount: number;
  /** null until every line has a verified price. */
  subtotal: number | null;
  requiresQuotation: boolean;
}

export function emptyCart(id: string): Cart {
  return { id, items: [], updatedAt: new Date().toISOString() };
}

export function selectionsToKey(productSlug: string, selections: CartSelection[]): string {
  const parts = selections
    .map((s) => `${s.groupId}:${s.valueId}`)
    .sort()
    .join("|");
  return `${productSlug}__${parts}`;
}

export function buildSelections(
  product: Product,
  chosen: Record<string, string>,
): CartSelection[] {
  return product.options
    .filter((group) => group.id !== QUANTITY_GROUP_ID)
    .map((group) => {
      const valueId = chosen[group.id] ?? group.values[0]?.id ?? "";
      const value = group.values.find((v) => v.id === valueId);
      return {
        groupId: group.id,
        groupLabel: group.label,
        valueId: value?.id ?? "",
        valueLabel: value?.label ?? "To be confirmed",
        note: value?.note,
      };
    })
    .filter((s) => s.valueId !== "");
}

export function createCartItem(
  product: Product,
  quantity: number,
  selections: CartSelection[],
  artwork: CartArtwork | null,
  itemNote: string,
): CartItem {
  const unitPrice = product.pricingMode === "fixed" ? (product.priceFrom ?? null) : null;
  return {
    key: selectionsToKey(product.slug, selections),
    productSlug: product.slug,
    productName: product.name,
    categorySlug: product.categorySlug,
    image: product.image,
    quantity,
    selections,
    unitPrice,
    lineTotal: unitPrice === null ? null : Number((unitPrice * quantity).toFixed(2)),
    artwork,
    itemNote,
  };
}

export function addItemToCart(cart: Cart, item: CartItem): Cart {
  const existing = cart.items.find((i) => i.key === item.key);
  const items = existing
    ? cart.items.map((i) =>
        i.key === item.key
          ? {
              ...i,
              quantity: i.quantity + item.quantity,
              lineTotal: i.unitPrice === null ? null : Number((i.unitPrice * (i.quantity + item.quantity)).toFixed(2)),
              artwork: item.artwork ?? i.artwork,
              itemNote: item.itemNote || i.itemNote,
            }
          : i,
      )
    : [...cart.items, item];
  return { ...cart, items, updatedAt: new Date().toISOString() };
}

export function updateCartItemQuantity(cart: Cart, key: string, quantity: number): Cart {
  const safeQuantity = Math.max(1, Math.min(1_000_000, Math.trunc(quantity)));
  return {
    ...cart,
    items: cart.items.map((i) =>
      i.key === key
        ? {
            ...i,
            quantity: safeQuantity,
            lineTotal:
              i.unitPrice === null ? null : Number((i.unitPrice * safeQuantity).toFixed(2)),
          }
        : i,
    ),
    updatedAt: new Date().toISOString(),
  };
}

export function removeCartItem(cart: Cart, key: string): Cart {
  return {
    ...cart,
    items: cart.items.filter((i) => i.key !== key),
    updatedAt: new Date().toISOString(),
  };
}

export function computeTotals(cart: Cart): CartTotals {
  const unitCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);
  const priced = cart.items.length > 0 && cart.items.every((i) => i.lineTotal !== null);
  const subtotal = priced
    ? Number(cart.items.reduce((sum, i) => sum + (i.lineTotal ?? 0), 0).toFixed(2))
    : null;
  return {
    itemCount: cart.items.length,
    unitCount,
    subtotal,
    requiresQuotation: cart.items.some((i) => i.unitPrice === null),
  };
}
