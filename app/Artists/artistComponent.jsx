import Image from 'next/image'
import Link from 'next/link'

const ArtistComponent = ({ artist, artworks }) => {
  // Filter artworks for this artist
  const artistArtworks = artworks?.filter(artwork => artwork.artistId === artist.id) || []

  return (
    <Link href={`/Artists/${artist.id}`} className="block">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-64 w-full">
          <Image
            src={`/artists/${artist.picture}`}
            alt={artist.fullName}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-gray-800">{artist.fullName}</h2>
            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {artist.country}
            </span>
          </div>
          
          <p className="text-gray-600 mb-4 line-clamp-2">{artist.bio}</p>
          
          <div className="border-t pt-4">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>🎨 {artistArtworks.length} Artworks</span>
              <span className="flex items-center gap-2">
                <span>🌍 {artist.country}</span>
              </span>
            </div>
          </div>

          {/* Preview of artist's artworks */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {artistArtworks.slice(0, 3).map((artwork) => (
              <div key={artwork.id} className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={`/artworks/${artwork.picture}`}
                  alt={artwork.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ArtistComponent