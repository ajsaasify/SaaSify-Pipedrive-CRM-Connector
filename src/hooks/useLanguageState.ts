import { useState, useEffect } from "react";
import i18n from "@template/lib/i18n";
import { storage } from "@template/utils/storage";

type Language = "en" | "fr" | "ar";

const STORAGE_KEY = "appLanguage";
// Custom hook: Sync language changes with i18n and storage
export function useLanguageState(initialLang: Language) {
  const [language, setLanguageState] = useState<Language>(initialLang);

  const setLanguage = (lang: Language) => {
    console.log(lang, language);
    if (lang === language) return;
    i18n.changeLanguage(lang);
    setLanguageState(lang);
    try {
      storage.set(STORAGE_KEY, lang);
    } catch {
      // ignore storage errors
    }
  };

  // Ensure i18n is synced on mount
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return { language, setLanguage };
}
