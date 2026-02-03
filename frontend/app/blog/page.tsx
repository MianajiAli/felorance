import Link from "next/link";
import { blogPosts } from "@/lib/storefront-data";
import { getLocale } from "@/lib/i18n-server";

export const metadata = {
  title: "Journal",
  description: "Editorial updates, styling notes, and studio news from Felorance.",
};

export default function BlogPage() {
  const locale = getLocale();
  const isRtl = locale === "fa";

  return (
    <main className={`mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 ${isRtl ? "text-right" : "text-left"}`}>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
            {isRtl ? "وبلاگ فلورنس" : "Felorance Journal"}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
            {isRtl ? "بینش‌های استودیو و راهنمای استایل" : "Studio insights and styling guides"}
          </h1>
        </div>
        <Link
          href="/auth/sign-up"
          className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
        >
          {isRtl ? "عضویت در خبرنامه" : "Join the newsletter"}
        </Link>
      </header>
      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="rounded-3xl border border-white/60 bg-[var(--card)] p-6 shadow-sm"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-rose-500">
              {post.tag[locale]}
            </span>
            <h2 className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">
              {post.title[locale]}
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              {post.excerpt[locale]}
            </p>
            <div className="mt-6 flex items-center justify-between text-xs text-slate-500 dark:text-slate-300">
              <span>{post.date}</span>
              <Link href={`/blog/${post.slug}`} className="font-semibold text-slate-900 dark:text-white">
                {isRtl ? "ادامه" : "Read"}
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
