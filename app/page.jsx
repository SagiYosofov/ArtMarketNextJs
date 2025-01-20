"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Nav from '../components/Nav';
import { ArtistComponent } from '../components/artistComponent.jsx';
import Card from '../components/Card';
import { useData } from '../context/DataContext';

const HomePage = () => {
  const { artistsData, artworksData, isLoading, error } = useData();
  const router = useRouter();

  const handleArtworkClick = (artworkId) => {
    router.push(`/Artworks/${artworkId}`);
  };

  return (
    <div className="min-h-screen  text-gray-800 dark:text-gray-100">
      {/* Navigation Bar */}
      <Nav />

      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center text-center">
        <div className="bg-gradient-to-r from-blue-600/90 via-blue-500/70 to-blue-600/90 p-6 md:p-10 rounded-lg text-white shadow-lg mx-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 drop-shadow-lg">Welcome to the Art Market</h1>
          <p className="text-lg md:text-xl mb-6 md:mb-8 drop-shadow-md">Discover artworks and support artists worldwide.</p>
          <Link href="/Artworks">
            <button className="bg-blue-500 hover:bg-blue-600 px-6 md:px-8 py-3 md:py-4 text-white font-bold rounded-full transition-transform transform hover:scale-105 shadow-lg">
              Explore Artworks
            </button>
          </Link>
        </div>
      </div>

      {/* Featured Artworks */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8">🖼️ Featured Artworks</h2>
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artworksData.artworks.slice(0, 1).map((artwork) => (
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
            {/* See More Card */}
            <Link href="/Artworks" className="h-full">
              <div className="h-full flex items-center justify-center p-6 bg-blue-50 dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4 text-blue-500">Discover More</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Explore our full collection of unique artworks</p>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full">
                    See All Artworks
                  </button>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>

      {/* Section Divider */}
      <div className="max-w-6xl mx-auto py-8">
        <div className="border-b-2 border-blue-300 dark:border-blue-600"></div>
      </div>

      {/* Main Features */}
      <div className="max-w-6xl mx-auto py-20 px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-bold mb-4 text-blue-500">Zero Platform Fees</h3>
          <p className="text-gray-600 dark:text-gray-300">Artists keep 100% of their sales. No hidden fees or commissions - maximize your earnings.</p>
        </div>
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-bold mb-4 text-blue-500">Secure Transactions</h3>
          <p className="text-gray-600 dark:text-gray-300">Protected payments and verified shipping ensure a safe buying experience for collectors.</p>
        </div>
        <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-bold mb-4 text-blue-500">Exclusive Ownership</h3>
          <p className="text-gray-600 dark:text-gray-300">Each artwork comes with verified licensing and authentication for single-owner exclusivity.</p>
        </div>
      </div>

      {/* Section Divider */}
      <div className="max-w-6xl mx-auto py-8">
        <div className="border-b-2 border-blue-300 dark:border-blue-600"></div>
      </div>

      {/* Featured Artists */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8">🎨 Featured Artists</h2>
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artistsData.artists.slice(0, 1).map((artist) => (
              <ArtistComponent 
                key={artist.id} 
                artist={artist} 
                artworks={artworksData.artworks} 
              />
            ))}
            {/* See More Artists Card */}
            <Link href="/Artists" className="h-full">
              <div className="h-full flex items-center justify-center p-6 bg-blue-50 dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4 text-blue-500">Meet More Artists</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Discover talented artists from around the world</p>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full">
                    View All Artists
                  </button>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-blue-500 text-white text-center py-16 rounded-lg shadow-lg mb-16">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Art Journey?</h2>
          <p className="mb-6">Begin your journey with zero fees.</p>
          <Link href="/SignUp">
            <button className="bg-white text-blue-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Start now
            </button>
          </Link>
          <br />
          <Link href="/SignIn">
            <button className="text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition">
              Already a Member? Sign In
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-6 text-center">
        <p>© {new Date().getFullYear()} Art Market. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
