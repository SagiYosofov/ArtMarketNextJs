import { Artwork } from "@/models/Artwork.js"
import connectMongo from "@/lib/mongodb"
// Updates a given artwork's data in the database
export async function PUT(req, { params }) {
    try {
        // grabs the artwork id
        const { id } = await Promise.resolve(params)
        // Parse the data to update from the request
        const updateData = await req.json()

        // Only allow updating these specific fields
        const allowedUpdates = {
            title: updateData.title,
            price: updateData.price,
            description: updateData.description,
        }

        // Connect using Mongoose
        await connectMongo()

        // Use findOneAndUpdate instead of delete and create
        const updatedArtwork = await Artwork.findOneAndUpdate(
            { artwork_id: id },
            { $set: allowedUpdates },
            { new: true }, // This option returns the updated document
        )
        // Handle case where artwork to update wasn't found in the database.
        if (!updatedArtwork) {
            return new Response(JSON.stringify({ error: "Artwork not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            })
        }
        // Returns the updated data to the sender.
        return new Response(JSON.stringify(updatedArtwork), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        })
        // Error handling
    } catch (error) {
        console.error("Error updating artwork:", error)
        return new Response(JSON.stringify({ error: "Failed to update artwork" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        })
    }
}
