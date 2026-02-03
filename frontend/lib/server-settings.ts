import { cookies } from "next/headers";
import type { Language, ThemeMode } from "@/lib/types";

export const getServerSettings = async (): Promise<{ language: Language; theme: ThemeMode }> => {
  const cookieStore = await cookies();
  const languageCookie = cookieStore.get("felorance-language")?.value;
  const themeCookie = cookieStore.get("felorance-theme")?.value;

  const language: Language = languageCookie === "en" ? "en" : "fa";
  const theme: ThemeMode = themeCookie === "dark" ? "dark" : "light";

  return { language, theme };
};
