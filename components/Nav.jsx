"use client"; 
import logo from "../public/assets/ArtMarket-Logo.png"
import darkLogo from "../public/assets/ArtMarket-Logo-Dark.png"
import DarkLightSwitch from "./DarkLightSwitch.jsx"
import Link from "next/link";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import Image from 'next/image'
import { useCart } from "../context/CartContext";

const Nav = () => {
  const { user, setUser } = useUser(); // Access the user context
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Add this state
  const { hasCartItems } = useCart();

  // Update the login status based on the user data
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set the user from localStorage
    }
  }, []); // Run only on initial mount

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true); // User is logged in
    } else {
      setIsLoggedIn(false); // No user logged in
    }
  }, [user]);

  // Handle logout functionality
  const handleLogout = () => {
    setUser(null); // Clear user data from context
    localStorage.removeItem("user"); // Remove user data from localStorage
  };

  // Add this new function to handle mobile menu clicks
  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white dark:bg-slate-800 shadow-md z-50 w-full">
      <div className="flex items-center justify-between w-full drop-shadow-xl">
        <Link href="/" className="inline mx-2 my-2" onClick={(e) => e.stopPropagation()}>
          <Image 
            className="dark:hidden"
            width={75}
            height={75}
            src={logo}
            alt="ArtMarket Logo"
            priority
          />
          <Image
            className="hidden dark:block"
            width={75}
            height={75}
            src={darkLogo}
            alt="ArtMarket Logo"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center flex-grow">
          <Link href="/" className="hover:underline mx-2 focus:outline-none text-gray-800 dark:text-white">
            Home
          </Link>
          <Link href="/Artists" className="hover:underline mx-2 focus:outline-none text-gray-800 dark:text-white">
            Artists
          </Link>
          <Link href="/Artworks" className="hover:underline mx-2 focus:outline-none text-gray-800 dark:text-white">
            Artworks
          </Link>
          <Link href="/About" className="hover:underline mx-2 focus:outline-none text-gray-800 dark:text-white">
            About
          </Link>
        </div>

        {/* Mobile & Desktop Controls */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon - Visible on both mobile and desktop */}
          <Link 
            href="/Cart" 
            className={`p-2 rounded-full transition-colors ${
              hasCartItems 
                ? 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700' 
                : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
            }`}
          >
            <span className="text-xl" role="img" aria-label="Shopping Cart">🛒</span>
          </Link>
          
          <DarkLightSwitch />
          
          {/* Hamburger Menu Button */}
          <button
            className="md:hidden p-4"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link href="/Login" className="hover:underline mx-2 focus:outline-none">
                  <button className="rounded-full font-semibold hover:bg-red-700 text-white shadow-2xl bg-red-500 p-3">
                    Log in
                  </button>
                </Link>
                <Link href="/SignUp" className="hover:underline mx-2 focus:outline-none">
                  <button className="rounded-full shadow-2xl font-semibold hover:bg-blue-950 text-white bg-blue-800 p-3">
                    Sign up
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/" onClick={handleLogout} className="hover:underline mx-2 focus:outline-none">
                  <button className="rounded-full font-semibold hover:bg-red-700 text-white shadow-2xl bg-red-500 p-3">
                    Logout
                  </button>
                </Link>
                {user?.userType === "ARTIST" && (
                  <Link href="/ArtistProfile" className="hover:underline mx-2 focus:outline-none">
                    <button className="rounded-full font-semibold hover:bg-green-700 text-white shadow-2xl bg-green-500 p-3">
                      Artist Profile
                    </button>
                  </Link>
                )}
                {user?.userType === "ADMIN" && (
                  <Link href="/AdminProfile" className="hover:underline mx-2 focus:outline-none">
                    <button className="rounded-full font-semibold hover:bg-blue-700 text-white shadow-2xl bg-blue-500 p-3">
                      Admin Profile
                    </button>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-white dark:bg-gray-900 pb-4`}>
        <div className="flex flex-col space-y-4 px-4">
          <Link href="/" className="hover:underline focus:outline-none text-gray-800 dark:text-white" onClick={handleMobileMenuClick}>
            Home
          </Link>
          <Link href="/Artists" className="hover:underline focus:outline-none text-gray-800 dark:text-white" onClick={handleMobileMenuClick}>
            Artists
          </Link>
          <Link href="/Artworks" className="hover:underline focus:outline-none text-gray-800 dark:text-white" onClick={handleMobileMenuClick}>
            Artworks
          </Link>
          <Link href="/About" className="hover:underline focus:outline-none text-gray-800 dark:text-white" onClick={handleMobileMenuClick}>
            About
          </Link>
          
          <div className="flex flex-col space-y-2">
            {!isLoggedIn ? (
              <>
                <Link href="/Login" className="w-full" onClick={handleMobileMenuClick}>
                  <button className="w-full rounded-full font-semibold hover:bg-red-700 text-white shadow-2xl bg-red-500 p-3">
                    Log in
                  </button>
                </Link>
                <Link href="/SignUp" className="w-full" onClick={handleMobileMenuClick}>
                  <button className="w-full rounded-full shadow-2xl font-semibold hover:bg-blue-950 text-white bg-blue-800 p-3">
                    Sign up
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/" onClick={(e) => { handleLogout(); handleMobileMenuClick(); }} className="w-full">
                  <button className="w-full rounded-full font-semibold hover:bg-red-700 text-white shadow-2xl bg-red-500 p-3">
                    Logout
                  </button>
                </Link>
                {user?.userType === "ARTIST" && (
                  <Link href="/ArtistProfile" className="w-full" onClick={handleMobileMenuClick}>
                    <button className="w-full rounded-full font-semibold hover:bg-green-700 text-white shadow-2xl bg-green-500 p-3">
                      Artist Profile
                    </button>
                  </Link>
                )}
                {user?.userType === "ADMIN" && (
                  <Link href="/AdminProfile" className="w-full" onClick={handleMobileMenuClick}>
                    <button className="w-full rounded-full font-semibold hover:bg-blue-700 text-white shadow-2xl bg-blue-500 p-3">
                      Admin Profile
                    </button>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;