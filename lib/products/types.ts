/**
 * Product system types
 * Single source of truth for product metadata and media
 */

export type MediaType = "image" | "video";

export type ImageFormat = "jpg" | "jpeg" | "png" | "webp";

export type VideoFormat = "mp4";

export enum ProductCategory {
  AVATAR = "avatar",
  TOTEM = "totem",
  MECANICOS = "mecanicos",
  MAQUETES = "maquetes",
  RPG = "rpg",
  VARIADOS = "variados",
}

export const PRODUCT_CATEGORIES = Object.values(ProductCategory) as ProductCategory[];

export type ProductCategoryValue = ProductCategory;

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  [ProductCategory.AVATAR]: "Avatar",
  [ProductCategory.TOTEM]: "Totem",
  [ProductCategory.MECANICOS]: "Projetos Mecânicos",
  [ProductCategory.MAQUETES]: "Maquetes Arquitetônicas",
  [ProductCategory.RPG]: "RPG",
  [ProductCategory.VARIADOS]: "Variados",
};

export const CATEGORY_DESCRIPTIONS: Record<ProductCategory, string> = {
  [ProductCategory.AVATAR]: "Avatares, Figure Actions, Funko Pop.",
  [ProductCategory.TOTEM]: "Letreiro, Logos, Placa de identificação, Display.",
  [ProductCategory.MECANICOS]: "Peças funcionais e soluções práticas.",
  [ProductCategory.MAQUETES]: "Modelos detalhados para visualização arquitetônica.",
  [ProductCategory.RPG]: "Torres de dados e acessórios para RPG de mesa.",
  [ProductCategory.VARIADOS]: "Itens customizados sob demanda.",
};

export function isValidProductCategory(
  value: string,
): value is ProductCategory {
  return Object.values(ProductCategory).includes(value as ProductCategory);
}

export type FileFormat = ImageFormat | VideoFormat;

/**
 * Product metadata from JSON files
 * Structure: public/produtos/produto.json
 */
export interface ProductMetadata {
  /** Unique identifier (matches filename without extension) */
  id: string;

  /** Display title */
  title: string;

  /** URL-friendly slug for routes */
  slug: string;

  /** Category for filtering and organization */
  category: ProductCategory;

  /** Whether product appears in featured sections */
  featured: boolean;

  /** Media type: image or video */
  type: MediaType;

  /** Detailed product description */
  description: string;

  /** Tags for search and categorization */
  tags: string[];

  /** Story/narrative to tell on product page */
  story: string;

  /** Call-to-action text */
  cta: string;

  /** Price in currency units */
  price?: number;

  /** Limited edition indicator */
  limited: boolean;

  /** Current stock quantity */
  stock?: number;
}

/**
 * Media file reference
 * Points to file in public/produtos/
 */
export interface ProductMedia {
  /** File path relative to public/ (e.g., "produtos/produto.mp4") */
  url: string;

  /** Media type: image or video */
  type: MediaType;

  /** File format (jpg, mp4, etc) */
  format: FileFormat;

  /** Whether media is ready to use */
  valid: boolean;
}

/**
 * Complete product object
 * Combines metadata and media
 */
export interface Product {
  /** Metadata from JSON file */
  metadata: ProductMetadata;

  /** Media file reference */
  media: ProductMedia;
}

/**
 * Category for filtering
 */
export interface Category {
  /** URL-friendly category slug */
  slug: ProductMetadata["category"];

  /** Display name */
  name: string;

  /** Description for category pages */
  description: string;
}

/**
 * Product search/filter options
 */
export interface ProductFilterOptions {
  /** Filter by category */
  category?: ProductMetadata["category"];

  /** Search query */
  search?: string;

  /** Show only featured products */
  featured?: boolean;

  /** Show only limited edition products */
  limited?: boolean;

  /** Sort order */
  sort?: "newest" | "featured" | "price-asc" | "price-desc";
}
