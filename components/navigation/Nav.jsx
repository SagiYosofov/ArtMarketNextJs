"use client"

import DarkLightSwitch from "./DarkLightSwitch"
import Link from "next/link"
import { NavLogo } from "./NavLogo"
import { DesktopNav } from "./DesktopNav"
import { AuthButtons } from "./AuthButtons"
import { MobileMenu } from "./MobileMenu"
import useNav from "../../hooks/useNav"

// Fixed top navigation bar.
const Nav = () => {
    // Destructure nav-related values from our custom hook.
    const {
        handleMobileMenuClick,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isLoggedIn,
        user,
        handleLogout,
        menuHeight,
        mobileMenuRef,
        hasCartItems,
    } = useNav()
    
    return (
        <div className="fixed top-0 left-0 right-0 bg-white dark:bg-slate-800 shadow-md z-50 w-full">
            <div className="flex items-center justify-between w-full">
                {/* Logo with mobile menu toggle */}
                <div className="flex transition-transform duration-300 hover:scale-105">
                    <NavLogo onMobileClick={handleMobileMenuClick} />
                </div>
                <DesktopNav />
                {/* Desktop navigation links */}
                <div className="flex items-center space-x-4">
                    {/* Cart icon with dynamic styling */}
                    <Link
                        href="/Cart"
                        className={`p-2 rounded-full transition-colors ${
                            hasCartItems
                                ? "bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                                : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                        }`}
                    >
                        <span className="text-xl" role="img" aria-label="Shopping Cart">
                            🛒
                        </span>
                    </Link>
                    {/* Dark/light mode toggle */}    
                    <DarkLightSwitch />
                    {/* Mobile menu toggle button (visible on mobile only) */}   
                    <button className="md:hidden p-4" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <svg
                            className="w-6 h-6 text-gray-800 dark:text-white"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isMobileMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
                        </svg>
                    </button>
                    {/* Auth buttons for desktop */}
                    <div className="hidden md:flex items-center space-x-4">
                        <AuthButtons isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
                    </div>
                </div>
            </div>
            {/* Mobile menu */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                menuHeight={menuHeight}
                mobileMenuRef={mobileMenuRef}
                onMenuClick={handleMobileMenuClick}
                isLoggedIn={isLoggedIn}
                user={user}
                onLogout={handleLogout}
            />
        </div>
    )
}

export default Nav
