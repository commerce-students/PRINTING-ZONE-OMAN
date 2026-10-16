import "server-only";
import { cookies } from "next/headers";
import { emptyCart, type Cart } from "@/lib/cart";
import { newId, readCart, writeCart, deleteCart } from "@/lib/store";

const CART_COOKIE = "pzo_cart";
const CART_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

/** Reads the cart for the current visitor, creating the cookie when asked. */
export async function getCart(create = false): Promise<Cart> {
  const jar = await cookies();
  const existing = jar.get(CART_COOKIE)?.value;

  if (existing) {
    const cart = await readCart<Cart>(existing);
    if (cart) return cart;
    if (!create) return emptyCart(existing);
  }

  const id = existing ?? newId("cart");
  const cart = emptyCart(id);

  if (create || existing) {
    jar.set(CART_COOKIE, id, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: CART_MAX_AGE,
    });
  }

  return cart;
}

export async function saveCart(cart: Cart): Promise<void> {
  const jar = await cookies();
  jar.set(CART_COOKIE, cart.id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: CART_MAX_AGE,
  });
  await writeCart(cart.id, cart);
}

/** Records an order reference against the visitor so only they can open it. */
export async function rememberOrderReference(reference: string): Promise<void> {
  const jar = await cookies();
  const raw = jar.get("pzo_orders")?.value;
  const list = raw ? raw.split(",").filter(Boolean) : [];
  const next = Array.from(new Set([...list, reference])).slice(-12);
  jar.set("pzo_orders", next.join(","), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 60,
  });
}

export async function getRememberedOrders(): Promise<string[]> {
  const jar = await cookies();
  const raw = jar.get("pzo_orders")?.value;
  return raw ? raw.split(",").filter(Boolean) : [];
}

export async function clearCartSession(): Promise<void> {
  const jar = await cookies();
  const id = jar.get(CART_COOKIE)?.value;
  if (id) await deleteCart(id);
  jar.set(CART_COOKIE, newId("cart"), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: CART_MAX_AGE,
  });
}
