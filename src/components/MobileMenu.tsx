import { useTranslations } from "next-intl";
import LanguageSwitcher from "@components/LanguageSwitcher";
import ThemeSwitcher from "@components/ThemeSwitcher";
import { Link } from "@/i18n/navigation";
import { COLORS } from "@/lib/constants";
import { useThemeContext } from "@/contexts/ThemeContext";

interface MobileMenuProps {
  navItems: { label: string; href: string; type: "route" | "anchor" }[];
  languages: { code: string; name: string; flag: string }[];
  currentLanguage: string;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MobileMenu({
  navItems,
  languages,
  currentLanguage,
  setMobileMenuOpen,
}: MobileMenuProps) {
  const t = useTranslations();
  const { theme } = useThemeContext();
  const colors = COLORS[theme];

  return (
    <div className={`pt-4 pb-2 space-y-1 border-t ${colors.border.light}`}>
      {navItems.map((item, index) => {
        const className = `block px-4 py-3 text-sm font-medium ${colors.text.secondary} hover:${colors.text.primary} rounded-lg hover:${colors.surface.glass} transition-all duration-300`;
        const handleClick = () => setMobileMenuOpen(false);

        if (item.type === "route") {
          return (
            <Link
              key={index}
              href={item.href}
              onClick={handleClick}
              className={className}
            >
              {item.label}
            </Link>
          );
        }

        return (
          <a
            key={index}
            href={item.href}
            onClick={handleClick}
            className={className}
          >
            {item.label}
          </a>
        );
      })}

      {/* Selector de idioma móvil (usa componente compartido) */}
      <div className={`pt-2 pb-2 border-t ${colors.border.light} mt-2 px-4`}>
        <div className="flex items-center justify-between mb-2">
          <div
            className={`px-0 py-2 text-xs font-semibold ${colors.text.tertiary} uppercase tracking-wider`}
          >
            {t("language.title")}
          </div>
          <ThemeSwitcher />
        </div>
        <div className="mt-2">
          <LanguageSwitcher
            variant="inline"
            currentLanguage={currentLanguage}
            languages={languages}
          />
        </div>
      </div>

      {/* CTA móvil */}
      <div className="pt-2">
        <button className="w-full group/cta relative px-6 py-3 rounded-lg font-semibold text-sm text-white overflow-hidden transition-all duration-300">
          <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600" />
          <span className="relative flex items-center justify-center gap-2">
            Comenzar
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
      </div>
    </div>
  );
}
