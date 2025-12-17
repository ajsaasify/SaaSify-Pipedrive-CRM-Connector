import type { ToastMessage } from "primereact/toast";

export interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
  toastShow: (message: ToastMessage) => void;
}

export interface LanguageContextProps {
  language: "en" | "fr" | "ar";
  setLanguage: (lang: "en" | "fr" | "ar") => void;
}

export interface UserState {
  userData: Record<string, any>;
  updation: (data: Record<string, any>) => void;
}