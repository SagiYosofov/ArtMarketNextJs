"use client"
import { useState, useEffect } from "react"
// Custom hook for admin page, fetches all users and allows to change their status
const useAdmin = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch users
    const fetchUsers = async () => {
        try {
            const storedUser = JSON.parse(localStorage.getItem("user"))
            if (!storedUser) throw new Error("No user found in localStorage")

            const currentUser = storedUser.username
            console.log(currentUser)

            const response = await fetch("/api/AdminRoutes/userManager")
            if (!response.ok) throw new Error("Failed to fetch users")

            const data = await response.json()
            console.log(data.users)

            const filteredUsers = data.users.filter((user) => user.username !== currentUser)
            setUsers(filteredUsers)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // Toggle verification status
    const toggleVerification = async (userId, currentStatus) => {
        try {
            const response = await fetch("/api/AdminRoutes/userManager", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    isVerified: !currentStatus,
                }),
            })

            if (!response.ok) throw new Error("Failed to update user")

            // Update local state
            setUsers(users.map((user) => (user._id === userId ? { ...user, isVerified: !user.isVerified } : user)))
        } catch (err) {
            setError(err.message)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return { users, loading, error, toggleVerification }
}

export default useAdmin
