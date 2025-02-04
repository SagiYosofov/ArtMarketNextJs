import connectMongo from "../../../../lib/mongodb"

import { User } from "../../../../models/User"
// Updates the given user’s logged in status in the database to false
export async function POST(req) {
    try {
        // Connect to mongoDB
        await connectMongo()
        // Grab the username from the request
        const { username } = await req.json()
        // Check if the username is not empty
        if (!username) {
            return new Response(JSON.stringify({ error: "Username is required" }), { status: 400 })
        }

        // Find the user and update the isLoggedIn field to false
        const user = await User.findOne({ username })
        // Handle the case where the user is not found in the DB.
        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 })
        }

        // Update the isLoggedIn field
        user.isLoggedIn = false
        await user.save()
        // Return response accordingly
        return new Response(JSON.stringify({ message: "Logout successful!" }), { status: 200 })
        // Handle errors
    } catch (error) {
        console.error("Error logging out:", error)
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 })
    }
}
