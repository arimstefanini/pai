"use client";

import { formatBRL } from "@/lib/data";
import { ProductActionButtons } from "@/components/ProductActionButtons";

type Props = {
  price: number;
  priceAnchor: number;
  productName: string;
  onPurchase: () => void;
};

export function StickyBuyBar({ price, priceAnchor, productName, onPurchase }: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-200 bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.06)] backdrop-blur-md md:hidden">
      <div className="mx-auto max-w-lg space-y-2">
        <div className="flex items-center justify-between gap-2 px-1">
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-neutral-400 line-through">
              {formatBRL(priceAnchor)}
            </span>
            <span className="text-lg font-semibold text-neutral-900">
              {formatBRL(price)}
            </span>
          </div>
        </div>
        <ProductActionButtons onPurchase={onPurchase} productName={productName} compact />
      </div>
    </div>
  );
}
