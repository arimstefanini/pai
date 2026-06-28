/**
 * Dynamic product page
 * Uses the file-based CMS system for product data
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/ProductDetailClient";
import {
  loadAllProducts,
  loadProductById,
  type ProductMetadata,
} from "@/lib/products";

interface ProductPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ categoria?: string }>;
}

/**
 * Generate static params for all products
 */
export async function generateStaticParams() {
  const products = await loadAllProducts();
  return products.map((p) => ({ id: p.metadata.id }));
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await loadProductById(id);

  if (!product) {
    return { title: "Produto" };
  }

  return {
    title: product.metadata.title,
    description: product.metadata.description,
  };
}

/**
 * Product detail page
 */
export default async function ProductPage({
  params,
  searchParams,
}: ProductPageProps) {
  const { id } = await params;
  const { categoria } = await searchParams;

  // Load specific product
  const product = await loadProductById(id);
  if (!product) {
    notFound();
  }

  // Load all products
  const allProducts = await loadAllProducts();

  // Validate category
  const validCategories: ProductMetadata["category"][] = [
    "casa",
    "brinquedos",
    "mecanicos",
    "maquetes",
    "rpg",
    "variados",
  ];

  const initialCategory: ProductMetadata["category"] | null =
    categoria && validCategories.includes(categoria as any)
      ? (categoria as ProductMetadata["category"])
      : null;

  return (
    <ProductDetailClient
      product={product}
      allProducts={allProducts}
      initialCategory={initialCategory}
    />
  );
}
