import { useTranslations } from "next-intl";
import { COLORS } from "@/lib/constants";
import { useThemeContext } from "@/contexts/ThemeContext";

export default function CTAButton() {
  const t = useTranslations();
  const { theme } = useThemeContext();
  const colors = COLORS[theme];

  return (
    <button
      className={`group/cta relative px-6 py-2.5 rounded-lg font-semibold text-sm ${colors.text.primary} overflow-hidden transition-all duration-300 hover:scale-105`}
      aria-label={t("aria.cta.explore")}
    >
      <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover/cta:from-blue-500 group-hover/cta:to-purple-500" />
      <div className="absolute inset-0 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-purple-400 blur-xl" />
      </div>
      <span className="relative flex items-center gap-2">
        {t("cta.start")}
        <svg
          className="w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </span>
    </button>
  );
}
