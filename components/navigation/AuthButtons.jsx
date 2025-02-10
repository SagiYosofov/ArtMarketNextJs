import Link from "next/link"

export const AuthButtons = ({ isLoggedIn, user, onLogout, isMobile = false, onMenuClick }) => {
    const buttonBaseClass = `${isMobile ? "w-full" : ""} rounded-full font-semibold text-white shadow-2xl p-3`
    // If the user is not logged in, render the "Log in" and "Sign up" buttons.
    if (!isLoggedIn) {
        return (
            <>
                {/* "Log in" Button */}
                <Link
                    href="/Login" // Navigates to the Login page.
                    className={isMobile ? "w-full" : "hover:underline mx-2"}
                    onClick={isMobile ? onMenuClick : undefined}
                >
                    <button className={`${buttonBaseClass} hover:bg-blue-700 bg-blue-600`}>Log in</button>
                </Link>
                {/* "Sign up" Button */}
                <Link
                    href="/SignUp" // Navigates to the SignUp page.
                    className={isMobile ? "w-full" : "hover:underline mx-2"}
                    onClick={isMobile ? onMenuClick : undefined}
                >
                    <button className={`${buttonBaseClass} hover:bg-blue-950 bg-blue-800`}>Sign up</button>
                </Link>
            </>
        )
    }
    // If the user is logged in, display the "Logout" button along with profile links based on user type.
    return (
        <>
            {/* "Logout" Button */}
            <Link
                href="/"
                onClick={(e) => {
                    onLogout()
                    if (isMobile && onMenuClick) onMenuClick()
                }}
                className={isMobile ? "w-full" : "hover:underline mx-2"}
            >
                <button className={`${buttonBaseClass} hover:bg-red-700 bg-red-500`}>Logout</button>
            </Link>
            {/* Conditionally render the "Artist Profile" button if the logged-in user is an artist */}
            {user?.userType === "ARTIST" && (
                <Link
                    href="/ArtistProfile"
                    className={isMobile ? "w-full" : "hover:underline mx-2"}
                    onClick={isMobile ? onMenuClick : undefined}
                >
                    <button className={`${buttonBaseClass} hover:bg-blue-700 bg-blue-600`}>Artist Profile</button>
                </Link>
            )}
            {/* Conditionally render the "Admin Profile" button if the logged-in user is an admin */}
            {user?.userType === "ADMIN" && (
                <Link
                    href="/AdminProfile"
                    className={isMobile ? "w-full" : "hover:underline mx-2"}
                    onClick={isMobile ? onMenuClick : undefined}
                >
                    <button className={`${buttonBaseClass} hover:bg-blue-700 bg-blue-500`}>Admin Profile</button>
                </Link>
            )}
        </>
    )
}
