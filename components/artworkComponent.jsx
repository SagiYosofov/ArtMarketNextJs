import Link from "next/link";
const ArtworkComponent = ({artworkData}) => {
    return (
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
        </div>
    );
}

export default ArtworkComponent;