"use client";

import { useRef, useEffect, useMemo } from "react";
import { videoPlaybackManager } from "@/lib/video/videoManager";
import { desktopPlaybackController } from "@/lib/video/desktopController";

interface UseVideoPlaybackOptions {
  onPlay?: () => void;
  onPause?: () => void;
}

/**
 * Hook for basic video playback registration
 * Desktop: registers with hover controller
 * Handles mounting/unmounting registration
 */
export function useVideoPlayback(options: UseVideoPlaybackOptions = {}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoIdRef = useRef<string>("");

  // Generate unique ID
  useMemo(() => {
    videoIdRef.current = `video-${Math.random().toString(36).slice(2, 11)}`;
  }, []);

  // Register/unregister on mount/unmount
  useEffect(() => {
    const videoId = videoIdRef.current;

    // Register with main manager
    videoPlaybackManager.register(videoId, videoRef);

    // Register with desktop hover controller
    desktopPlaybackController.registerForHover(videoId, videoRef);

    return () => {
      videoPlaybackManager.unregister(videoId);
      desktopPlaybackController.unregisterFromHover(videoId);
    };
  }, []);

  return {
    videoRef,
  };
}
