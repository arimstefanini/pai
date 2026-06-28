/**
 * Product filtering and search
 */

import type { Product, ProductFilterOptions } from "./types";

/**
 * Filter products based on options
 */
export function filterProducts(
  products: Product[],
  options: ProductFilterOptions = {},
): Product[] {
  let filtered = [...products];

  // Filter by category
  if (options.category) {
    filtered = filtered.filter(
      (p) => p.metadata.category === options.category,
    );
  }

  // Filter by featured
  if (options.featured !== undefined) {
    filtered = filtered.filter((p) => p.metadata.featured === options.featured);
  }

  // Filter by limited edition
  if (options.limited !== undefined) {
    filtered = filtered.filter((p) => p.metadata.limited === options.limited);
  }

  // Search by title, description, tags
  if (options.search) {
    const query = options.search.toLowerCase();
    filtered = filtered.filter((p) => {
      const title = p.metadata.title.toLowerCase();
      const description = p.metadata.description.toLowerCase();
      const tags = p.metadata.tags.map((t) => t.toLowerCase()).join(" ");
      const story = p.metadata.story.toLowerCase();

      return (
        title.includes(query) ||
        description.includes(query) ||
        tags.includes(query) ||
        story.includes(query)
      );
    });
  }

  // Apply sorting
  if (options.sort) {
    filtered = sortProducts(filtered, options.sort);
  }

  return filtered;
}

/**
 * Sort products
 */
function sortProducts(
  products: Product[],
  sort: ProductFilterOptions["sort"],
): Product[] {
  const sorted = [...products];

  switch (sort) {
    case "featured":
      // Featured first, then by ID (insertion order)
      sorted.sort((a, b) => {
        if (a.metadata.featured !== b.metadata.featured) {
          return b.metadata.featured ? 1 : -1;
        }
        return 0;
      });
      break;

    case "price-asc":
      sorted.sort((a, b) => a.metadata.price - b.metadata.price);
      break;

    case "price-desc":
      sorted.sort((a, b) => b.metadata.price - a.metadata.price);
      break;

    case "newest":
    default:
      // Keep original order (insertion order)
      break;
  }

  return sorted;
}

/**
 * Search products
 */
export function searchProducts(
  products: Product[],
  query: string,
): Product[] {
  return filterProducts(products, { search: query });
}

/**
 * Get featured products
 */
export function getFeaturedProducts(products: Product[]): Product[] {
  return filterProducts(products, { featured: true });
}

/**
 * Get limited edition products
 */
export function getLimitedProducts(products: Product[]): Product[] {
  return filterProducts(products, { limited: true });
}
