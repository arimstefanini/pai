/**
 * Galeria de produtos - Instagram-like gallery
 * Loads products from the file-based CMS system
 */

import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/ProductDetailClient";
import {
  loadAllProducts,
  extractCategories,
  PRODUCT_CATEGORIES,
  type ProductCategory,
  type ProductMetadata,
} from "@/lib/products";


function isProductCategory(value: string): value is ProductCategory {
  return PRODUCT_CATEGORIES.some((category) => category === value);
}

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
  const availableCategories = new Set(extractCategories(allProducts).map((category) => category.slug));

  // Validate requested category
  const initialCategory: ProductMetadata["category"] | null =
    categoria && isProductCategory(categoria) && availableCategories.has(categoria)
      ? categoria
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
