"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Create a React Context to manage and share data globally
const DataContext = createContext()
// DataProvider component that supplies data to its children
export const DataProvider = ({ children }) => {
    // State variables to manage data, loading, and error states
    const [dbUpdate, setDbUpdate] = useState(false) // Tracks if data needs to be refreshed
    const [artistsData, setArtistsData] = useState({ artists: [] }) // Stores artist data
    const [artworksData, setArtworksData] = useState({ artworks: [] }) // Stores artwork data
    const [isLoading, setIsLoading] = useState(true) // Indicates if data is being loaded
    const [error, setError] = useState(null) // Stores error messages, if any
    // Function to fetch data from the server
    const fetchData = async () => {
        try {
            setIsLoading(true)
            setError(null)
            // Fetch data from the server using environment variable for URL
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/getData`)
            // handle case if response is not ok
            if (!response.ok) {
                const errorText = await response.text()
                console.error("Response not OK. Raw response:", errorText)
                throw new Error(`HTTP error! status: ${response.status}. Details: ${errorText}`)
            }
            // Parse response JSON data
            const data = await response.json()
            // Check if the required data is present and update accordingly
            if (data.artists && data.artworks) {
                setArtistsData({ artists: data.artists })
                setArtworksData({ artworks: data.artworks })
                setDbUpdate(false)
            } else if (data.message) {
                // If we get a message but no data, the data might still be loading on the server
                // Optionally retry after a short delay
                setTimeout(() => setDbUpdate(true), 2000)
            } else {
                // If data format is invalid, throw an error
                throw new Error("Invalid data format received from server")
            }
        } catch (err) {
            // Handle any errors during data fetching
            console.error("Error details:", {
                name: err.name,
                message: err.message,
                stack: err.stack,
            })
            setArtistsData({ artists: [] })
            setArtworksData({ artworks: [] })
            setError(err.message || "An error occurred while fetching data")
        } finally {
            setIsLoading(false)
        }
    }

    // useEffect to fetch data on mount and when dbUpdate changes
    useEffect(() => {
        fetchData()
    }, [dbUpdate]) // Refetch when dbUpdate changes

    // Function to manually trigger data refresh
    const refreshData = () => {
        setDbUpdate(true) // This will trigger a refetch
    }

    // Provide context values to children components
    return (
        <DataContext.Provider
            value={{
                artistsData,
                artworksData,
                isLoading,
                error,
                refreshData,
                dbUpdate,
                setDbUpdate,
            }}
        >
            {children}
        </DataContext.Provider>
    )
}
// Custom hook to easily access DataContext values
export const useData = () => {
    return useContext(DataContext)
}
