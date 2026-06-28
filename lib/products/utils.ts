/**
 * Product utilities
 */

import type { Product, ProductMetadata, MediaType } from "./types";

/**
 * Check if a product is valid and ready to use
 */
export function isValidProduct(product: Product): boolean {
  return !!(
    product.metadata &&
    product.metadata.id &&
    product.media &&
    product.media.valid &&
    product.media.url
  );
}

/**
 * Get human-readable media type
 */
export function getMediaTypeLabel(type: MediaType): string {
  return type === "image" ? "Imagem" : "Vídeo";
}

/**
 * Format price as currency
 */
export function formatPrice(price: number, locale = "pt-BR"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Get product URL path
 */
export function getProductUrl(product: Product): string {
  return `/produto/${product.metadata.slug}`;
}

/**
 * Get category URL path
 */
export function getCategoryUrl(category: string): string {
  return `/categoria/${category}`;
}

/**
 * Check if product has low stock
 */
export function isLowStock(product: Product, threshold = 5): boolean {
  return product.metadata.stock > 0 && product.metadata.stock <= threshold;
}

/**
 * Check if product is out of stock
 */
export function isOutOfStock(product: Product): boolean {
  return product.metadata.stock <= 0;
}

/**
 * Get stock status message
 */
export function getStockStatus(
  product: Product,
): { label: string; status: "available" | "low" | "out" } {
  if (isOutOfStock(product)) {
    return {
      label: "Fora de estoque",
      status: "out",
    };
  }

  if (isLowStock(product)) {
    return {
      label: `Apenas ${product.metadata.stock} em estoque`,
      status: "low",
    };
  }

  return {
    label: `${product.metadata.stock} disponível`,
    status: "available",
  };
}

/**
 * Generate product breadcrumbs
 */
export function getBreadcrumbs(product: Product): Array<{label: string; href: string}> {
  return [
    { label: "Galeria", href: "/galeria" },
    { label: getCategoryName(product.metadata.category), href: getCategoryUrl(product.metadata.category) },
    { label: product.metadata.title, href: getProductUrl(product) },
  ];
}

/**
 * Get category display name
 */
export function getCategoryName(category: ProductMetadata["category"]): string {
  const names: Record<ProductMetadata["category"], string> = {
    casa: "Casa",
    brinquedos: "Brinquedos",
    mecanicos: "Projetos Mecânicos",
    maquetes: "Maquetes Arquitetônicas",
    rpg: "RPG",
    variados: "Variados",
  };
  return names[category] || category;
}
