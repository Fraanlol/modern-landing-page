import React from "react";
import { COLORS } from "@/lib/constants";
import { useThemeContext } from "@/contexts/ThemeContext";
import { getThemedColor } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  withPulse?: boolean;
  className?: string;
}

export default function Badge({
  children,
  withPulse = false,
  className = "",
}: BadgeProps) {
  const { theme } = useThemeContext();
  const colors = COLORS[theme];
  const badgeBg = getThemedColor(
    theme,
    "hero.badgeBg",
    colors.surface.glassStrong
  );
  const badgeBorder = getThemedColor(
    theme,
    "hero.badgeBorder",
    colors.border.medium
  );

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${badgeBg} backdrop-blur-md border ${badgeBorder} ${className}`}
    >
      {withPulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
        </span>
      )}
      {children}
    </div>
  );
}
