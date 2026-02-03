import type { Language } from "@/lib/types";

export interface ProductImage {
  id: number;
  image: string;
  alt_text: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  weight: number | null;
  purity: string;
  material: string;
  stock: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  price: string;
  currency: string;
  images: ProductImage[];
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  header_image_url: string | null;
  thumbnail_url: string | null;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  og_image_url: string | null;
  created_at: string;
}

export interface CartItem {
  id: number;
  quantity: number;
  unit_price: string;
  subtotal: string;
  product: Product;
}

export interface Cart {
  id: number;
  items: CartItem[];
  total_quantity: number;
  subtotal: string;
  updated_at: string;
}

export interface OrderItem {
  id: number;
  quantity: number;
  unit_price: string;
  subtotal: string;
  product: Product;
}

export interface Order {
  id: number;
  order_number: string;
  status: string;
  subtotal: string;
  shipping_cost: string;
  total: string;
  shipping_address: string;
  notes: string;
  created_at: string;
  items: OrderItem[];
}

export interface Payment {
  id: number;
  order: number;
  provider: string;
  status: string;
  amount: string;
  transaction_reference: string;
  created_at: string;
}

export interface UserProfile {
  id: number;
  mobile: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  is_staff: boolean;
  date_joined: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8000/api";

const fetchJSON = async <T>(path: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    next: options?.next ?? { revalidate: 60 },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API request failed (${response.status}): ${errorText}`);
  }

  return response.json() as Promise<T>;
};

export const getProducts = async (): Promise<Product[]> => {
  const data = await fetchJSON<{ results?: Product[] } | Product[]>("/products/");
  if (Array.isArray(data)) return data;
  return data.results ?? [];
};

export const getProduct = async (slug: string): Promise<Product | null> => {
  try {
    return await fetchJSON<Product>(`/products/${slug}/`);
  } catch {
    return null;
  }
};

export const getPosts = async (): Promise<Post[]> => {
  const data = await fetchJSON<{ results?: Post[] } | Post[]>("/posts/");
  if (Array.isArray(data)) return data;
  return data.results ?? [];
};

export const getPost = async (slug: string): Promise<Post | null> => {
  try {
    return await fetchJSON<Post>(`/posts/${slug}/`);
  } catch {
    return null;
  }
};

export const getCart = async (token: string): Promise<Cart> => {
  return fetchJSON<Cart>("/cart/", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
};

export const getOrders = async (token: string): Promise<Order[]> => {
  const data = await fetchJSON<{ results?: Order[] } | Order[]>("/orders/", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (Array.isArray(data)) return data;
  return data.results ?? [];
};

export const getPayments = async (token: string): Promise<Payment[]> => {
  const data = await fetchJSON<{ results?: Payment[] } | Payment[]>("/payments/", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (Array.isArray(data)) return data;
  return data.results ?? [];
};

export const getCurrentUser = async (token: string): Promise<UserProfile | null> => {
  try {
    return await fetchJSON<UserProfile>("/auth/me/", {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
  } catch {
    return null;
  }
};

export const formatPrice = (value: string | number, language: Language, currency = "IRR") => {
  const amount = typeof value === "string" ? Number(value) : value;
  if (Number.isNaN(amount)) return String(value);

  return new Intl.NumberFormat(language === "fa" ? "fa-IR" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};
