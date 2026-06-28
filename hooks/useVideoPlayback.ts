"use client";

import { useId, useRef, useEffect } from "react";
import { videoPlaybackManager } from "@/lib/video/videoManager";
import { desktopPlaybackController } from "@/lib/video/desktopController";

/**
 * Hook for basic video playback registration
 * Desktop: registers with hover controller
 * Handles mounting/unmounting registration
 */
export function useVideoPlayback() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoId = `video-${useId()}`;

  // Register/unregister on mount/unmount
  useEffect(() => {
    // Register with main manager
    videoPlaybackManager.register(videoId, videoRef);

    // Register with desktop hover controller
    desktopPlaybackController.registerForHover(videoId, videoRef);

    return () => {
      videoPlaybackManager.unregister(videoId);
      desktopPlaybackController.unregisterFromHover(videoId);
    };
  }, [videoId]);

  return {
    videoRef,
  };
}
