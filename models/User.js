import mongoose from "mongoose"

// Base schema for all users
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true, // Ensure unique usernames
        },
        password: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true, // Ensure unique emails
        },
        country: {
            type: String,
        },
        isLoggedIn: {
            type: Boolean,
            default: false,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        userType: {
            type: String,
            enum: ["ADMIN", "ARTIST"], // Can be ADMIN or ARTIST
            required: true,
        },
    },
    {
        timestamps: true, // Automatically add `createdAt` and `updatedAt`
    },
)

// Create or reuse the User model
const User = mongoose.models.User || mongoose.model("User", UserSchema)

export { User }
