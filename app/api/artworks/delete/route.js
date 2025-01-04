import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb';
import { Artwork } from '@/models/Artwork';

export async function DELETE(request) {
  try {
    const { artworkId } = await request.json();
    await connectMongo();

    await Artwork.findOneAndDelete({ artwork_id: artworkId });
    return NextResponse.json({ message: 'Artwork deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}