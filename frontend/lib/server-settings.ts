import "server-only";
import { cookies } from "next/headers";
import type { Language, ThemeMode } from "@/lib/types";

export const getServerSettings = (): { language: Language; theme: ThemeMode } => {
  const cookieStore = cookies();
  const languageCookie = cookieStore.get("felorance-language")?.value;
  const themeCookie = cookieStore.get("felorance-theme")?.value;

  const language: Language = languageCookie === "en" ? "en" : "fa";
  const theme: ThemeMode = themeCookie === "dark" ? "dark" : "light";

  return { language, theme };
};
