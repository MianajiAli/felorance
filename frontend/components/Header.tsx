import Link from "next/link";
import MobileMenuButton from "./MobileMenuButton";
import LocaleToggle from "./LocaleToggle";
import ThemeToggle from "./ThemeToggle";
import { getLocale, getTheme } from "@/lib/i18n-server";

interface NavItem {
  label: string;
  href: string;
}

const Header = () => {
  const locale = getLocale();
  const theme = getTheme();
  const isRtl = locale === "fa";

  const navItems: NavItem[] = isRtl
    ? [
        { label: "خانه", href: "/" },
        { label: "فروشگاه", href: "/shop" },
        { label: "وبلاگ", href: "/blog" },
        { label: "سبد خرید", href: "/cart" },
        { label: "پنل ادمین", href: "/admin" },
      ]
    : [
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop" },
        { label: "Blog", href: "/blog" },
        { label: "Cart", href: "/cart" },
        { label: "Admin", href: "/admin" },
      ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/40 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 via-rose-400 to-purple-500 text-lg font-bold text-white">
            F
          </span>
          <div>
            <Link href="/" className="text-lg font-semibold text-slate-900 dark:text-white">
              {isRtl ? "فلورنس" : "Felorance Jewelry"}
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-300">
              {isRtl ? "استودیو نقره و سنگ‌های قیمتی" : "Modern silver & gemstone studio"}
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex dark:text-slate-200">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-slate-900 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LocaleToggle locale={locale} />
          <ThemeToggle initialTheme={theme} />
          <Link
            href="/auth/sign-in"
            className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:text-slate-200"
          >
            {isRtl ? "ورود" : "Sign in"}
          </Link>
          <Link
            href="/auth/sign-up"
            className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900"
          >
            {isRtl ? "ثبت نام" : "Create account"}
          </Link>
        </div>

        <MobileMenuButton navItems={navItems} locale={locale} theme={theme} />
      </div>
    </header>
  );
};

export default Header;
