import React, { useState } from "react";

const products = [
  {
    id: 1,
    image: './products/cologne.jpg',
    desc: 'Unisex Cologne',
    price: 35,
    ratings: '4',
    value: 0
  },
  {
    id: 2,
    image: './products/iwatch.jpg',
    desc: 'Apple iWatch',
    price: 199,
    ratings: '3.5',
    value: 0
  },
  {
    id: 3,
    image: './products/mug.jpg',
    desc: 'Unique Mug',
    price: 15,
    ratings: '5',
    value: 0
  },
  {
    id: 4,
    image: './products/wallet.jpg',
    desc: 'Mens Wallet',
    price: 48,
    ratings: '4.5',
    value: 0
  }
];

function ProductList({ onQuantityChange }) {
  const [quantities, setQuantities] = useState({});
  const [sortOption, setSortOption] = useState("normal");

  const sanitize = (v) => {
    const n = Math.floor(Number(v));
    return Number.isFinite(n) && n > 0 ? n : 0;
  };

  const updateQty = (id, next) => {
    setQuantities((q) => {
      const updated = { ...q, [id]: sanitize(next) };
      onQuantityChange?.(updated);
      return updated;
    });
  };

  // Sorting logic
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "lowest":
        return a.price - b.price;
      case "highest":
        return b.price - a.price;
      default:
        return a.id - b.id;
    }
  });

  return (
    <div className="product-list">
      {/* Sort bar */}
      <div className="sort-bar" style={{ textAlign: "center", margin: "15px 0" }}>
        <label htmlFor="sortMenu" style={{ marginRight: "5px" }}>
          Sort Price By:
        </label>
        <select
          id="sortMenu"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="normal">Normal</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
        </select>
      </div>

      {/* Products list */}
      <div className="products-container">
        {sortedProducts.map((p) => (
          <div key={p.id} className="product-item" style={{ borderBottom: "1px solid #eee", padding: "20px 0" }}>
            {/* Title + price inline */}
            <h3>
              {p.desc} <span style={{ color: "red", marginLeft: "8px" }}>${p.price}</span>
            </h3>

            {/* Row: image + controls */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginTop: "10px" }}>
              <img src={p.image} alt={p.desc} width="100" />

              <div className="qty-controls" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button
                  type="button"
                  aria-label={`Increase ${p.desc}`}
                  onClick={() => updateQty(p.id, (quantities[p.id] || 0) + 1)}
                >
                  +
                </button>
                <button
                  type="button"
                  aria-label={`Decrease ${p.desc}`}
                  disabled={!quantities[p.id]}
                  onClick={() => updateQty(p.id, (quantities[p.id] || 0) - 1)}
                >
                  -
                </button>
                <span>Quantity</span>
                <input
                  type="number"
                  min="0"
                  value={quantities[p.id] || 0}
                  onChange={(e) => updateQty(p.id, e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
