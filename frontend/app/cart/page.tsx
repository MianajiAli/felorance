import Link from "next/link";
import { formatPrice, getCart } from "@/lib/api";
import { getAccessToken } from "@/lib/server-auth";
import { getServerSettings } from "@/lib/server-settings";

export default async function CartPage() {
  const { language } = await getServerSettings();
  const isFa = language === "fa";
  const token = await getAccessToken();
  const cart = token ? await getCart(token).catch(() => null) : null;

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="surface rounded-[32px] p-10">
        <h1 className="text-3xl font-semibold">{isFa ? "سبد خرید" : "Your cart"}</h1>
        <p className="mt-3 text-sm text-muted">
          {isFa ? "سفارش خود را قبل از پرداخت مرور کنید." : "Review your order before checkout."}
        </p>
        {!token ? (
          <div className="mt-6 rounded-2xl border border-subtle bg-[var(--surface-muted)] p-6 text-sm text-muted">
            {isFa ? "برای مشاهده سبد خرید وارد شوید." : "Please sign in to view your cart."}
          </div>
        ) : cart?.items?.length ? (
          <div className="mt-6 space-y-4">
            {cart.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-2xl border border-subtle bg-[var(--surface-muted)] p-4">
                <div>
                  <p className="text-sm font-semibold">{item.product.name}</p>
                  <p className="text-xs text-muted">
                    {isFa ? "تعداد" : "Qty"}: {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-semibold">{formatPrice(item.subtotal, language, item.product.currency)}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-subtle bg-[var(--surface-muted)] p-6 text-sm text-muted">
            {isFa ? "سبد خرید شما خالی است." : "Your cart is empty."}
          </div>
        )}
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
