import Image from "next/image"
import { useMyArtworks } from "../../hooks/useMyArtworks"

// Component for displaying and editing individual artwork details
const MyArtworksComponent = ({ artworkID }) => {
    // Custom hook to handle artwork state and operations
    const {
        handleSubmit,
        artwork,
        editedArtwork,
        handleInputChange,
        isEditing,
        setIsEditing,
        displayedArtwork,
        handleEditClick,
        handleDeleteClick,
    } = useMyArtworks({ artworkID })

    if (!artwork) {
        return <div>Artwork not found</div>
    }

    // Render edit form when in editing mode
    if (isEditing) {
        return (
            <form onSubmit={handleSubmit} className="border rounded-lg p-4 shadow-md">
                {/* Image preview section */}
                <div className="relative w-full h-48 mb-4">
                    <Image src={artwork.picture} alt={artwork.title} fill className="object-cover rounded-md" />
                </div>
                <div className="space-y-4">
                    {/* Title input field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={editedArtwork.title}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                        />
                    </div>
                    {/* Price input field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={editedArtwork.price}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                        />
                    </div>
                    {/* Description textarea field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
                        <textarea
                            name="description"
                            value={editedArtwork.description}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                        />
                    </div>
                    {/* Action buttons */}
                    <div className="flex gap-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        )
    }

    // Display mode - shows artwork details and edit/delete buttons
    return (
        <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow dark:border-gray-700">
            {/* Artwork image display */}
            <div className="relative w-full h-48 mb-4">
                <Image src={artwork.picture} alt={artwork.title} fill className="object-cover rounded-md" />
            </div>
            <div className="space-y-2">
                {/* Title and price header */}
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">{displayedArtwork?.title || artwork.title}</h3>
                    <span className="text-lg font-semibold text-green-600">
                        ${displayedArtwork?.price?.toLocaleString() || artwork.price?.toLocaleString()}
                    </span>
                </div>
                {/* Artwork description */}
                <p className="text-gray-600">{displayedArtwork?.description || artwork.description}</p>
                {/* Medium and dimensions info */}
                <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-500">{artwork.medium}</span>
                    <span className="text-sm text-gray-500">{artwork.dimensions}</span>
                </div>
                {/* Edit and delete buttons */}
                <button
                    onClick={handleEditClick}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
                >
                    Edit Artwork
                </button>

                <button
                    onClick={handleDeleteClick}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full"
                >
                    Delete Artwork
                </button>
            </div>
        </div>
    )
}

export default MyArtworksComponent
