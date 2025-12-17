"use client";

import { useStoredTheme } from "@template/hooks/useStoredTheme";
import { useThemeState } from "@template/hooks/useThemeState";
import { createContext, useCallback, useContext, useMemo, useRef } from "react";
import type React from "react";
import { Toast } from "primereact/toast";
import type { ToastMessage } from "primereact/toast";
import type { ThemeContextType } from "@template/types/store.interface";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialTheme = useStoredTheme();
  const { theme, setTheme } = useThemeState(initialTheme);
  const toast = useRef<Toast | null>(null);
  const toastShow = useCallback((message: ToastMessage) => {
    toast?.current?.show(message);
  }, []);
  const value = useMemo(
    () => ({ theme, setTheme, toastShow }),
    [theme, setTheme, toastShow],
  );
  return (
    <ThemeContext value={value}>
      <Toast ref={toast} />
      {children}
    </ThemeContext>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("Error on Co-sell ContextProvider");
  }
  return context;
};
