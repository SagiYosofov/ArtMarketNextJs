import Link from "next/link"
import Image from "next/image"

export default function HisWorks({ artwork }) {
    return (
        <Link href={`/Artworks/${artwork.id}`} className="group block">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48 md:h-64">
                    <Image
                        src={artwork.picture}
                        alt={artwork.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">{artwork.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{artwork.description}</p>
                    <div className="mt-4 flex justify-between items-center">
                        <span className="text-gray-500 dark:text-gray-400">{artwork.medium}</span>
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">${artwork.price.toLocaleString()}</span>
                    </div>
                    <div className="mt-2 text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 text-sm text-right">
                        View Details →
                    </div>
                </div>
            </div>
        </Link>
    )
}
