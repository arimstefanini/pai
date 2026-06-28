"use client";

import { useId, useRef, useEffect } from "react";
import { videoPlaybackManager } from "@/lib/video/videoManager";

interface UseCarouselAutoPlayOptions {
  visibilityThreshold?: number; // 0.8 = 80% visible
  onVisible?: () => void;
  onHidden?: () => void;
}

/**
 * Hook for carousel autoplay based on visibility
 * Plays video when element is 80% visible (by default)
 */
export function useCarouselAutoPlay(
  options: UseCarouselAutoPlayOptions = {}
) {
  const { visibilityThreshold = 0.8, onVisible, onHidden } = options;
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoId = `carousel-${useId()}`;

  // Register/unregister video
  useEffect(() => {
    videoPlaybackManager.register(videoId, videoRef);

    return () => {
      videoPlaybackManager.unregister(videoId);
    };
  }, [videoId]);

  // Setup IntersectionObserver
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= visibilityThreshold) {
          // 80%+ visible
          videoPlaybackManager.play(videoId);
          onVisible?.();
        } else {
          // Less than 80% visible
          videoPlaybackManager.pause(videoId);
          onHidden?.();
        }
      },
      {
        threshold: visibilityThreshold,
      }
    );

    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, [videoId, visibilityThreshold, onVisible, onHidden]);

  return {
    videoRef,
    containerRef,
  };
}
