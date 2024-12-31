export default async function ArtistPage({ params }) {
  // params.artistId will be "23" when URL is "http://localhost:3000/Artists/23"
  const { artistId } = params;
  console.log('Artist ID from URL:', artistId); // This will log "23"

  // Simulate fetching or using artistId
  const artistData = { id: artistId, name: `Artist ${artistId}` };

  return (
    <div>
      <h1>Artist ID: {artistData.id}</h1>
      <p>Artist Name: {artistData.name}</p>
    </div>
  );
}
