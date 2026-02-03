"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Language, ThemeMode } from "@/lib/types";

interface SettingsContextValue {
  language: Language;
  theme: ThemeMode;
  setLanguage: (language: Language) => void;
  toggleTheme: () => void;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

const applySettingsToDocument = (language: Language, theme: ThemeMode) => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.lang = language;
  root.dir = language === "fa" ? "rtl" : "ltr";
  root.dataset.theme = theme;
};

const persistCookie = (key: string, value: string) => {
  if (typeof document === "undefined") return;
  document.cookie = `${key}=${value}; path=/; max-age=31536000`;
};

const safeStorage = () => {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("fa");
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    const storage = safeStorage();
    const storedLanguage = storage?.getItem("felorance-language") as Language | null;
    const storedTheme = storage?.getItem("felorance-theme") as ThemeMode | null;

    if (storedLanguage === "fa" || storedLanguage === "en") {
      setLanguage(storedLanguage);
    }
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    const storage = safeStorage();
    storage?.setItem("felorance-language", language);
    storage?.setItem("felorance-theme", theme);
    persistCookie("felorance-language", language);
    persistCookie("felorance-theme", theme);
    applySettingsToDocument(language, theme);
  }, [language, theme]);

  const value = useMemo(
    () => ({
      language,
      theme,
      setLanguage,
      toggleTheme: () => setTheme((prev) => (prev === "light" ? "dark" : "light")),
    }),
    [language, theme]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return context;
};
