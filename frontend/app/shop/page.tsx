import React from "react";
import Link from "next/link";

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

const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch("http://127.0.0.1:8000/api/products/", {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error(`خطا در دریافت محصولات: ${res.status}`);
  }

  const data: { results?: Product[] } = await res.json();
  return data.results || [];
};

const Page = async () => {
  let products: Product[] = [];

  try {
    products = await fetchProducts();
  } catch (error) {
    console.error("خطا در دریافت محصولات:", error);
  }

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
              const firstImage = product.images?.[0]?.image || null;

              return (
                <Link
                  key={product.id}
                  href={`/shop/${product.slug}`}
                  className="group bg-white rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gray-200 overflow-hidden flex flex-col"
                >
                  <div className="w-full h-56 relative">
                    {firstImage ? (
                      <img
                        src={firstImage}
                        alt={product.name}
                        className="w-full h-full object-cover"
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
      </div>
    </main>
  );
};

export default Page;
