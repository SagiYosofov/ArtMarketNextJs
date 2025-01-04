import { Artwork } from '@/models/Artwork.js';
import mongoose from 'mongoose';
import connectMongo from '@/lib/mongodb';

export async function PUT(req, { params }) {
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

    // Connect using Mongoose
    await connectMongo();

    // Use findOneAndUpdate instead of delete and create
    const updatedArtwork = await Artwork.findOneAndUpdate(
      { artwork_id: id },
      { $set: allowedUpdates },
      { new: true } // This option returns the updated document
    );
    
    if (!updatedArtwork) {
      return new Response(JSON.stringify({ error: 'Artwork not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

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
}