"use client";
import { useState } from "react"
import Card from "@/components/Card";

export default function ArtworksPage() {
    const [filteredData, setFilteredData] = useState(cardData)
    const [searchTerm, setSearchTerm] = useState("")
    const [priceRange, setPriceRange] = useState([0, 5000]) // default price range

    // Filter handler
    const handleFilter = (term) => {
        setSearchTerm(term)
        const filtered = cardData.filter(
            // Check for title or artist match
            (card) => {
                card.title.toLowerCase().includes(term.toLowerCase()) || card.artist.toLowerCase().includes(term.toLowerCase())
                const matchesPrice = card.price >= priceRange[0] && card.price <= priceRange[1]
            },
        )
        setFilteredData(filtered)
    }

    // Price change handle
    const handlePriceChange = (e) => {
        const value = e.target.value
        setPriceRange([0, value])
    }

    return (
        <div className="dark:bg-slate-600 bg-red-100 min-h-screen pt-20 p-2 place-items-center">
            <div className="px-6 py-8 text-red-700 text-center">
                <div>
                    <h3 className="dark:text-white font-bold text-5xl">Artworks Page!</h3>
                    <p className="dark:text-slate-400 font-semibold mt-2 text-sm">An opportunity for you to explore artworks.</p>
                </div>
                {/* Filter Bar */}
                <div className="mt-6 mb-6">
                    <input
                        type="text"
                        className="p-2 border border-gray-300 rounded-2xl dark:bg-slate-700 dark:text-white"
                        placeholder="Search by title or artist..."
                        value={searchTerm}
                        onChange={(e) => handleFilter(e.target.value)}
                    />
                </div>

                {/* Price Slider */}
                <div className="mb-6">
                    <label className="dark:text-white text-lg font-semibold">
                        Price Range: {priceRange[0]}-{priceRange[1]}
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="5000"
                        step="100"
                        value={priceRange[1]}
                        onChange={(e) => {
                            handlePriceChange
                        }}
                        className="w-full mt-2"
                    ></input>
                </div>

                {/* Artworks Grid */}
                <div className="p-6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 place-items-center items-stretch">
                    {filteredData.length > 0 ? (
                        filteredData.map((card, index) => (
                            <Card
                                key={index}
                                imgSrc={card.imgSrc}
                                title={card.title}
                                artist={card.artist}
                                description={card.description}
                                year={card.year}
                                price={card.price}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500 dark:text-slate-400 text-center">No artworks found.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

const cardData = [
  {
      imgSrc: "https://cdn.shopify.com/s/files/1/0558/6413/1764/files/Modern_Painting_2_1024x1024.webp?v=1733287592",
      title: "Modern Woman",
      artist: "Van Jack Cherni",
      year: "2014",
      description: "A beautiful modern woman looking at you.",
      price: "3000"
  },
  {
      imgSrc: "https://img.freepik.com/premium-photo/modern-abstract-landscape-art-painting-contemporary-art-abstract-art-painting-background-nature-modern-art-landscape_1028938-162292.jpg",
      title: "Abstract Landscape",
      artist: "Daniel Feldman",
      year: "2005",
      description: "A river with mountains, trees and beautiful skies.",
      price: "1500"
  },
  {
      imgSrc: "https://sarahstentart.com/wp-content/uploads/2022/01/IMG_1417-scaled.jpg",
      title: "Abstract City",
      artist: "Euler",
      year: "1994",
      description: "A river with mountains, trees and beautiful skies.",
      price: "2000"
  },
  {
      imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqu_XqIuhc1DzRZVXSi-ZVnVXHKyDxlcS0XA&s",
      title: "Serene Landscape",
      artist: "Olivia Green",
      year: "1980",
      description: "A tranquil landscape painting capturing the serenity of a lake surrounded by mountains.",
      price: "100"
  },
  {
      imgSrc: "https://pixune.com/wp-content/uploads/2023/11/DALL%C2%B7E-2023-11-30-13.01.20-A-playful-and-imaginative-illustration-showing-an-artist-lost-in-thought-surrounded-by-a-surreal-landscape-of-unconventional-art-forms.-The-artist-a-1030x589.webp",
      title: "Vibrant Sunset",
      artist: "Liam Thomas",
      year: "2010",
      description: "A breathtaking sunset over the ocean, blending warm colors of the sky with cool tones of the water.",
      price: "1350"
  }
]