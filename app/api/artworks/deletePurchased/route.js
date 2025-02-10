import { NextResponse } from "next/server"
import connectMongo from "@/lib/mongodb"
import { Artwork } from "@/models/Artwork"
// Deletes a set of artworks from the database with the given IDs
export async function DELETE(request) {
    try {
        // Parse the request and grab the array of ids
        const { artworkIds } = await request.json()
        // Connect to MongoDB
        await connectMongo()

        // Delete multiple artworks by their IDs
        await Artwork.deleteMany({ artwork_id: { $in: artworkIds } })
        // Return a response accordingly
        return NextResponse.json({ message: "Purchased artworks deleted successfully" })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
