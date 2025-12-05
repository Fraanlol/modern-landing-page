import React from "react";
import { COLORS } from "@/lib/constants";
import { useThemeContext } from "@/contexts/ThemeContext";

interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

export default function SecondaryButton({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: SecondaryButtonProps) {
  const { theme } = useThemeContext();
  const colors = COLORS[theme];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg font-semibold text-sm sm:text-base ${colors.text.secondary} border-2 ${colors.border.strong} backdrop-blur-sm hover:${colors.surface.glass} hover:${colors.border.accent} transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${className}`}
    >
      <span className="flex items-center justify-center gap-2">{children}</span>
    </button>
  );
}
