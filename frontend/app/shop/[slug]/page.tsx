"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSettings } from "@/components/SettingsProvider";

const products = {
  "luna-drop-earrings": {
    fa: {
      title: "گوشواره لونا",
      description: "گوشواره قطره‌ای با اوپال و پرداخت دستی.",
      price: "۵٫۹۰۰٫۰۰۰ تومان",
      details: ["نقره ۹۲۵", "اوپال آزمایشگاهی", "گارانتی تعویض ۱۴ روزه"],
    },
    en: {
      title: "Luna Drop Earrings",
      description: "Sculpted drop earrings with hand-set opal.",
      price: "$148",
      details: ["925 silver", "Lab-grown opal", "14-day exchange"],
    },
  },
  "eclipse-chain": {
    fa: {
      title: "زنجیر اکلیپس",
      description: "زنجیر قابل تنظیم با مدال‌های نقره مات.",
      price: "۸٫۴۰۰٫۰۰۰ تومان",
      details: ["طول قابل تنظیم", "مدال‌های برس‌خورده", "ارسال رایگان"],
    },
    en: {
      title: "Eclipse Chain",
      description: "Adjustable chain with brushed silver medallions.",
      price: "$218",
      details: ["Adjustable length", "Brushed medallions", "Free shipping"],
    },
  },
  "solstice-cuff": {
    fa: {
      title: "دستبند سولستیس",
      description: "کاف استیتمنت با حکاکی ستاره و پرداخت ساتن.",
      price: "۷٫۱۰۰٫۰۰۰ تومان",
      details: ["استیل قابل تنظیم", "پرداخت ساتن", "بسته‌بندی هدیه"],
    },
    en: {
      title: "Solstice Cuff",
      description: "Statement cuff with satin finish and star engraving.",
      price: "$188",
      details: ["Adjustable fit", "Satin finish", "Gift wrap"],
    },
  },
} as const;

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { language } = useSettings();
  const isFa = language === "fa";
  const product = useMemo(() => products[params.slug as keyof typeof products], [params.slug]);

  if (!product) {
    return (
      <main className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="surface rounded-[32px] p-10 text-center">
          <p className="text-sm text-muted">{isFa ? "محصول پیدا نشد" : "Product not found"}</p>
          <Link href="/shop" className="mt-6 inline-block font-semibold text-[var(--foreground)]">
            {isFa ? "بازگشت به فروشگاه" : "Back to shop"}
          </Link>
        </div>
      </main>
    );
  }

  const content = product[language];

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <article className="surface rounded-[32px] p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
          {isFa ? "جزئیات محصول" : "Product details"}
        </p>
        <h1 className="mt-3 text-3xl font-semibold">{content.title}</h1>
        <p className="mt-3 text-sm text-muted">{content.description}</p>
        <p className="mt-6 text-2xl font-semibold">{content.price}</p>
        <ul className="mt-6 space-y-2 text-sm text-muted">
          {content.details.map((detail) => (
            <li key={detail}>• {detail}</li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/cart"
            className="rounded-full bg-[var(--foreground)] px-6 py-3 text-sm font-semibold text-[var(--background)]"
          >
            {isFa ? "افزودن به سبد" : "Add to cart"}
          </Link>
          <Link
            href="/orders"
            className="rounded-full border border-subtle px-6 py-3 text-sm font-semibold text-muted"
          >
            {isFa ? "پیگیری سفارش" : "Track order"}
          </Link>
        </div>
      </article>
    </main>
  );
}
