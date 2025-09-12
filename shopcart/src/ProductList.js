import React, { useState } from "react";
import "./styles.css";

// Products data (images in public/products folder)
const products = [
  { id: 1, name: "Unisex Cologne", image: process.env.PUBLIC_URL + "/products/cologne.jpg", rating: 4.2 },
  { id: 2, name: "Apple iWatch", image: process.env.PUBLIC_URL + "/products/iwatch.jpg", rating: 3.5 },
  { id: 3, name: "Unique Mug", image: process.env.PUBLIC_URL + "/products/mug.jpg", rating: 4.8 },
  { id: 4, name: "Mens Wallet", image: process.env.PUBLIC_URL + "/products/wallet.jpg", rating: 4.0 },
];

export default function ProductList({ onQuantityChange }) {
  const [quantities, setQuantities] = useState(
    products.reduce((acc, p) => ({ ...acc, [p.id]: 0 }), {})
  );

  const [selectedProduct, setSelectedProduct] = useState(null);

  const updateQuantity = (id, newQty) => {
    if (newQty < 0) newQty = 0;
    const newQuantities = { ...quantities, [id]: newQty };
    setQuantities(newQuantities);
    onQuantityChange(newQuantities);
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-row">
          <img
            src={product.image}
            alt={product.name}
            className="product-img"
            onClick={() => setSelectedProduct(product)} // 👈 click opens modal
          />
          <div className="product-info">
            <h3>{product.name}</h3>

            <div className="qty-controls">
              <button onClick={() => updateQuantity(product.id, quantities[product.id] + 1)}>+</button>
              <button onClick={() => updateQuantity(product.id, quantities[product.id] - 1)}>-</button>
              <span className="qty-label">Quantity</span>
              <input
                type="number"
                min="0"
                value={quantities[product.id]}
                onChange={(e) => updateQuantity(product.id, parseInt(e.target.value) || 0)}
                className="qty-input"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedProduct.name}</h2>
              <button className="close-btn" onClick={() => setSelectedProduct(null)}>✕</button>
            </div>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="modal-img" />
            <p>Ratings: {selectedProduct.rating}/5</p>
          </div>
        </div>
      )}
    </div>
  );
}
