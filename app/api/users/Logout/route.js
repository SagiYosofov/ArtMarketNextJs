import connectMongo from "../../../../lib/mongodb";
import { User } from "../../../../models/User";

export async function POST(req) {
  try {
    // Establish a connection to MongoDB
    await connectMongo();

    // Destructure the username from the incoming JSON request body
    const { username } = await req.json();

    console.log("In the backend I got:", username);

    // Check if the username is provided
    if (!username) {
      return new Response(
        JSON.stringify({ error: "Username is required" }),
        { status: 400 }
      );
    }

    // Find the user by username
    const user = await User.findOne({ username });

    // If the user is not found, return a 404 error
    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404 }
      );
    }

    // Set the user's `isLoggedIn` field to false to log the user out
    user.isLoggedIn = false;

    // Save the updated user document back to the database
    await user.save();

    // Return a successful response
    return new Response(
      JSON.stringify({ message: "Logout successful!" }),
      { status: 200 }
    );
  } catch (error) {
    // Log any error and return a generic 500 error response
    console.error("Error logging out:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
