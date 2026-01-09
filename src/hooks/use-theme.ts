import { useEffect, useMemo, useState } from "react";

import {
  applyTheme,
  getStoredTheme,
  type ThemeMode,
  storeTheme,
} from "@/lib/theme";

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return "system";
    try {
      return getStoredTheme();
    } catch {
      return "system";
    }
  });

  useEffect(() => {
    applyTheme(mode);
  }, [mode]);

  useEffect(() => {
    const mql = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!mql) return;

    const onChange = () => {
      // Only follow system changes if user is in system mode.
      if (getStoredTheme() === "system") applyTheme("system");
    };

    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const api = useMemo(() => {
    const setTheme = (next: ThemeMode) => {
      setMode(next);
      storeTheme(next);
      applyTheme(next);
    };

    return { mode, setTheme };
  }, [mode]);

  return api;
}


