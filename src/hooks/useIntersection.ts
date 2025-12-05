import { useEffect, useState } from "react";
import { debounce } from "@/lib/utils";

interface MousePosition {
  x: number;
  y: number;
}

interface MouseTrackingOptions {
  maxTilt?: number;
  smoothing?: number;
}

/**
 * Hook para trackear la posición del mouse y calcular tilt (inclinación)
 * Útil para efectos parallax y perspectiva
 */
export function useMouseTracking(
  options: MouseTrackingOptions = {}
): [MousePosition, (e: React.MouseEvent<HTMLDivElement>) => void, () => void] {
  const { maxTilt = 20, smoothing = 300 } = options;
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  const handleMouseMove = debounce((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * maxTilt;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * maxTilt;
    setMousePosition({ x, y });
  }, smoothing / 10);

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return [mousePosition, handleMouseMove, handleMouseLeave];
}
