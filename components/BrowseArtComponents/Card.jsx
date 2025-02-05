import { useRouter } from "next/navigation"

const Card = ({ imgSrc, title, artist, year, description, price, artworkId }) => {
    const router = useRouter()

    /**
     * Handles click event on the card
     * Navigates to the detailed view of the artwork
     */
    const handleCardClick = () => {
        router.push(`/Artworks/${artworkId}`)
    }

    return (
        <div
            className="max-w-sm text-left w-full dark:bg-slate-800 dark:text-white bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            onClick={handleCardClick}
        >
            {/* Artwork image with hover effect */}
            <img
                src={imgSrc}
                alt={title}
                className="w-full h-64 object-cover transition-transform hover:scale-105 duration-300"
            />
            {/* Artwork information section */}
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 hover:underline">{artist}</h3>
                <h4 className="italic text-l font-semibold text-gray-600 dark:text-gray-300 hover:underline">{`${title}`}</h4>
                <p className="dark:text-gray-100 text-black">${price}</p>
            </div>
        </div>
    )
}

export default Card
