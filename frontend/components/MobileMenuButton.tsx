"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale, ThemeMode } from "@/lib/i18n";
import LocaleToggle from "./LocaleToggle";
import ThemeToggle from "./ThemeToggle";

interface NavItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  navItems: NavItem[];
  locale: Locale;
  theme: ThemeMode;
}

const MobileMenuButton = ({ navItems, locale, theme }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isRtl = locale === "fa";

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:text-slate-200"
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
        <div className="mx-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-950">
          <nav className="flex flex-col gap-4 text-sm font-medium text-slate-700 dark:text-slate-200">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-slate-900 dark:hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 grid gap-3">
            <LocaleToggle locale={locale} />
            <ThemeToggle initialTheme={theme} />
            <Link
              href="/auth/sign-in"
              className="rounded-full border border-slate-200 px-4 py-2 text-center text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
              onClick={() => setIsOpen(false)}
            >
              {isRtl ? "ورود" : "Sign in"}
            </Link>
            <Link
              href="/auth/sign-up"
              className="rounded-full bg-slate-900 px-4 py-2 text-center text-sm font-semibold text-white dark:bg-white dark:text-slate-900"
              onClick={() => setIsOpen(false)}
            >
              {isRtl ? "ثبت نام" : "Create account"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenuButton;
