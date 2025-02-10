"use client"
// Import necessary hooks and components
import { useState } from "react"
import useSignUp from "../../hooks/useSignUp"
import SignUpForm from "../../components/SignUpForm"

// RegisterForm component handles the user registration functionality
const RegisterForm = () => {
    // Destructure values and functions from the custom useSignUp hook
    // formData: contains form input values
    // responseMessage: contains status messages for success/error
    // handleSubmit: processes form submission
    // handleChange: handles input field changes
    const { formData, responseMessage, handleSubmit, handleChange } = useSignUp()

    return (
        // Main container with responsive styling and dark mode support
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-300 mt-20">
            {/* Form card container with styling */}
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors duration-300">
                {/* SignUpForm component with required props */}
                <SignUpForm formData={formData} handleSubmit={handleSubmit} handleChange={handleChange} />
                
                {/* Conditional rendering of response message */}
                {/* Shows success in green and error in red */}
                {responseMessage.message && (
                    <p
                        className={`text-center text-sm mb-4 ${
                            responseMessage.type === "success" ? "text-green-500" : "text-red-500"
                        }`}
                    >
                        {responseMessage.message}
                    </p>
                )}
            </div>
        </div>
    )
}

export default RegisterForm
