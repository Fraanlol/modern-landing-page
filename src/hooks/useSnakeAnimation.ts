import { useEffect, useState } from "react";

type Pos = { x: number; y: number };

/**
 * Hook that creates a "snake" animation effect.
 * Returns a mounted state (mounted)
 * and the animated light position (snakePosition).
 * @param duration duration in ms of the initial animation cycle (default 3000)
 */
export default function useSnakeAnimation(duration = 3000) {
  const [mounted, setMounted] = useState(false);
  const [snakePosition, setSnakePosition] = useState<Pos>({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);

    let startTime: number | null = null;
    let isAnimating = true;
    const DURATION = duration;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / DURATION, 1);

      if (isAnimating && progress < 1) {
        const eased =
          progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        const frame = eased * Math.PI * 2;
        const x = Math.sin(frame) * 40;
        const y = Math.cos(frame * 0.5) * 30;
        setSnakePosition({ x, y });
        requestAnimationFrame(animate);
      } else if (progress >= 1) {
        const finalFrame = Math.PI * 2;
        const finalX = Math.sin(finalFrame) * 40;
        const finalY = Math.cos(finalFrame * 0.5) * 30;
        setSnakePosition({ x: finalX, y: finalY });
        isAnimating = false;
      }
    };

    const animationId = requestAnimationFrame(animate);
    return () => {
      isAnimating = false;
      cancelAnimationFrame(animationId);
    };
  }, [duration]);

  return { mounted, snakePosition } as const;
}
