import React from "react";
import { COLORS } from "@/lib/constants";
import { useThemeContext } from "@/contexts/ThemeContext";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

export default function PrimaryButton({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: PrimaryButtonProps) {
  const { theme } = useThemeContext();
  const colors = COLORS[theme];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group relative px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg font-semibold text-sm sm:text-base ${colors.text.primary} overflow-hidden transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${className}`}
    >
      <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:from-blue-500 group-hover:to-purple-500" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-purple-400 blur-xl" />
      </div>
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}
