import React from 'react';
import dbArtworks from '../Artworks/dbArtworks.json';
import Image from 'next/image';

const MyArtworksComponent = ({ artworkID }) => {
  // Find the artwork with matching ID
  const artwork = dbArtworks.artworks.find(art => art.id === artworkID);
  console.log(artwork);

  if (!artwork) {
    return <div>Artwork not found</div>;
  }

  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      <div className="relative w-full h-48 mb-4">
        <Image
          src={artwork.picture}
          alt={artwork.title}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{artwork.title}</h3>
          <span className="text-lg font-semibold text-green-600">
            ${artwork.price?.toLocaleString()}
          </span>
        </div>
        <p className="text-gray-600">{artwork.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500">
            {artwork.medium}
          </span>
          <span className="text-sm text-gray-500">
            {artwork.dimensions}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyArtworksComponent;
