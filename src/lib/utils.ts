/**
 * Utility functions for common operations
 */

import { COLORS } from "./constants";
import type { Theme } from "@/hooks/useTheme";

/**
 * Combines multiple class names into a single string
 * Filters out falsy values
 */
export function cn(
  ...classes: (string | boolean | undefined | null)[]
): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Obtiene los colores correspondientes al tema actual
 */
export function getColors(theme: Theme = "dark") {
  return COLORS[theme];
}

/**
 * Obtiene un color específico del tema con fallback
 * @param theme - Tema actual ("dark" | "light")
 * @param path - Ruta del color (e.g., "hero.badgeBg", "surface.glass")
 * @param fallback - Color de fallback si no se encuentra el path
 * @returns El color encontrado o el fallback
 *
 * @example
 * const badgeBg = getThemedColor(theme, 'hero.badgeBg', colors.surface.glassStrong);
 * const toggleBorder = getThemedColor(theme, 'hero.toggleBorder', colors.border.medium);
 */
export function getThemedColor(
  theme: Theme,
  path: string,
  fallback: string
): string {
  const keys = path.split(".");
  let value: any = COLORS[theme];

  for (const key of keys) {
    value = value?.[key];
    if (!value) return fallback;
  }

  return value;
}

/**
 * Calculates animation delay based on index
 * @param index - Item index
 * @param baseDelay - Base delay in seconds
 * @param increment - Delay increment per item in seconds
 */
export function getAnimationDelay(
  index: number,
  baseDelay: number = 0,
  increment: number = 0.1
): string {
  return `${baseDelay + index * increment}s`;
}

/**
 * Formats a number with K/M suffixes
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

/**
 * Debounce function to limit execution rate
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit execution rate
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Clamps a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation between two values
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/**
 * Easing function for smooth animations
 */
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
