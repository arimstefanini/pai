"use client";

import { useRef, useEffect, useCallback, useMemo } from "react";
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
  const videoIdRef = useRef<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Generate unique ID
  useMemo(() => {
    videoIdRef.current = `carousel-${Math.random().toString(36).slice(2, 11)}`;
  }, []);

  // Register/unregister video
  useEffect(() => {
    const videoId = videoIdRef.current;
    videoPlaybackManager.register(videoId, videoRef);

    return () => {
      videoPlaybackManager.unregister(videoId);
    };
  }, []);

  // Setup IntersectionObserver
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= visibilityThreshold) {
          // 80%+ visible
          videoPlaybackManager.play(videoIdRef.current);
          onVisible?.();
        } else {
          // Less than 80% visible
          videoPlaybackManager.pause(videoIdRef.current);
          onHidden?.();
        }
      },
      {
        threshold: visibilityThreshold,
      }
    );

    observer.observe(containerRef.current);
    observerRef.current = observer;

    return () => {
      observer.disconnect();
    };
  }, [visibilityThreshold, onVisible, onHidden]);

  return {
    videoRef,
    containerRef,
  };
}
