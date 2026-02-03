import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/storefront-data";
import { getLocale } from "@/lib/i18n-server";

interface BlogPostPageProps {
  params: { slug: string };
}

export const generateStaticParams = () => blogPosts.map((post) => ({ slug: post.slug }));

export const generateMetadata = ({ params }: BlogPostPageProps) => {
  const post = blogPosts.find((entry) => entry.slug === params.slug);
  if (!post) {
    return { title: "Post" };
  }
  return {
    title: post.title.en,
    description: post.excerpt.en,
  };
};

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((entry) => entry.slug === params.slug);
  const locale = getLocale();
  const isRtl = locale === "fa";

  if (!post) {
    notFound();
  }

  return (
    <main className={`mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8 ${isRtl ? "text-right" : "text-left"}`}>
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
        {post.tag[locale]}
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">
        {post.title[locale]}
      </h1>
      <p className="mt-2 text-xs text-slate-500 dark:text-slate-300">{post.date}</p>
      <div className="mt-8 space-y-6 text-sm text-slate-600 dark:text-slate-300">
        {post.content.map((paragraph, index) => (
          <p key={`${post.slug}-${index}`}>{paragraph[locale]}</p>
        ))}
      </div>
    </main>
  );
}
