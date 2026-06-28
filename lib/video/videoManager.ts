/**
 * VideoPlaybackManager
 * Core video playback control
 * Ensures only one video plays at a time
 * 
 * This is a simple manager - controllers decide WHEN to play/pause
 */

type VideoRef = { current: HTMLVideoElement | null };

class VideoPlaybackManager {
  private registeredVideos: Map<string, VideoRef> = new Map();
  private currentlyPlayingId: string | null = null;
  private listeners: Set<() => void> = new Set();

  /**
   * Register a video element
   */
  register(id: string, ref: VideoRef): void {
    this.registeredVideos.set(id, ref);
  }

  /**
   * Unregister a video element
   */
  unregister(id: string): void {
    if (this.currentlyPlayingId === id) {
      const video = this.registeredVideos.get(id);
      if (video?.current) {
        video.current.pause();
        video.current.currentTime = 0;
      }
      this.currentlyPlayingId = null;
      this.notifyListeners();
    }
    this.registeredVideos.delete(id);
  }

  /**
   * Play a video - pauses all others
   */
  play(id: string): void {
    const video = this.registeredVideos.get(id);
    if (!video?.current) return;

    // Pause all others
    this.pauseAll();

    // Play this video
    this.currentlyPlayingId = id;
    video.current.play().catch(() => {
      // Autoplay may be blocked by browser
    });
    this.notifyListeners();
  }

  /**
   * Pause a specific video
   */
  pause(id: string): void {
    const video = this.registeredVideos.get(id);
    if (!video?.current) return;

    video.current.pause();
    video.current.currentTime = 0;

    if (this.currentlyPlayingId === id) {
      this.currentlyPlayingId = null;
      this.notifyListeners();
    }
  }

  /**
   * Pause all videos
   */
  pauseAll(): void {
    this.registeredVideos.forEach((video) => {
      if (video.current && !video.current.paused) {
        video.current.pause();
        video.current.currentTime = 0;
      }
    });
    if (this.currentlyPlayingId !== null) {
      this.currentlyPlayingId = null;
      this.notifyListeners();
    }
  }

  /**
   * Check if a video is currently playing
   */
  isPlaying(id: string): boolean {
    return this.currentlyPlayingId === id;
  }

  /**
   * Get currently playing video ID
   */
  getCurrentlyPlayingId(): string | null {
    return this.currentlyPlayingId;
  }

  /**
   * Subscribe to playback changes
   */
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notify listeners of state changes
   */
  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener());
  }
}

// Singleton instance
export const videoPlaybackManager = new VideoPlaybackManager();
