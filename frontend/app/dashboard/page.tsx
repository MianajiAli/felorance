"use client";

import Link from "next/link";
import { useSettings } from "@/components/SettingsProvider";

const cards = {
  fa: [
    { title: "سفارش‌های فعال", value: "۲", link: "/orders" },
    { title: "لیست علاقه‌مندی", value: "۸", link: "/shop" },
    { title: "روش‌های پرداخت", value: "۲", link: "/payments" },
  ],
  en: [
    { title: "Active orders", value: "2", link: "/orders" },
    { title: "Wishlist items", value: "8", link: "/shop" },
    { title: "Payment methods", value: "2", link: "/payments" },
  ],
};

export default function DashboardPage() {
  const { language } = useSettings();
  const isFa = language === "fa";

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="surface rounded-[32px] p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
          {isFa ? "داشبورد" : "Dashboard"}
        </p>
        <h1 className="mt-3 text-3xl font-semibold">
          {isFa ? "مرکز مدیریت حساب" : "Account command center"}
        </h1>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {cards[language].map((card) => (
            <Link key={card.title} href={card.link} className="surface-muted rounded-2xl p-6">
              <p className="text-xs uppercase tracking-wide text-muted">{card.title}</p>
              <p className="mt-3 text-2xl font-semibold">{card.value}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
