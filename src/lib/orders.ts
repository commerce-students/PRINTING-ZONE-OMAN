import "server-only";
import type { CartItem } from "@/lib/cart";
import { readRecord } from "@/lib/store";

export interface OrderRecord {
  reference: string;
  createdAt: string;
  /** Every order arrives as a request for confirmation — production follows the quotation. */
  status: "received";
  /**
   * This website takes no payments. The field exists so staff can record what
   * was agreed off-line once payment is configured.
   */
  paymentStatus: "not-collected";
  contact: {
    fullName: string;
    companyName?: string;
    email: string;
    phone: string;
  };
  fulfilment: {
    method: "collection" | "delivery";
    address?: {
      line1: string;
      line2?: string;
      city: string;
      governorate: string;
    };
    requiredDate?: string;
  };
  items: CartItem[];
  totals: {
    subtotal: number | null;
    requiresQuotation: boolean;
    unitCount: number;
  };
  notes?: string;
  termsAcceptedAt: string;
  source: "website-checkout";
}

export async function getOrder(reference: string): Promise<OrderRecord | null> {
  if (!/^PZO-\d{4}-\d{4}$/.test(reference)) return null;
  return readRecord<OrderRecord>("orders", reference);
}
