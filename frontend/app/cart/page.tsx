"use client";

import Link from "next/link";
import { useSettings } from "@/components/SettingsProvider";

const items = {
  fa: [
    { name: "گوشواره لونا", qty: 1, price: "۵٫۹۰۰٫۰۰۰ تومان" },
    { name: "زنجیر اکلیپس", qty: 1, price: "۸٫۴۰۰٫۰۰۰ تومان" },
  ],
  en: [
    { name: "Luna Drop Earrings", qty: 1, price: "$148" },
    { name: "Eclipse Chain", qty: 1, price: "$218" },
  ],
};

export default function CartPage() {
  const { language } = useSettings();
  const isFa = language === "fa";

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="surface rounded-[32px] p-10">
        <h1 className="text-3xl font-semibold">{isFa ? "سبد خرید" : "Your cart"}</h1>
        <p className="mt-3 text-sm text-muted">
          {isFa ? "سفارش خود را قبل از پرداخت مرور کنید." : "Review your order before checkout."}
        </p>
        <div className="mt-6 space-y-4">
          {items[language].map((item) => (
            <div key={item.name} className="flex items-center justify-between rounded-2xl border border-subtle bg-[var(--surface-muted)] p-4">
              <div>
                <p className="text-sm font-semibold">{item.name}</p>
                <p className="text-xs text-muted">{isFa ? "تعداد" : "Qty"}: {item.qty}</p>
              </div>
              <p className="text-sm font-semibold">{item.price}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/payments"
            className="rounded-full bg-[var(--foreground)] px-6 py-3 text-sm font-semibold text-[var(--background)]"
          >
            {isFa ? "ادامه پرداخت" : "Proceed to payment"}
          </Link>
          <Link
            href="/shop"
            className="rounded-full border border-subtle px-6 py-3 text-sm font-semibold text-muted"
          >
            {isFa ? "ادامه خرید" : "Continue shopping"}
          </Link>
        </div>
      </section>
    </main>
  );
}
