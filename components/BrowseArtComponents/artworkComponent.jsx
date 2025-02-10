import Link from "next/link"

// ArtworkComponent displays detailed information about a single artwork
// Props:
// - artworkData: Object containing artwork details (title, artistName, price, description, etc.)
const ArtworkComponent = ({ artworkData }) => {
    return (
        <div>
            {/* Artwork Title */}
            <h1 className="text-4xl font-semibold leading-tight">{artworkData.title}</h1>

            {/* Artist Name with Link to Artist's Profile */}
            <Link href={`/Artists/${artworkData.artistId}`}>
                By
                <p className="px-2 inline mt-4 text-lg text-gray-700 dark:text-gray-300 hover:underline hover:text-blue-400">
                    {artworkData.artistName}
                </p>
            </Link>

            {/* Price Display Section */}
            <div className="mt-6">
                <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-400">${artworkData.price.toLocaleString()}</h2>
            </div>

            <p className="mt-8 text-gray-800 dark:text-gray-200 text-lg leading-relaxed">{artworkData.description}</p>

            {/* Technical Details Section */}
            <div className="mt-12 space-y-6">
                {/* Medium Information */}
                <div className="border-t border-gray-300 dark:border-gray-700 pt-6">
                    <h3 className="text-lg font-medium">Medium</h3>
                    <p className="mt-1 text-gray-700 dark:text-gray-300">{artworkData.medium}</p>
                </div>
                
                {/* Dimensions Information */}
                <div className="border-t border-gray-300 dark:border-gray-700 pt-6">
                    <h3 className="text-lg font-medium">Dimensions</h3>
                    <p className="mt-1 text-gray-700 dark:text-gray-300">{artworkData.dimensions}</p>
                </div>
            </div>
        </div>
    )
}

export default ArtworkComponent
