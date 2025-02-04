import { useEffect, useState } from "react"
import { useData } from "@/context/DataContext"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/UserContext"

export const useArtistProfilePage = () => {
    const { user } = useUser()
    const { artworksData } = useData()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [userArtworks, setUserArtworks] = useState([])
    const [showAddForm, setShowAddForm] = useState(false)

    useEffect(() => {
        const checkAuth = () => {
            // Move localStorage check inside useEffect
            const storedUser = localStorage.getItem("user")

            if (!storedUser && !user) {
                router.push("/Login")
            } else {
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
