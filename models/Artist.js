import mongoose from "mongoose"

// Define the Artist schema with a reference to the username from the User collection
const ArtistSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
            ref: "User", // Reference to the User collection by username
        },
        picture: {
            type: String,
            default:
                "https://images.pexels.com/photos/6373497/pexels-photo-6373497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        bio: {
            type: String,
        },
        artworkIds: [
            {
                type: String, // Array of artwork IDs
            },
        ],
        amountOfSoldArts: {
            type: Number,
            default: 0,
        },
        bank_account_number: {
            type: String,
            default: "123456789",
        },
    },
    {
        timestamps: false, // Disable the automatic creation of createdAt and updatedAt fields
    },
)

// Create or reuse the Artist model
const Artist = mongoose.models.Artist || mongoose.model("Artist", ArtistSchema)

export { Artist }
