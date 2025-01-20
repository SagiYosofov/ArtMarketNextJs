"use client"
import React, { useState, useEffect } from 'react'
import { ArtistComponent } from '../../components/artistComponent.jsx'
import Link from 'next/link'
import { useData } from '@/context/DataContext'

export default function Artists() {
  const [selectedArtist, setSelectedArtist] = useState(null);
  const { artistsData, artworksData, isLoading, error } = useData();

  const handleReset = () => {
    setSelectedArtist(null);
  };
  useEffect(() => {
    // console.log('Artists Page Artists data:', artistsData);
    // console.log('Artists Page Artworks data:', artworksData);
  }, [artistsData, artworksData]);

  if (isLoading) {
    return <div className="mt-20 container mx-auto px-4">Loading...</div>;
  }

  if (error) {
    return <div className="mt-20 container mx-auto px-4">Error: {error}</div>;
  }

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
            <ArtistComponent
              key={artist.id}
              artist={artist}
              artworks={artworksData.artworks}
            />
          ))}
      </div>
    </div>
  )
}