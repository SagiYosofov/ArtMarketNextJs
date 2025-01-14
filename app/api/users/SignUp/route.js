import { User } from '../../../../models/User'
import { Artist } from "../../../../models/Artist";
import connectMongo from "../../../../lib/mongodb";  // Assuming this is your MongoDB connection helper

export async function POST(req) {
  try {
    // Connect to MongoDB
    console.log("later moving this to the server");
    await connectMongo();

    // Destructure the request body
    const { username, 
      password, 
      firstName, 
      lastName, 
      email, 
      address, 
      userType, 
      profile_picture, 
      bio, 
      bank_account_number } = await req.json();

    // Validate required fields
    if (!username || !password || !firstName || !lastName || !email || !userType) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    // ARTIST-specific validation
    if (userType === "ARTIST" && (!profile_picture || !bio || !bank_account_number)) {
      return new Response(JSON.stringify({ error: "Missing required fields for ARTIST" }), { status: 400 });
    }

    // Check if the username already exists in the users collection
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "Username already exists" }), { status: 409 });
    }

    // Check if the email already exists in the users collection
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return new Response(JSON.stringify({ error: "Email already exists" }), { status: 409 });
    }

     // Validate firstName and lastName using regex
     const nameRegex = /^[a-zA-Z\s]+$/;
     if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
       return new Response(JSON.stringify({ error: "First name and last name must contain only letters and spaces" }), { status: 400 });
     }
 
     // Validate bank_account_number using regex
     const bankRegex = /^[0-9]+$/;
     if (userType === "ARTIST" && !bankRegex.test(bank_account_number)) {
       return new Response(JSON.stringify({ error: "Bank account number must contain only digits" }), { status: 400 });
     }

    // Create the new user object
    const newUser = new User({
      username,
      password,
      firstName,
      lastName,
      email,
      address,
      userType,
    });

    // Save the user to the database
    await newUser.save();

    // If the user is an ARTIST, create an associated Artist document
    if (userType === "ARTIST") {
      const newArtist = new Artist({
        username,  // Link to the username in the User model
        profile_picture,
        bio,
        bank_account_number,
      });

      // Save the artist data
      await newArtist.save();
    }

    return new Response(JSON.stringify({ success: true, message: "User created successfully!" }), { status: 201 });


  } catch (error) {
    console.error("Error creating user:", error);
    
    return new Response(JSON.stringify({ success: false, message: "Failed to create user" }), { status: 500 });
  }
}
