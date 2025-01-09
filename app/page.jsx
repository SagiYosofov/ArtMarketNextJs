"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Nav from '../components/Nav';
import ArtistComponent from './Artists/artistComponent';
import Card from '../components/Card';
import mockArtistsData from './Artists/mockData.json';
import mockArtworksData from './Artworks/dbArtworks.json';

const HomePage = () => {
  const [artists] = useState(mockArtistsData.artists);
  const [artworks] = useState(mockArtworksData.artworks);
  const router = useRouter();

  const handleArtworkClick = (artworkId) => {
    router.push(`/Artworks/${artworkId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Navigation Bar */}
      <Nav />

      {/* Hero Section */}
      <div className="relative bg-gray-100 dark:bg-gray-800 h-[70vh] flex items-center justify-center text-center">
        <div className="bg-gradient-to-r from-black/70 via-black/30 to-black/70 p-10 rounded-lg text-white shadow-lg">
          <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg">Welcome to the Art Market</h1>
          <p className="text-xl mb-8 drop-shadow-md">Discover unique artworks and support talented artists worldwide.</p>
          <Link href="/Artworks">
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-white font-bold rounded-full transition-transform transform hover:scale-105 shadow-lg">
              Explore Artworks
            </button>
          </Link>
        </div>
      </div>

      {/* Main Features */}
      <div className="max-w-6xl mx-auto py-20 px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-bold mb-4 text-blue-600">Unique Artworks</h3>
          <p className="text-gray-600 dark:text-gray-300">Each piece is crafted by independent artists, ensuring originality and authenticity.</p>
        </div>
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-bold mb-4 text-blue-600">Direct Support</h3>
          <p className="text-gray-600 dark:text-gray-300">Purchase directly from artists, ensuring fair compensation for their work.</p>
        </div>
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-bold mb-4 text-blue-600">Vibrant Community</h3>
          <p className="text-gray-600 dark:text-gray-300">Join a community of art lovers and creators sharing their passion for creativity.</p>
        </div>
      </div>

      {/* Featured Artists */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8">🎨 Featured Artists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artists.slice(0, 3).map((artist) => (
            <ArtistComponent key={artist.id} artist={artist} artworks={artworks} />
          ))}
        </div>
      </div>

      {/* Featured Artworks */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8">🖼️ Featured Artworks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.slice(0, 6).map((artwork) => (
            <div
              key={artwork.id}
              className="cursor-pointer"
              onClick={() => handleArtworkClick(artwork.id)}
            >
              <Card
                imgSrc={artwork.picture}
                title={artwork.title}
                artist={artwork.artistName}
                price={artwork.price}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-500 text-white text-center py-16">
        <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
        <p className="mb-6">Sign up to showcase your art or discover unique creations.</p>
        <Link href="/SignUp">
          <button className="bg-white text-blue-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
            Sign Up Now
          </button>
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-6 text-center">
        <p>© {new Date().getFullYear()} Art Market. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
