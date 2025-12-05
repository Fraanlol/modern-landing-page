"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { languages as defaultLanguages, Language } from "@/i18n/languages";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { routing } from "@/i18n/routing";
import { COLORS } from "@/lib/constants";
import { useThemeContext } from "@/contexts/ThemeContext";

type Props = {
  currentLanguage: string;
  languages?: Language[];
  variant?: "dropdown" | "inline";
};

export default function LanguageSwitcher({
  currentLanguage,
  languages = defaultLanguages,
  variant = "dropdown",
}: Props) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations();
  const { theme } = useThemeContext();
  const colors = COLORS[theme];

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLanguageChange = (code: string) => {
    const target = code.toLowerCase();
    setOpen(false);
    buttonRef.current?.focus(); // Retornar foco al botón

    try {
      const rawPath = pathname || "/";
      const search = searchParams?.toString();
      const segments = rawPath.split("/");

      // segments[0] === "" porque la ruta comienza con "/"
      const maybeLocale = segments[1]?.toLowerCase();
      const validLocales = Array.from(routing.locales) as string[];

      let newPath: string;

      if (validLocales.includes(maybeLocale)) {
        // La URL ya contiene una localización → reemplazarla
        segments[1] = target;
        newPath = segments.join("/");
      } else {
        // La URL no tiene localización → agregarla como prefijo
        newPath = `/${target}${rawPath === "/" ? "" : rawPath}`;
      }

      if (search) newPath += `?${search}`;

      router.push(newPath);
    } catch (error) {
      // En caso de que algo falle → degradar elegantemente
      router.push(`/${code.toLowerCase()}`);
    }
  };

  // Variante en línea para móvil: mostrar todos los idiomas como botones en una fila
  if (variant === "inline") {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`
              flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg
              transition-all duration-300
              ${
                currentLanguage === lang.code
                  ? `${colors.text.primary} ${colors.surface.glassStrong} ring-1 ring-blue-400/50`
                  : `${colors.text.secondary} hover:${colors.text.primary} hover:${colors.surface.glass}`
              }
            `}
          >
            <span className="text-lg">{lang.flag}</span>
            <span>{lang.name}</span>
          </button>
        ))}
      </div>
    );
  }

  // Variante desplegable para escritorio
  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-3 py-2 text-sm font-medium ${colors.text.secondary} hover:${colors.text.primary} rounded-lg hover:${colors.surface.glass} transition-all duration-300`}
        aria-label={t("aria.language.select")}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span className="text-base">
          {languages.find((l) => l.code === currentLanguage)?.flag}
        </span>
        <span>{currentLanguage}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />

          <div className="absolute right-0 mt-2 w-48 z-40">
            <div className="absolute -inset-px bg-linear-to-r from-blue-500/30 via-purple-500/30 to-indigo-500/30 rounded-xl blur-sm" />
            <div
              className={`relative backdrop-blur-xl ${colors.background.secondary} border ${colors.border.light} rounded-xl shadow-2xl overflow-hidden`}
            >
              <div className="absolute inset-0 rounded-xl bg-linear-to-br from-white/5 to-transparent pointer-events-none" />
              <div className="relative py-2">
                {languages.map((lang, index) => (
                  <button
                    key={index}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                      currentLanguage === lang.code
                        ? `${colors.text.primary} ${colors.surface.hover}`
                        : `${colors.text.secondary} hover:${colors.text.primary} hover:${colors.surface.glass}`
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="flex-1 text-left">{lang.name}</span>
                    {currentLanguage === lang.code && (
                      <svg
                        className="w-4 h-4 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
