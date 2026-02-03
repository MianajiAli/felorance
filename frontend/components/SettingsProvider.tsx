"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "fa" | "en";
export type ThemeMode = "light" | "dark";

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

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("fa");
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem("felorance-language") as Language | null;
    const storedTheme = window.localStorage.getItem("felorance-theme") as ThemeMode | null;

    if (storedLanguage === "fa" || storedLanguage === "en") {
      setLanguage(storedLanguage);
    }
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("felorance-language", language);
    window.localStorage.setItem("felorance-theme", theme);
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
