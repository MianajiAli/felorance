import React from "react";

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

interface PageProps {
  params: { slug: string };
}

const fetchProduct = async (slug: string): Promise<Product | null> => {
  const res = await fetch(`http://127.0.0.1:8000/api/products/${slug}/`, {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    console.error("خطا در دریافت محصول:", res.status);
    return null;
  }

  return res.json();
};

const Page = async ({ params }: PageProps) => {
  const product = await fetchProduct(params.slug);

  if (!product) {
    return <p className="text-center mt-10">محصول یافت نشد.</p>;
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-right">
          {product.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Images gallery */}
          <div className="flex flex-col gap-4">
            {product.images.length > 0 ? (
              product.images.map((img) => (
                <img
                  key={img.id}
                  src={img.image}
                  alt={img.alt_text || product.name}
                  className="w-full rounded-lg object-cover h-64"
                />
              ))
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-400">
                بدون تصویر
              </div>
            )}
          </div>

          {/* Product details */}
          <div className="text-right flex flex-col justify-between">
            <p className="text-gray-700 mb-2">
              <strong>جنس:</strong> {product.material}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>خلوص:</strong> {product.purity}٪
            </p>
            <p className="text-gray-700 mb-2">
              <strong>وزن:</strong> {product.weight} گرم
            </p>
            <p className="text-gray-700 mb-2">
              <strong>وضعیت موجودی:</strong>{" "}
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  product.stock > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {product.stock > 0 ? "موجود" : "ناموجود"}
              </span>
            </p>
            <p className="text-gray-600 mt-4">{product.description}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
