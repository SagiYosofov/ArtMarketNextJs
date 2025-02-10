"use client"
import { useState } from "react"
const useSignUp = () => {
    const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL
    // State to store form data with initial values for each field
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        userType: "ARTIST", // Default user type set to ARTIST
        bio: "I'm an artist",
    })

    // State to store the response message and its type (success or error)
    const [responseMessage, setResponseMessage] = useState({
        message: "",
        type: "", // success or error
    })

    // Function to handle changes in form fields
    const handleChange = (e) => {
        const { name, value } = e.target

        if (name === "username") {
            // Remove spaces from username and show warning if spaces were attempted
            const cleanUsername = value.replace(/\s+/g, "")

            setFormData({ ...formData, [name]: cleanUsername })
        } else {
            // Handle other fields normally
            setFormData({ ...formData, [name]: value })
        }
    }

    // Function to handle form submission asynchronously
    const handleSubmit = async (e) => {
        e.preventDefault() // Prevents the default form submission behavior

        try {
            // Sending form data to the server using a POST request
            const response = await fetch(`${SERVER_URL}/api/users/SignUp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData), // Sending the form data as JSON in the request body
            })

            // Parsing the JSON response from the server
            const data = await response.json()

            if (response.ok) {
                // If the response is successful, show a success message and reset the form
                setResponseMessage({
                    message: "User registered successfully!",
                    type: "success", // Success type
                })
                setFormData({
                    username: "",
                    password: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    address: "",
                    userType: "ARTIST",
                    bio: "",
                })
            } else {
                // If the response is not successful, show the error message returned from the server
                setResponseMessage({
                    message: data.error || "An error occurred.",
                    type: "error", // Error type
                })
            }
        } catch (error) {
            // Catching any errors during the fetch request
            console.error("Error:", error)
            setResponseMessage({
                message: "Failed to register user.",
                type: "error", // Error type
            })
        }
    }

    return { formData, responseMessage, handleSubmit, handleChange }
}
export default useSignUp
