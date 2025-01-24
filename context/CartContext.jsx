"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();






// cartData is the array state of artwork ID for purchasing
// hasCartItems used for the green background around cart button




export const CartProvider = ({ children }) => {
  const [hasCartItems, setHasCartItems] = useState(false);

  // Check cart status whenever localStorage changes
  useEffect(() => {
    const checkCart = () => {
      try {
        const cartData = JSON.parse(localStorage.getItem('artGalleryCart') || '[]');
        setHasCartItems(cartData.length > 0);
      } catch (err) {
        setHasCartItems(false);
      }
    };

    // Check initially
    checkCart();

    // Add event listener for storage changes
    window.addEventListener('storage', checkCart);

    // Create a custom event listener for cart updates
    window.addEventListener('cartUpdate', checkCart);

    // Cleanup
    return () => {
      window.removeEventListener('storage', checkCart);
      window.removeEventListener('cartUpdate', checkCart);
    };
  }, []);

  return (
    <CartContext.Provider value={{ hasCartItems, setHasCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
}; 