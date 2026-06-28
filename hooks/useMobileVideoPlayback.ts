"use client";

import { useRef, useEffect, useMemo } from "react";
import { videoPlaybackManager } from "@/lib/video/videoManager";
import { mobilePlaybackController } from "@/lib/video/mobileController";

/**
 * Hook for mobile video playback with scroll-based center detection
 * Automatically plays the video closest to viewport center
 */
export function useMobileVideoPlayback() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoIdRef = useRef<string>("");

  // Generate unique ID
  useMemo(() => {
    videoIdRef.current = `mobile-video-${Math.random().toString(36).slice(2, 11)}`;
  }, []);

  // Register/unregister on mount/unmount
  useEffect(() => {
    const videoId = videoIdRef.current;

    // Register with main manager
    videoPlaybackManager.register(videoId, videoRef);

    // Register with mobile scroll controller
    mobilePlaybackController.registerForMobile(videoId, containerRef);

    return () => {
      videoPlaybackManager.unregister(videoId);
      mobilePlaybackController.unregisterFromMobile(videoId);
    };
  }, []);

  return {
    videoRef,
    containerRef,
  };
}
