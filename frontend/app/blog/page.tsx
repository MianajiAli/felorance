import Link from "next/link";
import { getPosts } from "@/lib/api";
import { getServerSettings } from "@/lib/server-settings";

const excerpt = (content: string) => {
  if (!content) return "";
  return content.length > 120 ? `${content.slice(0, 120)}...` : content;
};

export default async function BlogPage() {
  const { language } = getServerSettings();
  const isFa = language === "fa";
  const posts = await getPosts().catch(() => []);

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
        {posts.length ? (
          posts.map((post) => (
            <article key={post.id} className="surface rounded-3xl p-6">
              <span className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">
                {post.meta_keywords?.split(",")[0] ?? (isFa ? "ژورنال" : "Journal")}
              </span>
              <h2 className="mt-3 text-lg font-semibold">{post.title}</h2>
              <p className="mt-3 text-sm text-muted">{excerpt(post.content)}</p>
              <div className="mt-6 flex items-center justify-between text-xs text-muted">
                <span>{new Date(post.created_at).toLocaleDateString(language === "fa" ? "fa-IR" : "en-US")}</span>
                <Link href={`/blog/${post.slug}`} className="font-semibold text-[var(--foreground)]">
                  {isFa ? "ادامه" : "Read"}
                </Link>
              </div>
            </article>
          ))
        ) : (
          <div className="surface rounded-3xl p-6 text-sm text-muted">
            {isFa ? "هنوز مقاله‌ای منتشر نشده است." : "No posts yet."}
          </div>
        )}
      </section>
    </main>
  );
}
