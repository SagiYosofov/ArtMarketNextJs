import { useUser } from "../context/UserContext"
import { useEffect, useState, useRef } from "react"
import { useCart } from "../context/CartContext"

// Custom hook for managing navigation bar state and functionality
export const useNav = () => {
    // Get user context and cart status
    const { user, setUser } = useUser()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { hasCartItems } = useCart()
    // Ref for measuring mobile menu height for animations
    const mobileMenuRef = useRef(null)
    const [menuHeight, setMenuHeight] = useState("0px")

    // Check for stored user data on component mount
    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    // Update login status whenever user state changes
    useEffect(() => {
        setIsLoggedIn(!!user)
    }, [user])

    // Dynamically adjust mobile menu height for smooth animations
    useEffect(() => {
        if (mobileMenuRef.current) {
            setMenuHeight(isMobileMenuOpen ? `${mobileMenuRef.current.scrollHeight}px` : "0px")
        }
    }, [isMobileMenuOpen])

    // Handle user logout process
    const handleLogout = async () => {
        try {
            // Send logout request to server
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/Logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: user.username }),
            })

            if (response.ok) {
                // Clear local storage and state only after successful logout
                setUser(null)
                localStorage.removeItem("user")
                localStorage.removeItem("artGalleryCart")
                // Notify other components about cart changes
                window.dispatchEvent(new Event("cartUpdate"))
            } else {
                const data = await response.json()
                console.error("Logout failed:", data.error)
            }
        } catch (error) {
            console.error("Error during logout:", error)
        }
    }

    // Close mobile menu when a navigation action occurs
    const handleMobileMenuClick = () => {
        setIsMobileMenuOpen(false)
        setMenuHeight("0px")
    }

    // Return all necessary state and handlers for navigation
    return {
        handleMobileMenuClick,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isLoggedIn,
        user,
        handleLogout,
        menuHeight,
        mobileMenuRef,
        hasCartItems,
    }
}
export default useNav
