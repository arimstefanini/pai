/**
 * Hook for managing video playback with IntersectionObserver
 * Ensures only one video plays at a time (Instagram-like behavior)
 */

"use client";

import { useEffect, useRef, useCallback } from "react";

// Global registry to track playing videos
let currentlyPlayingRef: HTMLVideoElement | null = null;

/**
 * Custom hook for video auto-play on intersection
 * Handles play/pause based on visibility and ensures only one video plays
 *
 * @param visibilityThreshold - Percentage of video that must be visible to start playing (0-1, default 0.7)
 */
export function useVideoAutoPlay(visibilityThreshold = 0.7) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // Create observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoElement) return;

        if (entry.isIntersecting && entry.intersectionRatio >= visibilityThreshold) {
          // Stop any currently playing video
          if (currentlyPlayingRef && currentlyPlayingRef !== videoElement) {
            currentlyPlayingRef.pause();
          }

          // Play this video
          currentlyPlayingRef = videoElement;
          videoElement.play().catch((error) => {
            console.warn("Failed to autoplay video:", error);
          });
        } else {
          // Pause this video if it's the one playing
          if (currentlyPlayingRef === videoElement) {
            videoElement.pause();
            currentlyPlayingRef = null;
          }
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

      // Cleanup if this was the playing video
      if (currentlyPlayingRef === videoElement) {
        videoElement.pause();
        currentlyPlayingRef = null;
      }
    };
  }, [visibilityThreshold]);

  return videoRef;
}
