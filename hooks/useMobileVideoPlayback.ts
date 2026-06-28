"use client";

import { useId, useRef, useEffect } from "react";
import { videoPlaybackManager } from "@/lib/video/videoManager";
import { mobilePlaybackController } from "@/lib/video/mobileController";

/**
 * Hook for mobile video playback with scroll-based center detection
 * Automatically plays the video closest to viewport center
 */
export function useMobileVideoPlayback() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoId = `mobile-video-${useId()}`;

  // Register/unregister on mount/unmount
  useEffect(() => {
    // Register with main manager
    videoPlaybackManager.register(videoId, videoRef);

    // Register with mobile scroll controller
    mobilePlaybackController.registerForMobile(videoId, containerRef);

    return () => {
      videoPlaybackManager.unregister(videoId);
      mobilePlaybackController.unregisterFromMobile(videoId);
    };
  }, [videoId]);

  return {
    videoRef,
    containerRef,
  };
}
