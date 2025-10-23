// context/CartContext.js
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null); // store logged-in or registered user

  // 🛒 Add item to cart
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((it) => it.id === item.id);
      if (existingItem) {
        return prevItems.map((it) =>
          it.id === item.id ? { ...it, quantity: (it.quantity || 1) + 1 } : it
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  // ➕ Increase item quantity
  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((it) =>
        it.id === id ? { ...it, quantity: (it.quantity || 1) + 1 } : it
      )
    );
  };

  // ➖ Decrease item quantity
  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((it) =>
          it.id === id ? { ...it, quantity: Math.max((it.quantity || 1) - 1, 0) } : it
        )
        .filter((it) => it.quantity > 0)
    );
  };

  // ❌ Remove item from cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((it) => it.id !== id));
  };

  // 🧹 Clear all cart items
  const clearCart = () => setCartItems([]);

  // 👤 USER FUNCTIONS
  const registerUser = (userData) => setUser(userData);
  const loginUser = (userData) => setUser(userData);
  const logoutUser = () => {
    setUser(null);
    clearCart();
  };

  // ✅ Export everything including setCartItems so it can be used in CartPage
  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems, // <--- added this back to fix your error
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        user,
        registerUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
