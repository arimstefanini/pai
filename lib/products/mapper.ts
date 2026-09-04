/**
 * Product data mapper
 * Converts between different product format representations
 */

import type { Product, ProductMetadata, Category } from "./types";
import {
  CATEGORY_DESCRIPTIONS,
  CATEGORY_LABELS,
  ProductCategory,
} from "./types";

/**
 * Get all unique categories from products
 */
export function extractCategories(products: Product[]): Category[] {
  const categoryMap = new Map<string, string>();

  for (const product of products) {
    const slug = product.metadata.category;
    if (!categoryMap.has(slug)) {
      categoryMap.set(slug, slug);
    }
  }

  return Array.from(categoryMap.keys())
    .map((slug) => {
      const category = slug as ProductCategory;
      return {
        slug: category,
        name: CATEGORY_LABELS[category] || slug,
        description: CATEGORY_DESCRIPTIONS[category] || "",
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get all unique tags from products
 */
export function extractTags(products: Product[]): string[] {
  const tags = new Set<string>();

  for (const product of products) {
    for (const tag of product.metadata.tags) {
      tags.add(tag);
    }
  }

  return Array.from(tags).sort();
}

/**
 * Group products by category
 */
export function groupByCategory(
  products: Product[],
): Record<string, Product[]> {
  const groups: Record<string, Product[]> = {};

  for (const product of products) {
    const category = product.metadata.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(product);
  }

  return groups;
}

/**
 * Convert metadata to display strings
 */
export function formatMetadata(metadata: ProductMetadata) {
  return {
    title: metadata.title,
    description: metadata.description,
    story: metadata.story,
    cta: metadata.cta,
    priceFormatted: typeof metadata.price === "number"
      ? new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(metadata.price)
      : "",
    stockLabel: typeof metadata.stock === "number"
      ? metadata.stock > 0
        ? `${metadata.stock} em estoque`
        : "Solicitação sob medida"
      : "Solicitação sob medida",
  };
}
