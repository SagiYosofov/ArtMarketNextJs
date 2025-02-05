import Image from 'next/image'

/**
 * TechStack Component
 * Displays a grid of technology logos used in the project
 * Each technology is represented by its logo and name
 */
const TechStack = () => {
  // Array of technology objects containing name and logo path
  const technologies = [
    { name: 'Next.js', logo: '/about/techStack/nextjs.svg' },
    { name: 'MongoDB', logo: '/about/techStack/mongodb.svg' },
    { name: 'Node.js', logo: '/about/techStack/nodejs.svg' },
    { name: 'GitHub', logo: '/about/techStack/github.svg' },
    { name: 'Vercel', logo: '/about/techStack/vercel.svg' },
    { name: 'Tailwind CSS', logo: '/about/techStack/tailwind.svg' }
  ]

  return (
    // Container with vertical margin spacing
    <div className="mt-16 mb-16">
      {/* Section heading */}
      <h3 className="text-2xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
        Our Tech Stack
      </h3>
      {/* Flex container for technology logos */}
      <div className="flex justify-center items-center gap-8 flex-wrap">
        {/* Map through technologies array to render each logo */}
        {technologies.map((tech) => (
          <div key={tech.name} className="tech-logo">
            <Image src={tech.logo} alt={tech.name} width={60} height={60} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default TechStack
