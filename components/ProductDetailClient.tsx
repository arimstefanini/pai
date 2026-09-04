"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ProductMedia } from "@/components/ProductMedia";
import { ProductPlaybackController } from "@/components/playback/ProductPlaybackController";
import { ProductActionButtons } from "@/components/ProductActionButtons";
import { StockIndicator } from "@/components/StockIndicator";
import type { Product, ProductCategory, ProductMetadata } from "@/lib/products";
import { extractCategories, formatPrice } from "@/lib/products";

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
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(() => {
    if (initialCategory) return initialCategory;
    return pathname.startsWith("/produto/") ? product.metadata.category : null;
  });

  const categories = useMemo(() => extractCategories(allProducts), [allProducts]);

  useEffect(() => {
    const rawCategory = searchParams.get("categoria");

    if (rawCategory && rawCategory !== "todos") {
      const isValidCategory = categories.some((category) => category.slug === rawCategory);
      setSelectedCategory(isValidCategory ? (rawCategory as ProductCategory) : null);
      setVisibleCount(PAGE_SIZE);
      return;
    }

    if (pathname.startsWith("/produto/")) {
      setSelectedCategory(product.metadata.category);
    } else {
      setSelectedCategory(null);
    }
    setVisibleCount(PAGE_SIZE);
  }, [categories, pathname, product.metadata.category, searchParams]);

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


  const allCategoriesHref = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("categoria");
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  }, [pathname, searchParams]);

  const getCategoryHref = useCallback(
    (category: ProductCategory) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("categoria", category);
      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams],
  );

  const getProductHref = useCallback(
    (productItem: Product) => {
      const params = new URLSearchParams(searchParams.toString());
      if (selectedCategory) {
        params.set("categoria", selectedCategory);
      } else {
        params.delete("categoria");
      }
      const query = params.toString();
      return query ? `/produto/${productItem.metadata.slug}?${query}` : `/produto/${productItem.metadata.slug}`;
    },
    [searchParams, selectedCategory],
  );

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
          <Link
            href={allCategoriesHref}
            onClick={() => applyCategoryFilter(null)}
            className={`rounded-full border px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] transition ${
              selectedCategory === null
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-900 hover:text-neutral-900"
            }`}
          >
            TODOS
          </Link>
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={getCategoryHref(category.slug)}
              onClick={() => applyCategoryFilter(category.slug)}
              className={`rounded-full border px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] transition ${
                selectedCategory === category.slug
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-900 hover:text-neutral-900"
              }`}
            >
              {category.name.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <ProductPlaybackController className="space-y-6">
        {visibleProducts.map((item, index) => (
          <article
            key={`${item.metadata.id}-${index}`}
            data-product-card-id={`${item.metadata.id}-${index}`}
            className="grid gap-4 rounded-2xl border border-neutral-200 bg-white p-4 sm:grid-cols-[1fr_1fr] sm:items-center"
          >
            {/* Media */}
            <Link href={getProductHref(item)} className="block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl ">
                <ProductMedia
                  id={`${item.metadata.id}-${index}`}
                  media={item.media}
                  label={item.metadata.title}
                />
              </div>
            </Link>

            {/* Content */}
            <div>
              <Link href={getProductHref(item)} className="block">
                <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                  {item.metadata.title}
                </h2>
              </Link>
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
      </ProductPlaybackController>

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
