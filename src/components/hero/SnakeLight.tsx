import React from "react";
import { cn } from "@/lib/utils";
import { useThemeContext } from "@/contexts/ThemeContext";
import { COLORS } from "@/lib/constants";

interface SnakeLightProps {
  snakePosition: { x: number; y: number };
  index: number;
}

/**
 * Componente de luz animada individual para el efecto serpenteo
 */
export function SnakeLight({ snakePosition, index }: SnakeLightProps) {
  const { theme } = useThemeContext();
  const colors = COLORS[theme];

  const configsDark = [
    {
      size: "w-96 h-96",
      opacity: "opacity-40",
      blur: "blur-3xl",
      gradient:
        "radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, rgba(168, 85, 247, 0.4) 50%, transparent 70%)",
      xMultiplier: 1,
      yMultiplier: 1,
    },
    {
      size: "w-80 h-80",
      opacity: "opacity-30",
      blur: "blur-3xl",
      gradient:
        "radial-gradient(circle, rgba(168, 85, 247, 0.8) 0%, rgba(99, 102, 241, 0.4) 50%, transparent 70%)",
      xMultiplier: -0.7,
      yMultiplier: -0.7,
    },
    {
      size: "w-64 h-64",
      opacity: "opacity-25",
      blur: "blur-2xl",
      gradient:
        "radial-gradient(circle, rgba(79, 70, 229, 0.9) 0%, rgba(139, 92, 246, 0.5) 50%, transparent 70%)",
      xMultiplier: 1.3,
      yMultiplier: 1.3,
    },
  ];

  const configsLight = [
    {
      size: "w-96 h-96",
      opacity: colors.hero?.snakeLight1Opacity || "opacity-20",
      blur: "blur-3xl",
      gradient:
        "radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, rgba(168, 85, 247, 0.15) 50%, transparent 70%)",
      xMultiplier: 1,
      yMultiplier: 1,
    },
    {
      size: "w-80 h-80",
      opacity: colors.hero?.snakeLight2Opacity || "opacity-[0.15]",
      blur: "blur-3xl",
      gradient:
        "radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 70%)",
      xMultiplier: -0.7,
      yMultiplier: -0.7,
    },
    {
      size: "w-64 h-64",
      opacity: colors.hero?.snakeLight3Opacity || "opacity-[0.12]",
      blur: "blur-2xl",
      gradient:
        "radial-gradient(circle, rgba(79, 70, 229, 0.3) 0%, rgba(139, 92, 246, 0.15) 50%, transparent 70%)",
      xMultiplier: 1.3,
      yMultiplier: 1.3,
    },
  ];

  const configs = theme === "dark" ? configsDark : configsLight;
  const config = configs[index];

  return (
    <div
      className={cn(
        "absolute rounded-full",
        config.size,
        config.opacity,
        config.blur
      )}
      style={{
        background: config.gradient,
        transform: `translate(${50 + snakePosition.x * config.xMultiplier}%, ${
          30 + snakePosition.y * config.yMultiplier
        }%)`,
        transition: "transform 0.1s linear",
      }}
    />
  );
}
