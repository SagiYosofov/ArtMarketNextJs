import Link from "next/link"

// DesktopNav component renders a navigation menu that is visible on medium-sized screens and above
export const DesktopNav = () => (
    <div className="hidden md:flex items-center flex-grow">
        {/* Navigation link to the Artists page */}
        <Link href="/Artists" className="hover:underline mx-2 focus:outline-none text-gray-800 dark:text-white">
            Artists
        </Link>

        {/* Navigation link to the Artworks page */}
        <Link href="/Artworks" className="hover:underline mx-2 focus:outline-none text-gray-800 dark:text-white">
            Artworks
        </Link>

        {/* Navigation link to the About page */}
        <Link href="/About" className="hover:underline mx-2 focus:outline-none text-gray-800 dark:text-white">
            About
        </Link>
    </div>
)
