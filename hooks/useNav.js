import { useUser } from "../context/UserContext"
import { useEffect, useState, useRef } from "react"
import { useCart } from "../context/CartContext"
//Nav bar logic
export const useNav = () => {
    const { user, setUser } = useUser()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { hasCartItems } = useCart()
    const mobileMenuRef = useRef(null)
    const [menuHeight, setMenuHeight] = useState("0px")

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    useEffect(() => {
        setIsLoggedIn(!!user)
    }, [user])

    useEffect(() => {
        if (mobileMenuRef.current) {
            setMenuHeight(isMobileMenuOpen ? `${mobileMenuRef.current.scrollHeight}px` : "0px")
        }
    }, [isMobileMenuOpen])

    const handleLogout = async () => {
        try {
            // Call the logout API endpoint
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
                window.dispatchEvent(new Event("cartUpdate"))
            } else {
                const data = await response.json()
                console.error("Logout failed:", data.error)
            }
        } catch (error) {
            console.error("Error during logout:", error)
        }
    }

    const handleMobileMenuClick = () => {
        setIsMobileMenuOpen(false)
        setMenuHeight("0px")
    }
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
