import React from "react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { COLORS } from "@/lib/constants";
import { useThemeContext } from "@/contexts/ThemeContext";

/**
 * CTA al final de la sección de proceso
 * Incluye título, descripción y botón de acción
 */
export function ProcessCTA() {
  const t = useTranslations();
  const { theme } = useThemeContext();
  const colors = COLORS[theme];

  return (
    <div className={`${colors.background.primary} py-12 md:py-20`}>
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`cta-content relative bg-linear-to-br ${
            colors.background.tertiary === "bg-slate-900"
              ? "from-blue-950/40 via-slate-950 to-slate-950"
              : "from-blue-50/40 via-white to-white"
          } rounded-2xl p-6 md:p-16 border ${colors.border.light} ${
            colors.text.primary
          } backdrop-blur-sm`}
        >
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 md:gap-12">
            <div>
              <p
                className={`${colors.text.tertiary} font-bold text-xs uppercase tracking-widest mb-3 md:mb-4`}
              >
                {t("process.cta.label")}
              </p>
              <h3 className="text-3xl md:text-5xl font-black mb-3 md:mb-4 leading-tight">
                {t("process.cta.title.line1")}
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400">
                  {t("process.cta.title.line2")}
                </span>
              </h3>
              <p
                className={`${colors.text.tertiary} text-base md:text-lg font-light`}
              >
                {t("process.cta.description")}
              </p>
            </div>

            <div className="flex items-center md:justify-end">
              <button
                className="group relative w-full md:w-auto px-6 md:px-8 py-3 md:py-5 rounded-lg md:rounded-xl bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 text-white font-bold md:font-black text-base md:text-lg hover:shadow-xl hover:shadow-blue-500/40 transition-all active:scale-95 flex items-center justify-center gap-2 md:gap-3"
                aria-label={t("aria.cta.explore")}
              >
                {t("process.cta.button")}
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
