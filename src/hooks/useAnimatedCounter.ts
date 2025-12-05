import { useEffect, useState } from "react";
import { easeInOutCubic } from "@/lib/utils";

interface CounterTargets {
  [key: string]: number;
}

interface CounterOptions {
  duration?: number;
  startOnMount?: boolean;
}

/**
 * Hook para animar números desde 0 hasta valores objetivo
 * @param targets - Objeto con los valores objetivo para cada contador
 * @param options - Opciones de configuración
 * @returns Estado de los contadores y función para iniciar la animación
 */
export function useAnimatedCounter<T extends CounterTargets>(
  targets: T,
  options: CounterOptions = {}
): [T, () => void] {
  const { duration = 2000, startOnMount = true } = options;

  const [counters, setCounters] = useState<T>(
    Object.keys(targets).reduce((acc, key) => {
      acc[key as keyof T] = 0 as T[keyof T];
      return acc;
    }, {} as T)
  );

  const [shouldAnimate, setShouldAnimate] = useState(startOnMount);

  const startAnimation = () => setShouldAnimate(true);

  useEffect(() => {
    if (!shouldAnimate) return;

    const startTime = Date.now();
    let animationFrame: number;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      setCounters(
        Object.keys(targets).reduce((acc, key) => {
          acc[key as keyof T] = Math.floor(
            targets[key as keyof T] * easedProgress
          ) as T[keyof T];
          return acc;
        }, {} as T)
      );

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [shouldAnimate, targets, duration]);

  return [counters, startAnimation];
}
