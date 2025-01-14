import connectMongo from "../../../../lib/mongodb";
import { User } from '../../../../models/User'
import { User } from '../../../../models/User';

export async function POST(req) {
  try {
    await connectMongo();

    const { username } = await req.json();

    if (!username) {
      return new Response(JSON.stringify({ error: "Username is required" }), { status: 400 });
    }

    // Find the user and update the isLoggedIn field to false
    const user = await User.findOne({ username });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    // Update the isLoggedIn field
    user.isLoggedIn = false;
    await user.save();

    return new Response(JSON.stringify({ message: "Logout successful!" }), { status: 200 });
  } catch (error) {
    console.error("Error logging out:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}