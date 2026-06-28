/**
 * VideoPlaybackManager
 * Centralizes video playback control across the application
 * Ensures only one video plays at a time
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
    // If this video is currently playing, stop it
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
   * Play a specific video, pausing all others
   */
  play(id: string): void {
    const video = this.registeredVideos.get(id);
    if (!video?.current) return;

    // Pause all other videos
    this.pauseAll();

    // Play the requested video
    this.currentlyPlayingId = id;
    video.current.play().catch(() => {
      // Playback may fail due to autoplay policies
      // This is expected behavior
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
   * Get the ID of the currently playing video
   */
  getCurrentlyPlayingId(): string | null {
    return this.currentlyPlayingId;
  }

  /**
   * Check if a specific video is playing
   */
  isPlaying(id: string): boolean {
    return this.currentlyPlayingId === id;
  }

  /**
   * Subscribe to playback state changes
   */
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notify all listeners of state changes
   */
  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener());
  }
}

// Singleton instance
export const videoPlaybackManager = new VideoPlaybackManager();
