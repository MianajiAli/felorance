"use client";

import { localeCookieName, localeLabel, type Locale } from "@/lib/i18n";

interface LocaleToggleProps {
  locale: Locale;
}

const LocaleToggle = ({ locale }: LocaleToggleProps) => {
  const nextLocale: Locale = locale === "fa" ? "en" : "fa";

  const handleToggle = () => {
    document.cookie = `${localeCookieName}=${nextLocale}; path=/; max-age=31536000`;
    window.location.reload();
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
    >
      {localeLabel(nextLocale)}
    </button>
  );
};

export default LocaleToggle;
