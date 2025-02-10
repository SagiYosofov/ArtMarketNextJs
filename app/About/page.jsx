import React from "react"
import Link from "next/link"
import TeamLineUp from "../../components/AboutPageComponents/TeamLineUp"
import TechStack from "../../components/AboutPageComponents/techStack"

// About Page
const AboutPage = () => {
    return (
        <div className="mt-40 max-w-6xl mx-auto px-4">
            {/* Main heading and intro */}
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100">Welcome to Our Art Market</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Discover a curated marketplace where independent artists showcase and sell their unique creations directly to
                    art enthusiasts like you.
                </p>
            </div>

            {/* How We Built It Section */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">How We Built It</h2>
                <div className="space-y-6 text-gray-600 dark:text-gray-300">
                    <p className="leading-relaxed">
                        Our platform is built with modern web technologies to ensure a smooth experience.
                    </p>
                    <p className="leading-relaxed">
                        We picked Next.js because it has strong tools for server-side rendering and dynamic routing, which help us
                        manage our growing number of artwork pages easily.
                    </p>

                    <p className="leading-relaxed">
                        We use MongoDB as our database because it’s flexible and lets us store detailed artwork and user data in a
                        document format.
                    </p>

                    <p className="leading-relaxed">
                        JavaScript for everything! from frontend interactions to backend logic, smooth and consistent development.
                    </p>

                    <p className="leading-relaxed">
                        and GitHub has helped us manage our code with version control, and also allowed convieninent for parallel
                        development.
                    </p>
                </div>
            </div>

            {/* Team Section */}
            <TeamLineUp />

            {/* Tech Stack Section - replaced with component */}
            <TechStack />

            {/* Call to Action */}
            <div className="text-center mt-16">
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
