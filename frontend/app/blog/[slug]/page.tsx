import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/api";
import { getServerSettings } from "@/lib/server-settings";

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const { language } = getServerSettings();
  const isFa = language === "fa";
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const paragraphs = post.content
    ? post.content.split(/\n+/).filter(Boolean)
    : [];

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <article className="surface rounded-[32px] p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
          {isFa ? "داستان استودیو" : "Studio story"}
        </p>
        <h1 className="mt-3 text-3xl font-semibold">{post.title}</h1>
        {post.meta_description ? <p className="mt-4 text-sm text-muted">{post.meta_description}</p> : null}
        <div className="mt-8 space-y-4 text-sm text-muted">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/blog" className="text-sm font-semibold text-[var(--foreground)]">
            {isFa ? "بازگشت" : "Back"}
          </Link>
        </div>
      </article>
    </main>
  );
}
