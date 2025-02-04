import { User } from "../../../../models/User"
import { Artist } from "../../../../models/Artist"
import connectMongo from "../../../../lib/mongodb"
// Creates a new user in the database with the given data and approved status of false
export async function POST(req) {
    try {
        // Connect to MongoDB
        await connectMongo()

        // Destructure the request body
        const { username, password, firstName, lastName, email, address, bio, userType } = await req.json()

        // Validate required fields
        if (!username || !password || !firstName || !lastName || !email || !userType) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 })
        }

        // // ARTIST-specific validation
        // if (userType === "ARTIST") {
        //   return new Response(JSON.stringify({ error: "Missing required fields for ARTIST" }), { status: 400 });
        // }

        // Check if the username already exists in the users collection
        const existingUser = await User.findOne({ username })
        if (existingUser) {
            return new Response(JSON.stringify({ error: "Username already exists" }), { status: 409 })
        }

        // Check if the email already exists in the users collection
        const existingEmail = await User.findOne({ email })
        if (existingEmail) {
            return new Response(JSON.stringify({ error: "Email already exists" }), { status: 409 })
        }

        // Validate firstName and lastName using regex
        const nameRegex = /^[a-zA-Z\s]+$/
        if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
            return new Response(JSON.stringify({ error: "First name and last name must contain only letters and spaces" }), {
                status: 400,
            })
        }

        // Validate bank_account_number using regex
        //  const bankRegex = /^[0-9]+$/;
        //  if (userType === "ARTIST" && !bankRegex.test(bank_account_number)) {
        //    return new Response(JSON.stringify({ error: "Bank account number must contain only digits" }), { status: 400 });
        //  }

        // Create the new user object
        const newUser = new User({
            username,
            password,
            firstName,
            lastName,
            email,
            address,
            userType,
        })

        // Save the user to the database
        await newUser.save()

        // If the user is an ARTIST, create an associated Artist document
        if (userType === "ARTIST") {
            const newArtist = new Artist({
                id: username, // Using username as id
                username,
                picture:
                    "https://images.pexels.com/photos/6373497/pexels-photo-6373497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                bio,
                bank_account_number: "123456789",
            })

            await newArtist.save()
        }
        // Return response accordingly
        return new Response(JSON.stringify({ success: true, message: "User created successfully!" }), { status: 201 })
        // Handle errors
    } catch (error) {
        console.error("Error creating user:", error)
        return new Response(JSON.stringify({ success: false, message: "Failed to create user" }), { status: 500 })
    }
}
