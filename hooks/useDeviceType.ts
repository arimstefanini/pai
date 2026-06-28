"use client";

import { useState, useEffect } from "react";

export type DeviceType = "desktop" | "mobile";

/**
 * Hook to detect device type
 * Returns "desktop" or "mobile" based on touch support
 */
export function useDeviceType(): DeviceType {
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");

  useEffect(() => {
    // Detect touch support
    const isTouch = navigator.maxTouchPoints > 0;
    setDeviceType(isTouch ? "mobile" : "desktop");
  }, []);

  return deviceType;
}
