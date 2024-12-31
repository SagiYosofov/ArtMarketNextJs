export default async function ArtworkPage({ params }) {
    // params.artistId will be "23" when URL is "http://localhost:3000/Artists/23"
    const { artworkID } = params;
    console.log('Artist ID from URL:', artworkID); // This will log "23"
  
    // Simulate fetching or using artistId
    // Try to fetch the data from DB
    const artworkData = { id: artworkID, name: `Artist ${artworkID}` };
  
    return (
      <div className="pt-20">
        <h1>Artwork ID: {artworkData.id}</h1>
        <p>Artwork Name: {artworkData.name}</p>
      </div>
    );
  }