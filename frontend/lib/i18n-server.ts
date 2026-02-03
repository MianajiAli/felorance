import { cookies } from "next/headers";
import {
  defaultLocale,
  isLocale,
  isTheme,
  localeCookieName,
  themeCookieName,
  type Locale,
  type ThemeMode,
} from "./i18n";

export const getLocale = (): Locale => {
  const cookieValue = cookies().get(localeCookieName)?.value;
  return isLocale(cookieValue) ? cookieValue : defaultLocale;
};

export const getTheme = (): ThemeMode => {
  const cookieValue = cookies().get(themeCookieName)?.value;
  return isTheme(cookieValue) ? cookieValue : "light";
};
