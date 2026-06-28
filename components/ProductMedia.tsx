"use client";

import { ProductVideo } from "@/components/ProductVideo";
import { ProductImage } from "@/components/ProductImage";
import type { ProductMedia as ProductMediaType } from "@/lib/products/types";

interface ProductMediaProps {
  media: ProductMediaType;
  alt: string;
  className?: string;
  priority?: boolean;
  onHover?: (isHovering: boolean) => void;
}

/**
 * ProductMedia
 * Dispatches to correct renderer based on media type
 * Does not contain playback logic
 */
export function ProductMedia({
  media,
  alt,
  className = "",
  priority = false,
  onHover,
}: ProductMediaProps) {
  if (media.type === "video") {
    return (
      <ProductVideo media={media} alt={alt} className={className} onHover={onHover} />
    );
  }

  return (
    <ProductImage
      media={media}
      alt={alt}
      className={className}
      priority={priority}
    />
  );
}
