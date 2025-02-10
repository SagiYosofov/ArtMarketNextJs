import { useState } from "react"
import { useUser } from "@/context/UserContext"
import { useData } from "@/context/DataContext"
import createNewConstants from "../constants/createNewConstants"
// Custom hook for create new art functionality on artist profile page.
export const useCreateNewArt = ({ onClose }) => {
    // Retrieve constants
    const {
        INITIAL_FORM_STATE,
        MEDIUM_OPTIONS,
        DIMENSION_OPTIONS,
        VALID_IMAGE_EXTENSIONS,
        ALLOWED_HOSTS,
        ALLOWED_HOSTS_MESSAGE,
    } = createNewConstants()
    const { user } = useUser()
    const { setDbUpdate } = useData()
    // Local state for loading and form data
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        ...INITIAL_FORM_STATE,
        id: Math.floor(Math.random() * 1000000),
        artistId: user.artistData.id,
        artistName: `${user.firstName} ${user.lastName}`,
    })
    // Validate image URL: check file extension and allowed host
    const validateImageUrl = (url) => {
        try {
            const parsedUrl = new URL(url)

            // Check file extension
            if (!VALID_IMAGE_EXTENSIONS.some((ext) => parsedUrl.pathname.toLowerCase().endsWith(ext))) {
                return { isValid: false, message: "Invalid image format. URL must end with .jpg, .jpeg, .png, .gif, or .webp" }
            }

            // Check if hostname is allowed
            const isAllowedHost = ALLOWED_HOSTS.some(
                (host) => parsedUrl.hostname === host || parsedUrl.hostname.endsWith(`.${host}`),
            )

            if (!isAllowedHost) {
                return { isValid: false, message: "Invalid image host. Please use one of the allowed hosting providers." }
            }

            return { isValid: true }
        } catch (error) {
            return { isValid: false, message: "Invalid URL format" }
        }
    }
    // Update form state and validate image URL for 'picture' field
    const handleChange = (e) => {
        const { name, value } = e.target

        if (name === "picture" && value !== "") {
            const validation = validateImageUrl(value)
            if (!validation.isValid) {
                alert(validation.message + "\n\n" + ALLOWED_HOSTS_MESSAGE)
                return
            }
        }

        setFormData((prev) => ({ ...prev, [name]: value }))
    }
    // Handle form submission: validate, post data, update UI
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validate image URL before submission
        const validation = validateImageUrl(formData.picture)
        if (!validation.isValid) {
            alert(validation.message + "\n\n" + ALLOWED_HOSTS_MESSAGE)
            return
        }

        setIsLoading(true)

        try {
            const response = await fetch("/api/artworks/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (!response.ok) throw new Error("Failed to add artwork")

            setFormData(INITIAL_FORM_STATE)
            setDbUpdate(true)
            alert("Artwork added successfully!")
            onClose()
        } catch (error) {
            console.error("Error adding artwork:", error)
            alert("Failed to add artwork")
        } finally {
            setIsLoading(false)
        }
    }
    return { formData, handleChange, handleSubmit, MEDIUM_OPTIONS, DIMENSION_OPTIONS, ALLOWED_HOSTS_MESSAGE, isLoading }
}
export default useCreateNewArt
