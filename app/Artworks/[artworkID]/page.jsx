import data from "../mockArtworks";

export default async function ArtworkPage({ params }) {
  const { artworkID } = await Promise.resolve(params);

  const artworkData = data.artworks.find((item) => item.id === artworkID);

  if (!artworkData) {
    return (
      <div className="pt-20 text-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-red-500">Artwork Not Found</h1>
        <p className="text-lg text-gray-600">Please check the artwork ID and try again.</p>
        <a
          href="/"
          className="mt-4 inline-block px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
        >
          Go Back
        </a>
      </div>
    );
  }

  return (
    <div className="pt-20 flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Artwork Image */}
        <img
          src={artworkData.picture}
          alt={artworkData.title}
          className="w-full h-64 md:h-96 object-cover"
        />
        <div className="p-6">
          {/* Artwork Title */}
          <h1 className="text-3xl font-bold text-gray-800">{artworkData.title}</h1>
          <p className="text-gray-600 text-sm mt-2">By {artworkData.artistName}</p>

          {/* Description */}
          <p className="mt-4 text-gray-700 leading-relaxed">{artworkData.description}</p>

          {/* Details */}
          <div className="mt-6 space-y-4">
            <div>
              <p className="text-gray-800 font-semibold">Medium:</p>
              <p className="text-gray-600">{artworkData.medium}</p>
            </div>
            <div>
              <p className="text-gray-800 font-semibold">Dimensions:</p>
              <p className="text-gray-600">{artworkData.dimensions}</p>
            </div>
            <div>
              <p className="text-gray-800 font-semibold">Location:</p>
              <p className="text-gray-600">{artworkData.location}</p>
            </div>
          </div>

          {/* Back Button */}
          <a
            href="/Artworks"
            className="mt-6 inline-block px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
          >
            Back to Gallery
          </a>
        </div>
      </div>
    </div>
  );
}