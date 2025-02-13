"use client"
import MyArtworksComponent from "../../components/ArtistEditComponents/myArtworksComponent"
import CreateNewComponent from "../../components/ArtistEditComponents/createNewComponent"
import useArtistProfilePage from "../../hooks/useArtistProfilePage"
// Functional component for the Artist Profile page
const ArtistProfilePage = () => {
    // Destructure the state and helper functions from the custom hook
    const { isLoading, user, setShowAddForm, showAddForm, userArtworks } = useArtistProfilePage()

    // Show loading state during initial render and client-side auth check
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl">Loading...</div>
            </div>
        )
    }

    // If no user data is available (e.g., user is not logged in), render nothing
    if (!user) {
        return null
    }

    return (
        <div className="p-6 max-w-7xl mx-auto mt-24 min-h-screen">
            <div className="mb-8">
                <div className="mb-4">
                    <h2 className="text-3xl font-bold">Artist Profile</h2>
                    <h1 className="text-xl text-gray-600 mt-2">
                        Welcome, {user.firstName} {user.lastName}!
                    </h1>
                </div>
                {/* Button to toggle the form for adding a new artwork */}
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                    {/* Conditionally render an SVG plus icon when the add form is not visible */}
                    {!showAddForm && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                fillRule="evenodd"
                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    )}
                    {/* Button text changes depending on whether the form is visible */}
                    {showAddForm ? "Cancel" : "Add New Artwork"}
                </button>
            </div>
            {/* Conditional rendering: if showAddForm is true, display the form to create a new artwork */}
            {showAddForm && (
                <div className="mb-8 bg-white dark:bg-slate-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                    <CreateNewComponent onClose={() => setShowAddForm(false)} />
                </div>
            )}
            {/* Section for displaying the artist's artworks */}
            <div className="my-8">
                <h3 className="text-2xl font-semibold mb-6">My Artworks</h3>
                {userArtworks.length === 0 ? (
                    <div className="dark:bg-slate-700 text-center py-12 bg-gray-50 rounded-lg">
                        <p className="dark:text-gray-300 text-gray-600 mb-4">You haven't added any artworks yet</p>
                        <button onClick={() => setShowAddForm(true)} className="text-blue-600 hover:text-blue-700 font-medium">
                            Add your first artwork
                        </button>
                    </div>
                ) : (
                    // If artworks exist, display them in a responsive grid layout
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userArtworks.map((artwork) => (
                            <MyArtworksComponent key={artwork.id} artworkID={artwork.id} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ArtistProfilePage
