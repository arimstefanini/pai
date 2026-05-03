"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { categories, type CategorySlug, type Product } from "@/lib/data";
import { formatBRL } from "@/lib/data";
import { ProductActionButtons } from "@/components/ProductActionButtons";
import { StockIndicator } from "@/components/StockIndicator";

type Props = {
  product: Product;
  allProducts: Product[];
  initialCategory?: CategorySlug | null;
};

const PAGE_SIZE = 5;

export function ProductDetailClient({ product, allProducts, initialCategory = null }: Props) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState<CategorySlug | null>(
    initialCategory,
  );

  const filteredProducts = useMemo(
    () =>
      selectedCategory
        ? allProducts.filter((item) => item.categorySlug === selectedCategory)
        : allProducts,
    [allProducts, selectedCategory],
  );

  const orderedProducts = useMemo(() => {
    const source = filteredProducts.length > 0 ? filteredProducts : allProducts;
    const startIndex = Math.max(0, source.findIndex((item) => item.id === product.id));
    const base = [...source.slice(startIndex), ...source.slice(0, startIndex)];
    return [...base, ...base, ...base, ...base]; // mock para teste de scroll infinito
  }, [allProducts, filteredProducts, product.id]);

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleProducts = useMemo(
    () => orderedProducts.slice(0, visibleCount),
    [orderedProducts, visibleCount],
  );

  const hasMore = visibleCount < orderedProducts.length;

  const applyCategoryFilter = useCallback(
    (category: CategorySlug | null) => {
      setSelectedCategory(category);
      setVisibleCount(PAGE_SIZE);
    },
    [],
  );

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, orderedProducts.length));
  }, [orderedProducts.length]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "300px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-neutral-900 sm:text-3xl">Inspirações de produto</h1>
        <p className="mt-2 text-sm text-neutral-600">
          Scroll infinito para baixo: uma imagem + texto ao lado, como você pediu.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={pathname}
            onClick={() => applyCategoryFilter(null)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              selectedCategory === null
                ? "bg-neutral-900 text-white"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            }`}
          >
            TODOS
          </Link>
          {categories
            .filter((category) => category.slug !== "variados")
            .map((category) => (
              <Link
                key={category.slug}
                href={`${pathname}?categoria=${category.slug}`}
                onClick={() => applyCategoryFilter(category.slug)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  selectedCategory === category.slug
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {category.name.toUpperCase()}
              </Link>
            ))}
        </div>
      </div>

      <div className="space-y-6">
        {visibleProducts.map((item, index) => (
          <article
            key={`${item.id}-${index}`}
            className="grid gap-4 rounded-2xl border border-neutral-200 bg-white p-4 sm:grid-cols-[1fr_1fr] sm:items-center"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100">
              <Image
                src={item.images.lifestyle}
                alt={`${item.name} — ambiente`}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">{item.name}</h2>
              <p className="mt-3 leading-relaxed text-neutral-600">{item.description}</p>

              <div className="mt-4 flex flex-wrap items-baseline gap-3">
                <span className="text-sm text-neutral-400 line-through">De {formatBRL(item.priceAnchor)}</span>
                <span className="text-2xl font-semibold text-neutral-900">Por {formatBRL(item.price)}</span>
              </div>

              <div className="mt-3">
                <StockIndicator count={item.initialStock} />
              </div>

              <div className="mt-5">
                <ProductActionButtons
                  onPurchase={() => router.push(`/checkout?productId=${item.id}`)}
                  productName={item.name}
                />
              </div>
            </div>
          </article>
        ))}
      </div>

      <div ref={sentinelRef} className="py-8 text-center text-sm text-neutral-500">
        {hasMore ? "Carregando mais produtos..." : "Fim da lista de teste."}
      </div>
    </div>
  );
}
