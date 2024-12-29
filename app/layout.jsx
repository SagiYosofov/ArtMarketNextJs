"use client"
import React from 'react';
import "../styles/globals.css"; // Import global styles (including Tailwind
import { UserProvider } from "../context/UserContext";
import Nav from '@/components/Nav';

export default function RootLayout({ children }) {
  return (
    <UserProvider>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>ArtMarket</title>
          {/* Add other meta tags or links like CSS or favicon here */}
        </head>
        <body>
        <div>
        {/* Navbar */}
        <Nav />

        {/* Content Wrapper */}
        <main> {/* Added pt-20 globally */}
          {children}
        </main>
      </div>
        </body>
      </html>
    </UserProvider>
  );
}
