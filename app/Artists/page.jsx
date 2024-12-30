"use client"
import React from 'react'
import artistsData from './mockData.json'

const ArtistsPage = () => {
  return (
    <div className='mt-20 container mx-auto px-4'>
      <h2 className='text-3xl font-bold mb-8'>
        🎨 Our Featured Artists
      </h2>
      
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {artistsData.artists.map((artist) => (
          <div key={artist.id} className='bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'>
            <div className='aspect-square w-full overflow-hidden'>
              <img 
                src="./pfp.jpeg" 
                alt={artist.fullName}
                className='w-full h-full object-cover'
              />
            </div>
            <div className='p-6'>
              <h3 className='text-xl font-semibold mb-2'>
                 {artist.fullName}
              </h3>
              <p className='text-gray-600 dark:text-gray-300 mb-2'>
                🌍 {artist.country}
              </p>
              <p className='text-gray-700 dark:text-gray-400 line-clamp-3'>
                ℹ️ {artist.bio}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ArtistsPage