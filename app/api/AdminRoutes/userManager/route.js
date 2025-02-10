import { NextResponse } from "next/server"
import connectMongo from "@/lib/mongodb"
import { User } from "@/models/User"

// GET all users - fetches all users from the database without their passwords
export async function GET() {
    try {
        await connectMongo()
        const users = await User.find({}).select("-password") // Exclude password from results
        return NextResponse.json({ users })
    } catch (error) {
        console.error("Error fetching users:", error)
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
    }
}

// PUT to update user verification status
export async function PUT(request) {
    try {
        const { userId, isVerified } = await request.json()
        await connectMongo()

        const updatedUser = await User.findByIdAndUpdate(userId, { isVerified }, { new: true }).select("-password")

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        return NextResponse.json({ user: updatedUser })
    } catch (error) {
        console.error("Error updating user:", error)
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
    }
}
