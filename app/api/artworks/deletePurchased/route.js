import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import { Artwork } from '@/models/Artwork';

export async function DELETE(request) {
  try {
    const { artworkIds } = await request.json();
    await connectMongo();

    // Delete multiple artworks by their IDs
    await Artwork.deleteMany({ artwork_id: { $in: artworkIds } });
    
    return NextResponse.json({ message: 'Purchased artworks deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 