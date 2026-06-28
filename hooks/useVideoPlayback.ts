"use client";

import { useRef, useEffect, useCallback, useMemo } from "react";
import { videoPlaybackManager } from "@/lib/video/videoManager";

interface UseVideoPlaybackOptions {
  onPlay?: () => void;
  onPause?: () => void;
}

/**
 * Hook for managing video playback with centralized control
 * Handles both desktop hover and mobile touch interactions
 */
export function useVideoPlayback(options: UseVideoPlaybackOptions = {}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoIdRef = useRef<string>("");
  const isMobileRef = useRef<boolean>(false);
  const isPlayingRef = useRef<boolean>(false);

  // Generate a unique ID for this video instance
  useMemo(() => {
    videoIdRef.current = `video-${Math.random().toString(36).slice(2, 11)}`;
  }, []);

  // Register/unregister video on mount/unmount
  useEffect(() => {
    const videoId = videoIdRef.current;
    videoPlaybackManager.register(videoId, videoRef);

    return () => {
      videoPlaybackManager.unregister(videoId);
    };
  }, []);

  // Detect if device supports touch
  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      navigator.maxTouchPoints > 0;
    isMobileRef.current = isTouch;
  }, []);

  // Handle play
  const handlePlay = useCallback(() => {
    const videoId = videoIdRef.current;
    videoPlaybackManager.play(videoId);
    isPlayingRef.current = true;
    options.onPlay?.();
  }, [options]);

  // Handle pause
  const handlePause = useCallback(() => {
    const videoId = videoIdRef.current;
    videoPlaybackManager.pause(videoId);
    isPlayingRef.current = false;
    options.onPause?.();
  }, [options]);

  // Desktop: Mouse enter (play)
  const handleMouseEnter = useCallback(() => {
    if (isMobileRef.current) return;
    handlePlay();
  }, [handlePlay]);

  // Desktop: Mouse leave (pause and reset)
  const handleMouseLeave = useCallback(() => {
    if (isMobileRef.current) return;
    handlePause();
  }, [handlePause]);

  // Mobile: Touch (toggle play/pause)
  const handleTouchStart = useCallback(() => {
    if (!isMobileRef.current) return;

    if (isPlayingRef.current) {
      handlePause();
    } else {
      handlePlay();
    }
  }, [handlePlay, handlePause]);

  return {
    videoRef,
    handlers: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onTouchStart: handleTouchStart,
    },
    isPlaying: () => isPlayingRef.current,
  };
}
