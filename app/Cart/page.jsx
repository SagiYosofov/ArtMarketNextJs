"use client";
import React, { useState, useEffect } from "react";
import ItemComponent from "../Artworks/ItemComponent";
import { useData } from '@/context/DataContext';
import { useRouter } from 'next/navigation';

const CartPage = () => { 
  const [cartItems, setCartItems] = useState([]);
  const [totalSum, setTotalSum] = useState(0);
  const router = useRouter();
  const { artworksData, isLoading, error } = useData();

  useEffect(() => {
    if (!artworksData.artworks) return;

    try {
      // Get saved art from localStorage
      const cartData = JSON.parse(localStorage.getItem('artGalleryCart') || '[]');

      // Match cart items with artwork data
      const cartArtworks = cartData.map(cartItem => 
        artworksData.artworks.find(artwork => artwork.id === cartItem.id)
      ).filter(Boolean);

      setCartItems(cartArtworks);

      // Calculate total sum
      const total = cartArtworks.reduce((sum, item) => sum + parseFloat(item.price), 0);
      setTotalSum(total);
    } catch (err) {
      console.error('Error loading cart:', err);
      // Clear potentially corrupted cart data
      localStorage.removeItem('artGalleryCart');
      setCartItems([]);
      setTotalSum(0);
    }
  }, [artworksData]);

  const handleRemoveItem = (itemId) => {
    try {
      // Remove locally first to give visual feedback
      setCartItems(cartItems.filter(item => item.id !== itemId));

      // Remove from localStorage
      const cartData = JSON.parse(localStorage.getItem('artGalleryCart') || '[]');
      const updatedCart = cartData.filter(item => item.id !== itemId);
      localStorage.setItem('artGalleryCart', JSON.stringify(updatedCart));

      // Update total sum
      const newTotal = cartItems
        .filter(item => item.id !== itemId)
        .reduce((sum, item) => sum + parseFloat(item.price), 0);
      setTotalSum(newTotal);
    } catch (err) {
      console.error('Error removing item from cart:', err);
    }
  };

  const handleCheckout = () => {
    router.push('/Payment');
  };

  if (isLoading) {
    return (
      <div className="mt-20 container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">🛒 Your Cart</h2>
        <p>Loading cart items...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-20 container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">🛒 Your Cart</h2>
        <p className="text-red-500">Error loading cart: {error}</p>
      </div>
    );
  }

  return (
    <div className="mt-20 container mx-auto px-4 relative z-0">
      <h2 className="text-3xl font-bold mb-8">🛒 Your Cart</h2>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
        Tap an item to remove from cart
      </p>

      {cartItems.length > 0 ? (
        <>
          <ItemComponent 
            artworksData={cartItems}
            handleArtworkClick={handleRemoveItem}
          />
          <div className="flex flex-col items-center mt-8 mb-12">
            <p className="text-xl font-semibold mb-4">
              Total to pay: ${totalSum.toFixed(2)}
            </p>
            <button
              onClick={handleCheckout}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-600 dark:text-gray-300 text-center">
          Your cart is empty.
        </p>
      )}
    </div>
  );
};

export default CartPage;