import { useUser } from "@/context/UserContext"
import { useData } from "@/context/DataContext"
import { useState, useEffect } from "react"
// Custom hook for handling artist profile page artwork logic
export const useMyArtworks = ({ artworkID }) => {
    const { user } = useUser()
    const { artworksData, dbUpdate, setDbUpdate } = useData()
    const [isEditing, setIsEditing] = useState(false)
    const [editedArtwork, setEditedArtwork] = useState(null)
    const [displayedArtwork, setDisplayedArtwork] = useState(null)

    // Find the artwork with matching ID
    const artwork = artworksData.artworks.find((art) => art.id === artworkID)

    // Initialize both edited and displayed artwork
    useEffect(() => {
        if (artwork) {
            setDisplayedArtwork(artwork)
            setEditedArtwork(artwork)
        }
    }, [artwork])

    // Initialize editedArtwork when entering edit mode
    const handleEditClick = () => {
        setEditedArtwork({ ...artwork })
        setIsEditing(true)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setEditedArtwork((prev) => ({
            ...prev,
            [name]: name === "price" ? parseFloat(value) : value,
        }))
    }
    // Handles deleting a selected artwork
    const handleDeleteClick = async () => {
        const oldDisplayed = displayedArtwork

        try {
            // Immediately remove from display
            setDisplayedArtwork(null)

            // Trigger API call to remove from the database
            const response = await fetch("/api/artworks/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ artworkId: artworkID }),
            })

            if (!response.ok) {
                throw new Error("Failed to delete artwork")
            }

            // Force a fresh load or update of data, if needed
            setDbUpdate(true)
        } catch (error) {
            console.error("Error deleting artwork:", error)
            // Revert UI change if something goes wrong
            setDisplayedArtwork(oldDisplayed)
            alert("Unable to delete artwork. Please try again.")
        }
    }
    // Uploads the given data to the database, creating a new artwork.
    const handleSubmit = async (e) => {
        e.preventDefault()

        const updateData = {
            title: editedArtwork.title,
            price: editedArtwork.price,
            description: editedArtwork.description,
        }
        // use api to update the database.
        try {
            const response = await fetch(`/api/artworks/edit/${artworkID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateData),
            })

            if (response.ok) {
                const updatedArtwork = await response.json()
                setIsEditing(false)
                setDbUpdate(true)
                // Update the displayed artwork immediately
                setDisplayedArtwork({
                    ...displayedArtwork,
                    ...updateData,
                })
            } else {
                const errorData = await response.json()
                console.error("Failed to update artwork:", errorData.error)
                alert("Failed to update artwork. Please try again.")
            }
        } catch (error) {
            console.error("Error updating artwork:", error)
            alert("An error occurred while updating the artwork.")
        }
    }
    return {
        handleSubmit,
        artwork,
        editedArtwork,
        handleInputChange,
        isEditing,
        setIsEditing,
        displayedArtwork,
        handleEditClick,
        handleDeleteClick,
    }
}
