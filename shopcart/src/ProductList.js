import React, { useState } from "react";
import "./styles.css";

// Products data (images from public/products folder)
const products = [
  { id: 1, name: "Unisex Cologne", image: process.env.PUBLIC_URL + "/products/cologne.jpg" },
  { id: 2, name: "Apple iWatch", image: process.env.PUBLIC_URL + "/products/iwatch.jpg" },
  { id: 3, name: "Unique Mug", image: process.env.PUBLIC_URL + "/products/mug.jpg" },
  { id: 4, name: "Mens Wallet", image: process.env.PUBLIC_URL + "/products/wallet.jpg" },
];

export default function ProductList({ onQuantityChange }) {
  const [quantities, setQuantities] = useState(
    products.reduce((acc, p) => ({ ...acc, [p.id]: 0 }), {})
  );

  const handleChange = (id, value) => {
    const newQuantities = { ...quantities, [id]: parseInt(value) || 0 };
    setQuantities(newQuantities);
    onQuantityChange(newQuantities);
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-row">
          <img src={product.image} alt={product.name} className="product-img" />
          <div className="product-info">
            <h3>{product.name}</h3>
            <input
              type="number"
              min="0"
              value={quantities[product.id]}
              onChange={(e) => handleChange(product.id, e.target.value)}
              className="qty-input"
            />
            <span>quantity</span>
          </div>
        </div>
      ))}
    </div>
  );
}
