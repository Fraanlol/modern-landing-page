import React from "react";
import { COLORS } from "@/lib/constants";
import { useThemeContext } from "@/contexts/ThemeContext";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  hover = false,
}: GlassCardProps) {
  const { theme } = useThemeContext();
  const colors = COLORS[theme];

  return (
    <div
      className={`backdrop-blur-md ${colors.surface.glass} border ${
        colors.border.light
      } rounded-2xl ${
        hover
          ? `hover:${colors.surface.glassStrong} hover:${colors.border.medium} transition-all duration-300`
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
