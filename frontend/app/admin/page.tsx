import { formatPrice, getCurrentUser, getOrders, getProducts } from "@/lib/api";
import { getAccessToken } from "@/lib/server-auth";
import { getServerSettings } from "@/lib/server-settings";

export default async function AdminPage() {
  const { language } = getServerSettings();
  const isFa = language === "fa";
  const token = getAccessToken();
  const user = token ? await getCurrentUser(token) : null;
  const isStaff = Boolean(user?.is_staff);

  const [orders, products] = isStaff && token
    ? await Promise.all([getOrders(token).catch(() => []), getProducts().catch(() => [])])
    : [[], []];

  const activeOrders = orders.filter((order) => order.status !== "delivered");
  const lowStock = products.filter((product) => product.stock < 5);
  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total), 0);

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

      {!isStaff ? (
        <section className="mt-10 rounded-3xl border border-subtle bg-[var(--surface-muted)] p-8 text-sm text-muted">
          {isFa ? "این بخش فقط برای مدیران در دسترس است." : "This area is only available to staff accounts."}
        </section>
      ) : (
        <>
          <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: isFa ? "سفارش‌های فعال" : "Active orders", value: activeOrders.length.toString() },
              { label: isFa ? "درآمد ۳۰ روز" : "Revenue (30d)", value: formatPrice(totalRevenue, language) },
              { label: isFa ? "مشتری جدید" : "New customers", value: "—" },
              { label: isFa ? "هشدار کمبود" : "Low stock alerts", value: lowStock.length.toString() },
            ].map((stat) => (
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
                {orders.slice(0, 5).map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-subtle bg-[var(--surface-muted)] p-4"
                  >
                    <div>
                      <p className="text-sm font-semibold">{user?.first_name || (isFa ? "مشتری" : "Customer")}</p>
                      <p className="text-xs text-muted">{isFa ? "سفارش" : "Order"} {order.order_number}</p>
                    </div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
                      {order.status}
                    </div>
                    <div className="text-sm font-semibold">{formatPrice(order.total, language)}</div>
                    <div className="text-xs text-muted">{isFa ? "تحویل" : "ETA"} —</div>
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
                {lowStock.length ? lowStock.map((item) => (
                  <div key={item.id} className="rounded-2xl bg-white/10 p-4">
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="mt-2 text-xs text-white/70">
                      {isFa ? "موجودی" : "Stock"}: {item.stock}
                    </p>
                    <p className="mt-2 text-xs text-rose-200">
                      {isFa ? "نیاز به تامین" : "Needs restock"}
                    </p>
                  </div>
                )) : (
                  <p className="text-sm text-white/70">{isFa ? "هشداری وجود ندارد." : "No low stock alerts."}</p>
                )}
              </div>
              <button className="mt-6 w-full rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900">
                {isFa ? "بروزرسانی موجودی" : "Update inventory"}
              </button>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
