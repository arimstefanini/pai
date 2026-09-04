/**
 * StockIndicator - Shows product availability status
 */

import type { Product } from "@/lib/products";
import { getStockStatus } from "@/lib/products";

interface StockIndicatorProps {
  product: Product;
}

export function StockIndicator({ product }: StockIndicatorProps) {
  const { label, status } = getStockStatus(product);

  const statusColors = {
    available: "text-green-600 bg-green-50 border-green-200",
    low: "text-amber-600 bg-amber-50 border-amber-200",
    out: "borderal-500 -neutral-200",
  };

  return (
    <p className={`text-xs font-medium px-2.5 py-1.5 rounded-lg border ${statusColors[status]}`}>
      {label}
    </p>
  );
}

