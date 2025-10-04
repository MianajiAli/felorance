export default async function BlogList() {
  const res = await fetch("http://127.0.0.1:8000/api/posts/", {
    cache: "no-store",
  });
  const posts = await res.json();

  return (
    <div className="prose mx-auto p-6">
      <h1 className="text-3xl font-bold">Blog</h1>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>
            <a href={`/blog/${post.slug}`} className="text-blue-600 underline">
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
