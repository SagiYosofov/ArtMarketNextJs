import Link from "next/link"

/**
 * CallToAction Component
 * 
 * A prominent section displayed on the home page that encourages users to sign up
 * or login to the platform.
 * 
 * Features:
 * - Sign up button for new users
 * - Login link for existing members
 * - Responsive design with centered content
 * - Hover effects on buttons for better interactivity
 */
const CallToAction = () => {
    return (
        <div className="max-w-3xl mx-auto px-4">
            {/* Main container with blue background and rounded corners */}
            <div className="bg-blue-500 text-white text-center py-16 rounded-lg shadow-lg mb-16">
                {/* Heading and subtext */}
                <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Art Journey?</h2>
                <p className="mb-6">Begin your journey with zero fees.</p>
                
                {/* Sign Up button - Primary CTA */}
                <Link href="/SignUp">
                    <button className="bg-white text-blue-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                        Start now
                    </button>
                </Link>
                <br />
                
                {/* Login button - Secondary CTA */}
                <Link href="/Login">
                    <button className="text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition">
                        Already a Member? Sign In
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default CallToAction
