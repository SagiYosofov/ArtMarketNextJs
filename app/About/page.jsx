import React from 'react'
import Link from 'next/link'

const AboutPage = () => {
  return (
    <div className="mt-40 max-w-6xl mx-auto px-4">
      {/* Main heading and intro */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100">Welcome to Our Art Market</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Discover a curated marketplace where independent artists showcase and sell their unique creations directly to art enthusiasts like you.
        </p>
      </div>

      {/* Features grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {/* Unique Artwork Card */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <div className="h-14 w-14 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Unique Artworks</h3>
          <p className="text-gray-600 dark:text-gray-300">Each piece is crafted by independent artists, ensuring originality and authenticity in every creation.</p>
        </div>

        {/* Direct Support Card */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <div className="h-14 w-14 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Direct Support</h3>
          <p className="text-gray-600 dark:text-gray-300">Connect and purchase directly from artists, ensuring they receive fair compensation for their work.</p>
        </div>

        {/* Community Card */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <div className="h-14 w-14 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Join Our Community</h3>
          <p className="text-gray-600 dark:text-gray-300">Become part of a vibrant community of artists and art lovers sharing passion for creativity.</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <Link href="/Artworks">
          <button className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 transition-colors text-lg font-semibold">
            Start Exploring
          </button>
        </Link>
      </div>
    </div>
  )
}

export default AboutPage
