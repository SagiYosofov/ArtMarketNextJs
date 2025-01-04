import { Artwork } from '@/models/Artwork.js';
import { connectToDatabase } from '@/lib/mongodb';
import { useUser } from '@/context/UserContext'
export async function PUT(req, { params }) {

    const { dbUpdate, setDbUpdate } = useUser();





  try {
    const { id } = await Promise.resolve(params);

    console.log("the id is", id);
    const updateData = await req.json();
    console.log("the update data is", updateData);

    // Only allow updating these specific fields
    const allowedUpdates = {
      title: updateData.title,
      price: updateData.price,
      description: updateData.description
    };

    await connectToDatabase();

    // Find and delete the existing artwork
    const existingArtwork = await Artwork.findOne({ artwork_id: id });
    
    if (!existingArtwork) {
      return new Response(JSON.stringify({ error: 'Artwork not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create new artwork document with updated fields
    const updatedArtwork = {
      ...existingArtwork.toObject(), // Keep all existing fields
      ...allowedUpdates, // Override with allowed updates
    };

    // Delete the old document
    await Artwork.findOneAndDelete({ artwork_id: id });

    // Create the new document
    await Artwork.create(updatedArtwork);

    return new Response(JSON.stringify(updatedArtwork), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error updating artwork:', error);
    return new Response(JSON.stringify({ error: 'Failed to update artwork' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  finally{
    setDbUpdate(true);
    await mongoose.connection.close();
    
  }
}