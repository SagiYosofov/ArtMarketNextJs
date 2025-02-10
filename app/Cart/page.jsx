"use client"
import React from "react"
import ItemComponent from "../../components/BrowseArtComponents/ItemComponent"
import { useCart } from "@/hooks/useCart"

// Cart page component that displays items in cart and checkout functionality
const CartPage = () => {
    const {
        cartItems, // Array of items in cart
        totalSum, // Total price of all items
        isLoading, // Loading state
        error, // Error state
        handleRemoveItem, // Function to remove item from cart
        handleCheckout, // Function to process checkout
    } = useCart()

    // Show loading state while cart data is being fetched
    if (isLoading) {
        return (
            <div className="min-h-screen mt-20 container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-8">🛒 Your Cart</h2>
                <p>Loading cart items...</p>
            </div>
        )
    }

    // Show error message if cart data fetch failed
    if (error) {
        return (
            <div className="min-h-screen mt-20 container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-8">🛒 Your Cart</h2>
                <p className="text-red-500">Error loading cart: {error}</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen mt-20 container mx-auto px-4 relative z-0">
            <h2 className="text-3xl font-bold mb-8">🛒 Your Cart</h2>
            {/* Instructions for removing items */}
            <p className="text-gray-600 dark:text-gray-300 text-center mb-4">Tap an item to remove from cart</p>

            {/* Render cart items or empty cart message */}
            {cartItems.length > 0 ? (
                <>
                    {/* Display cart items using ItemComponent */}
                    <ItemComponent artworksData={cartItems} handleArtworkClick={handleRemoveItem} />
                    {/* Checkout section with total price */}
                    <div className="flex flex-col items-center mt-8 mb-12">
                        <p className="text-xl font-semibold mb-4">Total to pay: ${totalSum.toFixed(2)}</p>
                        <button
                            onClick={handleCheckout}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            ) : (
                <p className="text-gray-600 dark:text-gray-300 text-center">Your cart is empty.</p>
            )}
        </div>
    )
}

export default CartPage
