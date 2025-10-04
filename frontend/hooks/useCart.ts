'use client';

import { create } from 'zustand';
import { useEffect } from 'react';

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  setItems: (items: CartItem[]) => void; // for hydration
}

export const useCart = create<CartState>((set, get) => ({
  items: [],

  setItems: (items: CartItem[]) => set({ items }),

  addItem: (item: CartItem) => {
    const items = get().items;
    const exists = items.find(i => i.productId === item.productId);
    if (exists) {
      set({
        items: items.map(i =>
          i.productId === item.productId ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({ items: [...items, { ...item, quantity: 1 }] });
    }
  },

  removeItem: (productId: number) => {
    set({ items: get().items.filter(i => i.productId !== productId) });
  },

  clearCart: () => set({ items: [] }),
}));

// Hydrate from localStorage on client mount
export const useCartPersist = () => {
  const items = useCart(state => state.items);
  const setItems = useCart(state => state.setItems);
  const addItem = useCart(state => state.addItem);
  const removeItem = useCart(state => state.removeItem);
  const clearCart = useCart(state => state.clearCart);

  // Hydrate only once on mount
  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, [setItems]);

  // Persist to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  return { items, addItem, removeItem, clearCart };
};
