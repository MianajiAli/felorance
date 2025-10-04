"use client";
import { useCartPersist } from "@/hooks/useCart";

export default function TestCartPage() {
  const { items, addItem, removeItem, clearCart } = useCartPersist();

  const testProduct = {
    productId: 1,
    name: "Test Product",
    price: 50,
    quantity: 1,
  };

  return (
    <div className="p-4 space-y-4">
      <button onClick={() => addItem(testProduct)}>Add Test Product</button>
      <button onClick={() => clearCart()}>Clear Cart</button>
      <ul>
        {items.map((item) => (
          <li key={item.productId}>
            {item.name} x {item.quantity} - ${item.price * item.quantity}
            <button onClick={() => removeItem(item.productId)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
