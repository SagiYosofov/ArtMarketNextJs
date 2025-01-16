import Image from 'next/image'

const TechStack = () => {
  const technologies = [
    { name: 'Next.js', logo: '/about/techStack/nextjs.svg' },
    { name: 'MongoDB', logo: '/about/techStack/mongodb.svg' },
    { name: 'Node.js', logo: '/about/techStack/nodejs.svg' },
    { name: 'GitHub', logo: '/about/techStack/github.svg' },
    { name: 'Vercel', logo: '/about/techStack/vercel.svg' },
    { name: 'Tailwind CSS', logo: '/about/techStack/tailwind.svg' }
  ]

  return (
    <div className="mt-16 mb-16">
      <h3 className="text-2xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
        Our Tech Stack
      </h3>
      <div className="flex justify-center items-center gap-8 flex-wrap">
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
