"use client";

import { type ReactNode, useEffect, useMemo, useRef } from "react";
import { useDeviceType } from "@/hooks/useDeviceType";
import { MediaPlaybackManager } from "@/lib/playback/mediaPlaybackManager";
import { DesktopPlaybackController } from "@/components/playback/DesktopPlaybackController";
import { MobilePlaybackController } from "@/components/playback/MobilePlaybackController";

type ProductPlaybackControllerProps = {
  children: ReactNode;
  className?: string;
};

export function ProductPlaybackController({ children, className }: ProductPlaybackControllerProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const deviceType = useDeviceType();
  const manager = useMemo(() => new MediaPlaybackManager(), []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const videos = Array.from(root.querySelectorAll<HTMLVideoElement>("[data-product-video-id]"));
    videos.forEach((video) => {
      const id = video.dataset.productVideoId;
      if (id) manager.register(id, video);
    });

    return () => {
      videos.forEach((video) => {
        const id = video.dataset.productVideoId;
        if (id) manager.unregister(id);
      });
    };
  }, [children, manager]);

  return (
    <div ref={rootRef} className={className}>
      {deviceType === "desktop" ? (
        <DesktopPlaybackController rootRef={rootRef} manager={manager} />
      ) : (
        <MobilePlaybackController rootRef={rootRef} manager={manager} />
      )}
      {children}
    </div>
  );
}
