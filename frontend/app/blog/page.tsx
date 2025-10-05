"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Pagination from "@/components/Pagination";

export default function BlogList() {
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`http://127.0.0.1:8000/api/posts/?page=${page}`, {
        cache: "no-store",
      });
      const data = await res.json();
      setPosts(data.results);
      setTotalPages(Math.ceil(data.count / 10)); // adjust per your pagination settings
    };
    fetchPosts();
  }, [page]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
        Blog
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="block bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
          >
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}

            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-blue-600">
                {post.title}
              </h2>
              <p className="text-gray-600 text-sm line-clamp-3">
                {post.content?.slice(0, 120) ||
                  // post.excerpt ||
                  // post.description?.slice(0, 120) + "..." ||
                  "No description available."}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}
