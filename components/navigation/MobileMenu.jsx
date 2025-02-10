import Link from "next/link"
import { AuthButtons } from "./AuthButtons"

// MobileMenu component renders a collapsible mobile navigation menu.
export const MobileMenu = ({ isOpen, menuHeight, mobileMenuRef, onMenuClick, isLoggedIn, user, onLogout }) => (
    <div
        className="md:hidden overflow-hidden transition-[height,opacity] duration-300 ease-in-out bg-white dark:bg-gray-900"
        style={{ height: menuHeight }}
    >
        <div
            ref={mobileMenuRef}
            className={`flex flex-col space-y-4 px-4 py-4 transform transition-transform duration-300 ease-in-out ${
                isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
            }`}
        >
            {/* Navigation Link: Artists */}
            <Link
                href="/Artists"
                className="hover:underline focus:outline-none text-gray-800 dark:text-white"
                onClick={onMenuClick}
            >
                Artists
            </Link>
            {/* Navigation Link: Artworks */}
            <Link
                href="/Artworks"
                className="hover:underline focus:outline-none text-gray-800 dark:text-white"
                onClick={onMenuClick}
            >
                Artworks
            </Link>
            {/* Navigation Link: About */}
            <Link
                href="/About"
                className="hover:underline focus:outline-none text-gray-800 dark:text-white"
                onClick={onMenuClick}
            >
                About
            </Link>
            {/* Container for the authentication buttons.*/}
            <div className="flex flex-col space-y-2">
                <AuthButtons isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} isMobile={true} onMenuClick={onMenuClick} />
            </div>
        </div>
    </div>
)
