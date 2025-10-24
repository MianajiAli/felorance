import Link from "next/link";
import Image from "next/image";
import Pagination from "@/components/Pagination";

interface Post {
  id: number;
  slug: string;
  title: string;
  content?: string;
  excerpt?: string;
  thumbnail_url?: string;
  created_at: string;
}

async function getPosts(
  page: number
): Promise<{ results: Post[]; count: number }> {
  const res = await fetch(`http://127.0.0.1:8000/api/posts/?page=${page}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`خطا در دریافت پست‌ها: ${res.status}`);
  return res.json();
}

export default async function BlogList({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params?.page ?? 1);
  const data = await getPosts(page);
  const totalPages = Math.ceil((data.count || 0) / 10);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">
          وبلاگ
        </h1>

        {data.results.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            هیچ پستی یافت نشد.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {data.results.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gray-200 overflow-hidden flex flex-col"
              >
                <div className="w-full h-56 relative">
                  {post.thumbnail_url ? (
                    <Image
                      src={
                        post.thumbnail_url.startsWith("http")
                          ? post.thumbnail_url
                          : `http://127.0.0.1:8000${post.thumbnail_url}`
                      }
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-lg">
                      بدون تصویر
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between text-right">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 truncate">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                      {post.excerpt ||
                        post.content?.slice(0, 140) + "..." ||
                        "توضیحی برای این پست ثبت نشده."}
                    </p>
                  </div>
                  <p className="mt-4 text-xs text-gray-400">
                    {new Date(post.created_at).toLocaleDateString("fa-IR")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-10">
            <Pagination currentPage={page} totalPages={totalPages} />
          </div>
        )}
      </div>
    </main>
  );
}
