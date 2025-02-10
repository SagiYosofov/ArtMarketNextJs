import { NextResponse } from "next/server"
import connectMongo from "@/lib/mongodb"
import { Artwork } from "@/models/Artwork"
// Deletes a given artwork from the database
export async function DELETE(request) {
    try {
        // Grabs the artwork's ID from the request by parsing it
        const { artworkId } = await request.json()
        // Connecting to mongoDB
        await connectMongo()
        // Find and the delete the artwork with the given ID
        await Artwork.findOneAndDelete({ artwork_id: artworkId })
        // Return a response accordingly
        return NextResponse.json({ message: "Artwork deleted successfully" })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
