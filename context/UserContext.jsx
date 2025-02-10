"use client"

// context/UserContext.jsx
import { createContext, useContext, useState, useEffect } from "react"

// Create a context for the user data
const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null) // Store the user in state

    // Retrieve user from localStorage if it exists
    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser)) // Parse and set the user from localStorage
        }
    }, [])

    // Update the user in localStorage whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user)) // Store user in localStorage
        } else {
            localStorage.removeItem("user") // Remove user from localStorage when logged out
        }
    }, [user])
    // Provide context values to children components
    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

// Custom hook to use the user context
export const useUser = () => {
    return useContext(UserContext)
}
