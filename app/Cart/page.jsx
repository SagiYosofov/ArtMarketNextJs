"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import data from "../Artworks/dbArtworks.json";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Get cart IDs from localStorage
    const cartIds = JSON.parse(localStorage.getItem('artGalleryCart') || '[]');
    
    // Find the full artwork data for each ID in the cart
    const cartItemsData = cartIds.map(id => 
      data.artworks.find(artwork => artwork.id === id)
    ).filter(item => item); // Filter out any undefined items

    setCartItems(cartItemsData);
  }, []); // Empty dependency array means this runs once on mount

  const handleRemoveItem = (itemId) => {
    // Remove from state
    setCartItems(cartItems.filter((item) => item.id !== itemId));
    
    // Remove from localStorage
    const cartIds = JSON.parse(localStorage.getItem('artGalleryCart') || '[]');
    const updatedCart = cartIds.filter(id => id !== itemId);
    localStorage.setItem('artGalleryCart', JSON.stringify(updatedCart));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div className="mt-20 container mx-auto px-4 relative z-0">
      <h2 className="text-3xl font-bold mb-8">🛒 Your Cart</h2>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl hover:scale-[1.02] hover:ring-2 hover:ring-blue-400 dark:hover:ring-blue-500 transition-all duration-300"
            >
              <div className="flex flex-col">
                <div className="w-full h-48 overflow-hidden relative">
                  <img
                    src={item.picture}
                    alt={item.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6 flex-1">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    🎨 {item.artistName}
                  </p>
                  <p className="text-gray-700 dark:text-gray-400 mb-4">
                    💵 ${item.price.toLocaleString()}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-300 text-center">
          Your cart is empty.
        </p>
      )}

      {cartItems.length > 0 && (
        <div className="mt-8 flex justify-between items-center">
          <h3 className="text-2xl font-bold">
            Total: 💵 ${getTotalPrice()}
          </h3>
          <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;