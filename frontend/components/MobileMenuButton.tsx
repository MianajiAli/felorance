"use client";

import Link from "next/link";
import { useState } from "react";
import { useSettings } from "./SettingsProvider";

interface NavItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  navItems: NavItem[];
}

const MobileMenuButton = ({ navItems }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, theme, toggleTheme } = useSettings();

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-subtle text-muted transition hover:text-[var(--foreground)]"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="sr-only">Toggle navigation</span>
        <span className="text-lg">{isOpen ? "✕" : "☰"}</span>
      </button>

      <div
        id="mobile-menu"
        className={`absolute left-0 right-0 top-full mt-4 ${isOpen ? "block" : "hidden"}`}
      >
        <div className="mx-4 rounded-3xl border border-subtle bg-[var(--surface)] p-6 shadow-xl">
          <nav className="flex flex-col gap-4 text-sm font-medium text-muted">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-[var(--foreground)]"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 grid gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-full border border-subtle px-4 py-2 text-center text-sm font-semibold text-muted"
            >
              {theme === "light" ? (language === "fa" ? "حالت تیره" : "Dark mode") : language === "fa" ? "حالت روشن" : "Light mode"}
            </button>
            <button
              type="button"
              onClick={() => setLanguage(language === "fa" ? "en" : "fa")}
              className="rounded-full border border-subtle px-4 py-2 text-center text-sm font-semibold text-muted"
            >
              {language === "fa" ? "English" : "فارسی"}
            </button>
            <Link
              href="/auth/sign-in"
              className="rounded-full border border-subtle px-4 py-2 text-center text-sm font-semibold text-muted"
              onClick={() => setIsOpen(false)}
            >
              {language === "fa" ? "ورود" : "Sign in"}
            </Link>
            <Link
              href="/auth/sign-up"
              className="rounded-full bg-[var(--foreground)] px-4 py-2 text-center text-sm font-semibold text-[var(--background)]"
              onClick={() => setIsOpen(false)}
            >
              {language === "fa" ? "ثبت‌نام" : "Create account"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenuButton;
