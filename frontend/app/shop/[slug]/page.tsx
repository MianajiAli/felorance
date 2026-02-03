import { notFound } from "next/navigation";
import { products } from "@/lib/storefront-data";
import { getLocale } from "@/lib/i18n-server";

interface ShopDetailPageProps {
  params: { slug: string };
}

export const generateStaticParams = () => products.map((product) => ({ slug: product.slug }));

export const generateMetadata = ({ params }: ShopDetailPageProps) => {
  const product = products.find((item) => item.slug === params.slug);
  if (!product) {
    return { title: "Product" };
  }
  return {
    title: product.title.en,
    description: product.detail.en,
  };
};

export default function ShopDetailPage({ params }: ShopDetailPageProps) {
  const product = products.find((item) => item.slug === params.slug);
  const locale = getLocale();
  const isRtl = locale === "fa";

  if (!product) {
    notFound();
  }

  return (
    <main className={`mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8 ${isRtl ? "text-right" : "text-left"}`}>
      <div className="rounded-[32px] border border-white/60 bg-[var(--card)] p-10 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
          {isRtl ? "جزئیات محصول" : "Product detail"}
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
          {product.title[locale]}
        </h1>
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
          {product.detail[locale]}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <span className="rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-600">
            {product.price}
          </span>
          <span className="text-sm text-slate-500 dark:text-slate-300">{product.status[locale]}</span>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-[var(--muted)] p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
              {isRtl ? "مواد" : "Materials"}
            </p>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
              {isRtl ? "نقره استرلینگ، سنگ قیمتی منتخب" : "Sterling silver, curated gemstone"}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-[var(--muted)] p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
              {isRtl ? "زمان ارسال" : "Shipping"}
            </p>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
              {isRtl ? "۲ تا ۳ روز کاری" : "2-3 business days"}
            </p>
          </div>
        </div>
        <button className="mt-8 w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white">
          {isRtl ? "افزودن به سبد" : "Add to cart"}
        </button>
      </div>
    </main>
  );
}
