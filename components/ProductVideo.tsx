"use client";

import { useVideoPlayback } from "@/hooks/useVideoPlayback";
import type { ProductMedia as ProductMediaType } from "@/lib/products/types";

interface ProductVideoProps {
  media: ProductMediaType;
  alt: string;
  className?: string;
  onHover?: (isHovering: boolean) => void;
}

/**
 * ProductVideo
 * Renders video with centralized playback control
 * Handles hover (desktop) and tap (mobile)
 */
export function ProductVideo({
  media,
  alt,
  className = "",
  onHover,
}: ProductVideoProps) {
  const { videoRef, handlers } = useVideoPlayback({
    onPlay: () => onHover?.(true),
    onPause: () => onHover?.(false),
  });

  return (
    <video
      ref={videoRef}
      className={`w-full h-full object-cover cursor-pointer ${className}`}
      muted
      playsInline
      loop
      preload="metadata"
      {...handlers}
    >
      <source src={media.url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
