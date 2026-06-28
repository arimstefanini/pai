/**
 * Hook for managing video playback with IntersectionObserver
 * Ensures only one video plays at a time (Instagram-like behavior)
 */

"use client";

import { useEffect, useRef } from "react";

let currentlyPlayingRef: HTMLVideoElement | null = null;

export function useVideoAutoPlay(visibilityThreshold = 0.7) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= visibilityThreshold) {
          if (currentlyPlayingRef && currentlyPlayingRef !== videoElement) {
            currentlyPlayingRef.pause();
          }

          currentlyPlayingRef = videoElement;
          videoElement.play().catch(() => undefined);
          return;
        }

        if (currentlyPlayingRef === videoElement) {
          videoElement.pause();
          videoElement.currentTime = 0;
          currentlyPlayingRef = null;
        }
      },
      {
        threshold: [visibilityThreshold],
        rootMargin: "0px",
      },
    );

    observer.observe(videoElement);

    return () => {
      observer.unobserve(videoElement);

      if (currentlyPlayingRef === videoElement) {
        videoElement.pause();
        videoElement.currentTime = 0;
        currentlyPlayingRef = null;
      }
    };
  }, [visibilityThreshold]);

  return videoRef;
}
