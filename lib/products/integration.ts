/**
 * Integration utilities for using the product system in different parts of the app
 * Use these functions to access products from pages and components
 */

"use server";

import {
  loadAllProducts,
  filterProducts,
  extractCategories,
  type Product,
  type Category,
  type ProductMetadata,
} from "./index";

/**
 * Get featured products for homepage hero section
 */
export async function getFeaturedProducts(limit?: number): Promise<Product[]> {
  const allProducts = await loadAllProducts();
  const featured = allProducts.filter((p) => p.metadata.featured);
  return limit ? featured.slice(0, limit) : featured;
}

/**
 * Get products by category with optional limit
 */
export async function getProductsByCategory(
  category: ProductMetadata["category"],
  limit?: number,
): Promise<Product[]> {
  const allProducts = await loadAllProducts();
  const filtered = filterProducts(allProducts, { category });
  return limit ? filtered.slice(0, limit) : filtered;
}

/**
 * Get products for category preview (used in CategorySection)
 */
export async function getCategoryPreview(
  category: ProductMetadata["category"],
  limit = 3,
): Promise<Product[]> {
  return getProductsByCategory(category, limit);
}

/**
 * Get all categories with product counts
 */
export async function getCategoriesWithCounts(): Promise<
  (Category & { count: number })[]
> {
  const allProducts = await loadAllProducts();
  const categories = extractCategories(allProducts);

  return categories.map((category) => ({
    ...category,
    count: allProducts.filter((p) => p.metadata.category === category.slug)
      .length,
  }));
}

/**
 * Get random products (useful for "You might also like" sections)
 */
export async function getRandomProducts(limit = 3): Promise<Product[]> {
  const allProducts = await loadAllProducts();
  const shuffled = [...allProducts].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, limit);
}

/**
 * Search products by query
 */
export async function searchProducts(query: string): Promise<Product[]> {
  const allProducts = await loadAllProducts();
  return filterProducts(allProducts, { search: query });
}
