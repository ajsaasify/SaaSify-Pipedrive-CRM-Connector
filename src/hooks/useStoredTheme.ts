import { useMemo } from "react";
import { storage } from "@template/utils/storage";
import { isBrowser } from "@template/utils/isBrowser";

export const DEFAULT_THEME = "saga-blue";
export const THEME_STORAGE_KEY = "app-theme";

export const useStoredTheme = (
  defaultTheme: string = DEFAULT_THEME,
): string => {
  return useMemo(() => {
    if (isBrowser()) {
      const storedTheme = storage.get(THEME_STORAGE_KEY);
      return storedTheme || defaultTheme;
    }
    return defaultTheme;
  }, [defaultTheme]);
};
