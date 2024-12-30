"use client";
import React, { useState } from "react";
import Image from "next/image";

const mockCartData = [
  {
    id: 1,
    name: "Starry Night",
    artist: "Vincent van Gogh",
    price: 120,
    picture: "starry-night.jpg",
  },
  {
    id: 2,
    name: "Mona Lisa",
    artist: "Leonardo da Vinci",
    price: 150,
    picture: "mona-lisa.jpg",
  },
  {
    id: 3,
    name: "The Persistence of Memory",
    artist: "Salvador Dalí",
    price: 100,
    picture: "persistence-of-memory.jpg",
  },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(mockCartData);

  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
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
                  <Image
                    src={`/artworks/${item.picture}`}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 flex-1">
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    🎨 {item.artist}
                  </p>
                  <p className="text-gray-700 dark:text-gray-400 mb-4">
                    💵 ${item.price.toFixed(2)}
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