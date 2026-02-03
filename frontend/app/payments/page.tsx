"use client";

import Link from "next/link";
import { useSettings } from "@/components/SettingsProvider";

export default function PaymentsPage() {
  const { language } = useSettings();
  const isFa = language === "fa";

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="surface rounded-[32px] p-10">
        <h1 className="text-3xl font-semibold">{isFa ? "پرداخت" : "Payments"}</h1>
        <p className="mt-3 text-sm text-muted">
          {isFa ? "روش پرداخت امن برای سفارش شما." : "Secure checkout for your order."}
        </p>
        <div className="mt-6 space-y-4">
          <div className="rounded-2xl border border-subtle bg-[var(--surface-muted)] p-4">
            <p className="text-sm font-semibold">{isFa ? "کارت بانکی" : "Card payment"}</p>
            <p className="text-xs text-muted">{isFa ? "فعال" : "Active"}</p>
          </div>
          <div className="rounded-2xl border border-subtle bg-[var(--surface-muted)] p-4">
            <p className="text-sm font-semibold">{isFa ? "پرداخت در محل" : "Pay on delivery"}</p>
            <p className="text-xs text-muted">{isFa ? "در دسترس" : "Available"}</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/orders"
            className="rounded-full bg-[var(--foreground)] px-6 py-3 text-sm font-semibold text-[var(--background)]"
          >
            {isFa ? "تکمیل پرداخت" : "Complete payment"}
          </Link>
          <Link
            href="/cart"
            className="rounded-full border border-subtle px-6 py-3 text-sm font-semibold text-muted"
          >
            {isFa ? "بازگشت به سبد" : "Back to cart"}
          </Link>
        </div>
      </section>
    </main>
  );
}
