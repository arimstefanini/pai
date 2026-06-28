"use client";

import { useEffect, type RefObject } from "react";
import type { MediaPlaybackManager } from "@/lib/playback/mediaPlaybackManager";

type MobilePlaybackControllerProps = {
  rootRef: RefObject<HTMLElement | null>;
  manager: MediaPlaybackManager;
};

function getDistanceFromViewportCenter(element: Element) {
  const rect = element.getBoundingClientRect();
  const elementCenter = rect.top + rect.height / 2;
  return Math.abs(window.innerHeight / 2 - elementCenter);
}

export function MobilePlaybackController({ rootRef, manager }: MobilePlaybackControllerProps) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-product-card-id]"));
    const visibleCards = new Set<HTMLElement>();
    let activeId: string | null = null;

    const updateActiveVideo = () => {
      if (visibleCards.size === 0) {
        if (activeId) manager.pause(activeId);
        activeId = null;
        return;
      }

      const nextCard = Array.from(visibleCards).sort(
        (a, b) => getDistanceFromViewportCenter(a) - getDistanceFromViewportCenter(b),
      )[0];
      const nextId = nextCard?.dataset.productCardId ?? null;

      if (!nextId || nextId === activeId) return;

      if (activeId) manager.pause(activeId);
      manager.play(nextId);
      activeId = nextId;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const card = entry.target as HTMLElement;
          if (entry.isIntersecting) visibleCards.add(card);
          else visibleCards.delete(card);
        });

        updateActiveVideo();
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    cards.forEach((card) => observer.observe(card));
    window.addEventListener("scroll", updateActiveVideo, { passive: true });
    window.addEventListener("resize", updateActiveVideo);
    updateActiveVideo();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateActiveVideo);
      window.removeEventListener("resize", updateActiveVideo);
      manager.pauseAll();
    };
  }, [manager, rootRef]);

  return null;
}
