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
 * Auto-detects and renders product media (image or video)
 * Delegates to specialized components based on media type
 */
export function ProductMedia({
  media,
  alt,
  className = "",
  priority = false,
  onHover,
}: ProductMediaProps) {
  const isVideo = media.type === "video";

  if (isVideo) {
    return (
      <ProductVideo
        media={media}
        alt={alt}
        className={className}
        onHover={onHover}
      />
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
