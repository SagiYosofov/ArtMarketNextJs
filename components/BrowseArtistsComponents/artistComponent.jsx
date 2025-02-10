import Image from "next/image"
import Link from "next/link"

// ArtistComponent displays an artist card with their info and artwork previews
// Props:
// - artist: Object containing artist details (id, fullName, picture, bio)
// - artworks: Array of all artworks to filter for this artist
export function ArtistComponent({ artist, artworks }) {
    // Filter artworks to only show ones belonging to this artist
    const artistArtworks = artworks?.filter((artwork) => artwork.artistId === artist.id) || []

    return (
        // Wrap entire card in Link for navigation to artist's detail page
        <Link href={`/Artists/${artist.id}`} className="block group">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                {/* Artist profile picture section with overlay gradient */}
                <div className="relative h-64 w-full">
                    <Image
                        src={artist.picture}
                        alt={artist.fullName}
                        fill
                        className="object-cover rounded-t-lg"
                        priority={true}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Gradient overlay to ensure text visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-lg" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">{/* Removed the country span element */}</div>
                </div>

                {/* Artist information section */}
                <div className="p-4">
                    {/* Artist name with hover effect */}
                    <div className="flex justify-between items-start mb-2">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {artist.fullName}
                        </h2>
                    </div>

                    {/* Artist bio with line clamp for consistent height */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">{artist.bio}</p>

                    {/* Stats and view profile section */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">🎨 {artistArtworks.length} Artworks</span>
                            <span className="text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300">
                                View Profile →
                            </span>
                        </div>
                    </div>

                    {/* Artwork preview thumbnails - shows up to 3 artworks */}
                    {artistArtworks.length > 0 && (
                        <div className="mt-4 flex gap-2">
                            {artistArtworks.slice(0, 3).map((artwork) => (
                                <div key={artwork.id} className="relative w-16 h-16 flex-shrink-0">
                                    <Image
                                        src={artwork.picture}
                                        alt={artwork.title}
                                        fill
                                        sizes="64px"
                                        className="object-cover rounded-md"
                                        onError={(e) => {
                                            e.currentTarget.src = "/placeholder-artwork.jpg"
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    )
}
