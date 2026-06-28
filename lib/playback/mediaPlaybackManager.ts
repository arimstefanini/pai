export class MediaPlaybackManager {
  private videos = new Map<string, HTMLVideoElement>();

  register(id: string, video: HTMLVideoElement) {
    this.videos.set(id, video);
  }

  unregister(id: string) {
    this.pause(id);
    this.videos.delete(id);
  }

  play(id: string) {
    const video = this.videos.get(id);
    if (!video) return;

    this.pauseAll(id);
    void video.play();
  }

  pause(id: string) {
    const video = this.videos.get(id);
    if (!video) return;

    video.pause();
    video.currentTime = 0;
  }

  pauseAll(exceptId?: string) {
    this.videos.forEach((video, id) => {
      if (id === exceptId) return;
      video.pause();
      video.currentTime = 0;
    });
  }
}
