"use client";

import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import { useStoredLanguage } from "@template/hooks/useStoredLanguage";
import { useLanguageState } from "@template/hooks/useLanguageState";
import type { LanguageContextProps } from "@template/types/store.interface";

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const initialLang = useStoredLanguage();
  const { language, setLanguage } = useLanguageState(initialLang);

  const value = useMemo(
    () => ({ language, setLanguage }),
    [language, setLanguage],
  );

  return (
    <LanguageContext value={value}>
      {children}
    </LanguageContext>
  );
}

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("Error on Co-sell ContextProvider");
  }
  return context;
};
