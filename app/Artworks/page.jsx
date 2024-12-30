"use client";
import React, { useState } from "react";
import artworksData from "./mockArtworks.json";
import Image from "next/image";

const ArtworksPage = () => {
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const handleArtworkClick = (artworkId) => {
    setSelectedArtwork(artworkId);
  };

  const handleReset = () => {
    setSelectedArtwork(null);
  };

  return (
    <div className="mt-20 container mx-auto px-4 relative z-0">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">🖼️ Featured Artworks</h2>
        {selectedArtwork && (
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
          >
            ← Back to All Artworks
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworksData.artworks
          .filter(
            (artwork) => !selectedArtwork || artwork.id === selectedArtwork
          )
          .map((artwork) => (
            <div
              key={artwork.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden 
              hover:shadow-2xl hover:scale-[1.02] hover:ring-2 hover:ring-blue-400 dark:hover:ring-blue-500
              transition-all duration-300 cursor-pointer transform
              ${
                selectedArtwork === artwork.id
                  ? "lg:col-span-3 md:col-span-2"
                  : ""
              }`}
              onClick={() => handleArtworkClick(artwork.id)}
            >
              <div
                className={`flex ${
                  selectedArtwork === artwork.id ? "flex-row" : "flex-col"
                }`}
              >
                <div
                  className={`${
                    selectedArtwork === artwork.id ? "w-1/4" : "w-full h-48"
                  } overflow-hidden relative`}
                >
                  <Image
                    src={`/artworks/${artwork.picture}`}
                    alt={artwork.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 flex-1">
                  <h3 className="text-xl font-semibold mb-2">
                    {artwork.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    🎨 {artwork.artistName}
                  </p>
                  <p
                    className={`text-gray-700 dark:text-gray-400 ${
                      selectedArtwork === artwork.id ? "" : "line-clamp-3"
                    }`}
                  >
                    ℹ️ {artwork.description}
                  </p>

                  {selectedArtwork === artwork.id && (
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold mb-2">Details:</h4>
                      <p>🖌️ Medium: {artwork.medium}</p>
                      <p>📏 Dimensions: {artwork.dimensions}</p>
                      <p>🏛️ Location: {artwork.location}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ArtworksPage;