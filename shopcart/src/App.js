import React, { useState } from "react";
import ProductList from "./ProductList";
import "./styles.css";

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  const handleQuantityChange = (quantities) => {
    const total = Object.values(quantities).reduce((a, b) => a + b, 0);
    setCartCount(total);
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <h1>Shop to React</h1>
        <div className="cart">
          <i className="fas fa-shopping-cart cart-icon"></i>
          <span>{cartCount} items</span>
        </div>
      </header>

      {/* Product List */}
      <ProductList onQuantityChange={handleQuantityChange} />
    </div>
  );
}
