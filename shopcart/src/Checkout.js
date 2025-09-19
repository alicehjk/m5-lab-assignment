import React from "react";

function Checkout({ user, cart }) {
  const items = Object.entries(cart).filter(([_, qty]) => qty > 0);

  return (
    <div className="checkout-container">
      <div className="checkout-card">
        <div className="checkout-card-header">Check Out</div>
        <div className="checkout-card-body">
          {user && (
            <>
              <h2 className="welcome-text">Welcome Back {user.name}!</h2>
              <p className="checkout-subtext">Time to check out?</p>
            </>
          )}

          {items.length > 0 && (
            <ul className="checkout-list">
              {items.map(([product, qty]) => (
                <li key={product}>
                  {product} — Quantity: {qty}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
