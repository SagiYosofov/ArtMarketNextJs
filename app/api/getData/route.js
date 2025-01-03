import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { User } from "@/models/User";
import { Artist } from "@/models/Artist";
import { Artwork } from "@/models/Artwork";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    // Connect to MongoDB
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }
    
    await mongoose.connect(process.env.MONGODB_URI);

    // Fetch data from all collections
    const users = await User.find({});
    const artists = await Artist.find({});
    const artworks = await Artwork.find({});

    // Prepare data in the same format as mock files
    const artistsData = {
      artists: artists.map(artist => ({
        id: artist.id,
        fullName: `${users.find(u => u.username === artist.username)?.firstName} ${
          users.find(u => u.username === artist.username)?.lastName
        }`,
        country: users.find(u => u.username === artist.username)?.country,
        bio: artist.bio,
        picture: artist.picture,
        artworkIds: artist.artworkIds
      }))
    };

    const artworksData = {
      artworks: artworks.map(artwork => ({
        id: artwork.artwork_id,
        artistId: artwork.artist_id,
        title: artwork.title,
        artistName: artwork.artist_name,
        description: artwork.description,
        medium: artwork.medium,
        dimensions: artwork.dimensions,
        picture: artwork.picture
      }))
    };

    // Define file paths
    const artistsFilePath = path.join(process.cwd(), 'app', 'Artists', 'dbData.json');
    const artworksFilePath = path.join(process.cwd(), 'app', 'Artworks', 'dbArtworks.json');

    // Write files
    await fs.writeFile(artistsFilePath, JSON.stringify(artistsData, null, 2));
    await fs.writeFile(artworksFilePath, JSON.stringify(artworksData, null, 2));

    return NextResponse.json({ 
      message: "Data successfully downloaded and saved",
      artistsCount: artists.length,
      artworksCount: artworks.length
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    // Close the MongoDB connection
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }
  }
}
