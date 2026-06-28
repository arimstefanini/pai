"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MediaRenderer } from "@/components/MediaRenderer";
import { ProductActionButtons } from "@/components/ProductActionButtons";
import { StockIndicator } from "@/components/StockIndicator";
import type { Product, ProductMetadata } from "@/lib/products";
import { formatPrice, getCategoryName, extractCategories } from "@/lib/products";

interface ProductDetailClientProps {
  product: Product;
  allProducts: Product[];
  initialCategory?: ProductMetadata["category"] | null;
}

const PAGE_SIZE = 5;

export function ProductDetailClient({
  product,
  allProducts,
  initialCategory = null,
}: ProductDetailClientProps) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] =
    useState<ProductMetadata["category"] | null>(initialCategory);

  const categories = useMemo(() => extractCategories(allProducts), [allProducts]);

  const filteredProducts = useMemo(
    () =>
      selectedCategory
        ? allProducts.filter((item) => item.metadata.category === selectedCategory)
        : allProducts,
    [allProducts, selectedCategory],
  );

  const orderedProducts = useMemo(() => {
    const source = filteredProducts.length > 0 ? filteredProducts : allProducts;
    const startIndex = Math.max(
      0,
      source.findIndex((item) => item.metadata.id === product.metadata.id),
    );
    const base = [...source.slice(startIndex), ...source.slice(0, startIndex)];
    return [...base, ...base, ...base, ...base]; // Loop for infinite scroll
  }, [allProducts, filteredProducts, product.metadata.id]);

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleProducts = useMemo(
    () => orderedProducts.slice(0, visibleCount),
    [orderedProducts, visibleCount],
  );

  const hasMore = visibleCount < orderedProducts.length;

  const applyCategoryFilter = useCallback(
    (category: ProductMetadata["category"] | null) => {
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
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-neutral-900 sm:text-3xl">
          Inspirações de produto
        </h1>
        <p className="mt-2 text-sm text-neutral-600">
          Explore nossa galeria de produtos personalizados.
        </p>

        {/* Category Filters */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => applyCategoryFilter(null)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              selectedCategory === null
                ? "bg-neutral-900 text-white"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            }`}
          >
            TODOS
          </button>
          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => applyCategoryFilter(category.slug)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                selectedCategory === category.slug
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              {category.name.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="space-y-6">
        {visibleProducts.map((item, index) => (
          <article
            key={`${item.metadata.id}-${index}`}
            className="grid gap-4 rounded-2xl border border-neutral-200 bg-white p-4 sm:grid-cols-[1fr_1fr] sm:items-center"
          >
            {/* Media */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100">
              <MediaRenderer
                media={item.media}
                alt={item.metadata.title}
              />
            </div>

            {/* Content */}
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                {item.metadata.title}
              </h2>
              <p className="mt-3 leading-relaxed text-neutral-600">
                {item.metadata.description}
              </p>

              <div className="mt-4 flex flex-wrap items-baseline gap-3">
                <span className="text-2xl font-semibold text-neutral-900">
                  {formatPrice(item.metadata.price)}
                </span>
              </div>

              <div className="mt-3">
                <StockIndicator product={item} />
              </div>

              <div className="mt-5">
                <ProductActionButtons
                  onPurchase={() =>
                    router.push(`/checkout?productId=${item.metadata.id}`)
                  }
                  productName={item.metadata.title}
                />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Load More Sentinel */}
      <div
        ref={sentinelRef}
        className="py-8 text-center text-sm text-neutral-500"
      >
        {hasMore ? "Carregando mais produtos..." : "Fim da galeria."}
      </div>
    </div>
  );
}
