"use client";

import Image from "next/image";
import type { ProductMedia as ProductMediaType } from "@/lib/products/types";

interface ProductImageProps {
  media: ProductMediaType;
  alt: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
}

/**
 * ProductImage
 * Renders optimized image with Next.js Image component
 */
export function ProductImage({
  media,
  alt,
  className = "",
  priority = false,
  fill = true,
}: ProductImageProps) {
  if (fill) {
    return (
      <Image
        src={media.url}
        alt={alt}
        className={`object-cover ${className}`}
        fill
        priority={priority}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    );
  }

  return (
    <Image
      src={media.url}
      alt={alt}
      className={`object-cover ${className}`}
      priority={priority}
      width={400}
      height={400}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    />
  );
}
