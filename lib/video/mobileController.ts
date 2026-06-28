/**
 * MobilePlaybackController
 * Manages video playback on mobile via scroll/center detection
 * 
 * Responsibilities:
 * - Maintain a single IntersectionObserver for all videos
 * - Track which videos are in viewport
 * - Find the video closest to viewport center
 * - Call manager.play() for center video
 * - Call manager.pause() when video leaves center
 */

import { videoPlaybackManager } from "./videoManager";

interface RegisteredMobileVideo {
  videoId: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
  isInViewport: boolean;
}

class MobilePlaybackController {
  private registeredVideos: Map<string, RegisteredMobileVideo> = new Map();
  private observer: IntersectionObserver | null = null;
  private rafId: number | null = null;
  private initialized = false;

  /**
   * Initialize the mobile controller
   * Creates a single IntersectionObserver for all videos
   */
  initialize(): void {
    if (this.initialized) return;
    this.initialized = true;

    // Create single observer for all videos
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoId = entry.target.getAttribute("data-video-id");
          if (!videoId) return;

          const registered = this.registeredVideos.get(videoId);
          if (registered) {
            registered.isInViewport = entry.isIntersecting;
          }
        });

        // Schedule center video update
        this.scheduleCenterVideoCheck();
      },
      {
        threshold: [0.1, 0.3, 0.5, 0.7, 0.9],
      }
    );
  }

  /**
   * Register a video for mobile control
   */
  registerForMobile(videoId: string, containerRef: React.RefObject<HTMLDivElement | null>): void {
    this.initialize();

    this.registeredVideos.set(videoId, {
      videoId,
      containerRef,
      isInViewport: false,
    });

    // Observe the container
    if (containerRef.current) {
      containerRef.current.setAttribute("data-video-id", videoId);
      this.observer?.observe(containerRef.current);
    }
  }

  /**
   * Unregister a video
   */
  unregisterFromMobile(videoId: string): void {
    const registered = this.registeredVideos.get(videoId);
    if (registered?.containerRef.current && this.observer) {
      this.observer.unobserve(registered.containerRef.current);
    }
    this.registeredVideos.delete(videoId);
  }

  /**
   * Find video closest to viewport center
   */
  private findCenterVideo(): string | null {
    const viewportCenter = window.innerHeight / 2;
    let closestId: string | null = null;
    let closestDistance = Infinity;

    this.registeredVideos.forEach((registered) => {
      if (!registered.isInViewport || !registered.containerRef.current) return;

      const rect = registered.containerRef.current.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const distance = Math.abs(elementCenter - viewportCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestId = registered.videoId;
      }
    });

    return closestId;
  }

  /**
   * Schedule center video check using RAF for performance
   */
  private scheduleCenterVideoCheck(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }

    this.rafId = requestAnimationFrame(() => {
      const centerId = this.findCenterVideo();
      const currentId = videoPlaybackManager.getCurrentlyPlayingId();

      if (centerId && centerId !== currentId) {
        videoPlaybackManager.play(centerId);
      } else if (!centerId && currentId) {
        videoPlaybackManager.pauseAll();
      }
    });
  }

  /**
   * Setup scroll listener for continuous center detection
   */
  setupScrollListener(): void {
    window.addEventListener("scroll", () => this.scheduleCenterVideoCheck(), {
      passive: true,
    });
  }
}

// Singleton instance
export const mobilePlaybackController = new MobilePlaybackController();

// Setup scroll listener on import
if (typeof window !== "undefined") {
  mobilePlaybackController.setupScrollListener();
}
