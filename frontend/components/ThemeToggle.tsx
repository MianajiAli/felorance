"use client";

import { useEffect, useState } from "react";
import { themeCookieName, type ThemeMode } from "@/lib/i18n";

interface ThemeToggleProps {
  initialTheme: ThemeMode;
}

const ThemeToggle = ({ initialTheme }: ThemeToggleProps) => {
  const [theme, setTheme] = useState<ThemeMode>(initialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.cookie = `${themeCookieName}=${nextTheme}; path=/; max-age=31536000`;
    localStorage.setItem(themeCookieName, nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
      aria-pressed={theme === "dark"}
    >
      {theme === "dark" ? "Light mode" : "Dark mode"}
    </button>
  );
};

export default ThemeToggle;
