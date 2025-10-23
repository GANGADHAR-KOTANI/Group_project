// context/CartContext.js
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null); // store logged-in or registered user

  // 🛒 CART FUNCTIONS
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

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((it) => it.id !== id));
  };

  const clearCart = () => setCartItems([]);

  // 👤 USER FUNCTIONS
  const registerUser = (userData) => setUser(userData);
  const loginUser = (userData) => setUser(userData);
  const logoutUser = () => {
    setUser(null);
    clearCart();
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,      // ✅ Add this line
        addToCart,
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
