export type Locale = "fa" | "en";
export type ThemeMode = "light" | "dark";

export const defaultLocale: Locale = "fa";
export const localeCookieName = "felorance_lang";
export const themeCookieName = "felorance_theme";

export const isLocale = (value?: string): value is Locale =>
  value === "fa" || value === "en";

export const isTheme = (value?: string): value is ThemeMode =>
  value === "light" || value === "dark";

export const getDirection = (locale: Locale) => (locale === "fa" ? "rtl" : "ltr");

export const localeLabel = (locale: Locale) => (locale === "fa" ? "فارسی" : "English");
