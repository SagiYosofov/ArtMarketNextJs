import Image from "next/image"

// ItemComponent: Displays a grid of artwork cards
// Props:
// - artworksData: Array of artwork objects containing artwork information
// - handleArtworkClick: Function to handle click events on artwork cards
const ItemComponent = ({ artworksData, handleArtworkClick }) => {
    return (
        // Responsive grid layout: 1 column on mobile, 2 on medium screens, 3 on large screens
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Map through artwork data if it exists */}
            {artworksData &&
                artworksData.map((artwork) => (
                    // Individual artwork card with hover effects and click handler
                    <div
                        key={artwork.id}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden 
          hover:shadow-2xl hover:scale-[1.02] hover:ring-2 hover:ring-blue-400 dark:hover:ring-blue-500
          transition-all duration-300 cursor-pointer"
                        onClick={() => handleArtworkClick(artwork.id)}
                    >
                        <div className="flex flex-col">
                            {/* Image container with fixed height and responsive behavior */}
                            <div className="w-full h-48 overflow-hidden relative">
                                <Image
                                    src={artwork.picture}
                                    alt={artwork.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                            {/* Artwork details section */}
                            <div className="p-6">
                                {/* Artwork title */}
                                <h3 className="text-xl font-semibold mb-2">{artwork.title}</h3>
                                {/* Artist name with palette emoji */}
                                <p className="text-gray-600 dark:text-gray-300 mb-2">🎨 {artwork.artistName}</p>
                                {/* Description with info emoji and line clamping */}
                                <p className="text-gray-700 dark:text-gray-400 line-clamp-3">ℹ️ {artwork.description}</p>
                                {/* Price with money bag emoji */}
                                <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mt-3">
                                    💰 ${artwork.price.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default ItemComponent
