"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useData } from '@/context/DataContext'
import HisWorks from '../../../components/hisWorks'

export default function ArtistPage({ params }) {
  const unwrappedParams = React.use(params)
  const { artistId } = unwrappedParams
  const { artistsData, artworksData, isLoading } = useData();
  
  const artist = artistsData.artists.find(a => a.id === artistId)
  const artistArtworks = artworksData.artworks.filter(artwork => artwork.artistId === artistId)

  if (isLoading) {
    return <div>Loading...</div>;
  }

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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] w-full">
        <Image
          src={artist.picture}
          alt={artist.fullName}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white">{artist.fullName}</h1>
            <div className="flex items-center gap-4 text-sm md:text-base">
              <span className="bg-white/20 px-3 py-1 rounded-full text-white">
                🌍 {artist.country}
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-white">
                🎨 {artistArtworks.length} Artworks
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Bio Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">About the Artist</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{artist.bio}</p>
        </div>

        {/* Artworks Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Artworks by {artist.fullName}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artistArtworks.map((artwork) => (
              <HisWorks key={artwork.id} artwork={artwork} />
            ))}
          </div>
        </div>

        {/* Back Button */}
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
