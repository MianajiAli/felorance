"use client";

import Link from "next/link";
import { useSettings } from "@/components/SettingsProvider";

const products = {
  fa: [
    {
      slug: "luna-drop-earrings",
      title: "گوشواره لونا",
      price: "۵٫۹۰۰٫۰۰۰ تومان",
      status: "موجود",
    },
    {
      slug: "eclipse-chain",
      title: "زنجیر اکلیپس",
      price: "۸٫۴۰۰٫۰۰۰ تومان",
      status: "پرفروش",
    },
    {
      slug: "solstice-cuff",
      title: "دستبند سولستیس",
      price: "۷٫۱۰۰٫۰۰۰ تومان",
      status: "دراپ محدود",
    },
  ],
  en: [
    {
      slug: "luna-drop-earrings",
      title: "Luna Drop Earrings",
      price: "$148",
      status: "In stock",
    },
    {
      slug: "eclipse-chain",
      title: "Eclipse Chain",
      price: "$218",
      status: "Best seller",
    },
    {
      slug: "solstice-cuff",
      title: "Solstice Cuff",
      price: "$188",
      status: "Limited drop",
    },
  ],
};

export default function ShopPage() {
  const { language } = useSettings();
  const isFa = language === "fa";

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-12 sm:px-6 lg:px-8">
      <header className="surface rounded-[32px] p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
          {isFa ? "فروشگاه" : "Shop"}
        </p>
        <h1 className="mt-3 text-3xl font-semibold">
          {isFa ? "انتخاب‌های منتخب فلورنس" : "Curated Felorance essentials"}
        </h1>
        <p className="mt-3 text-sm text-muted">
          {isFa
            ? "برای هر سفارش، بسته‌بندی هدیه و پشتیبانی اختصاصی دریافت کنید." 
            : "Every order includes gift wrapping and concierge support."}
        </p>
      </header>

      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        {products[language].map((product) => (
          <article key={product.slug} className="surface rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <span className="accent-pill rounded-full px-3 py-1 text-xs font-semibold">
                {product.status}
              </span>
            </div>
            <p className="mt-3 text-sm text-muted">{product.price}</p>
            <div className="mt-6 flex gap-3">
              <Link
                href={`/shop/${product.slug}`}
                className="flex-1 rounded-full border border-subtle px-4 py-2 text-center text-sm font-semibold text-muted"
              >
                {isFa ? "مشاهده" : "View"}
              </Link>
              <Link
                href="/cart"
                className="flex-1 rounded-full bg-[var(--foreground)] px-4 py-2 text-center text-sm font-semibold text-[var(--background)]"
              >
                {isFa ? "افزودن به سبد" : "Add to cart"}
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
