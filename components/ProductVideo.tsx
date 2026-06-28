"use client";

import { useDeviceType } from "@/hooks/useDeviceType";
import { useVideoPlayback } from "@/hooks/useVideoPlayback";
import { useMobileVideoPlayback } from "@/hooks/useMobileVideoPlayback";
import type { ProductMedia as ProductMediaType } from "@/lib/products/types";

interface ProductVideoProps {
  media: ProductMediaType;
  className?: string;
}

/**
 * ProductVideo
 * Renders video with device-appropriate playback control
 * 
 * Desktop: hover-based playback
 * Mobile: scroll-based autoplay (Instagram-like)
 */
export function ProductVideo({
  media,
  className = "",
}: ProductVideoProps) {
  const deviceType = useDeviceType();

  // Desktop: use hover controller
  const desktopPlayback = useVideoPlayback();

  // Mobile: use scroll controller
  const mobilePlayback = useMobileVideoPlayback();

  // Choose which refs to use based on device
  const videoRef =
    deviceType === "mobile" ? mobilePlayback.videoRef : desktopPlayback.videoRef;
  const containerRef = deviceType === "mobile" ? mobilePlayback.containerRef : null;

  const videoElement = (
    <video
      ref={videoRef}
      className={`w-full h-full object-cover ${className}`}
      muted
      playsInline
      loop
      preload="metadata"
    >
      <source src={media.url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );

  // Mobile: wrap in container for scroll detection
  if (deviceType === "mobile" && containerRef) {
    return <div ref={containerRef}>{videoElement}</div>;
  }

  // Desktop: no wrapper needed
  return videoElement;
}

