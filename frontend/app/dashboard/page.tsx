import Link from "next/link";
import { getOrders, getPayments } from "@/lib/api";
import { getAccessToken } from "@/lib/server-auth";
import { getServerSettings } from "@/lib/server-settings";

export default async function DashboardPage() {
  const { language } = await getServerSettings();
  const isFa = language === "fa";
  const token = await getAccessToken();
  const [orders, payments] = token
    ? await Promise.all([getOrders(token).catch(() => []), getPayments(token).catch(() => [])])
    : [[], []];

  const cards = [
    {
      title: isFa ? "سفارش‌های فعال" : "Active orders",
      value: orders.filter((order) => order.status !== "delivered").length.toString(),
      link: "/orders",
    },
    {
      title: isFa ? "روش‌های پرداخت" : "Payment methods",
      value: payments.length.toString(),
      link: "/payments",
    },
    {
      title: isFa ? "محصولات" : "Shop items",
      value: "—",
      link: "/shop",
    },
  ];

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="surface rounded-[32px] p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
          {isFa ? "داشبورد" : "Dashboard"}
        </p>
        <h1 className="mt-3 text-3xl font-semibold">
          {isFa ? "مرکز مدیریت حساب" : "Account command center"}
        </h1>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {cards.map((card) => (
            <Link key={card.title} href={card.link} className="surface-muted rounded-2xl p-6">
              <p className="text-xs uppercase tracking-wide text-muted">{card.title}</p>
              <p className="mt-3 text-2xl font-semibold">{card.value}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
