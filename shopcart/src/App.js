import React, { useState } from "react";
import ProductList from "./ProductList";
import SignIn from "./SignIn";
import Checkout from "./Checkout";
import "./styles.css";

export default function App() {
  const [cart, setCart] = useState({});
  const [page, setPage] = useState("products"); // "products" | "signin" | "checkout"
  const [user, setUser] = useState(null);
  const [showEmpty, setShowEmpty] = useState(true); // controls empty cart message

  // Update cart quantities
  const handleQuantityChange = (quantities) => {
    setCart(quantities);
    const total = Object.values(quantities).reduce((a, b) => a + b, 0);
    if (total > 0) {
      setShowEmpty(false); // once items exist, stop showing empty screen
    }
  };

  // Total items in cart
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  // Checkout button click
  const handleCheckoutClick = () => {
    if (!user) {
      setPage("signin");
    } else {
      setPage("checkout");
    }
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <h1>Shop 2 React</h1>
        <div className="cart">
          <i className="fas fa-shopping-cart cart-icon"></i>
          <span>{cartCount} items</span>
        </div>
      </header>

      {/* Routing */}
      {page === "products" && (
        <div>
          <h2>Your Cart Items</h2>

          {cartCount === 0 && showEmpty ? (
            <div className="empty-cart">
              <p>There are {cartCount} items in your cart.</p>
              <button
                className="continue-btn"
                onClick={() => {
                  setShowEmpty(false); // hide empty cart, go back to shopping screen
                }}
              >
                Continue Shop
              </button>
            </div>
          ) : (
            <>
              <ProductList onQuantityChange={handleQuantityChange} />
              {cartCount > 0 && (
                <button className="checkout-btn" onClick={handleCheckoutClick}>
                  Check Out
                </button>
              )}
            </>
          )}
        </div>
      )}

      {page === "signin" && (
        <SignIn
          onLogin={(userData) => {
            setUser(userData);
            setPage("checkout");
          }}
        />
      )}

      {page === "checkout" && <Checkout user={user} cart={cart} />}
    </div>
  );
}
