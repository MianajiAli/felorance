import { getLocale } from "@/lib/i18n-server";

export const metadata = {
  title: "Orders",
  description: "Track your Felorance orders and delivery milestones.",
};

const orders = [
  {
    id: "FX-2390",
    status: { fa: "در حال بسته‌بندی", en: "Packed" },
    total: "$418",
    eta: { fa: "امروز", en: "Today" },
  },
  {
    id: "FX-2384",
    status: { fa: "ارسال شده", en: "In transit" },
    total: "$268",
    eta: { fa: "فردا", en: "Tomorrow" },
  },
];

export default function OrdersPage() {
  const locale = getLocale();
  const isRtl = locale === "fa";

  return (
    <main className={`mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8 ${isRtl ? "text-right" : "text-left"}`}>
      <header>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
          {isRtl ? "سفارش‌ها" : "Orders"}
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
          {isRtl ? "پیگیری آخرین خریدها" : "Track your latest purchases"}
        </h1>
      </header>
      <section className="mt-8 space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-3xl border border-white/60 bg-[var(--card)] p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{order.id}</p>
                <p className="text-xs text-slate-500 dark:text-slate-300">{order.status[locale]}</p>
              </div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">{order.total}</div>
              <div className="text-xs text-slate-500 dark:text-slate-300">
                {isRtl ? "تحویل" : "ETA"} {order.eta[locale]}
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
