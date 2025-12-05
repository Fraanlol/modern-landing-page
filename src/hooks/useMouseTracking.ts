import { useState } from "react";
import type React from "react";

interface MousePosition {
  x: number;
  y: number;
}

interface MouseTrackingOptions {
  maxTilt?: number;
  smoothing?: number;
}

export function useMouseTracking(
  options: MouseTrackingOptions = {}
): [MousePosition, (e: React.MouseEvent<HTMLDivElement>) => void, () => void] {
  const { maxTilt = 20 } = options;
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * maxTilt;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * maxTilt;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return [mousePosition, handleMouseMove, handleMouseLeave];
}
