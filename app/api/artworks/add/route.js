import { NextResponse } from "next/server"
import connectMongo from "@/lib/mongodb"
import { Artwork } from "@/models/Artwork"
// Adds a given artwork to the database
export async function POST(request) {
    try {
        // Parse the request into a json format
        const artworkData = await request.json()
        //Connect to mongoDB
        await connectMongo()
        // Create new artwork using the mongodb model
        const newArtwork = new Artwork({
            artwork_id: artworkData.id,
            artist_id: artworkData.artistId,
            title: artworkData.title,
            artist_name: artworkData.artistName,
            description: artworkData.description,
            medium: artworkData.medium,
            dimensions: artworkData.dimensions,
            picture: artworkData.picture,
            price: artworkData.price,
        })
        // Upload new artwork to mongodb and return message accordingly
        await newArtwork.save()
        return NextResponse.json({ message: "Artwork added successfully" })
    } catch (error) {
        console.error("Error adding artwork:", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
