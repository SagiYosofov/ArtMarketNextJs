import React from "react"
import "../styles/globals.css"
import { UserProvider } from "../context/UserContext"
import { DataProvider } from "@/context/DataContext"
import Nav from "@/components/navigation/Nav"
import { CartProvider } from "../context/CartContext"

/**
 * RootLayout - The root layout component that wraps the entire application
 * This component provides the basic HTML structure and context providers
 * for all pages in the application
 * 

 */
export default function RootLayout({ children }) {
    return (
        // Set language and suppress hydration warnings for dark mode
        <html lang="en" suppressHydrationWarning>
            {/* Apply base styles and dark mode classes */}
            <body suppressHydrationWarning className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                {/* Context Providers wrap the application to provide global state management */}
                <CartProvider>
                    {" "}
                    {/* Manages shopping cart state */}
                    <DataProvider>
                        {" "}
                        {/* Manages application data state */}
                        <UserProvider>
                            {" "}
                            {/* Manages user authentication state */}
                            <Nav /> {/* Global navigation component */}
                            {/* Main content area with responsive container */}
                            <main className="container mx-auto px-4 py-8">{children}</main>
                            {/* Footer */}
                            <footer className="bottom-0 left-0 right-0 bg-slate-50 dark:bg-gray-800 text-gray-950 dark:text-gray-400 py-6 text-center">
                                <p>© 2025 Art Market. All rights reserved.</p>
                            </footer>
                        </UserProvider>
                    </DataProvider>
                </CartProvider>
            </body>
        </html>
    )
}
