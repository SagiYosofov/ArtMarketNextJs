"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import mockArtworksData from "./mockArtworks.json"; // Keep as fallback
import dbArtworksData from "./dbArtworks.json";
import Image from "next/image";

const ArtworksPage = () => {
  const router = useRouter();
  const [artworksData, setArtworksData] = useState(mockArtworksData); // Start with mock data

  useEffect(() => {
    // Try to use database data, fallback to mock data if there's an error
    try {
      setArtworksData(dbArtworksData);
    } catch (error) {
      console.warn('Using mock data as fallback:', error);
    }

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/getData`)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleArtworkClick = (artworkId) => {
    router.push(`/Artworks/${artworkId}`);
  };

  return (
    <div className="mt-20 container mx-auto px-4 relative z-0">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">🖼️ Featured Artworks</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworksData.artworks.map((artwork) => (
          <div
            key={artwork.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden 
            hover:shadow-2xl hover:scale-[1.02] hover:ring-2 hover:ring-blue-400 dark:hover:ring-blue-500
            transition-all duration-300 cursor-pointer"
            onClick={() => handleArtworkClick(artwork.id)}
          >
            <div className="flex flex-col">
              <div className="w-full h-48 overflow-hidden relative">
                <Image
                  src={artwork.picture}
                  alt={artwork.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{artwork.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  🎨 {artwork.artistName}
                </p>
                <p className="text-gray-700 dark:text-gray-400 line-clamp-3">
                  ℹ️ {artwork.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtworksPage;