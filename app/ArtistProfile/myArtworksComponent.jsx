import dbArtworks from '../Artworks/dbArtworks.json';

const MyArtworksComponent = ({ artistID }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dbArtworks.artworks.filter(artwork => artwork.artistId === artistID).map((artwork) => (
        <div key={artwork.id} className="border rounded-lg p-4 shadow-sm">
          <img src={artwork.picture} alt={artwork.title} className="w-full h-48 object-cover rounded-lg mb-3" />
          <h3 className="font-semibold text-lg">{artwork.title}</h3>
          <p className="text-gray-600 text-sm mt-2">{artwork.description}</p>
          <p className="text-sm mt-2">
            <span className="font-medium">Medium:</span> {artwork.medium}
          </p>
          <p className="text-sm">
            <span className="font-medium">Dimensions:</span> {artwork.dimensions}
          </p>
        </div>
      ))}
    </div>
  )
}

export default MyArtworksComponent;
