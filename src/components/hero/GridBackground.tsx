import React from "react";
import { useThemeContext } from "@/contexts/ThemeContext";
import { COLORS } from "@/lib/constants";

interface GridBackgroundProps {
  gridSize?: string;
}

/**
 * Componente de fondo con grid blueprint
 */
export function GridBackground({
  gridSize = "20px 20px",
}: GridBackgroundProps) {
  const { theme } = useThemeContext();
  const colors = COLORS[theme];
  const gridColor =
    theme === "dark" ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.25)";
  const opacity = theme === "dark" ? "opacity-20" : "opacity-20";

  return (
    <div className={`absolute inset-0 ${opacity}`}>
      <div
        className="h-full w-full"
        style={{
          backgroundImage: `
            linear-gradient(${gridColor} 1px, transparent 1px),
            linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: gridSize,
        }}
      />
    </div>
  );
}
