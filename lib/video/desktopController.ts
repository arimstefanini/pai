/**
 * DesktopPlaybackController
 * Manages video playback on desktop via hover events
 * 
 * Responsibilities:
 * - Listen to mouseenter/mouseleave on video elements
 * - Call manager.play() on hover
 * - Call manager.pause() on leave
 * - Never use IntersectionObserver
 */

import { videoPlaybackManager } from "./videoManager";

interface VideoElement {
  videoRef: React.RefObject<HTMLVideoElement>;
  videoId: string;
}

class DesktopPlaybackController {
  private videoElements: Map<string, VideoElement> = new Map();

  /**
   * Register a video element for hover control
   */
  registerForHover(videoId: string, videoRef: React.RefObject<HTMLVideoElement>): void {
    this.videoElements.set(videoId, { videoId, videoRef });

    // Add event listeners
    const video = videoRef.current;
    if (!video) return;

    video.addEventListener("mouseenter", () => this.handleMouseEnter(videoId));
    video.addEventListener("mouseleave", () => this.handleMouseLeave(videoId));
  }

  /**
   * Unregister a video element
   */
  unregisterFromHover(videoId: string): void {
    this.videoElements.delete(videoId);
  }

  /**
   * Handle mouse enter - play the video
   */
  private handleMouseEnter(videoId: string): void {
    videoPlaybackManager.play(videoId);
  }

  /**
   * Handle mouse leave - pause and reset
   */
  private handleMouseLeave(videoId: string): void {
    videoPlaybackManager.pause(videoId);
  }
}

// Singleton instance
export const desktopPlaybackController = new DesktopPlaybackController();
