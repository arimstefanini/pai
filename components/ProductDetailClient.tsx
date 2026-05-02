"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import type { Product } from "@/lib/data";
import { formatBRL } from "@/lib/data";
import { StickyBuyBar } from "@/components/StickyBuyBar";
import { ProductActionButtons } from "@/components/ProductActionButtons";
import { StockIndicator } from "@/components/StockIndicator";

function storageKey(productId: string) {
  return `stock-${productId}`;
}

type Props = { product: Product };

export function ProductDetailClient({ product }: Props) {
  const router = useRouter();
  const key = useMemo(() => storageKey(product.id), [product.id]);

  const [stock, setStock] = useState(() => {
    if (typeof window === "undefined") return product.initialStock;
    const raw = sessionStorage.getItem(key);
    if (raw == null) return product.initialStock;
    const n = parseInt(raw, 10);
    return !Number.isNaN(n) && n >= 0 ? n : product.initialStock;
  });

  const persist = useCallback(
    (n: number) => {
      if (typeof window !== "undefined") sessionStorage.setItem(key, String(n));
    },
    [key],
  );

  const handlePurchase = useCallback(() => {
    setStock((prev) => {
      const next = Math.max(0, prev - 1);
      persist(next);
      return next;
    });
    router.push(`/checkout?productId=${product.id}`);
  }, [persist, product.id, router]);

  const gallery = [
    { src: product.images.studio, label: "Estúdio", alt: `${product.name} — estúdio` },
    {
      src: product.images.lifestyle,
      label: "Ambiente",
      alt: `${product.name} — ambiente`,
    },
    {
      src: product.images.texture,
      label: "Textura",
      alt: `${product.name} — textura`,
    },
  ] as const;

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:px-6 md:pb-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="space-y-4">
            {gallery.map((g) => (
              <figure
                key={g.label}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-neutral-200/80"
              >
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-neutral-600 backdrop-blur-sm">
                  {g.label}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex flex-wrap gap-2">
              {product.limitedEdition && (
                <span className="rounded-full bg-neutral-900 px-2.5 py-1 text-xs font-semibold text-white">
                  Edição limitada
                </span>
              )}
              {product.uniquePiece && (
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-900 ring-1 ring-amber-200/80">
                  Peça única
                </span>
              )}
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 text-pretty leading-relaxed text-neutral-600">
              {product.description}
            </p>

            <div className="mt-8 flex flex-wrap items-baseline gap-3">
              <span className="text-sm text-neutral-400 line-through">
                De {formatBRL(product.priceAnchor)}
              </span>
              <span className="text-2xl font-semibold text-neutral-900">
                Por {formatBRL(product.price)}
              </span>
            </div>

            <div className="mt-4">
              <StockIndicator count={stock} />
            </div>

            <div className="mt-8 hidden md:flex">
              <ProductActionButtons onPurchase={handlePurchase} productName={product.name} />
            </div>
          </div>
        </div>
      </div>

      <StickyBuyBar
        price={product.price}
        priceAnchor={product.priceAnchor}
        productName={product.name}
        onPurchase={handlePurchase}
      />
    </>
  );
}
