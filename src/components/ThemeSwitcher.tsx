"use client";

import { Moon, Sun } from "lucide-react";
import { useThemeContext } from "@/contexts/ThemeContext";
import { COLORS } from "@/lib/constants";
import { useTranslations } from "next-intl";

export default function ThemeSwitcher() {
  const t = useTranslations();
  const { theme, toggleTheme } = useThemeContext();
  const colors = COLORS[theme];
  const toggleBg = colors.hero?.toggleBg || colors.surface.glass;
  const toggleBorder = colors.hero?.toggleBorder || colors.border.medium;
  const toggleIcon = colors.hero?.toggleIcon || colors.text.secondary;

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg ${toggleBg} border ${toggleBorder} ${toggleIcon} hover:${colors.text.primary} transition-all duration-300 relative group`}
      aria-label={
        theme === "dark"
          ? t("aria.theme.switchToLight")
          : t("aria.theme.switchToDark")
      }
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-lg transition-all duration-300" />

      <div className="relative">
        {theme === "dark" ? (
          <Sun
            className="w-5 h-5 transition-transform group-hover:rotate-45 duration-300"
            aria-hidden="true"
          />
        ) : (
          <Moon
            className="w-5 h-5 transition-transform group-hover:-rotate-12 duration-300"
            aria-hidden="true"
          />
        )}
      </div>
    </button>
  );
}
