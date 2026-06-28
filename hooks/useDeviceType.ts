"use client";

import { useEffect, useState } from "react";

export type DeviceType = "desktop" | "tablet" | "mobile";

function resolveDeviceType(width: number): DeviceType {
  if (width >= 1024) return "desktop";
  if (width >= 768) return "tablet";
  return "mobile";
}

export function useDeviceType() {
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");

  useEffect(() => {
    const updateDeviceType = () => {
      setDeviceType(resolveDeviceType(window.innerWidth));
    };

    updateDeviceType();
    window.addEventListener("resize", updateDeviceType);

    return () => window.removeEventListener("resize", updateDeviceType);
  }, []);

  return deviceType;
}
