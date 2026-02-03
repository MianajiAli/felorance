"use client";

import Link from "next/link";
import { useSettings } from "@/components/SettingsProvider";

const posts = {
  fa: [
    {
      slug: "ethical-gemstones",
      title: "چگونه سنگ‌های اخلاقی انتخاب می‌کنیم",
      excerpt: "راهنمای کوتاه درباره تامین پایدار و ردپای شفاف هر قطعه.",
      date: "۱ مهر ۱۴۰۳",
      category: "پشت صحنه",
    },
    {
      slug: "silver-layering",
      title: "لایه‌بندی نقره با رنگ‌های گرم",
      excerpt: "نکات استایلینگ برای ترکیب نقره، رزگلد و سنگ‌های طبیعی.",
      date: "۱۳ مهر ۱۴۰۳",
      category: "استایلینگ",
    },
    {
      slug: "studio-craft",
      title: "ظرافت در ساخت هر قفل",
      excerpt: "هر قفل یک امضا است؛ از طراحی تا پرداخت نهایی.",
      date: "۲۵ مهر ۱۴۰۳",
      category: "یادداشت استودیو",
    },
  ],
  en: [
    {
      slug: "ethical-gemstones",
      title: "How we source ethical gemstones",
      excerpt: "A quick guide to traceable sourcing and responsible partners.",
      date: "Sep 22, 2024",
      category: "Studio Notes",
    },
    {
      slug: "silver-layering",
      title: "Layering silver with warm tones",
      excerpt: "Styling tips for mixing silver, rose gold, and natural stones.",
      date: "Oct 05, 2024",
      category: "Styling",
    },
    {
      slug: "studio-craft",
      title: "The craft behind every clasp",
      excerpt: "Every clasp is a signature, from sketch to polish.",
      date: "Oct 17, 2024",
      category: "Studio Notes",
    },
  ],
};

export default function BlogPage() {
  const { language } = useSettings();
  const isFa = language === "fa";

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-12 sm:px-6 lg:px-8">
      <header className="surface rounded-[32px] p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
          {isFa ? "وبلاگ فلورنس" : "Felorance Journal"}
        </p>
        <h1 className="mt-3 text-3xl font-semibold">
          {isFa ? "داستان‌هایی از استودیو" : "Stories from the studio"}
        </h1>
        <p className="mt-3 text-sm text-muted">
          {isFa
            ? "جدیدترین مقاله‌ها درباره طراحی، نگهداری و استایلینگ." 
            : "Latest articles on design, care, and styling."}
        </p>
      </header>

      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        {posts[language].map((post) => (
          <article key={post.slug} className="surface rounded-3xl p-6">
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
              {post.category}
            </span>
            <h2 className="mt-3 text-lg font-semibold">{post.title}</h2>
            <p className="mt-3 text-sm text-muted">{post.excerpt}</p>
            <div className="mt-6 flex items-center justify-between text-xs text-muted">
              <span>{post.date}</span>
              <Link href={`/blog/${post.slug}`} className="font-semibold text-[var(--foreground)]">
                {isFa ? "ادامه" : "Read"}
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
