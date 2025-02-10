import { NextResponse } from "next/server"
import mongoose from "mongoose"
import { User } from "@/models/User"
import { Artist } from "@/models/Artist"
import { Artwork } from "@/models/Artwork"
// Fetches all required data from the database (users, artists & artworks)
export async function GET() {
    try {
        // Connect to MongoDB with connection pooling for production
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in environment variables")
        }

        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGODB_URI, {
                maxPoolSize: 10, // Optimize for production
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
            })
        }

        // Fetch data from all collections
        const users = await User.find({})
        const artists = await Artist.find({})
        const artworks = await Artwork.find({})

        // Prepare data
        const artistsData = artists.map((artist) => ({
            id: artist.id,
            fullName: `${users.find((u) => u.username === artist.username)?.firstName} ${
                users.find((u) => u.username === artist.username)?.lastName
            }`,
            country: users.find((u) => u.username === artist.username)?.country,
            bio: artist.bio,
            picture: artist.picture,
            artworkIds: artist.artworkIds,
        }))
        // Create artworksData array
        const artworksData = artworks.map((artwork) => ({
            id: artwork.artwork_id,
            artistId: artwork.artist_id,
            title: artwork.title,
            artistName: artwork.artist_name,
            description: artwork.description,
            medium: artwork.medium,
            dimensions: artwork.dimensions,
            picture: artwork.picture,
            price: artwork.price,
        }))
        // Return the data to the sender
        return NextResponse.json({
            artists: artistsData,
            artworks: artworksData,
            message: "Data successfully retrieved",
        })
    } catch (error) {
        console.error("Error:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
    // Remove the disconnect in production as it can cause performance issues
    // Let Node.js connection pooling handle it
}
