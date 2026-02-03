import Link from "next/link";
import { formatPrice, getPayments } from "@/lib/api";
import { getAccessToken } from "@/lib/server-auth";
import { getServerSettings } from "@/lib/server-settings";

export default async function PaymentsPage() {
  const { language } = getServerSettings();
  const isFa = language === "fa";
  const token = getAccessToken();
  const payments = token ? await getPayments(token).catch(() => []) : [];

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
        <div className="mt-8">
          <h2 className="text-lg font-semibold">{isFa ? "تراکنش‌های اخیر" : "Recent payments"}</h2>
          {!token ? (
            <p className="mt-3 text-sm text-muted">
              {isFa ? "برای مشاهده تراکنش‌ها وارد شوید." : "Sign in to view payment history."}
            </p>
          ) : payments.length ? (
            <div className="mt-4 space-y-3">
              {payments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between rounded-2xl border border-subtle bg-[var(--surface-muted)] p-4 text-sm">
                  <div>
                    <p className="font-semibold">{payment.provider}</p>
                    <p className="text-xs text-muted">{payment.status}</p>
                  </div>
                  <p className="font-semibold">{formatPrice(payment.amount, language)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted">
              {isFa ? "تراکنشی ثبت نشده است." : "No payments yet."}
            </p>
          )}
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
