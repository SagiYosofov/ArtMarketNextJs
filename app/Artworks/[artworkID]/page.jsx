import data from "../mockArtworks";
import Link from "next/link";

export default async function ArtworkPage({ params }) {
  const { artworkID } = await Promise.resolve(params);

  const artworkData = data.artworks.find((item) => item.id === artworkID);

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

            <div className="grid sm:grid-cols-2 gap-0 grid-cols-1 justify-center">
              {/*Buttons */}
              <div className="mt-12 justify-center">
                <Link
                  href="/Artworks"
                  className="px-6 py-3 text-white bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-md text-lg shadow-md transition-transform transform hover:scale-105"
                >
                  Back to Gallery
                </Link>
              </div>
              <div className="mt-12 justify-center">
                {/*Need to add the artwork in cart code */}
                <Link
                  href="/Cart"
                  className="px-6 py-3 text-white bg-green-500 hover:bg-green-600 dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-md text-lg shadow-md transition-transform transform hover:scale-105"
                >
                  Add to Cart
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
