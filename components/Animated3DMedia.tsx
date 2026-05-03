"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Animated3DMediaProps = {
  webmSrc: string;
  mp4Src: string;
  posterLabel?: string;
  maxDurationSeconds?: number;
  className?: string;
};

function supportsWebmPlayback() {
  if (typeof document === "undefined") {
    return false;
  }

  const video = document.createElement("video");
  return video.canPlayType('video/webm; codecs="vp9"') !== "";
}

function likelySafari() {
  if (typeof navigator === "undefined") {
    return false;
  }

  const ua = navigator.userAgent;
  return /Safari/i.test(ua) && !/Chrome|Chromium|Edg|OPR/i.test(ua);
}

export function Animated3DMedia({
  webmSrc,
  mp4Src,
  posterLabel = "Animação 3D",
  maxDurationSeconds = 30,
  className = "",
}: Animated3DMediaProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [useWebm, setUseWebm] = useState(false);

  useEffect(() => {
    // Safari costuma não renderizar alpha em WebM de forma consistente.
    setUseWebm(supportsWebmPlayback() && !likelySafari());
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const resetAtLimit = () => {
      if (video.currentTime >= maxDurationSeconds) {
        video.currentTime = 0;
      }
    };

    video.addEventListener("timeupdate", resetAtLimit);
    return () => video.removeEventListener("timeupdate", resetAtLimit);
  }, [maxDurationSeconds]);

  const sourceType = useMemo(
    () => (useWebm ? "video/webm" : "video/mp4"),
    [useWebm],
  );
  const source = useMemo(() => (useWebm ? webmSrc : mp4Src), [mp4Src, useWebm, webmSrc]);

  return (
    <div className={`relative w-full ${className}`}>
      <video
        ref={videoRef}
        className="block h-auto w-full"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={posterLabel}
      >
        <source src={source} type={sourceType} />
        Seu navegador não suporta vídeo HTML5.
      </video>
      {!useWebm && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-3 py-2 text-xs text-neutral-600">
          Modo compatível ativo (MP4)
        </div>
      )}
    </div>
  );
}
