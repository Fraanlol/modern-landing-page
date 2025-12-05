"use client";

import { useState } from "react";
import useScrollThreshold from "@/hooks/useScrollThreshold";
import { COLORS } from "@/lib/constants";
import { useThemeContext } from "@/contexts/ThemeContext";
import MobileMenu from "@components/MobileMenu";
import Logo from "@components/Logo";
import NavLinks from "@components/NavLinks";
import LanguageSwitcher from "@components/LanguageSwitcher";
import ThemeSwitcher from "@components/ThemeSwitcher";
import CTAButton from "@components/CTAButton";
import { languages } from "../i18n/languages";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { theme } = useThemeContext();
  const colors = COLORS[theme];
  const scrolled = useScrollThreshold(20);

  const t = useTranslations();
  const locale = useLocale();
  const currentLanguage = locale.toUpperCase();

  const navItems = [
    { label: t("nav.index"), href: "/", type: "route" as const },
    { label: t("nav.services"), href: "#services", type: "anchor" as const },
    { label: t("nav.projects"), href: "#projects", type: "anchor" as const },
    { label: t("nav.contact"), href: "/contact", type: "route" as const },
  ];

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 
        transition-all duration-500 ease-out
        ${scrolled ? "py-3" : "py-6"}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative group">
          <div
            className={`
              absolute -inset-px bg-linear-to-r from-blue-500/30 via-purple-500/30 to-indigo-500/30 
              rounded-2xl blur-sm transition-opacity duration-500
              ${scrolled ? "opacity-100" : "opacity-0"}
            `}
          />
          <div
            className={`
              relative backdrop-blur-xl border rounded-2xl shadow-2xl
              transition-all duration-500
              ${
                scrolled
                  ? `${colors.background.secondary}/80 ${colors.border.light}`
                  : `${colors.background.secondary}/40 border-${
                      theme === "dark" ? "white" : "slate"
                    }/5`
              }
            `}
          >
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-white/5 to-transparent pointer-events-none" />

            <div className="relative px-6 py-4">
              <div className="flex items-center justify-between">
                <Logo />

                <NavLinks navItems={navItems} scrolled={scrolled} />

                <div className="hidden md:flex items-center gap-3">
                  <ThemeSwitcher />
                  <LanguageSwitcher
                    currentLanguage={currentLanguage}
                    languages={languages}
                  />
                  <CTAButton />
                </div>

                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`md:hidden p-2 rounded-lg ${colors.text.secondary} hover:${colors.text.primary} hover:${colors.surface.glass} transition-all duration-300`}
                  aria-label={
                    mobileMenuOpen ? t("aria.menu.close") : t("aria.menu.open")
                  }
                  aria-expanded={mobileMenuOpen}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    {mobileMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </div>

              <div
                className={`
                  md:hidden overflow-hidden transition-all duration-500 ease-out
                  ${
                    mobileMenuOpen
                      ? "max-h-[500px] opacity-100 mt-4"
                      : "max-h-0 opacity-0"
                  }
                `}
              >
                <MobileMenu
                  navItems={navItems}
                  languages={languages}
                  currentLanguage={currentLanguage}
                  setMobileMenuOpen={setMobileMenuOpen}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
