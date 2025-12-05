import React from "react";
import { cn } from "@/lib/utils";
import { COLORS } from "@/lib/constants";
import { useThemeContext } from "@/contexts/ThemeContext";

interface StatBadgeProps {
  value: string;
  label: string;
  gradient: string;
  isVisible: boolean;
}

/**
 * Badge de estadística con efecto glassmorphism
 */
export function StatBadge({
  value,
  label,
  gradient,
  isVisible,
}: StatBadgeProps) {
  const { theme } = useThemeContext();
  const colors = COLORS[theme];
  const statsBg = colors.hero?.statsBg || colors.surface.glass;
  const statsBorder = colors.hero?.statsBorder || colors.border.light;
  const statsLabel =
    theme === "light"
      ? (colors.text as any).statsLabel || colors.text.secondary
      : colors.text.secondary;

  return (
    <div className="relative group w-[200px] sm:w-[250px] lg:w-auto">
      {/* Badge con glassmorphism */}
      <div
        className={cn(
          `relative backdrop-blur-md ${statsBg} border ${statsBorder}`,
          "rounded-full px-5 py-2.5 sm:px-6 sm:py-3",
          `transition-all duration-300 hover:${colors.surface.glassStrong} hover:${colors.border.medium}`
        )}
      >
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Valor con gradiente */}
          <span
            className={cn(
              "text-xl sm:text-2xl font-bold",
              "bg-clip-text text-transparent bg-linear-to-r",
              gradient
            )}
          >
            {value}
          </span>

          {/* Separador vertical */}
          <div className={`w-px h-6 ${colors.border.medium}`} />

          {/* Label */}
          <span
            className={`text-sm sm:text-base ${statsLabel} font-medium whitespace-nowrap`}
          >
            {label}
          </span>
        </div>
      </div>

      {/* Glow en hover (solo desktop) */}
      <div
        className={cn(
          "absolute inset-0 rounded-full bg-linear-to-r",
          gradient,
          "opacity-0 group-hover:opacity-20 blur-xl",
          "transition-opacity duration-500 -z-10 hidden sm:block"
        )}
      />
    </div>
  );
}
