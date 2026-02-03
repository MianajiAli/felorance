import { getLocale } from "@/lib/i18n-server";

export const metadata = {
  title: "Payments",
  description: "Manage saved cards and payment history for Felorance orders.",
};

export default function PaymentsPage() {
  const locale = getLocale();
  const isRtl = locale === "fa";

  return (
    <main className={`mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8 ${isRtl ? "text-right" : "text-left"}`}>
      <header>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
          {isRtl ? "پرداخت‌ها" : "Payments"}
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
          {isRtl ? "روش‌های پرداخت و صورت‌حساب" : "Payment methods and billing"}
        </h1>
      </header>
      <section className="mt-8 space-y-4">
        {[
          { label: "Visa", detail: "**** 2034", status: isRtl ? "پیش‌فرض" : "Default" },
          { label: "Mastercard", detail: "**** 7781", status: isRtl ? "فعال" : "Active" },
        ].map((card) => (
          <div
            key={card.detail}
            className="rounded-3xl border border-white/60 bg-[var(--card)] p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{card.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-300">{card.detail}</p>
              </div>
              <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-600">
                {card.status}
              </span>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
