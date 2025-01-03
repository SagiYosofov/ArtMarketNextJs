"use client";

// context/UserContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import dbArtistsData from '@/app/Artists/dbData.json'
import dbArtworksData from '@/app/Artworks/dbArtworks.json'

// Create a context for the user data
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store the user in state
  const [dbUpdate , setDbUpdate] = useState(true);

  // Retrieve user from localStorage if it exists
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set the user from localStorage
    }
  }, []);



  useEffect(() => {
    try {
      // Check if both data files exist and have content
      if (dbArtistsData?.artists?.length > 0 && dbArtworksData?.artworks?.length > 0 && dbUpdate==false) {
        console.log("Data files loaded and up to date");
      }
      else {
        setDbUpdate(false);
        console.log("Data doesnt exist or needs update. downloading");
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/getData`)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error fetching data:', error));
      }
    } catch (error) {
      console.warn('cant download data from mongo:', error);
    }

    
  }, [dbUpdate]);


  // Update the user in localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user)); // Store user in localStorage
    } else {
      localStorage.removeItem("user"); // Remove user from localStorage when logged out
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser , dbUpdate , setDbUpdate}}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = () => {
  return useContext(UserContext);
};
