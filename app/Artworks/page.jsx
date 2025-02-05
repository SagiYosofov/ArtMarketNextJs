"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useData } from '@/context/DataContext'
import ItemComponent from "../../components/BrowseArtComponents/ItemComponent";

// Main component for displaying the artworks gallery page
const ArtworksPage = () => {
  // Initialize Next.js router for navigation
  const router = useRouter();
  
  // Get artworks data and loading state from DataContext
  const { artworksData, isLoading } = useData();

  // Handler for when an artwork is clicked - navigates to the artwork's detail page
  const handleArtworkClick = (artworkId) => {
    router.push(`/Artworks/${artworkId}`);
  };

  // Show loading state while data is being fetched
  if (isLoading) {
    return <div className="mt-20 container mx-auto px-4">Loading...</div>;
  }

  return (
    // Main container with top margin and relative positioning
    <div className="mt-20 container mx-auto px-4 relative z-0">
      {/* Header section with title */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">🖼️ Featured Artworks</h2>
      </div>
      
      {/* Grid of artwork items */}
      <ItemComponent 
        artworksData={artworksData.artworks}
        handleArtworkClick={handleArtworkClick}
      />
    </div>
  );
};

export default ArtworksPage;