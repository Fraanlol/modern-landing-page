import React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { ProcessStepData } from "@/lib/types";
import { COLORS } from "@/lib/constants";
import { useThemeContext } from "@/contexts/ThemeContext";

interface ProcessCardProps {
  step: ProcessStepData;
  index: number;
}

/**
 * Tarjeta de proceso individual con glassmorphism
 * Incluye título, descripción, puntos clave y tiempo estimado
 */
export function ProcessCard({ step, index }: ProcessCardProps) {
  const t = useTranslations();
  const { theme } = useThemeContext();
  const colors = COLORS[theme];

  return (
    <div className="process-card absolute inset-0 w-full">
      <div
        className={cn(
          "h-full p-6 md:p-8 rounded-2xl border",
          colors.background.primary,
          "backdrop-blur-md",
          "flex flex-col justify-between",
          "shadow-2xl",
          step.bgColor,
          step.borderColor
        )}
      >
        {/* Top Section */}
        <div>
          <div className="flex items-start justify-between mb-4 md:mb-6">
            <div>
              <span
                className={`text-sm font-bold uppercase tracking-widest ${colors.text.tertiary} block mb-2 md:mb-3`}
              >
                {step.number}
              </span>
              <h3
                className={`text-2xl md:text-4xl font-black ${colors.text.primary} mb-3 md:mb-4`}
              >
                {t(`process.steps.${index}.title`)}
              </h3>
            </div>
            <div className="text-4xl md:text-5xl step-icon">{step.icon}</div>
          </div>

          <p
            className={`${colors.text.secondary} text-sm md:text-base font-light leading-relaxed mb-4 md:mb-6 max-w-lg`}
          >
            {t(`process.steps.${index}.description`)}
          </p>

          {/* Key Points */}
          <div className="space-y-2 md:space-y-3">
            {[0, 1, 2].map((i) => {
              const point = t(`process.steps.${index}.points.${i}`);
              if (!point) return null;
              return (
                <div key={i} className="flex items-center gap-2 md:gap-3">
                  <CheckCircle2
                    className={`w-4 h-4 md:w-5 md:h-5 ${colors.text.tertiary} shrink-0`}
                  />
                  <span
                    className={`${colors.text.secondary} text-xs md:text-sm`}
                  >
                    {point}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className={`flex items-center justify-between pt-4 md:pt-6 border-t ${colors.border.light} mt-4 md:mt-0`}
        >
          <span
            className={cn(
              "text-xs font-bold px-3 py-1 rounded-full",
              `bg-linear-to-r bg-opacity-10 ${colors.text.secondary}`,
              step.color
            )}
          >
            ⏱️ {t(`process.steps.${index}.time`)}
          </span>
          <ArrowRight
            className={`w-4 h-4 md:w-5 md:h-5 ${colors.text.tertiary}`}
          />
        </div>
      </div>
    </div>
  );
}
