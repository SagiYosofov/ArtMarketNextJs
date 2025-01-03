import mongoose from "mongoose";

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
      ref: "User",  // Reference to the User collection by username
    },
    picture: {
      type: String,  // Artist's profile picture URL
    },
    bio: {
      type: String,
    },
    artworkIds: [{
      type: String,  // Array of artwork IDs
    }],
    amountOfSoldArts: {
      type: Number,
      default: 0,
    },
    bank_account_number: {
      type: String,
    },
  },
  {
    timestamps: false, // Disable the automatic creation of createdAt and updatedAt fields
  }
);

// Create or reuse the Artist model
const Artist = mongoose.models.Artist || mongoose.model("Artist", ArtistSchema);

export { Artist };
