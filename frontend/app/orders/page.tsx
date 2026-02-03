import { formatPrice, getOrders } from "@/lib/api";
import { getAccessToken } from "@/lib/server-auth";
import { getServerSettings } from "@/lib/server-settings";

export default async function OrdersPage() {
  const { language } = getServerSettings();
  const isFa = language === "fa";
  const token = getAccessToken();
  const orders = token ? await getOrders(token).catch(() => []) : [];

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="surface rounded-[32px] p-10">
        <h1 className="text-3xl font-semibold">{isFa ? "سفارش‌ها" : "Orders"}</h1>
        <p className="mt-3 text-sm text-muted">
          {isFa ? "تاریخچه سفارش و وضعیت ارسال." : "Order history and delivery status."}
        </p>
        {!token ? (
          <div className="mt-6 rounded-2xl border border-subtle bg-[var(--surface-muted)] p-6 text-sm text-muted">
            {isFa ? "برای مشاهده سفارش‌ها وارد شوید." : "Please sign in to view your orders."}
          </div>
        ) : orders.length ? (
          <div className="mt-6 space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between rounded-2xl border border-subtle bg-[var(--surface-muted)] p-4">
                <div>
                  <p className="text-sm font-semibold">{isFa ? "سفارش" : "Order"} {order.order_number}</p>
                  <p className="text-xs text-muted">{order.status}</p>
                </div>
                <p className="text-sm font-semibold">{formatPrice(order.total, language)}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-subtle bg-[var(--surface-muted)] p-6 text-sm text-muted">
            {isFa ? "هنوز سفارشی ثبت نشده است." : "No orders yet."}
          </div>
        )}
      </section>
    </main>
  );
}
