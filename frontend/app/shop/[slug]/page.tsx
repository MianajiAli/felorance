import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, getProduct } from "@/lib/api";
import { getServerSettings } from "@/lib/server-settings";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { language } = getServerSettings();
  const isFa = language === "fa";
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <article className="surface rounded-[32px] p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
          {isFa ? "جزئیات محصول" : "Product details"}
        </p>
        <h1 className="mt-3 text-3xl font-semibold">{product.name}</h1>
        <p className="mt-3 text-sm text-muted">{product.description}</p>
        <p className="mt-6 text-2xl font-semibold">{formatPrice(product.price, language, product.currency)}</p>
        <ul className="mt-6 space-y-2 text-sm text-muted">
          <li>• {isFa ? "جنس" : "Material"}: {product.material}</li>
          <li>• {isFa ? "خلوص" : "Purity"}: {product.purity}%</li>
          <li>• {isFa ? "وزن" : "Weight"}: {product.weight ?? 0}g</li>
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
