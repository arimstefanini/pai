/**
 * Galeria de produtos - Instagram-like gallery
 * Loads products from the file-based CMS system
 */

import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/ProductDetailClient";
import {
  loadAllProducts,
  filterProducts,
  extractCategories,
  type ProductMetadata,
} from "@/lib/products";

interface GaleriaPageProps {
  searchParams: Promise<{ categoria?: string }>;
}

export default async function GaleriaPage({ searchParams }: GaleriaPageProps) {
  const { categoria } = await searchParams;

  // Load all products
  const allProducts = await loadAllProducts();

  if (allProducts.length === 0) {
    notFound();
  }

  // Get available categories
  const categories = extractCategories(allProducts);
  const validCategories = categories.map((c) => c.slug);

  // Validate requested category
  const initialCategory: ProductMetadata["category"] | null =
    categoria && validCategories.includes(categoria as any)
      ? (categoria as ProductMetadata["category"])
      : null;

  // Get first featured product or fallback to first product
  const fallbackProduct =
    allProducts.find((p) => p.metadata.featured) ?? allProducts[0];

  if (!fallbackProduct) {
    notFound();
  }

  return (
    <ProductDetailClient
      product={fallbackProduct}
      allProducts={allProducts}
      initialCategory={initialCategory}
    />
  );
}
