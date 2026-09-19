"use client";

import { createContext, useContext, useLayoutEffect } from "react";
import { useSearchParams } from "next/navigation";
import { resolveTheme, type Theme } from "@/lib/theme";

const ThemeContext = createContext<Theme>("default");

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const theme = resolveTheme(searchParams.get("theme"));

  // Layouts persist across navigation; update before the next browser paint.
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
