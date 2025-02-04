import mongoose from "mongoose"
// import connectMongo from '../lib/mongodb'
// await connectMongo()
// Define the Artwork schema
const ArtworkSchema = new mongoose.Schema(
    {
        artwork_id: {
            type: String,
            required: true,
            unique: true,
        },
        artist_id: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        artist_name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        medium: {
            type: String,
            required: true,
        },
        dimensions: {
            type: String,
            required: true,
        },
        picture: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: false,
    },
)

// Check if the model already exists, and only define it if it doesn't
if (!mongoose.models.Artwork) {
    mongoose.model("Artwork", ArtworkSchema)
}

const Artwork = mongoose.models.Artwork

export { Artwork }
