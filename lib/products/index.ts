/**
 * Product system
 * Complete product management system for Instagram-like gallery
 */

// Types
export type {
  Product,
  ProductMetadata,
  ProductMedia,
  Category,
  ProductFilterOptions,
  MediaType,
  FileFormat,
} from "./types";

// Loader
export {
  loadAllProducts,
  loadProductById,
  loadProductBySlug,
  clearProductCache,
} from "./loader";

// Mapper
export {
  extractCategories,
  extractTags,
  groupByCategory,
  formatMetadata,
} from "./mapper";

// Filters (for use with arrays)
export {
  filterProducts,
  getLimitedProducts,
} from "./filters";

// Utils
export {
  isValidProduct,
  getMediaTypeLabel,
  formatPrice,
  getProductUrl,
  getCategoryUrl,
  isLowStock,
  isOutOfStock,
  getStockStatus,
  getBreadcrumbs,
  getCategoryName,
} from "./utils";

// Integration (server-only utilities)
export {
  getFeaturedProducts,
  getProductsByCategory,
  getCategoryPreview,
  getCategoriesWithCounts,
  getRandomProducts,
  searchProducts,
} from "./integration";
