"use client"
import React, { useState, useEffect } from 'react'
import mockArtistsData from './mockData.json' // Keep as fallback
import mockArtworksData from '../Artworks/mockArtworks.json' // Keep as fallback
import dbArtistsData from './dbData.json'
import dbArtworksData from '../Artworks/dbArtworks.json'
import ArtistComponent from './ArtistComponent'
import Link from 'next/link'

const ArtistsPage = () => {
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [artistsData, setArtistsData] = useState(mockArtistsData);
  const [artworksData, setArtworksData] = useState(mockArtworksData);

  useEffect(() => {
    // Try to use database data, fallback to mock data if there's an error
    try {
      setArtistsData(dbArtistsData);
      setArtworksData(dbArtworksData);
    } catch (error) {
      console.warn('Using mock data as fallback:', error);
    }

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/getData`)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

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

export default ArtistsPage