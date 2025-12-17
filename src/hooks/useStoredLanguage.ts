import { useMemo } from "react";
import { storage } from "@template/utils/storage";
import { isBrowser } from "@template/utils/isBrowser";

type Language = "en" | "fr" | "ar";

// Utility to check if a value is a valid language
function isValidLanguage(value: unknown): value is Language {
  return ["en", "fr", "ar"].includes(value as string);
}

// Custom hook: Load initial language from storage
export function useStoredLanguage(defaultLang: Language = "en"): Language {
  return useMemo(() => {
    if (!isBrowser()) return defaultLang;

    try {
      const saved = storage.get("appLanguage");
      if (isValidLanguage(saved)) return saved;
    } catch {
      // ignore error
    }
    return defaultLang;
  }, [defaultLang]);
}
