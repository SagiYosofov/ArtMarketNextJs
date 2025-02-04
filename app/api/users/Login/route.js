import { User } from "../../../../models/User"
import { Artist } from "../../../../models/Artist"
import connectMongo from "../../../../lib/mongodb"
// Handles logging in the given user and returning their data to the sender
export async function POST(req) {
    try {
        await connectMongo()

        const { username, password } = await req.json() // Destructure the request body

        // Validate required fields
        if (!username || !password) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 })
        }

        // Find the user in the database
        const user = await User.findOne({ username })

        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 })
        }

        // Verify password (note: in production, use bcrypt for hashing and comparison)
        if (user.password !== password) {
            return new Response(JSON.stringify({ error: "Invalid password" }), { status: 401 })
        }

        // if (user.userType === "ADMIN" && user.isVerified === false) {
        //   return new Response(JSON.stringify({ error: "User not verified yet" }), { status: 401 });
        // }

        if (user.isVerified === false) {
            return new Response(JSON.stringify({ error: "User not verified yet" }), { status: 401 })
        }

        // Check if the user is already logged in
        if (user.isLoggedIn === true) {
            return new Response(JSON.stringify({ error: "User already logged in!" }), { status: 401 })
        }

        // Handle successful login
        user.isLoggedIn = true
        await user.save()

        // If the user is an ARTIST, fetch additional artist-specific data
        let artistData = null
        if (user.userType === "ARTIST") {
            // Find the artist profile by username (reference to the User model)
            artistData = await Artist.findOne({ username: user.username })
            if (!artistData) {
                return new Response(JSON.stringify({ error: "Artist data not found, there is a problem in the db" }), {
                    status: 404,
                })
            }
        }

        // Return the response with the user data, including artist-specific data if applicable
        return new Response(
            JSON.stringify({
                message: "Login successful!",
                user: {
                    username: user.username,
                    password: user.password,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    address: user.address,
                    isLoggedIn: true,
                    isVerified: user.isVerified,
                    userType: user.userType,
                    artistData: artistData, // Include artist-specific data if the user is an artist
                },
            }),
            { status: 200 },
        )
        // Handle errors
    } catch (error) {
        console.error("Error logging in:", error)
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 })
    }
}
