import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await params
  const { slug } = await params;

  const res = await fetch(`http://127.0.0.1:8000/api/posts/${slug}/`, {
    cache: "no-store",
  });

  if (!res.ok) return <h1 className="text-center mt-10">Not Found</h1>;

  const post = await res.json();

  return (
    <article className="prose lg:prose-xl mx-auto p-6">
      <h1>{post.title}</h1>
      <MDXRemote
        source={post.content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
          },
        }}
      />
    </article>
  );
}
