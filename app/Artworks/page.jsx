"use client"
// Import necessary dependencies from React and Next.js
import React, { useState } from "react"
import { useRouter } from "next/navigation"
// Import custom data context hook
import { useData } from "@/context/DataContext"
// Import the component that renders individual artwork items
import ItemComponent from "../../components/BrowseArtComponents/ItemComponent"

// Main component for the Artworks page
const ArtworksPage = () => {
    // Initialize Next.js router for navigation
    const router = useRouter()
    // Get artworks data and loading state from context
    const { artworksData, isLoading } = useData()

    // Handler function to navigate to individual artwork page
    const handleArtworkClick = (artworkId) => {
        router.push(`/Artworks/${artworkId}`)
    }

    // Show loading state while data is being fetched
    if (isLoading) {
        return <div className="min-h-screen mt-20 container mx-auto px-4">Loading...</div>
    }

    // Main page layout
    return (
        <div className="min-h-screen mt-20 container mx-auto px-4 relative z-0">
            {/* Header section with title */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">🖼️ Featured Artworks</h2>
            </div>
            {/* Render artwork items grid */}
            <ItemComponent artworksData={artworksData.artworks} handleArtworkClick={handleArtworkClick} />
        </div>
    )
}

export default ArtworksPage
