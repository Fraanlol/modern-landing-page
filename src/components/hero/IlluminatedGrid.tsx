import React from "react";
import { useThemeContext } from "@/contexts/ThemeContext";
import { COLORS } from "@/lib/constants";

interface IlluminatedGridProps {
  snakePosition: { x: number; y: number };
  radius?: number;
}

/**
 * Grid iluminado que sigue la posición de la animación serpenteo
 */
export function IlluminatedGrid({
  snakePosition,
  radius = 200,
}: IlluminatedGridProps) {
  const { theme } = useThemeContext();
  const colors = COLORS[theme];
  const gridColor =
    theme === "dark" ? "rgba(99, 102, 241, 0.6)" : "rgba(99, 102, 241, 0.4)";
  const opacity =
    theme === "dark"
      ? "opacity-60"
      : colors.hero?.illuminatedGridOpacity || "opacity-40";

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div
        className={`h-full w-full ${opacity}`}
        style={{
          backgroundImage: `
            linear-gradient(${gridColor} 2px, transparent 2px),
            linear-gradient(90deg, ${gridColor} 2px, transparent 2px)
          `,
          backgroundSize: "20px 20px",
          maskImage: `radial-gradient(circle ${radius}px at ${
            50 + snakePosition.x
          }% ${30 + snakePosition.y}%, black, transparent)`,
          WebkitMaskImage: `radial-gradient(circle ${radius}px at ${
            50 + snakePosition.x
          }% ${30 + snakePosition.y}%, black, transparent)`,
        }}
      />
    </div>
  );
}
