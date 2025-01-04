import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import { Artwork } from '@/models/Artwork';

export async function POST(request) {
  try {
    const artworkData = await request.json();
    await connectMongo();

    const newArtwork = new Artwork({
      artwork_id: artworkData.id,
      artist_id: artworkData.artistId,
      title: artworkData.title,
      artist_name: artworkData.artistName,
      description: artworkData.description,
      medium: artworkData.medium,
      dimensions: artworkData.dimensions,
      picture: artworkData.picture,
    });

    await newArtwork.save();
    return NextResponse.json({ message: 'Artwork added successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}