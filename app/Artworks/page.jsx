"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useData } from '@/context/DataContext'
import ItemComponent from "../../components/ItemComponent";

const ArtworksPage = () => {
  const router = useRouter();
  const { artworksData, isLoading } = useData();

  const handleArtworkClick = (artworkId) => {
    router.push(`/Artworks/${artworkId}`);
  };

  if (isLoading) {
    return <div className="mt-20 container mx-auto px-4">Loading...</div>;
  }

  return (
    <div className="mt-20 container mx-auto px-4 relative z-0">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">🖼️ Featured Artworks</h2>
      </div>
      <ItemComponent 
        artworksData={artworksData.artworks}
        handleArtworkClick={handleArtworkClick}
      />
    </div>
  );
};

export default ArtworksPage;