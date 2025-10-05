import Link from "next/link";

// app/blog/page.tsx
export default async function BlogList() {
  const res = await fetch("http://127.0.0.1:8000/api/posts/", {
    cache: "no-store", // disables caching
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const postsData: { results: any[] } = await res.json();
  const posts = postsData.results;

  return (
    <div className="prose mx-auto p-6">
      <h1 className="text-3xl font-bold">Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              href={`/blog/${post.slug}`}
              className="text-blue-600 underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
