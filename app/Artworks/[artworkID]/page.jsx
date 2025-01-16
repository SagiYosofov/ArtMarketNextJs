'use client';
import Link from "next/link";
import { useState, use } from 'react';
import { useData } from '@/context/DataContext';

export default function ArtworkPage({ params }) {
  const [addedToCart, setAddedToCart] = useState(false);
  const { artworksData, isLoading, error } = useData();
  
  // Unwrap the params promise using React.use()
  const unwrappedParams = use(params);
  const artworkID = unwrappedParams.artworkID;
  
  const artworkData = artworksData.artworks.find((item) => item.id === artworkID);

  if (isLoading) {
    return (
      <div className="pt-20 text-center min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center">
        <h1 className="text-2xl">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20 text-center min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center">
        <h1 className="text-2xl text-red-500">Error: {error}</h1>
      </div>
    );
  }

  if (!artworkData) {
    return (
      <div className="pt-20 text-center min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-red-500 dark:text-red-400">
          Artwork Not Found
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
          Please check the artwork ID and try again.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 text-black bg-gray-200 hover:bg-gray-300 dark:text-white dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg text-lg shadow-sm transition-transform transform hover:scale-105"
        >
          Go Back
        </Link>
      </div>
    );
  }

  const addToCart = (artworkId) => {
    // Get existing cart or initialize empty array
    const existingCart = JSON.parse(localStorage.getItem('artGalleryCart') || '[]');
    
    // Check if artwork is already in cart by checking IDs
    if (!existingCart.some(item => item.id === artworkId)) {
      // Get the full artwork data from context instead of static data
      const artworkToAdd = artworksData.artworks.find(item => item.id === artworkId);
      
      // Add complete artwork object to cart
      const updatedCart = [...existingCart, artworkToAdd];
      localStorage.setItem('artGalleryCart', JSON.stringify(updatedCart));
      window.dispatchEvent(new Event('cartUpdate'));

      
      setAddedToCart(true);
      setTimeout(() => {
        setAddedToCart(false);
      }, 2000);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Artwork Image */}
          <div className="aspect-square w-full max-w-lg mx-auto lg:mx-0">
            <img
              src={artworkData.picture}
              alt={artworkData.title}
              className="w-full h-full object-cover shadow-md rounded-md"
            />
          </div>

          {/* Artwork Details */}
          <div>
            <h1 className="text-4xl font-semibold leading-tight">
              {artworkData.title}
            </h1>
            <Link href={`/Artists/${artworkData.artistId}`}>
              By
              <p className="px-2 inline mt-4 text-lg text-gray-700 dark:text-gray-300 hover:underline hover:text-blue-400">
                {artworkData.artistName}
              </p>
            </Link>

            {/* Add Price Display */}
            <div className="mt-6">
              <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                ${artworkData.price.toLocaleString()}
              </h2>
            </div>

            <p className="mt-8 text-gray-800 dark:text-gray-200 text-lg leading-relaxed">
              {artworkData.description}
            </p>

            <div className="mt-12 space-y-6">
              <div className="border-t border-gray-300 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-medium">Medium</h3>
                <p className="mt-1 text-gray-700 dark:text-gray-300">
                  {artworkData.medium}
                </p>
              </div>
              <div className="border-t border-gray-300 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-medium">Dimensions</h3>
                <p className="mt-1 text-gray-700 dark:text-gray-300">
                  {artworkData.dimensions}
                </p>
              </div>
              <div className="border-t border-gray-300 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-medium">Location</h3>
                <p className="mt-1 text-gray-700 dark:text-gray-300">
                  {artworkData.location}
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 grid-cols-1 justify-center">
              {/*Buttons */}
              <div className="mt-12">
                <Link
                  href="/Artworks"
                  className="w-full inline-block text-center px-6 py-3 text-white bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-md text-lg shadow-md transition-transform transform hover:scale-105"
                >
                  Back to Gallery
                </Link>
              </div>
              <div className="mt-12">
                <button
                  onClick={() => addToCart(artworkID)}
                  className={`w-full px-6 py-3 text-white rounded-md text-lg shadow-md transition-all transform hover:scale-105 
                    ${addedToCart 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  {addedToCart ? 'Added to Cart! ✓' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
