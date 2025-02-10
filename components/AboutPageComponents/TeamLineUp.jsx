import React from "react"
import Image from "next/image"
import Link from "next/link"
import teamMembers from "@/constants/teamMembersConstants"

/**
 * TeamLineUp Component
 * Displays a grid of team member cards with their photos and details.
 * Each card is clickable and links to the member's LinkedIn profile.
 * The layout is responsive: 1 column on mobile, 2 on tablet, and 4 on desktop.
 */
const TeamLineUp = () => {
    return (
        <div className="my-20">
            {/* Section heading */}
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">Meet Our Team</h2>
            
            {/* Responsive grid container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Map through team members array to create individual cards */}
                {teamMembers.map((member, index) => (
                    <Link
                        href={member.linkedin}
                        // security messure
                        target="_blank"
                        rel="noopener noreferrer"
                        key={index}
                    >
                        {/* Team member card with hover effects */}
                        <div className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                            {/* Circular image container */}
                            <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                />
                            </div>
                            {/* Member details */}
                            <div className="text-center">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{member.name}</h3>
                                <p className="text-gray-600 dark:text-gray-300 mt-2">{member.role}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default TeamLineUp
