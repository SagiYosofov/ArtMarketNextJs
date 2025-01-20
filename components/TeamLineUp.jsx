import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const TeamLineUp = () => {
  const teamMembers = [
    {
      name: "Arthur Cherniy",
      role: "",
      image: "/about/dev team/arthur.png",
      linkedin: "https://www.linkedin.com/in/arthur-cherniy-267946241/"
    },
    {
      name: "Sagie Yosofov",
      role: "",
      image: "/about/dev team/sagi.jpg",
      linkedin: "https://www.linkedin.com/in/sagieyosofov/"
    },
    {
      name: "Daniel Feldman",
      role: "",
      image: "/about/dev team/daniel.png",
      linkedin: "https://www.linkedin.com/in/dany-feldman/"
    },
    {
      name: "Aviv Raz",
      role: "",
      image: "/about/dev team/aviv.png",
      linkedin: "https://www.linkedin.com/in/aviv-raz-59a541b8/"
    }
  ]

  return (
    <div className="my-20">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
        Meet Our Team
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <Link 
            href={member.linkedin}
            // security messure
            target="_blank"
            rel="noopener noreferrer"
            key={index}
          >
            <div 
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            >
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {member.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {member.role}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default TeamLineUp
