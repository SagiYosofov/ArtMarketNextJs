"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import artistsData from '../mockData.json'
import artworksData from '../../Artworks/mockArtworks.json'

export default function ArtistPage({ params }) {
  const { artistId } = params
  
  // Find artist and their artworks
  const artist = artistsData.artists.find(a => a.id === artistId)
  const artistArtworks = artworksData.artworks.filter(artwork => artwork.artistId === artistId)

  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Artist not found</h1>
          <Link href="/Artists" className="text-blue-500 hover:text-blue-600 mt-4 inline-block">
            ← Back to Artists
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] w-full">
        <Image
          src={`/artists/${artist.picture}`}
          alt={artist.fullName}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{artist.fullName}</h1>
            <div className="flex items-center gap-4 text-sm md:text-base">
              <span className="bg-white/20 px-3 py-1 rounded-full">
                🌍 {artist.country}
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full">
                🎨 {artistArtworks.length} Artworks
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Bio Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">About the Artist</h2>
          <p className="text-gray-600 leading-relaxed">{artist.bio}</p>
        </div>

        {/* Artworks Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Artworks by {artist.fullName}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artistArtworks.map((artwork) => (
              <Link 
                href={`/Artworks/${artwork.id}`} 
                key={artwork.id}
                className="group block"
              >
                <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-48 md:h-64">
                    <Image
                      src={`/artworks/${artwork.picture}`}
                      alt={artwork.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{artwork.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{artwork.description}</p>
                    <div className="mt-4 flex justify-between items-center text-sm">
                      <span className="text-gray-500">{artwork.medium}</span>
                      <span className="text-blue-500 group-hover:text-blue-600">View Details →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Link 
            href="/Artists"
            className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            ← Back to Artists
          </Link>
        </div>
      </div>
    </div>
  )
}
