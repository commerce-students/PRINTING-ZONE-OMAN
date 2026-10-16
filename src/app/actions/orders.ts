"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { computeTotals } from "@/lib/cart";
import { clearCartSession, getCart, rememberOrderReference } from "@/lib/cart-session";
import type { OrderRecord } from "@/lib/orders";
import { nextReference, saveRecord } from "@/lib/store";
import { checkoutSchema, str, bool, toFieldErrors, type FormState } from "@/lib/validation";

/**
 * Places an order *request*.
 *
 * What genuinely happens: the cart, contact details and fulfilment choice are
 * validated, written to the order store with a sequential reference
 * (PZO-YYYY-####) and the visitor is redirected to the confirmation page.
 *
 * What deliberately does not happen: no payment is taken, no card details are
 * collected, and no "paid" or "confirmed" status is invented. The order status
 * is "received" until a member of the team confirms the quotation with the
 * customer.
 */
export async function placeOrderAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const cart = await getCart(false);

  if (cart.items.length === 0) {
    return {
      status: "error",
      message: "Your cart is empty, so there is nothing to submit yet.",
    };
  }

  const parsed = checkoutSchema.safeParse({
    fullName: str(formData, "fullName"),
    companyName: str(formData, "companyName"),
    email: str(formData, "email"),
    phone: str(formData, "phone"),
    fulfilment: str(formData, "fulfilment") || "collection",
    addressLine1: str(formData, "addressLine1"),
    addressLine2: str(formData, "addressLine2"),
    city: str(formData, "city"),
    governorate: str(formData, "governorate"),
    requiredDate: str(formData, "requiredDate"),
    notes: str(formData, "notes"),
    terms: bool(formData, "terms"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  const data = parsed.data;
  const totals = computeTotals(cart);
  const reference = await nextReference();

  const order: OrderRecord = {
    reference,
    createdAt: new Date().toISOString(),
    status: "received",
    paymentStatus: "not-collected",
    contact: {
      fullName: data.fullName,
      companyName: data.companyName || undefined,
      email: data.email,
      phone: data.phone,
    },
    fulfilment: {
      method: data.fulfilment,
      address:
        data.fulfilment === "delivery"
          ? {
              line1: String(data.addressLine1 ?? ""),
              line2: data.addressLine2 ? String(data.addressLine2) : undefined,
              city: String(data.city ?? ""),
              governorate: String(data.governorate ?? ""),
            }
          : undefined,
      requiredDate: data.requiredDate || undefined,
    },
    items: cart.items,
    totals: {
      subtotal: totals.subtotal,
      requiresQuotation: totals.requiresQuotation,
      unitCount: totals.unitCount,
    },
    notes: data.notes || undefined,
    termsAcceptedAt: new Date().toISOString(),
    source: "website-checkout",
  };

  await saveRecord("orders", reference, order);
  await rememberOrderReference(reference);
  await clearCartSession();

  revalidatePath("/", "layout");

  redirect(`/orders/${reference}`);
}
