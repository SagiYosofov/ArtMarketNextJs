"use client"; 
import logo from "../public/assets/ArtMarket-Logo.png"
import darkLogo from "../public/assets/ArtMarket-Logo-Dark.png"
import DarkLightSwitch from "/components/DarkLighSwitch"
import Link from "next/link";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import Image from 'next/image'

const Nav = () => {
  const { user, setUser } = useUser(); // Access the user context
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

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

  return (
    <div className="flex fixed w-full top-0 left-0 bg-white dark:bg-slate-800 dark:text-white items-center drop-shadow-xl">
      <Link href="/" className="inline mx-2 my-2">
        <Image 
          className="dark:hidden"
          width={75}
          height={75}
          src={logo}
          alt="ArtMarket Logo"
        />
        <Image
          className="hidden dark:block"
          width={75}
          height={75}
          src={darkLogo}
          alt="ArtMarket Logo"
        />
      </Link>

      <Link href="/" className="hidden md:inline hover:underline mx-2 focus:outline-none text-gray-800 dark:text-white">
        Home
      </Link>

      <Link href="/Artists" className="hidden md:inline hover:underline mx-2 focus:outline-none text-gray-800 dark:text-white">
        Artists
      </Link>

      <Link href="/Artworks" className="hidden md:inline hover:underline mx-2 focus:outline-none text-gray-800 dark:text-white">
        Artworks
      </Link>

      <Link href="/About" className="hidden md:inline hover:underline mx-2 focus:outline-none">
        About
      </Link>

      <Link href="/Cart" className="hidden md:inline hover:underline mx-2 focus:outline-none text-gray-800 dark:text-white">
        Cart
      </Link>

      {/* Grouping DarkLightSwitch, Login, SignUp buttons together */}
      <div className="absolute right-0 flex items-center mx-2 p-4 space-x-4">
        <DarkLightSwitch />

        {/* Conditional Rendering Based on User Login State */}
        {!isLoggedIn ? (
          <>
            <Link href="/Login" className="hover:underline mx-2 focus:outline-none">
              <button className="rounded-full font-semibold hover:bg-red-700 text-white shadow-2xl bg-red-500 p-3">
                Log in
              </button>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              <Link href="/SignUp" className="hover:underline mx-2 focus:outline-none">
                <button className="rounded-full shadow-2xl font-semibold hover:bg-blue-950 text-white bg-blue-800 p-3">
                  Sign up
                </button>
              </Link>
            </div>
          </>
        ) : (
          <>
            {/* Logout Button */}
            <Link href="/" onClick={handleLogout} className="hover:underline mx-2 focus:outline-none">
              <button className="rounded-full font-semibold hover:bg-red-700 text-white shadow-2xl bg-red-500 p-3">
                Logout
              </button>
            </Link>

            {/* Show profile buttons based on user type */}
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
  );
};

export default Nav;