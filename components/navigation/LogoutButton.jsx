"use client" // Required for client-side functionality

const LogoutButton = ({ username, onLogout, className }) => {
    const handleClick = async () => {
        if (typeof onLogout === "function") {
            await onLogout()
        }
    }

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
