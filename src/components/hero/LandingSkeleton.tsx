import React from "react";
import { cn, getThemedColor } from "@/lib/utils";
import { COLORS } from "@/lib/constants";
import { useThemeContext } from "@/contexts/ThemeContext";

interface LandingSkeletonProps {
  mousePosition: { x: number; y: number };
}

/**
 * Mini landing page skeleton con efecto 3D
 * Representa visualmente el concepto de diseño web
 */
export function LandingSkeleton({ mousePosition }: LandingSkeletonProps) {
  const { theme } = useThemeContext();
  const colors = COLORS[theme];

  return (
    <div
      className="relative w-full max-w-sm mx-auto transition-transform duration-300 ease-out"
      style={{
        transform: `perspective(1000px) rotateY(${
          mousePosition.x
        }deg) rotateX(${-mousePosition.y}deg)`,
      }}
    >
      {/* Borde con gradiente */}
      <div
        className={
          theme === "light"
            ? "absolute -inset-px bg-linear-to-r from-blue-400/40 via-purple-300/40 to-indigo-400/40 rounded-2xl blur-sm"
            : "absolute -inset-px bg-linear-to-r from-blue-500/50 via-purple-500/50 to-indigo-500/50 rounded-2xl blur-sm"
        }
      />

      {/* Glass Card */}
      <div
        className={`relative backdrop-blur-xl ${getThemedColor(
          theme,
          "hero.skeletonCard",
          colors.surface.glass
        )} rounded-2xl border ${getThemedColor(
          theme,
          "hero.skeletonCardBorder",
          colors.border.light
        )} shadow-2xl overflow-hidden`}
      >
        {/* Reflejos glassmorphism */}
        <div
          className={
            theme === "light"
              ? "absolute inset-0 rounded-2xl bg-linear-to-br from-white/30 to-transparent pointer-events-none"
              : "absolute inset-0 rounded-2xl bg-linear-to-br from-white/5 to-transparent pointer-events-none"
          }
        />

        <div className="relative">
          {/* Header */}
          <SkeletonHeader />

          {/* Hero Section */}
          <SkeletonHero />

          {/* Features */}
          <SkeletonFeatures />

          {/* Content */}
          <SkeletonContent />

          {/* Stats */}
          <SkeletonStats />

          {/* Footer */}
          <SkeletonFooter />
        </div>
      </div>
    </div>
  );
}

function SkeletonHeader() {
  const { theme } = useThemeContext();
  const colors = COLORS[theme];
  const skeletonBg = getThemedColor(
    theme,
    "hero.skeletonBg",
    colors.surface.glassStrong
  );

  return (
    <div className={`border-b ${colors.border.light} px-4 py-3`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-6 h-6 ${skeletonBg} rounded`} />
          <div className={`w-16 h-3 ${skeletonBg} rounded`} />
        </div>
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-8 h-2 ${skeletonBg} rounded hidden sm:block`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SkeletonHero() {
  const { theme } = useThemeContext();
  const colors = COLORS[theme];
  const skeletonBg = getThemedColor(
    theme,
    "hero.skeletonBg",
    colors.surface.glassStrong
  );
  const skeletonHighlight = getThemedColor(
    theme,
    "hero.skeletonHighlight",
    colors.surface.glass
  );
  const ctaGradient =
    theme === "light"
      ? "bg-linear-to-r from-blue-400/30 to-purple-500/30"
      : "bg-linear-to-r from-blue-500/30 to-purple-600/30";

  return (
    <div className="px-4 py-6 space-y-3">
      <div className="flex justify-center">
        <div className={`w-24 h-4 ${skeletonBg} rounded-full`} />
      </div>
      <div className="space-y-2">
        <div className={`w-3/4 h-4 ${skeletonHighlight} rounded mx-auto`} />
        <div className={`w-2/3 h-4 ${skeletonHighlight} rounded mx-auto`} />
      </div>
      <div className="space-y-1.5 pt-2">
        <div className={`w-full h-2 ${skeletonBg} rounded`} />
        <div className={`w-5/6 h-2 ${skeletonBg} rounded mx-auto`} />
      </div>
      <div className="flex justify-center pt-2">
        <div className={`w-32 h-8 ${ctaGradient} rounded-lg`} />
      </div>
    </div>
  );
}

function SkeletonFeatures() {
  const { theme } = useThemeContext();
  const colors = COLORS[theme];
  const featureBg = getThemedColor(
    theme,
    "hero.skeletonFeature",
    colors.surface.glassStrong
  );
  const featureBorder = getThemedColor(
    theme,
    "hero.skeletonCardBorder",
    colors.border.light
  );
  const skeletonBg = getThemedColor(
    theme,
    "hero.skeletonBg",
    colors.surface.glassStrong
  );

  return (
    <div className={`px-4 py-4 border-t ${colors.border.light}`}>
      <div className="grid grid-cols-6 gap-2">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`aspect-square rounded-lg ${featureBg} border ${featureBorder} p-2 flex flex-col items-center justify-center gap-1`}
          >
            <div className={`w-6 h-6 ${skeletonBg} rounded`} />
            <div className={`w-12 h-2 ${skeletonBg} rounded`} />
          </div>
        ))}
      </div>
    </div>
  );
}

function SkeletonContent() {
  const { theme } = useThemeContext();
  const colors = COLORS[theme];
  const skeletonBg = getThemedColor(
    theme,
    "hero.skeletonBg",
    colors.surface.glassStrong
  );

  return (
    <div className={`px-4 py-4 border-t ${colors.border.light} space-y-2`}>
      <div className={`w-3/4 h-3 ${skeletonBg} rounded`} />
      <div className={`w-full h-2 ${skeletonBg} rounded`} />
      <div className={`w-5/6 h-2 ${skeletonBg} rounded`} />
      <div className={`w-4/5 h-2 ${skeletonBg} rounded`} />
    </div>
  );
}

function SkeletonStats() {
  const { theme } = useThemeContext();
  const colors = COLORS[theme];
  const skeletonBg = getThemedColor(
    theme,
    "hero.skeletonBg",
    colors.surface.glassStrong
  );
  const skeletonHighlight = getThemedColor(
    theme,
    "hero.skeletonHighlight",
    colors.surface.glass
  );

  return (
    <div className={`px-4 py-4 border-t ${colors.border.light}`}>
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="text-center space-y-1">
            <div className={`w-12 h-4 ${skeletonHighlight} rounded mx-auto`} />
            <div className={`w-10 h-2 ${skeletonBg} rounded mx-auto`} />
          </div>
        ))}
      </div>
    </div>
  );
}

function SkeletonFooter() {
  const { theme } = useThemeContext();
  const colors = COLORS[theme];
  const footerBg = getThemedColor(
    theme,
    "hero.skeletonFooter",
    colors.surface.glass
  );
  const skeletonBg = getThemedColor(
    theme,
    "hero.skeletonBg",
    colors.surface.glassStrong
  );

  return (
    <div className={`px-4 py-3 border-t ${colors.border.light} ${footerBg}`}>
      <div className="flex items-center justify-between">
        <div className={`w-20 h-2 ${skeletonBg} rounded`} />
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`w-5 h-5 rounded-full ${skeletonBg}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
