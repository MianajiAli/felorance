"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartClientProps {
  initialItems: CartItem[];
  locale: Locale;
}

const CartClient = ({ initialItems, locale }: CartClientProps) => {
  const [items, setItems] = useState<CartItem[]>(initialItems);

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  );

  const labels = {
    title: { fa: "سبد خرید", en: "Your cart" },
    summary: { fa: "خلاصه سفارش", en: "Order summary" },
    subtotal: { fa: "جمع کل", en: "Subtotal" },
    shipping: { fa: "ارسال", en: "Shipping" },
    total: { fa: "قابل پرداخت", en: "Total" },
    checkout: { fa: "ادامه پرداخت", en: "Proceed to checkout" },
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/60 bg-[var(--card)] p-6 shadow-sm"
          >
            <div>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">{item.name}</p>
              <p className="text-sm text-slate-500 dark:text-slate-300">${item.price}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="h-8 w-8 rounded-full border border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-200"
                onClick={() => updateQuantity(item.id, -1)}
              >
                -
              </button>
              <span className="min-w-[32px] text-center text-sm font-semibold text-slate-900 dark:text-white">
                {item.quantity}
              </span>
              <button
                type="button"
                className="h-8 w-8 rounded-full border border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-200"
                onClick={() => updateQuantity(item.id, 1)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-[32px] border border-slate-900 bg-slate-900 p-8 text-white shadow-lg">
        <h2 className="text-lg font-semibold">{labels.summary[locale]}</h2>
        <div className="mt-6 space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-white/70">{labels.subtotal[locale]}</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/70">{labels.shipping[locale]}</span>
            <span>{locale === "fa" ? "رایگان" : "Free"}</span>
          </div>
          <div className="flex items-center justify-between text-base font-semibold">
            <span>{labels.total[locale]}</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>
        <button
          type="button"
          className="mt-6 w-full rounded-full bg-white px-4 py-3 text-sm font-semibold text-slate-900"
        >
          {labels.checkout[locale]}
        </button>
      </div>
    </div>
  );
};

export default CartClient;
