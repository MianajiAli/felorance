"use client";

import { useSettings } from "@/components/SettingsProvider";

const stats = {
  fa: [
    { label: "سفارش‌های فعال", value: "۱۲۸" },
    { label: "درآمد ۳۰ روز", value: "۹۴٫۲۱۰٫۰۰۰ تومان" },
    { label: "مشتری جدید", value: "۳۷۲" },
    { label: "هشدار کمبود", value: "۸" },
  ],
  en: [
    { label: "Active orders", value: "128" },
    { label: "Revenue (30d)", value: "$94,210" },
    { label: "New customers", value: "372" },
    { label: "Low stock alerts", value: "8" },
  ],
};

const orders = {
  fa: [
    {
      id: "FX-2390",
      customer: "آریانا محمدی",
      status: "بسته‌بندی",
      total: "۴۱۸۰۰۰۰ تومان",
      eta: "امروز",
    },
    {
      id: "FX-2384",
      customer: "نورا سید",
      status: "در مسیر",
      total: "۲۶۸۰۰۰۰ تومان",
      eta: "فردا",
    },
    {
      id: "FX-2379",
      customer: "دانیال وو",
      status: "استایلینگ",
      total: "۵۱۲۰۰۰۰ تومان",
      eta: "۲ روز دیگر",
    },
  ],
  en: [
    {
      id: "FX-2390",
      customer: "Arielle Morgan",
      status: "Packed",
      total: "$418",
      eta: "Today",
    },
    {
      id: "FX-2384",
      customer: "Noura Sayed",
      status: "In transit",
      total: "$268",
      eta: "Tomorrow",
    },
    {
      id: "FX-2379",
      customer: "Daniel Wu",
      status: "Styling",
      total: "$512",
      eta: "In 2 days",
    },
  ],
};

const inventory = {
  fa: [
    {
      item: "گوشواره لونا",
      stock: "۱۲ عدد",
      note: "۵ روز تا تامین",
    },
    {
      item: "زنجیر اکلیپس",
      stock: "۶ عدد",
      note: "تقاضای بالا",
    },
    {
      item: "دستبند سولستیس",
      stock: "۱۸ عدد",
      note: "پایدار",
    },
  ],
  en: [
    {
      item: "Luna Drop Earrings",
      stock: "12 units",
      note: "Restock in 5 days",
    },
    {
      item: "Eclipse Chain",
      stock: "6 units",
      note: "High demand",
    },
    {
      item: "Solstice Cuff",
      stock: "18 units",
      note: "Stable",
    },
  ],
};

export default function AdminPage() {
  const { language } = useSettings();
  const isFa = language === "fa";

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
            {isFa ? "پنل مدیریت" : "Admin panel"}
          </p>
          <h1 className="mt-3 text-3xl font-semibold">
            {isFa ? "داشبورد عملیات استودیو" : "Studio operations dashboard"}
          </h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="rounded-full border border-subtle px-4 py-2 text-sm font-semibold text-muted">
            {isFa ? "خروجی گزارش" : "Export report"}
          </button>
          <button className="rounded-full bg-[var(--foreground)] px-4 py-2 text-sm font-semibold text-[var(--background)]">
            {isFa ? "محصول جدید" : "New product"}
          </button>
        </div>
      </section>

      <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats[language].map((stat) => (
          <div key={stat.label} className="surface rounded-3xl p-6">
            <p className="text-xs uppercase tracking-wide text-muted">{stat.label}</p>
            <p className="mt-3 text-2xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="surface rounded-[32px] p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{isFa ? "آخرین سفارش‌ها" : "Latest orders"}</h2>
            <button className="text-sm font-semibold text-muted">
              {isFa ? "مشاهده همه" : "View all"}
            </button>
          </div>
          <div className="mt-6 space-y-4">
            {orders[language].map((order) => (
              <div
                key={order.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-subtle bg-[var(--surface-muted)] p-4"
              >
                <div>
                  <p className="text-sm font-semibold">{order.customer}</p>
                  <p className="text-xs text-muted">{isFa ? "سفارش" : "Order"} {order.id}</p>
                </div>
                <div className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
                  {order.status}
                </div>
                <div className="text-sm font-semibold">{order.total}</div>
                <div className="text-xs text-muted">{isFa ? "تحویل" : "ETA"} {order.eta}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-strong rounded-[32px] p-8 shadow-lg">
          <h2 className="text-lg font-semibold">{isFa ? "وضعیت موجودی" : "Inventory spotlight"}</h2>
          <p className="mt-2 text-sm text-white/70">
            {isFa ? "کالاهای کم‌موجودی را رصد کنید." : "Track low stock items and restocking timelines."}
          </p>
          <div className="mt-6 space-y-4">
            {inventory[language].map((item) => (
              <div key={item.item} className="rounded-2xl bg-white/10 p-4">
                <p className="text-sm font-semibold">{item.item}</p>
                <p className="mt-2 text-xs text-white/70">{item.stock}</p>
                <p className="mt-2 text-xs text-rose-200">{item.note}</p>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900">
            {isFa ? "بروزرسانی موجودی" : "Update inventory"}
          </button>
        </div>
      </section>
    </main>
  );
}
