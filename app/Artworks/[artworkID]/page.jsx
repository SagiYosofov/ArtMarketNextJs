import data from "../mockArtworks";
import Link from "next/link";

export default async function ArtworkPage({ params }) {
  const { artworkID } = await Promise.resolve(params);

  const artworkData = data.artworks.find((item) => item.id === artworkID);

  if (!artworkData) {
    return (
      <div className="pt-20 text-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <h1 className="text-3xl font-bold text-red-500 dark:text-red-400">Artwork Not Found</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Please check the artwork ID and try again.
        </p>
        <a
          href="/"
          className="mt-4 inline-block px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md"
        >
          Go Back
        </a>
      </div>
    );
  }

  return (
    <div className="pt-20 flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        {/* Artwork Image */}
        <img
          src={artworkData.picture}
          alt={artworkData.title}
          className="w-full h-64 md:h-96 object-cover"
        />
        <div className="p-6">
          {/* Artwork Title */}
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">{artworkData.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">By {artworkData.artistName}</p>

          {/* Description */}
          <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            {artworkData.description}
          </p>

          {/* Details */}
          <div className="mt-6 space-y-4">
            <div>
              <p className="text-gray-800 dark:text-gray-100 font-semibold">Medium:</p>
              <p className="text-gray-600 dark:text-gray-300">{artworkData.medium}</p>
            </div>
            <div>
              <p className="text-gray-800 dark:text-gray-100 font-semibold">Dimensions:</p>
              <p className="text-gray-600 dark:text-gray-300">{artworkData.dimensions}</p>
            </div>
            <div>
              <p className="text-gray-800 dark:text-gray-100 font-semibold">Location:</p>
              <p className="text-gray-600 dark:text-gray-300">{artworkData.location}</p>
            </div>
          </div>

          {/* Back Button */}
          <Link
            href="/Artworks"
            className="mt-6 inline-block px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md"
          >
            Back to Gallery
          </Link>
        </div>
      </div>
    </div>
  );
}
