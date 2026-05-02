"use client";

import Link from "next/link";
import { formatBRL } from "@/lib/data";

type Props = {
  price: number;
  priceAnchor: number;
  onPurchase: () => void;
};

export function StickyBuyBar({ price, priceAnchor, onPurchase }: Props) {
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
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onPurchase}
            className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white transition hover:bg-neutral-800 active:scale-[0.98]"
          >
            Comprar agora
          </button>
          <Link
            href="/orcamento"
            className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-neutral-300 bg-white text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50 active:scale-[0.98]"
          >
            Sob medida
          </Link>
        </div>
      </div>
    </div>
  );
}
