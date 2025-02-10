import Image from "next/image"
import technologies from "@/constants/technologies"
// Returns a UI element with technologies we used in out project
const TechStack = () => {
    // Return UI element
    return (
        <div className="mt-16 mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">Our Tech Stack</h3>
            <div className="flex justify-center items-center gap-8 flex-wrap">
                {/* Create div for each technology in the list */}
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
