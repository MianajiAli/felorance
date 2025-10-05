// app/shop/page.tsx
import React from "react";

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  weight: number;
  purity: string;
  material: string;
  stock: number;
  image: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ---------------------------
// Fetch products server-side with caching
// ---------------------------
const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch("http://127.0.0.1:8000/api/products/", {
    next: { revalidate: 300 }, // cache for 5 minutes
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  const data: { results: Product[] } = await res.json();
  return data.results;
};

// ---------------------------
// Page component (Server Component)
// ---------------------------
const Page: React.FC = async () => {
  let products: Product[] = [];

  try {
    products = await fetchProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Shop</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {products.map((product) => (
            <li
              key={product.id}
              style={{
                border: "1px solid #ddd",
                padding: "1rem",
                marginBottom: "1rem",
                borderRadius: "8px",
              }}
            >
              <h2>{product.name}</h2>
              <p>Slug: {product.slug}</p>
              <p>Weight: {product.weight}</p>
              <p>Purity: {product.purity}</p>
              <p>Material: {product.material}</p>
              <p>Stock: {product.stock}</p>
              <p>Active: {product.is_active ? "Yes" : "No"}</p>
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    marginTop: "0.5rem",
                  }}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Page;
