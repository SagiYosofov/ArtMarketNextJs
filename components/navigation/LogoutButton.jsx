"use client" // Required for client-side functionality

// LogoutButton component renders a logout button that triggers a provided logout function when clicked.
// Props:
// - onLogout: A function to be executed when the logout button is clicked (e.g., to clear session data or update the UI)
// - className: Optional additional CSS classes to customize the button's appearance
const LogoutButton = ({ username, onLogout, className }) => {
    const handleClick = async () => {
        if (typeof onLogout === "function") {
            await onLogout()
        }
    }
    // Render the button with appropriate styling and the click handler attached.
    return (
        <button
            onClick={handleClick}
            className={`px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded transition-colors ${className || ""}`}
        >
            Logout
        </button>
    )
}

export default LogoutButton
