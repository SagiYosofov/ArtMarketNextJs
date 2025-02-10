import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useData } from "@/context/DataContext"
// Custom hook to manage cart state and actions
export const useCart = () => {
    // Unload cart items from local storage
    // Set total price
    // loading state
    // State for storing cart items and total sum
    const [cartItems, setCartItems] = useState([])
    const [totalSum, setTotalSum] = useState(0)
    // Next.js router for navigation (used in checkout)
    const router = useRouter()
    // Fetching artworks data from the DataContext
    const { artworksData, isLoading, error } = useData()

    useEffect(() => {
        if (!artworksData.artworks) return // Prevent errors if data is not yet available

        try {
            // Retrieve stored cart data from localStorage (or initialize an empty array)
            const cartData = JSON.parse(localStorage.getItem("artGalleryCart") || "[]")
            // Match stored cart items with available artworks in `artworksData`
            const cartArtworks = cartData
                .map((cartItem) => artworksData.artworks.find((artwork) => artwork.id === cartItem.id))
                .filter(Boolean)
            // Update state with valid cart items
            setCartItems(cartArtworks)
            // Calculate total cart price
            const total = cartArtworks.reduce((sum, item) => sum + parseFloat(item.price), 0)
            setTotalSum(total)
        } catch (err) {
            // If localStorage is corrupted, reset cart data
            console.error("Error loading cart:", err)
            localStorage.removeItem("artGalleryCart")
            setCartItems([])
            setTotalSum(0)
        }
    }, [artworksData]) // Runs when `artworksData` changes

    // Removes an item from the cart, updates localStorage, and recalculates total.
    const handleRemoveItem = (itemId) => {
        try {
            // Remove item from state
            setCartItems(cartItems.filter((item) => item.id !== itemId))
            // Remove item from localStorage
            const cartData = JSON.parse(localStorage.getItem("artGalleryCart") || "[]")
            const updatedCart = cartData.filter((item) => item.id !== itemId)
            localStorage.setItem("artGalleryCart", JSON.stringify(updatedCart))
            // Recalculate total price after removal
            const newTotal = cartItems.filter((item) => item.id !== itemId).reduce((sum, item) => sum + parseFloat(item.price), 0)
            setTotalSum(newTotal)
            // Dispatch event to notify other components that cart has been updated
            window.dispatchEvent(new Event("cartUpdate"))
        } catch (err) {
            console.error("Error removing item from cart:", err)
        }
    }
    // Handles checkout by navigating to the payment page with the total amount.
    const handleCheckout = () => {
        router.push(`/Payment?total=${totalSum.toFixed(2)}`)
    }
    // Return values and functions for components to use
    return {
        cartItems,
        totalSum,
        isLoading,
        error,
        handleRemoveItem,
        handleCheckout,
    }
}
