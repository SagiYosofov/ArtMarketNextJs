"use client"
import { useState } from "react"
import { useUser } from "../context/UserContext"
import { useRouter } from "next/navigation"
// Custom hook to manage user login functionality
export const useLogin = () => {
    // Fetch the server URL from environment variables
    const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL
    // Access the `setUser` function from the user context to update the logged-in user
    const { setUser } = useUser()
    // Next.js router for programmatic navigation
    const router = useRouter()
    // State for managing form inputs (username & password)
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })
    // State to store response messages (e.g., success or error messages)
    const [responseMessage, setResponseMessage] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }
    //Handles form submission to send login details to server.
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // Send login request to the server
            const response = await fetch(SERVER_URL + "/api/users/Login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
            //
            const data = await response.json() // Parse the response JSON
            if (response.ok) {
                setResponseMessage("Login successful!")
                // If user data is returned, update the user context
                if (data.user) {
                    await setUser(data.user)

                    const userType = String(data.user.userType)
                    if (userType === "ADMIN") {
                        router.push("/AdminProfile")
                    } else if (userType === "ARTIST") {
                        router.push("/ArtistProfile")
                    }
                }
            } else {
                setResponseMessage(data.error || "Invalid credentials.")
            }
        } catch (error) {
            console.error("Error:", error)
            setResponseMessage("Failed to log in.")
        }
    }
    // Return state variables and functions for use in login components
    return {
        formData,
        responseMessage,
        handleChange,
        handleSubmit,
    }
}
