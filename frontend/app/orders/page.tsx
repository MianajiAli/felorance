"use client";

import { useSettings } from "@/components/SettingsProvider";

const orders = {
  fa: [
    { id: "FX-2390", status: "در مسیر", total: "۴٫۱۸۰٫۰۰۰ تومان" },
    { id: "FX-2384", status: "تحویل شد", total: "۲٫۶۸۰٫۰۰۰ تومان" },
  ],
  en: [
    { id: "FX-2390", status: "In transit", total: "$418" },
    { id: "FX-2384", status: "Delivered", total: "$268" },
  ],
};

export default function OrdersPage() {
  const { language } = useSettings();
  const isFa = language === "fa";

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="surface rounded-[32px] p-10">
        <h1 className="text-3xl font-semibold">{isFa ? "سفارش‌ها" : "Orders"}</h1>
        <p className="mt-3 text-sm text-muted">
          {isFa ? "تاریخچه سفارش و وضعیت ارسال." : "Order history and delivery status."}
        </p>
        <div className="mt-6 space-y-4">
          {orders[language].map((order) => (
            <div key={order.id} className="flex items-center justify-between rounded-2xl border border-subtle bg-[var(--surface-muted)] p-4">
              <div>
                <p className="text-sm font-semibold">{isFa ? "سفارش" : "Order"} {order.id}</p>
                <p className="text-xs text-muted">{order.status}</p>
              </div>
              <p className="text-sm font-semibold">{order.total}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
