"use client";
import React from "react";
import ItemComponent from "../../components/ItemComponent";
import { useCart } from '@/hooks/useCart';

const CartPage = () => {
  const {
    cartItems,
    totalSum,
    isLoading,
    error,
    handleRemoveItem,
    handleCheckout
  } = useCart();

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