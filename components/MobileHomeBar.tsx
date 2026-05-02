"use client";

import Link from "next/link";
import { getHeroFeaturedProduct } from "@/lib/data";

export function MobileHomeBar() {
  const featured = getHeroFeaturedProduct();
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-200 bg-white/95 p-3 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] backdrop-blur-md sm:hidden">
      <div className="mx-auto flex max-w-lg gap-2">
        <Link
          href="/orcamento"
          className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white transition hover:bg-neutral-800 active:scale-[0.98]"
        >
          Criar minha ideia
        </Link>
        <Link
          href={`/produto/${featured.id}`}
          className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-neutral-300 bg-white text-sm font-semibold text-neutral-900 transition hover:border-neutral-400 active:scale-[0.98]"
        >
          Comprar pronto
        </Link>
      </div>
    </div>
  );
}
