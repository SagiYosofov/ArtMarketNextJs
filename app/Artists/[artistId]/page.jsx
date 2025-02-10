"use client"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useData } from "@/context/DataContext"
import HisWorks from "../../../components/BrowseArtistsComponents/hisWorks"
// The ArtistPage component receives route parameters as props (e.g., artistId)
export default function ArtistPage({ params }) {
    const unwrappedParams = React.use(params)
    const { artistId } = unwrappedParams
    // Destructure necessary data from our global data context
    const { artistsData, artworksData, isLoading } = useData()
    // Find the artist in our artists data whose id matches the artistId from the URL parameters
    const artist = artistsData.artists.find((a) => a.id === artistId)
    // Filter artworks to only include those created by the artist
    const artistArtworks = artworksData.artworks.filter((artwork) => artwork.artistId === artistId)
    // If data is still loading, display a loading message
    if (isLoading) {
        return <div className="min-h-screen bg-white dark:bg-gray-900">Loading...</div>
    }
    // If no artist is found, render a "not found" message with a link back to the Artists page
    if (!artist) {
        return (
            <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Artist not found</h1>
                    <Link href="/Artists" className="text-blue-500 hover:text-blue-400 mt-4 inline-block">
                        ← Back to Artists
                    </Link>
                </div>
            </div>
        )
    }
    // Main render of the Artist Page if data is loaded and artist exists
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {/* Hero Section */}
            <div className="relative h-[300px] md:h-[400px] w-full">
                {/* Background image using Next.js's optimized Image component */}
                <Image src={artist.picture} alt={artist.fullName} fill className="object-cover" priority />
                <div className="absolute inset-0 bg-black bg-opacity-50" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white">{artist.fullName}</h1>
                        <div className="flex items-center gap-4 text-sm md:text-base">
                            <span className="bg-white/20 px-3 py-1 rounded-full text-white">🌍 {artist.country}</span>
                            <span className="bg-white/20 px-3 py-1 rounded-full text-white">
                                🎨 {artistArtworks.length} Artworks
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Main content container for the artist's bio and artworks */}
            <div className="container mx-auto px-4 py-8">
                {/* Bio Section: Displays information about the artist */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">About the Artist</h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{artist.bio}</p>
                </div>

                {/* Artworks Section: Renders a grid of artworks by the artist */}
                <div>
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Artworks by {artist.fullName}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {artistArtworks.map((artwork) => (
                            <HisWorks key={artwork.id} artwork={artwork} />
                        ))}
                    </div>
                </div>

                {/* Back Button: Provides navigation back to the list of artists */}
                <div className="mt-8">
                    <Link
                        href="/Artists"
                        className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                        ← Back to Artists
                    </Link>
                </div>
            </div>
        </div>
    )
}
