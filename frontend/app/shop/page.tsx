import Link from "next/link";
import { products } from "@/lib/storefront-data";
import { getLocale } from "@/lib/i18n-server";

export const metadata = {
  title: "Shop",
  description: "Explore curated Felorance jewelry collections and best sellers.",
};

export default function ShopPage() {
  const locale = getLocale();
  const isRtl = locale === "fa";

  return (
    <main className={`mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 ${isRtl ? "text-right" : "text-left"}`}>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
            {isRtl ? "فروشگاه" : "Shop"}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
            {isRtl ? "منتخب زیورآلات فلورنس" : "Curated Felorance jewelry"}
          </h1>
        </div>
        <Link
          href="/cart"
          className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white"
        >
          {isRtl ? "مشاهده سبد" : "View cart"}
        </Link>
      </header>
      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.slug}
            className="rounded-3xl border border-white/60 bg-[var(--card)] p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                {product.title[locale]}
              </h2>
              <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-600">
                {product.price}
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              {product.detail[locale]}
            </p>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-300">
              <span>{product.status[locale]}</span>
              <Link
                href={`/shop/${product.slug}`}
                className="font-semibold text-slate-900 dark:text-white"
              >
                {isRtl ? "جزئیات" : "Details"}
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
