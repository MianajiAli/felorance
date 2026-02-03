import CartClient from "@/components/CartClient";
import { products } from "@/lib/storefront-data";
import { getLocale } from "@/lib/i18n-server";

export const metadata = {
  title: "Cart",
  description: "Review your Felorance selections before checkout.",
};

export default function CartPage() {
  const locale = getLocale();
  const isRtl = locale === "fa";

  const items = products.slice(0, 3).map((product) => ({
    id: product.slug,
    name: product.title[locale],
    price: Number(product.price.replace("$", "")),
    quantity: 1,
  }));

  return (
    <main className={`mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 ${isRtl ? "text-right" : "text-left"}`}>
      <header>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
          {isRtl ? "سبد خرید" : "Cart"}
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
          {isRtl ? "انتخاب‌های شما آماده ارسال است" : "Your selections are ready to ship"}
        </h1>
      </header>
      <div className="mt-10">
        <CartClient initialItems={items} locale={locale} />
      </div>
    </main>
  );
}
