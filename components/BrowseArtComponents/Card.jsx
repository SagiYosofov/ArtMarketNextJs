

import { useRouter } from "next/navigation";

const Card = ({ imgSrc, title, artist, year, description, price, artworkId }) => {
  const router = useRouter();

  // Navigate to the artwork's detailed view page when card is clicked
  const handleCardClick = () => {
    router.push(`/Artworks/${artworkId}`);
  };

  return (
    // Card container with hover effects and dark mode support
    <div
      className="max-w-sm text-left w-full dark:bg-slate-800 dark:text-white bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Artwork image with hover zoom effect */}
      <img
        src={imgSrc}
        alt={title}
        className="w-full h-64 object-cover transition-transform hover:scale-105 duration-300"
      />
      {/* Card content section */}
      <div className="p-4">
        {/* Artist name with hover underline effect */}
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 hover:underline">
          {artist}
        </h3>
        {/* Artwork title with hover underline effect */}
        <h4 className="italic text-l font-semibold text-gray-600 dark:text-gray-300 hover:underline">
          {`${title}`}
        </h4>
        {/* Artwork price */}
        <p className="dark:text-gray-100 text-black">${price}</p>
      </div>
    </div>
  );
};

export default Card;