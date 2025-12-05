"use client";

import useSnakeAnimation from "@/hooks/useSnakeAnimation";
import { useMouseTracking } from "@/hooks/useMouseTracking";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTranslations } from "next-intl";
import { cn, getAnimationDelay } from "@/lib/utils";
import { GRADIENTS, TYPOGRAPHY, SPACING, COLORS } from "@/lib/constants";
import { useThemeContext } from "@/contexts/ThemeContext";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";
import Badge from "@/components/ui/Badge";
import { GridBackground } from "@/components/hero/GridBackground";
import { SnakeLight } from "@/components/hero/SnakeLight";
import { IlluminatedGrid } from "@/components/hero/IlluminatedGrid";
import { StatBadge } from "@/components/hero/StatBadge";
import { LandingSkeleton } from "@/components/hero/LandingSkeleton";

/**
 * Hero Section - Primera sección de la landing page
 * Incluye animaciones de serpenteo, efectos 3D y badges de estadísticas
 * Soporta prefers-reduced-motion y dispositivos low-end
 */
export default function Hero() {
  const t = useTranslations();
  const { theme } = useThemeContext();
  const colors = COLORS[theme];
  const shouldReduceMotion = useReducedMotion();
  const { mounted, snakePosition } = useSnakeAnimation(3000);
  const [mousePosition, handleMouseMove, handleMouseLeave] = useMouseTracking({
    maxTilt: shouldReduceMotion ? 0 : 20,
    smoothing: 300,
  });

  // Datos de estadísticas
  const stats = [
    {
      label: t("hero.stats.projects"),
      value: "500+",
      gradient: "from-blue-400 to-cyan-400",
    },
    {
      label: t("hero.stats.clients"),
      value: "200+",
      gradient: "from-purple-400 to-pink-400",
    },
    {
      label: t("hero.stats.satisfaction"),
      value: "99%",
      gradient: "from-emerald-400 to-teal-400",
    },
  ];

  return (
    <section
      className={cn(
        "relative h-full w-full overflow-hidden lg:py-12",
        colors.background.secondary,
        "bg-linear-to-br",
        colors.background.gradient.hero
      )}
    >
      {/* Grid Background con efecto blueprint */}
      <GridBackground />

      {/* Efecto de serpenteo iluminado - Solo si no hay reducción de movimiento */}
      {!shouldReduceMotion && (
        <>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[0, 1, 2].map((index) => (
              <SnakeLight
                key={index}
                snakePosition={snakePosition}
                index={index}
              />
            ))}
          </div>

          {/* Grid iluminado superpuesto */}
          <IlluminatedGrid snakePosition={snakePosition} radius={200} />
        </>
      )}

      {/* Contenido principal - Layout de 2 columnas */}
      <div
        className={cn(
          "relative z-10 flex items-start justify-center h-full px-4 sm:px-6 lg:px-8 pt-32"
        )}
      >
        <div className="max-w-7xl w-full">
          <div
            className={cn(
              "grid lg:grid-cols-[2fr_1fr]",
              SPACING.gap.large,
              "items-center"
            )}
          >
            {/* COLUMNA IZQUIERDA - Copy y CTAs */}
            <div
              className={cn(
                "text-center lg:text-left",
                "transition-all duration-1000 ease-out",
                shouldReduceMotion
                  ? "opacity-100 translate-x-0" // Sin animación para reduced motion
                  : mounted
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              )}
            >
              {/* Badge superior */}
              <Badge
                withPulse={!shouldReduceMotion}
                className={cn(
                  "mb-8 transition-all duration-700 delay-200",
                  "mx-auto lg:mx-0",
                  shouldReduceMotion
                    ? "opacity-100 translate-x-0"
                    : mounted
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                )}
              >
                <span className={cn("text-sm font-medium", colors.text.badge)}>
                  {t("hero.badge")}
                </span>
              </Badge>

              {/* Título principal */}
              <h1
                className={cn(
                  TYPOGRAPHY.heading.hero,
                  "mb-6 bg-clip-text text-transparent bg-linear-to-r",
                  theme === "light"
                    ? "from-slate-900 via-blue-800 to-purple-800"
                    : GRADIENTS.text.default,
                  shouldReduceMotion
                    ? ""
                    : "transition-all duration-700 delay-300",
                  shouldReduceMotion || mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                )}
              >
                {t("hero.title.line1")}
                <br />
                <span className={colors.text.titleHighlight}>
                  {t("hero.title.line2")}
                </span>
              </h1>

              {/* Subtítulo */}
              <p
                className={cn(
                  TYPOGRAPHY.body.large,
                  colors.text.secondary,
                  "mb-10 max-w-xl mx-auto lg:mx-0",
                  shouldReduceMotion
                    ? ""
                    : "transition-all duration-700 delay-500",
                  shouldReduceMotion || mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                )}
              >
                {t("hero.subtitle")}
              </p>

              {/* CTAs */}
              <div
                className={cn(
                  "flex flex-col sm:flex-row",
                  SPACING.gap.small,
                  "mb-12 justify-center lg:justify-start",
                  "max-w-[200px] md:max-w-full mx-auto lg:mx-0",
                  shouldReduceMotion
                    ? ""
                    : "transition-all duration-700 delay-700",
                  shouldReduceMotion || mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                )}
              >
                <PrimaryButton className="w-auto">
                  <span className="whitespace-nowrap">
                    {t("hero.cta.primary")}
                  </span>
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1"
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
                </PrimaryButton>

                <SecondaryButton className="w-auto">
                  <span className="whitespace-nowrap">
                    {t("hero.cta.secondary")}
                  </span>
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </SecondaryButton>
              </div>

              {/* Estadísticas */}
              <div
                className={cn(
                  "flex flex-wrap",
                  SPACING.gap.small,
                  "justify-center lg:justify-start",
                  shouldReduceMotion
                    ? ""
                    : "transition-all duration-700 delay-900",
                  shouldReduceMotion || mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                )}
              >
                {stats.map((stat, index) => (
                  <StatBadge
                    key={index}
                    value={stat.value}
                    label={stat.label}
                    gradient={stat.gradient}
                    isVisible={mounted}
                  />
                ))}
              </div>
            </div>

            {/* COLUMNA DERECHA - Mini Landing Page Skeleton */}
            <div
              className={cn(
                "relative",
                shouldReduceMotion
                  ? ""
                  : "transition-all duration-1000 ease-out",
                shouldReduceMotion || mounted
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              )}
              onMouseMove={shouldReduceMotion ? undefined : handleMouseMove}
              onMouseLeave={shouldReduceMotion ? undefined : handleMouseLeave}
            >
              <LandingSkeleton mousePosition={mousePosition} />
            </div>
          </div>
        </div>
      </div>

      {/* Gradiente divisor */}
      <div
        className={cn(
          `absolute bottom-0 left-0 w-full h-32 bg-linear-to-b from-transparent pointer-events-none`,
          colors.background.gradient.fade
        )}
      />
    </section>
  );
}
