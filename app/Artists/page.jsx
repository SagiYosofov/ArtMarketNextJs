"use client"
import React, { useState, useEffect } from 'react'
import { ArtistComponent } from '../../components/BrowseArtistsComponents/artistComponent.jsx'
import Link from 'next/link'
import { useData } from '@/context/DataContext'

// Main component for displaying the artists gallery page
export default function Artists() {
  // State to track the currently selected artist for filtering
  const [selectedArtist, setSelectedArtist] = useState(null);
  
  // Get artists and artworks data from the DataContext
  const { artistsData, artworksData, isLoading, error } = useData();

  // Reset the selected artist filter
  const handleReset = () => {
    setSelectedArtist(null);
  };

  // Debugging useEffect to monitor data changes
  useEffect(() => {
    // console.log('Artists Page Artists data:', artistsData);
    // console.log('Artists Page Artworks data:', artworksData);
  }, [artistsData, artworksData]);

  // Loading state handler
  if (isLoading) {
    return <div className="mt-20 container mx-auto px-4">Loading...</div>;
  }

  // Error state handler
  if (error) {
    return <div className="mt-20 container mx-auto px-4">Error: {error}</div>;
  }

  return (
    <div className='mt-20 container mx-auto px-4 relative z-0'>
      {/* Header section with title and back button */}
      <div className='flex justify-between items-center mb-8'>
        <h2 className='text-3xl font-bold'>
          🎨 Our Featured Artists
        </h2>
        {/* Back button only shows when an artist is selected */}
        {selectedArtist && (
          <button
            onClick={handleReset}
            className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300'
          >
            ← Back to All Artists
          </button>
        )}
      </div>
      
      {/* Grid layout for artist cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {/* Filter and map through artists */}
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