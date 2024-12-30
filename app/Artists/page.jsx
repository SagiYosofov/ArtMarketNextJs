"use client"
import React, { useState } from 'react'
import artistsData from './mockData.json'
import Image from 'next/image'

const ArtistsPage = () => {
  const [selectedArtist, setSelectedArtist] = useState(null);

  const handleArtistClick = (artistId) => {
    setSelectedArtist(artistId);
  };

  const handleReset = () => {
    setSelectedArtist(null);
  };

  return (
    <div className='mt-20 container mx-auto px-4 relative z-0'>
      <div className='flex justify-between items-center mb-8'>
        <h2 className='text-3xl font-bold'>
          🎨 Our Featured Artists
        </h2>
        {selectedArtist && (
          <button
            onClick={handleReset}
            className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300'
          >
            ← Back to All Artists
          </button>
        )}
      </div>
      
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {artistsData.artists
          .filter(artist => !selectedArtist || artist.id === selectedArtist)
          .map((artist) => (
          <div 
            key={artist.id} 
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden 
              hover:shadow-2xl hover:scale-[1.02] hover:ring-2 hover:ring-blue-400 dark:hover:ring-blue-500
              transition-all duration-300 cursor-pointer transform
              ${selectedArtist === artist.id ? 'lg:col-span-3 md:col-span-2' : ''}`}
            onClick={() => handleArtistClick(artist.id)}
          >
            <div className={`flex ${selectedArtist === artist.id ? 'flex-row' : 'flex-col'}`}>
              <div className={`${selectedArtist === artist.id ? 'w-1/4' : 'w-full h-48'} overflow-hidden relative`}>
                <Image 
                  src={`/artists/${artist.picture}`}
                  alt={artist.fullName}
                  fill
                  className='object-cover transition-transform duration-300 group-hover:scale-110'
                />
              </div>
              <div className='p-6 flex-1'>
                <h3 className='text-xl font-semibold mb-2'>
                   {artist.fullName}
                </h3>
                <p className='text-gray-600 dark:text-gray-300 mb-2'>
                  🌍 {artist.country}
                </p>
                <p className={`text-gray-700 dark:text-gray-400 ${selectedArtist === artist.id ? '' : 'line-clamp-3'}`}>
                  ℹ️ {artist.bio}
                </p>
                
                {selectedArtist === artist.id && (
                  <div className='mt-4'>
                    <h4 className='text-lg font-semibold mb-2'>Artworks:</h4>
                    <div className='flex flex-wrap gap-2'>
                      {artist.artworkIds.map((artworkId) => (
                        <span 
                          key={artworkId}
                          className='bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm'
                        >
                          {artworkId}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ArtistsPage