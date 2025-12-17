import { useState, useEffect, useCallback } from "react";
import { changeTheme } from "@template/utils/themeLoader";
import { storage } from "@template/utils/storage";
import { isBrowser } from "@template/utils/isBrowser";
import { THEME_STORAGE_KEY } from "./useStoredTheme";

export const useThemeState = (initialTheme: string) => {
  const [theme, setThemeState] = useState<string>(initialTheme);

  const setTheme = useCallback(
    (newTheme: string) => {
      if (newTheme === theme) return;
      changeTheme(newTheme);
      setThemeState(newTheme);
      if (isBrowser()) {
        storage.set(THEME_STORAGE_KEY, newTheme);
      }
    },
    [theme],
  );

  useEffect(() => {
    changeTheme(theme);
    if (isBrowser()) {
      storage.set(THEME_STORAGE_KEY, theme);
    }
  }, [theme]);

  return { theme, setTheme };
};
