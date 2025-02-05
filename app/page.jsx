"use client"

import React from "react"
import { useRouter } from "next/navigation"
import Nav from "../components/navigation/Nav"
import { ArtistComponent } from "../components/BrowseArtistsComponents/artistComponent.jsx"
import { useData } from "../context/DataContext"
import HeroSection from "../components/home/HeroSection"
import FeaturedArtworks from "../components/home/FeaturedArtworks"
import MainFeatures from "../components/home/MainFeatures"
import CallToAction from "../components/home/CallToAction"
import Link from "next/link"

/**
 * HomePage Component
 * Main landing page of the application that showcases featured artworks, artists, and main features
 */
const HomePage = () => {
    // Get global data and loading states from DataContext
    const { artistsData, artworksData, isLoading, error } = useData()
    const router = useRouter()

    // Handler for artwork clicks - navigates to the artwork detail page
    const handleArtworkClick = (artworkId) => {
        router.push(`/Artworks/${artworkId}`)
    }

    return (
        <div className="min-h-screen text-gray-800 dark:text-gray-100">
            {/* Hero section with main banner and call-to-action */}
            <HeroSection />

            {/* Display featured artworks in a grid layout */}
            <FeaturedArtworks
                artworksData={artworksData}
                isLoading={isLoading}
                error={error}
                onArtworkClick={handleArtworkClick}
            />

            {/* Decorative section divider */}
            <div className="max-w-6xl mx-auto py-8">
                <div className="border-b-2 border-blue-300 dark:border-blue-600"></div>
            </div>

            {/* Main features and benefits section */}
            <MainFeatures />

            {/* Decorative section divider */}
            <div className="max-w-6xl mx-auto py-8">
                <div className="border-b-2 border-blue-300 dark:border-blue-600"></div>
            </div>

            {/* Featured Artists Section */}
            <div className="max-w-6xl mx-auto py-16 px-4">
                <h2 className="text-3xl font-bold mb-8">🎨 Featured Artists</h2>
                {/* Conditional rendering based on loading and error states */}
                {isLoading ? (
                    <div className="text-center">Loading...</div>
                ) : error ? (
                    <div className="text-red-500 text-center">{error}</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Display first featured artist */}
                        {artistsData.artists.slice(0, 1).map((artist) => (
                            <ArtistComponent key={artist.id} artist={artist} artworks={artworksData.artworks} />
                        ))}
                        {/* "View All Artists" card with link */}
                        <Link href="/Artists" className="h-full">
                            <div className="h-full flex items-center justify-center p-6 bg-blue-50 dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer">
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold mb-4 text-blue-500">Meet More Artists</h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                                        Discover talented artists from around the world
                                    </p>
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full">
                                        View All Artists
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </div>
                )}
            </div>

            {/* Final call-to-action section */}
            <CallToAction />
        </div>
    )
}

export default HomePage
