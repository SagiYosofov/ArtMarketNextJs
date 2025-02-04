import Link from "next/link"
import Card from "../BrowseArtComponents/Card"

const FeaturedArtworks = ({ artworksData, isLoading, error, onArtworkClick }) => {
    return (
        <div className="max-w-6xl mx-auto py-16 px-4">
            <h2 className="text-3xl font-bold mb-8">🖼️ Featured Artworks</h2>
            {isLoading ? (
                <div className="text-center">Loading...</div>
            ) : error ? (
                <div className="text-red-500 text-center">{error}</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {artworksData.artworks.slice(0, 1).map((artwork) => (
                        <div key={artwork.id} className="cursor-pointer" onClick={() => onArtworkClick(artwork.id)}>
                            <Card
                                imgSrc={artwork.picture}
                                title={artwork.title}
                                artist={artwork.artistName}
                                price={artwork.price}
                            />
                        </div>
                    ))}
                    <Link href="/Artworks" className="h-full">
                        <div className="h-full flex items-center justify-center p-6 bg-blue-50 dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold mb-4 text-blue-500">Discover More</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Explore our full collection of unique artworks
                                </p>
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full">
                                    See All Artworks
                                </button>
                            </div>
                        </div>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default FeaturedArtworks
