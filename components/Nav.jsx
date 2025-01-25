"use client";
import { useUser } from "../context/UserContext";
import { useEffect, useState, useRef } from "react";
import { useCart } from "../context/CartContext";
import DarkLightSwitch from "./DarkLightSwitch";
import Link from "next/link";
import { NavLogo } from "./navigation/NavLogo";
import { DesktopNav } from "./navigation/DesktopNav";
import { AuthButtons } from "./navigation/AuthButtons";
import { MobileMenu } from "./navigation/MobileMenu";

const Nav = () => {
  const { user, setUser } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { hasCartItems } = useCart();
  const mobileMenuRef = useRef(null);
  const [menuHeight, setMenuHeight] = useState("0px");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  useEffect(() => {
    if (mobileMenuRef.current) {
      setMenuHeight(isMobileMenuOpen ? `${mobileMenuRef.current.scrollHeight}px` : "0px");
    }
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    try {
      // Call the logout API endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/Logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: user.username }),
      });

      if (response.ok) {
        // Clear local storage and state only after successful logout
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("artGalleryCart");
        window.dispatchEvent(new Event('cartUpdate'));
      } else {
        const data = await response.json();
        console.error("Logout failed:", data.error);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(false);
    setMenuHeight("0px");
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white dark:bg-slate-800 shadow-md z-50 w-full">
      <div className="flex items-center justify-between w-full drop-shadow-xl">
        <NavLogo onMobileClick={handleMobileMenuClick} />
        <DesktopNav />
        
        <div className="flex items-center space-x-4">
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

          <div className="hidden md:flex items-center space-x-4">
            <AuthButtons 
              isLoggedIn={isLoggedIn}
              user={user}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </div>

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
  );
};

export default Nav;