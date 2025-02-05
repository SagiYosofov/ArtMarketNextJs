import { useEffect, useState } from "react"
import { useData } from "@/context/DataContext"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/UserContext"

// Custom hook to manage artist profile page state and authentication
export const useArtistProfilePage = () => {
    // Get current user from UserContext
    const { user } = useUser()
    // Get artworks data from DataContext
    const { artworksData } = useData()
    const router = useRouter()
    // Loading state while checking authentication and fetching data
    const [isLoading, setIsLoading] = useState(true)
    // State to store artworks belonging to the current artist
    const [userArtworks, setUserArtworks] = useState([])
    // Toggle state for artwork addition form
    const [showAddForm, setShowAddForm] = useState(false)

    useEffect(() => {
        const checkAuth = () => {
            // Move localStorage check inside useEffect
            const storedUser = localStorage.getItem("user")

            // Redirect to login if no user is authenticated
            if (!storedUser && !user) {
                router.push("/Login")
            } else {
                // If user has artist data, filter artworks to show only their own
                if (user?.artistData) {
                    const filteredArtworks = artworksData.artworks.filter((artwork) => artwork.artistId === user.artistData.id)
                    setUserArtworks(filteredArtworks)
                }
                setIsLoading(false)
            }
        }

        checkAuth()
    }, [user, router, artworksData])
    return { isLoading, user, setShowAddForm, showAddForm, userArtworks }
}

export default useArtistProfilePage
