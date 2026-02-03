"use client";

import Link from "next/link";
import MobileMenuButton from "./MobileMenuButton";
import { useSettings } from "./SettingsProvider";

interface NavItem {
  label: string;
  href: string;
}

const navItems = (language: "fa" | "en"): NavItem[] => {
  if (language === "fa") {
    return [
      { label: "کالکشن‌ها", href: "/#collections" },
      { label: "جدیدترین‌ها", href: "/#new-arrivals" },
      { label: "پرفروش‌ها", href: "/#best-sellers" },
      { label: "وبلاگ", href: "/blog" },
      { label: "تماس", href: "/#contact" },
    ];
  }

  return [
    { label: "Collections", href: "/#collections" },
    { label: "New Arrivals", href: "/#new-arrivals" },
    { label: "Best Sellers", href: "/#best-sellers" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/#contact" },
  ];
};

const Header = () => {
  const { language, setLanguage, theme, toggleTheme } = useSettings();
  const items = navItems(language);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-subtle bg-[var(--surface)]/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 via-rose-400 to-purple-500 text-lg font-bold text-white">
            F
          </span>
          <div>
            <Link href="/" className="text-lg font-semibold text-[var(--foreground)]">
              {language === "fa" ? "فلورنس" : "Felorance"}
            </Link>
            <p className="text-xs text-muted">
              {language === "fa" ? "استودیو نقره و سنگ‌های قیمتی" : "Modern silver & gemstone studio"}
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-[var(--foreground)]">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-subtle px-4 py-2 text-xs font-semibold text-muted transition hover:text-[var(--foreground)]"
          >
            {theme === "light" ? (language === "fa" ? "حالت تیره" : "Dark mode") : language === "fa" ? "حالت روشن" : "Light mode"}
          </button>
          <button
            type="button"
            onClick={() => setLanguage(language === "fa" ? "en" : "fa")}
            className="rounded-full border border-subtle px-4 py-2 text-xs font-semibold text-muted"
          >
            {language === "fa" ? "English" : "فارسی"}
          </button>
          <Link
            href="/auth/sign-in"
            className="rounded-full border border-subtle px-4 py-2 text-sm font-semibold text-muted transition hover:text-[var(--foreground)]"
          >
            {language === "fa" ? "ورود" : "Sign in"}
          </Link>
          <Link
            href="/auth/sign-up"
            className="rounded-full bg-[var(--foreground)] px-4 py-2 text-sm font-semibold text-[var(--background)] transition"
          >
            {language === "fa" ? "ثبت‌نام" : "Create account"}
          </Link>
        </div>

        <MobileMenuButton navItems={items} />
      </div>
    </header>
  );
};

export default Header;
