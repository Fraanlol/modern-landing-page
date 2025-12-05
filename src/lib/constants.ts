/**
 * Design System Constants
 * Centraliza valores hardcodeados para facilitar cambios y mantener consistencia
 */

// ANIMATIONS
export const ANIMATION_DURATIONS = {
  fast: 200,
  normal: 300,
  slow: 500,
  slower: 700,
  slowest: 1000,
} as const;

export const ANIMATION_DELAYS = {
  none: 0,
  short: 200,
  medium: 500,
  long: 700,
  veryLong: 900,
} as const;

// SPACING
export const SPACING = {
  section: {
    py: "py-20",
    pyLarge: "py-32",
  },
  container: {
    maxWidth: "max-w-7xl",
    maxWidthNarrow: "max-w-6xl",
    px: "px-6",
  },
  gap: {
    small: "gap-3 sm:gap-4",
    medium: "gap-6",
    large: "gap-8 lg:gap-12",
  },
} as const;

// COLOR PALETTE
export const COLORS = {
  dark: {
    background: {
      primary: "bg-black",
      secondary: "bg-slate-950",
      tertiary: "bg-slate-900",
      gradient: {
        hero: "bg-linear-to-br from-slate-950 via-blue-950 to-slate-900",
        fade: "bg-linear-to-b from-transparent to-slate-950",
        section: "bg-linear-to-b from-slate-950 via-blue-950 to-slate-950",
        radial:
          "bg-[radial-gradient(circle_at_50%_-20%,rgba(139,92,246,0.06),transparent_85%)]",
      },
    },
    text: {
      primary: "text-white",
      secondary: "text-gray-300",
      tertiary: "text-gray-400",
      muted: "text-gray-500",
      badge: "text-blue-100",
      titleHighlight: "text-blue-300",
      statsLabel: "text-gray-300",
    },
    border: {
      light: "border-white/10",
      medium: "border-white/20",
      strong: "border-white/30",
      accent: "border-white/40",
    },
    surface: {
      glass: "bg-white/5",
      glassStrong: "bg-white/10",
      overlay: "bg-black/50",
      hover: "bg-white/10",
    },
    hero: {
      gridOpacity: "opacity-20",
      snakeLight1Opacity: "opacity-40",
      snakeLight2Opacity: "opacity-30",
      snakeLight3Opacity: "opacity-25",
      illuminatedGridOpacity: "opacity-60",
      badgeBg: "bg-white/10",
      badgeBorder: "border-white/20",
      statsBg: "bg-white/5",
      statsBorder: "border-white/10",
      skeletonBg: "bg-white/10",
      skeletonHighlight: "bg-white/5",
      skeletonCard: "bg-white/5",
      skeletonCardBorder: "border-white/10",
      skeletonFooter: "bg-white/5",
      skeletonFeature: "bg-white/5",
      toggleBg: "bg-white/10",
      toggleBorder: "border-white/20",
      toggleIcon: "text-white",
    },
  },
  light: {
    background: {
      primary: "bg-gray-100",
      secondary: "bg-gray-200",
      tertiary: "bg-slate-300",
      gradient: {
        hero: "bg-linear-to-br from-gray-100 via-slate-200 to-gray-100",
        section: "bg-linear-to-b from-gray-100 via-slate-200 to-gray-100",
        fade: "bg-linear-to-b from-transparent to-gray-100",
        radial:
          "bg-[radial-gradient(circle_at_50%_-20%,rgba(59,130,246,0.08),transparent_85%)]",
      },
    },
    text: {
      primary: "text-slate-900",
      secondary: "text-slate-700",
      tertiary: "text-slate-600",
      muted: "text-slate-500",
      badge: "text-blue-700",
      titleHighlight: "text-blue-600",
      statsLabel: "text-slate-600",
    },
    border: {
      light: "border-slate-400/20",
      medium: "border-slate-400/30",
      strong: "border-slate-400/50",
      accent: "border-slate-500",
    },
    surface: {
      glass: "bg-white/70",
      glassStrong: "bg-white/90",
      overlay: "bg-slate-900/20",
      card: "bg-white/70",
      button: "bg-white/60",
      hover: "bg-white/80",
    },
    accent: {
      shadow: "shadow-slate-200/50",
      glow: "bg-slate-200/30",
    },
    hero: {
      gridOpacity: "opacity-[0.15]",
      snakeLight1Opacity: "opacity-20",
      snakeLight2Opacity: "opacity-[0.15]",
      snakeLight3Opacity: "opacity-[0.12]",
      illuminatedGridOpacity: "opacity-40",
      badgeBg: "bg-white/80",
      badgeBorder: "border-slate-300/50",
      statsBg: "bg-white/80",
      statsBorder: "border-slate-300/40",
      skeletonBg: "bg-slate-300",
      skeletonHighlight: "bg-slate-400",
      skeletonCard: "bg-white/80",
      skeletonCardBorder: "border-slate-300",
      skeletonFooter: "bg-slate-100",
      skeletonFeature: "bg-slate-200",
      toggleBg: "bg-white/90",
      toggleBorder: "border-slate-300/50",
      toggleIcon: "text-slate-700",
    },
  },
  // Brand colors (independientes del tema)
  brand: {
    primary: "bg-blue-600",
    primaryHover: "bg-blue-700",
    secondary: "bg-purple-600",
    secondaryHover: "bg-purple-700",
    accent: "bg-pink-500",
  },
} as const;

// GRADIENTS (independientes del tema)
export const GRADIENTS = {
  primary: "from-blue-600 to-purple-600",
  primaryHover: "from-blue-500 to-purple-500",
  primaryGlow: "from-blue-400 to-purple-400",
  text: {
    default: "from-blue-600 via-purple-600 to-pink-600",
    accent: "from-blue-400 via-purple-400 to-pink-400",
    light: "from-white via-blue-100 to-purple-200",
  },
  background: {
    hero: "from-slate-950 via-blue-950 to-slate-900",
    section: "from-slate-950 via-blue-950 to-slate-950",
  },
} as const;

// GLASS EFFECTS
export const GLASS = {
  light: "backdrop-blur-md bg-white/5 border border-white/10",
  medium: "backdrop-blur-xl bg-white/10 border border-white/20",
  strong: "backdrop-blur-xl bg-white/15 border border-white/30",
} as const;

// TYPOGRAPHY
export const TYPOGRAPHY = {
  heading: {
    hero: "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold",
    section: "text-5xl md:text-6xl lg:text-7xl font-black",
    subsection: "text-4xl lg:text-6xl font-black",
  },
  body: {
    large: "text-lg sm:text-xl",
    normal: "text-base",
    small: "text-sm",
  },
} as const;

// COUNTER ANIMATION TARGETS
export const COUNTER_TARGETS = {
  clients: 500,
  projects: 2500,
  satisfaction: 98,
  duration: 2000, // ms
} as const;

// BLOB ANIMATION
export const BLOB_POSITIONS = {
  top: { x: 20, y: 20 },
  middle: { x: 40, y: 20 },
  bottom: { x: -8, y: "left-1/2" },
} as const;

// GRID SIZES
export const GRID_SIZES = {
  small: "20px 20px",
  medium: "40px 40px",
} as const;

// Z-INDEX LAYERS
export const Z_INDEX = {
  background: 0,
  content: 10,
  overlay: 20,
  navigation: 50,
} as const;

// BREAKPOINTS (para uso en JS, no Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

// TRANSITION CURVES
export const EASING = {
  smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  spring: "cubic-bezier(0.23, 1, 0.320, 1)",
} as const;
