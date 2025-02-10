import { useState } from "react"

export function useArtworkCart() {
    // adds artwork ID to the local storage.

    const [addedToCart, setAddedToCart] = useState(false)

    const addToCart = (artwork) => {
        // Get existing cart or initialize empty array
        const existingCart = JSON.parse(localStorage.getItem("artGalleryCart") || "[]")

        // Check if artwork is already in cart
        if (!existingCart.some((item) => item.id === artwork.id)) {
            // Add complete artwork object to cart
            const updatedCart = [...existingCart, artwork]
            localStorage.setItem("artGalleryCart", JSON.stringify(updatedCart))
            window.dispatchEvent(new Event("cartUpdate"))

            setAddedToCart(true)
            setTimeout(() => {
                setAddedToCart(false)
            }, 2000)
        }
    }

    return { addToCart, addedToCart }
}
