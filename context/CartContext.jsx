"use client"

import { createContext, useContext, useState, useEffect } from "react"
// Create a Context to manage cart-related state globally
const CartContext = createContext()

// cartData is the array state of artwork ID for purchasing
// hasCartItems used for the green background around cart button

export const CartProvider = ({ children }) => {
    // State variable to track if the cart contains any items
    const [hasCartItems, setHasCartItems] = useState(false)

    // Check cart status whenever localStorage changes
    useEffect(() => {
        const checkCart = () => {
            try {
                const cartData = JSON.parse(localStorage.getItem("artGalleryCart") || "[]")
                setHasCartItems(cartData.length > 0)
            } catch (err) {
                setHasCartItems(false)
            }
        }

        // Check initially
        checkCart()

        // Add event listener for storage changes
        window.addEventListener("storage", checkCart)

        // Create a custom event listener for cart updates
        window.addEventListener("cartUpdate", checkCart)

        // Cleanup
        return () => {
            window.removeEventListener("storage", checkCart)
            window.removeEventListener("cartUpdate", checkCart)
        }
    }, []) // Runs only once when the component mounts

    return (
        // Provide cart-related state (`hasCartItems`) and updater function (`setHasCartItems`) to child components
        <CartContext.Provider value={{ hasCartItems, setHasCartItems }}>{children}</CartContext.Provider>
    )
}
// Custom hook to easily access cart state from components
export const useCart = () => {
    return useContext(CartContext)
}
