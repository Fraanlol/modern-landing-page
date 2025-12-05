"use client";

import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useTheme, type Theme } from "@/hooks/useTheme";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const themeData = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeData.theme);
  }, [themeData.theme]);

  return (
    <ThemeContext.Provider value={themeData}>{children}</ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
}
