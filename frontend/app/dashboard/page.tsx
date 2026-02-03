import Link from "next/link";
import { getLocale } from "@/lib/i18n-server";

export const metadata = {
  title: "Dashboard",
  description: "Overview of orders, wishlist, and membership status.",
};

export default function DashboardPage() {
  const locale = getLocale();
  const isRtl = locale === "fa";

  return (
    <main className={`mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 ${isRtl ? "text-right" : "text-left"}`}>
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
            {isRtl ? "داشبورد" : "Dashboard"}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
            {isRtl ? "مروری بر حساب شما" : "Overview of your account"}
          </h1>
        </div>
        <Link
          href="/orders"
          className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
        >
          {isRtl ? "مشاهده سفارش‌ها" : "View orders"}
        </Link>
      </header>
      <section className="mt-8 grid gap-6 lg:grid-cols-3">
        {[
          {
            title: isRtl ? "سطح عضویت" : "Membership level",
            value: isRtl ? "طلایی" : "Gold",
            description: isRtl ? "دسترسی ویژه به همکاری‌ها" : "Priority access to collaborations",
          },
          {
            title: isRtl ? "اعتبار هدیه" : "Gift credit",
            value: "$85",
            description: isRtl ? "تا ۳۰ روز آینده" : "Valid for 30 days",
          },
          {
            title: isRtl ? "لیست علاقه‌مندی" : "Wishlist",
            value: "12",
            description: isRtl ? "آماده برای خرید" : "Ready to shop",
          },
        ].map((card) => (
          <div key={card.title} className="rounded-3xl border border-white/60 bg-[var(--card)] p-6 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">{card.title}</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{card.value}</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{card.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
