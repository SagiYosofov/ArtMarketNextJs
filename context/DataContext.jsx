"use client";

import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [dbUpdate, setDbUpdate] = useState(false);
  const [artistsData, setArtistsData] = useState({ artists: [] });
  const [artworksData, setArtworksData] = useState({ artworks: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // console.log('Attempting to fetch from:', `${process.env.NEXT_PUBLIC_SERVER_URL}/api/getData`);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/getData`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response not OK. Raw response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}. Details: ${errorText}`);
      }
      
      const data = await response.json();
      // console.log('Received data:', data);
      
      if (data.artists && data.artworks) {
        setArtistsData({ artists: data.artists });
        setArtworksData({ artworks: data.artworks });
        // console.log('DataContext Artists data:', data.artists);
        // console.log('DataContext Artworks data:', data.artworks);
        setDbUpdate(false);
      } else if (data.message) {
        // If we get a message but no data, the data might still be loading on the server
        // console.log('Server message:', data.message);
        // Optionally retry after a short delay
        setTimeout(() => setDbUpdate(true), 2000);
      } else {
        throw new Error('Invalid data format received from server');
      }
    } catch (err) {
      console.error('Error details:', {
        name: err.name,
        message: err.message,
        stack: err.stack
      });
      setArtistsData({ artists: [] });
      setArtworksData({ artworks: [] });
      setError(err.message || 'An error occurred while fetching data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dbUpdate]); // Refetch when dbUpdate changes

  const refreshData = () => {
    setDbUpdate(true); // This will trigger a refetch
  };

  return (
    <DataContext.Provider 
      value={{ 
        artistsData, 
        artworksData, 
        isLoading, 
        error,
        refreshData,
        dbUpdate,
        setDbUpdate
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
}; 