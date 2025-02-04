import Image from "next/image"

const ItemComponent = ({ artworksData, handleArtworkClick }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artworksData &&
                artworksData.map((artwork) => (
                    <div
                        key={artwork.id}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden 
          hover:shadow-2xl hover:scale-[1.02] hover:ring-2 hover:ring-blue-400 dark:hover:ring-blue-500
          transition-all duration-300 cursor-pointer"
                        onClick={() => handleArtworkClick(artwork.id)}
                    >
                        <div className="flex flex-col">
                            <div className="w-full h-48 overflow-hidden relative">
                                <Image
                                    src={artwork.picture}
                                    alt={artwork.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{artwork.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-2">🎨 {artwork.artistName}</p>
                                <p className="text-gray-700 dark:text-gray-400 line-clamp-3">ℹ️ {artwork.description}</p>
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
