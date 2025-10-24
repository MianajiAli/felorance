// app/shop/page.tsx
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/components/Pagination";

export interface ProductImage {
  id: number;
  image: string;
  alt_text?: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  weight: number;
  purity: string;
  material: string;
  stock: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  images: ProductImage[];
}

interface ProductResponse {
  results: Product[];
  count: number;
}

// Fetch products from API
async function fetchProducts(page: number): Promise<ProductResponse> {
  const res = await fetch(`http://127.0.0.1:8000/api/products/?page=${page}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`خطا در دریافت محصولات: ${res.status}`);

  return res.json();
}

// Server component
export default async function ShopPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params?.page ?? 1);

  let data: ProductResponse = { results: [], count: 0 };
  try {
    data = await fetchProducts(page);
  } catch (error) {
    console.error("خطا در دریافت محصولات:", error);
  }

  const products = data.results || [];
  const totalPages = Math.ceil((data.count || 0) / 10);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">
          فروشگاه
        </h1>

        {products.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            هیچ محصولی یافت نشد.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => {
              const firstImage = product.images?.[0]?.image
                ? product.images[0].image.startsWith("http")
                  ? product.images[0].image
                  : `http://127.0.0.1:8000${product.images[0].image}`
                : null;

              return (
                <Link
                  key={product.id}
                  href={`/shop/${product.slug}`}
                  className="group bg-white rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gray-200 overflow-hidden flex flex-col"
                >
                  <div className="relative w-full h-56">
                    {firstImage ? (
                      <Image
                        src={firstImage}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
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
                        {product.name}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        {product.material} – خلوص {product.purity}٪
                      </p>
                      <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                        {product.description ||
                          "توضیحی برای این محصول ثبت نشده."}
                      </p>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm text-gray-700 font-medium">
                        وزن: {product.weight} گرم
                      </span>
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          product.stock > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.stock > 0 ? "موجود" : "ناموجود"}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-10">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              basePath="/shop"
            />
          </div>
        )}
      </div>
    </main>
  );
}
