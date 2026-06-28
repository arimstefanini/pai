/**
 * Media renderer - handles both images and videos
 * Automatically selects the appropriate component based on media type
 */

"use client";

import Image from "next/image";
import { useVideoAutoPlay } from "@/hooks/useVideoAutoPlay";
import type { ProductMedia } from "@/lib/products";

interface MediaRendererProps {
  media: ProductMedia;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function MediaRenderer({
  media,
  alt,
  className = "",
  priority = false,
}: MediaRendererProps) {
  if (media.type === "image") {
    return (
      <Image
        src={media.url}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={`object-cover ${className}`}
        priority={priority}
      />
    );
  }

  return <VideoMedia media={media} alt={alt} className={className} />;
}

/**
 * Video component with auto-play on intersection
 */
function VideoMedia({
  media,
  alt,
  className = "",
}: Omit<MediaRendererProps, "priority">) {
  const videoRef = useVideoAutoPlay();

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      loop
      preload="metadata"
      className={`w-full h-full object-cover ${className}`}
      aria-label={alt}
    >
      <source src={media.url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
