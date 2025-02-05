import Link from 'next/link';

/**
 * CallToAction Component
 * 
 * A prominent section displayed on the home page that encourages users to sign up
 * or login to the platform. Features a bold heading, subtext, and two action buttons.
 * 
 * The component uses Next.js Link components for client-side navigation and
 * Tailwind CSS for styling.
 */
const CallToAction = () => {
  return (
    // Container with maximum width and center alignment
    <div className="max-w-3xl mx-auto px-4">
      {/* Main CTA card with blue background */}
      <div className="bg-blue-500 text-white text-center py-16 rounded-lg shadow-lg mb-16">
        {/* Main heading */}
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Art Journey?</h2>
        {/* Subtext */}
        <p className="mb-6">Begin your journey with zero fees.</p>
        
        {/* Sign Up button - Primary action */}
        <Link href="/SignUp">
          <button className="bg-white text-blue-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Start now
          </button>
        </Link>
        
        <br />
        
        {/* Login button - Secondary action */}
        <Link href="/Login">
          <button className="text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition">
            Already a Member? Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CallToAction; 