/**
 * Product loader
 * Discovers and loads products from public/produtos/
 */

"use server";

import { readdir, readFile } from "fs/promises";
import { extname, basename, join } from "path";
import type {
  Product,
  ProductMetadata,
  ProductMedia,
  MediaType,
  FileFormat,
} from "./types";

const PRODUCTS_DIR = join(process.cwd(), "public/produtos");

const VALID_IMAGE_FORMATS = ["jpg", "jpeg", "png", "webp"] as const;
const VALID_VIDEO_FORMATS = ["mp4"] as const;

type ValidImageFormat = (typeof VALID_IMAGE_FORMATS)[number];
type ValidVideoFormat = (typeof VALID_VIDEO_FORMATS)[number];

function isValidImageFormat(format: string): format is ValidImageFormat {
  return VALID_IMAGE_FORMATS.some((validFormat) => validFormat === format);
}

function isValidVideoFormat(format: string): format is ValidVideoFormat {
  return VALID_VIDEO_FORMATS.some((validFormat) => validFormat === format);
}

/**
 * Detect media type from file extension
 */
function getMediaType(format: string): MediaType | null {
  const lower = format.toLowerCase();
  if (isValidImageFormat(lower)) return "image";
  if (isValidVideoFormat(lower)) return "video";
  return null;
}

/**
 * Parse file format from extension
 */
function getFileFormat(ext: string): FileFormat | null {
  const format = ext.toLowerCase().substring(1); // remove leading dot
  if (
    isValidImageFormat(format) ||
    isValidVideoFormat(format)
  ) {
    return format as FileFormat;
  }
  return null;
}

/**
 * Load and validate JSON metadata file
 */
async function loadMetadata(filePath: string): Promise<ProductMetadata | null> {
  try {
    const content = await readFile(filePath, "utf-8");
    const metadata = JSON.parse(content);

    // Validate required fields (price and stock are optional)
    if (
      !metadata.id ||
      !metadata.title ||
      !metadata.slug ||
      !metadata.category ||
      metadata.featured === undefined ||
      !metadata.type ||
      !metadata.description ||
      !metadata.tags ||
      !metadata.story ||
      !metadata.cta ||
      metadata.limited === undefined
    ) {
      console.warn(`Invalid metadata in ${filePath}: missing required fields`);
      return null;
    }

    return metadata as ProductMetadata;
  } catch (error) {
    console.error(`Failed to load metadata from ${filePath}:`, error);
    return null;
  }
}

/**
 * Discover all media files and find their JSON counterparts
 */
async function discoverProducts(): Promise<Product[]> {
  try {
    const files = await readdir(PRODUCTS_DIR);

    // Group files by base name
    const filesByBaseName = new Map<string, string[]>();

    for (const file of files) {
      const ext = extname(file);
      const baseName = basename(file, ext);

      if (!filesByBaseName.has(baseName)) {
        filesByBaseName.set(baseName, []);
      }
      filesByBaseName.get(baseName)!.push(file);
    }

    // Process each group (media file + JSON)
    const products: Product[] = [];

    for (const [baseName, fileGroup] of filesByBaseName) {
      const mediaFile = fileGroup.find(
        (f) => getMediaType(extname(f).substring(1)) !== null,
      );
      const jsonFile = fileGroup.find((f) => f.endsWith(".json"));

      if (!mediaFile || !jsonFile) {
        if (mediaFile) {
          console.warn(
            `Missing JSON for media file: ${mediaFile} (expected ${baseName}.json)`,
          );
        }
        if (jsonFile) {
          console.warn(
            `Missing media file for JSON: ${jsonFile} (expected ${baseName}.mp4, .jpg, .png, .webp)`,
          );
        }
        continue;
      }

      // Load metadata
      const metadataPath = join(PRODUCTS_DIR, jsonFile);
      const metadata = await loadMetadata(metadataPath);

      if (!metadata) {
        continue;
      }

      // Build media reference
      const ext = extname(mediaFile);
      const format = getFileFormat(ext);
      const type = getMediaType(ext.substring(1));

      if (!format || !type) {
        console.warn(`Unsupported file format: ${mediaFile}`);
        continue;
      }

      const media: ProductMedia = {
        url: `/produtos/${mediaFile}`,
        type,
        format,
        valid: true,
      };

      products.push({
        metadata,
        media,
      });
    }

    return products;
  } catch (error) {
    console.error("Failed to discover products:", error);
    return [];
  }
}

/**
 * Cache for products (loaded once at build time)
 */
let cachedProducts: Product[] | null = null;

/**
 * Load all products from filesystem
 * Results are cached after first load
 */
export async function loadAllProducts(): Promise<Product[]> {
  if (cachedProducts !== null) {
    return cachedProducts;
  }

  cachedProducts = await discoverProducts();
  return cachedProducts;
}

/**
 * Load a single product by ID
 */
export async function loadProductById(id: string): Promise<Product | null> {
  const products = await loadAllProducts();
  return (
    products.find((p) => p.metadata.id === id || p.metadata.slug === id) ?? null
  );
}

/**
 * Load a single product by slug
 */
export async function loadProductBySlug(slug: string): Promise<Product | null> {
  const products = await loadAllProducts();
  return products.find((p) => p.metadata.slug === slug) ?? null;
}

/**
 * Clear the product cache (useful for development/testing)
 */
export async function clearProductCache(): Promise<void> {
  cachedProducts = null;
}
