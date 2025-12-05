import React from "react";
import { COLORS } from "@/lib/constants";
import { useThemeContext } from "@/contexts/ThemeContext";

interface SectionBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionBadge({
  children,
  className = "",
}: SectionBadgeProps) {
  const { theme } = useThemeContext();
  const colors = COLORS[theme];

  return (
    <div
      className={`inline-block px-4 py-2 rounded-full border ${colors.border.medium} ${colors.surface.glass} backdrop-blur-sm scroll-reveal-scale is-visible ${className}`}
    >
      <span
        className={`text-sm font-semibold ${colors.text.secondary} uppercase tracking-wider`}
      >
        {children}
      </span>
    </div>
  );
}
