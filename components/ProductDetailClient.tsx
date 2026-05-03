"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useRef, useState } from "react";
import type { Product } from "@/lib/data";
import { formatBRL } from "@/lib/data";
import { ProductActionButtons } from "@/components/ProductActionButtons";
import { StickyBuyBar } from "@/components/StickyBuyBar";
import { StockIndicator } from "@/components/StockIndicator";

function storageKey(productId: string) {
  return `stock-${productId}`;
}

type Props = {
  product: Product;
  allProducts: Product[];
};

const PAGE_SIZE = 6;

function readStock(productId: string, initialStock: number) {
  if (typeof window === "undefined") return initialStock;
  const raw = sessionStorage.getItem(storageKey(productId));
  if (raw == null) return initialStock;
  const parsed = parseInt(raw, 10);
  return !Number.isNaN(parsed) && parsed >= 0 ? parsed : initialStock;
}

export function ProductDetailClient({ product, allProducts }: Props) {
  const router = useRouter();
  const [activeId, setActiveId] = useState(product.id);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const activeProduct = useMemo(
    () => allProducts.find((item) => item.id === activeId) ?? product,
    [activeId, allProducts, product],
  );

  const orderedProducts = useMemo(() => {
    const startIndex = Math.max(0, allProducts.findIndex((item) => item.id === product.id));
    const base = [...allProducts.slice(startIndex), ...allProducts.slice(0, startIndex)];
    return [...base, ...base, ...base]; // mock de feed longo para testar scroll/paginação
  }, [allProducts, product.id]);

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleProducts = useMemo(
    () => orderedProducts.slice(0, visibleCount),
    [orderedProducts, visibleCount],
  );

  const hasMore = visibleCount < orderedProducts.length;

  const key = useMemo(() => storageKey(activeProduct.id), [activeProduct.id]);

  const [stock, setStock] = useState(() => readStock(product.id, product.initialStock));

  const persist = useCallback(
    (n: number) => {
      if (typeof window !== "undefined") {
        sessionStorage.setItem(key, String(n));
      }
    },
    [key],
  );

  const handlePurchase = useCallback(() => {
    setStock((prev) => {
      const next = Math.max(0, prev - 1);
      persist(next);
      return next;
    });
    router.push(`/checkout?productId=${activeProduct.id}`);
  }, [activeProduct.id, persist, router]);

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, orderedProducts.length));
  }, [orderedProducts.length]);

  const handleScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el || !hasMore) return;
    const nearEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 140;
    if (nearEnd) loadMore();
  }, [hasMore, loadMore]);

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:px-6 md:pb-12">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <div className="space-y-4">
            <div
              ref={scrollerRef}
              onScroll={handleScroll}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2" aria-label="Carrossel de produtos"
            >
              {visibleProducts.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveId(item.id);
                    setStock(readStock(item.id, item.initialStock));
                  }}
                  className="group relative aspect-[4/3] min-w-[78%] snap-start overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-neutral-200/80 sm:min-w-[46%] lg:min-w-[38%]"
                >
                  <Image
                    src={item.images.lifestyle}
                    alt={`${item.name} — ambiente`}
                    fill
                    sizes="(max-width: 1024px) 80vw, 40vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-neutral-700 backdrop-blur-sm">
                    {item.name}
                  </span>
                  {activeProduct.id === item.id && (
                    <span className="absolute right-3 top-3 rounded-full bg-neutral-900 px-2.5 py-1 text-[11px] font-semibold text-white">
                      Ativo
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between gap-3 text-xs text-neutral-500">
              <span className="hidden sm:inline">Arraste para o lado para ver mais produtos.</span>
              <span>
                {Math.min(visibleCount, orderedProducts.length)} de {orderedProducts.length} itens (feed de teste)
              </span>
              {hasMore && (
                <button
                  type="button"
                  onClick={loadMore}
                  className="rounded-full border border-neutral-300 px-3 py-1.5 font-medium text-neutral-700 transition hover:bg-neutral-50"
                >
                  Carregar mais
                </button>
              )}
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex flex-wrap gap-2">
              {activeProduct.limitedEdition && (
                <span className="rounded-full bg-neutral-900 px-2.5 py-1 text-xs font-semibold text-white">
                  Edição limitada
                </span>
              )}
              {activeProduct.uniquePiece && (
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-900 ring-1 ring-amber-200/80">
                  Peça única
                </span>
              )}
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
              {activeProduct.name}
            </h1>
            <p className="mt-4 leading-relaxed text-neutral-600">{activeProduct.description}</p>

            <div className="mt-8 flex flex-wrap items-baseline gap-3">
              <span className="text-sm text-neutral-400 line-through">De {formatBRL(activeProduct.priceAnchor)}</span>
              <span className="text-2xl font-semibold text-neutral-900">Por {formatBRL(activeProduct.price)}</span>
            </div>

            <div className="mt-4">
              <StockIndicator count={stock} />
            </div>

            <div className="mt-8 hidden md:flex">
              <ProductActionButtons onPurchase={handlePurchase} productName={activeProduct.name} />
            </div>
          </div>
        </div>
      </div>

      <StickyBuyBar
        price={activeProduct.price}
        priceAnchor={activeProduct.priceAnchor}
        productName={activeProduct.name}
        onPurchase={handlePurchase}
      />
    </>
  );
}
