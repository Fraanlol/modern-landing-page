import { useTranslations } from "next-intl";
import { COLORS } from "@/lib/constants";
import { useThemeContext } from "@/contexts/ThemeContext";

export default function Logo() {
  const t = useTranslations();
  const { theme } = useThemeContext();
  const colors = COLORS[theme];

  return (
    <a href="#" className="flex items-center gap-3 group/logo">
      <div className="relative">
        <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl blur opacity-50 group-hover/logo:opacity-75 transition-opacity duration-300" />
        <div className="relative w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover/logo:scale-110">
          <svg
            className={`w-6 h-6 ${colors.text.primary}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
      </div>

      <div className="hidden sm:block">
        <div
          className={`text-lg font-bold bg-clip-text text-transparent bg-linear-to-r ${
            theme === "dark"
              ? "from-white to-blue-200"
              : "from-slate-900 to-blue-600"
          } transition-all duration-300`}
        >
          {t("brand.name")}
        </div>
      </div>
    </a>
  );
}
