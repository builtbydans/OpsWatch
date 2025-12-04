"use client";

import { useState } from "react";
import ProductList from "@/components/shop/ProductList";
import CartSummary from "@/components/shop/CartSummary";

const initialProducts = [
  { id: 1, name: "Apple", price: 1.2, inCart: false },
  { id: 2, name: "Orange", price: 0.8, inCart: false },
  { id: 3, name: "Banana", price: 1.0, inCart: false },
];

export default function Shop() {
  const [products, setProducts] = useState(initialProducts);

  // Child calls this with a product object
  const handleAddToCart = (product) => {
    const updated = products.map((p) => {
      if (p.id !== product.id) {
        return p;
      }

      return {
        ...p,
        inCart: !p.inCart, // or toggle: !p.inCart
      };
    });

    setProducts(updated);
  };

  return (
    <div className="flex gap-8 p-6">
      <ProductList products={products} onAddToCart={handleAddToCart} />
      <CartSummary products={products} />
    </div>
  );
}
