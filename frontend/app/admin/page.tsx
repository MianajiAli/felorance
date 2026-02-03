import { getLocale } from "@/lib/i18n-server";

const stats = [
  { label: { fa: "سفارش فعال", en: "Active orders" }, value: "128" },
  { label: { fa: "درآمد ۳۰ روز", en: "Revenue (30d)" }, value: "$94,210" },
  { label: { fa: "مشتری جدید", en: "New customers" }, value: "372" },
  { label: { fa: "هشدار موجودی", en: "Low stock alerts" }, value: "8" },
];

const orders = [
  {
    id: "FX-2390",
    customer: "Arielle Morgan",
    status: { fa: "بسته‌بندی", en: "Packed" },
    total: "$418",
    eta: { fa: "امروز", en: "Today" },
  },
  {
    id: "FX-2384",
    customer: "Noura Sayed",
    status: { fa: "در مسیر", en: "In transit" },
    total: "$268",
    eta: { fa: "فردا", en: "Tomorrow" },
  },
  {
    id: "FX-2379",
    customer: "Daniel Wu",
    status: { fa: "استایلینگ", en: "Styling" },
    total: "$512",
    eta: { fa: "دو روز دیگر", en: "In 2 days" },
  },
];

const inventory = [
  {
    item: { fa: "گوشواره لونا", en: "Luna Drop Earrings" },
    stock: { fa: "۱۲ عدد", en: "12 units" },
    note: { fa: "ورود ۵ روزه", en: "Restock in 5 days" },
  },
  {
    item: { fa: "گردنبند اکلپس", en: "Eclipse Chain" },
    stock: { fa: "۶ عدد", en: "6 units" },
    note: { fa: "تقاضای بالا", en: "High demand" },
  },
  {
    item: { fa: "کاف سولستیس", en: "Solstice Cuff" },
    stock: { fa: "۱۸ عدد", en: "18 units" },
    note: { fa: "پایدار", en: "Stable" },
  },
];

export default function AdminPage() {
  const locale = getLocale();
  const isRtl = locale === "fa";

  return (
    <main className={`mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 ${isRtl ? "text-right" : "text-left"}`}>
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
            {isRtl ? "پنل ادمین" : "Admin panel"}
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
            {isRtl ? "داشبورد عملیات استودیو" : "Studio operations dashboard"}
          </h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
            {isRtl ? "خروجی گزارش" : "Export report"}
          </button>
          <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
            {isRtl ? "محصول جدید" : "New product"}
          </button>
        </div>
      </section>

      <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label.en}
            className="rounded-3xl border border-white/60 bg-[var(--card)] p-6 shadow-sm"
          >
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
              {stat.label[locale]}
            </p>
            <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
              {stat.value}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[32px] border border-white/60 bg-[var(--card)] p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              {isRtl ? "آخرین سفارش‌ها" : "Latest orders"}
            </h2>
            <button className="text-sm font-semibold text-slate-500 dark:text-slate-300">
              {isRtl ? "مشاهده همه" : "View all"}
            </button>
          </div>
          <div className="mt-6 space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-[var(--muted)] p-4"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {order.customer}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-300">{order.id}</p>
                </div>
                <div className="text-xs font-semibold uppercase tracking-wide text-rose-500">
                  {order.status[locale]}
                </div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  {order.total}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-300">
                  {isRtl ? "تحویل" : "ETA"} {order.eta[locale]}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-900 bg-slate-900 p-8 text-white shadow-lg">
          <h2 className="text-lg font-semibold">{isRtl ? "موجودی ویژه" : "Inventory spotlight"}</h2>
          <p className="mt-2 text-sm text-white/70">
            {isRtl ? "پیگیری کالاهای کم‌موجودی و زمان تامین." : "Track low stock items and restocking timelines."}
          </p>
          <div className="mt-6 space-y-4">
            {inventory.map((item) => (
              <div key={item.item.en} className="rounded-2xl bg-white/10 p-4">
                <p className="text-sm font-semibold">{item.item[locale]}</p>
                <p className="mt-2 text-xs text-white/70">{item.stock[locale]}</p>
                <p className="mt-2 text-xs text-rose-200">{item.note[locale]}</p>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900">
            {isRtl ? "به‌روزرسانی موجودی" : "Update inventory"}
          </button>
        </div>
      </section>
    </main>
  );
}
