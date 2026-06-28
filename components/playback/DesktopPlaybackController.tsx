"use client";

import { useEffect, type RefObject } from "react";
import type { MediaPlaybackManager } from "@/lib/playback/mediaPlaybackManager";

type DesktopPlaybackControllerProps = {
  rootRef: RefObject<HTMLElement | null>;
  manager: MediaPlaybackManager;
};

export function DesktopPlaybackController({ rootRef, manager }: DesktopPlaybackControllerProps) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-product-card-id]"));
    const cleanups = cards.map((card) => {
      const id = card.dataset.productCardId;
      if (!id) return () => undefined;

      const handleMouseEnter = () => manager.play(id);
      const handleMouseLeave = () => manager.pause(id);

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      manager.pauseAll();
    };
  }, [manager, rootRef]);

  return null;
}
