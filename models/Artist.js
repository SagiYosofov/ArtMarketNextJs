import mongoose from "mongoose";

// Define the Artist schema with a reference to the username from the User collection
const ArtistSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,  // Ensure the artist's username is unique
      ref: "User",  // Reference to the User collection by username
    },
    profile_picture: {
      type: String,  // Artist's profile picture URL or path
    },
    bio: {
      type: String,  // Short bio of the artist
    },
    amountOfSoldArts: {
      type: Number,  // Number of artworks sold by the artist
      default: 0,
    },
    bank_account_number: {
      type: String,  // Artist's bank account number
    },
  },
  {
    timestamps: false, // Disable the automatic creation of createdAt and updatedAt fields
  }
);

// Create or reuse the Artist model
const Artist = mongoose.models.Artist || mongoose.model("Artist", ArtistSchema);

export { Artist };
