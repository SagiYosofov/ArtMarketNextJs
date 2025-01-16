import React from 'react';
import "../styles/globals.css";
import { UserProvider } from "../context/UserContext";
import { DataProvider } from '@/context/DataContext';
import Nav from '@/components/Nav';
import { CartProvider } from "../context/CartContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <CartProvider>
          <DataProvider>
            <UserProvider>
              <Nav />
              <main className="container mx-auto px-4 py-8">
                {children}
              </main>
            </UserProvider>
          </DataProvider>
        </CartProvider>
      </body>
    </html>
  );
}
