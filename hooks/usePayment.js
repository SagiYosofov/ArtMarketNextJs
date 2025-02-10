"use client"

import { useData } from "@/context/DataContext"
// Custom hook to manage payment and cart cleanup after purchase
export function usePayment({ total }) {
    // Access `setDbUpdate` from DataContext to trigger a data refresh after purchase
    const { setDbUpdate } = useData()
    // Deletes purchased artworks from the database after a successful transaction.
    const deletePurchasedArtworks = async () => {
        try {
            // Retrieve cart data from localStorage
            const cartData = JSON.parse(localStorage.getItem("artGalleryCart") || "[]")
            // Extract artwork IDs from the cart
            const artworkIds = cartData.map((item) => item.id)
            // Proceed only if there are artworks in the cart
            if (artworkIds.length > 0) {
                // Send a DELETE request to remove purchased artworks from the database
                const response = await fetch("/api/artworks/deletePurchased", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ artworkIds }), // Send the list of purchased artwork IDs
                })
                // Handle response errors
                if (!response.ok) {
                    throw new Error("Failed to delete purchased artworks")
                }
                // Notify the system that the database has been updated
                setDbUpdate(true)
            }
        } catch (error) {
            // Rethrow error for further handling if needed
            console.error("Error deleting purchased artworks:", error)
            throw error
        }
    }
    // deletes purchased artworks from database and from local storage and notifies the system.
    const handleSuccessfulPurchase = async () => {
        await deletePurchasedArtworks()
        localStorage.removeItem("artGalleryCart")
        window.dispatchEvent(new Event("cartUpdate"))
    }
    // Demo payment handler for testing purposes
    const handleDemoPayment = async () => {
        try {
            await handleSuccessfulPurchase()
            alert("Demo purchase successful! Total amount: $" + total)
        } catch (error) {
            console.error("Error processing demo purchase:", error)
            alert("Demo purchase failed. Please try again.")
        }
    }
    // PayPal configuration options
    const initialOptions = {
        "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        currency: "USD",
        intent: "capture",
    }
    return {
        handleSuccessfulPurchase,
        handleDemoPayment,
        initialOptions,
    }
}
