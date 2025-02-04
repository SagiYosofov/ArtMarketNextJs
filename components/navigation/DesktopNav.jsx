import Link from "next/link"

export const DesktopNav = () => (
    <div className="hidden md:flex items-center flex-grow">
        <Link href="/Artists" className="hover:underline mx-2 focus:outline-none text-gray-800 dark:text-white">
            Artists
        </Link>
        <Link href="/Artworks" className="hover:underline mx-2 focus:outline-none text-gray-800 dark:text-white">
            Artworks
        </Link>
        <Link href="/About" className="hover:underline mx-2 focus:outline-none text-gray-800 dark:text-white">
            About
        </Link>
    </div>
)
