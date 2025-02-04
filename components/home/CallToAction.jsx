import Link from "next/link"

const CallToAction = () => {
    return (
        <div className="max-w-3xl mx-auto px-4">
            <div className="bg-blue-500 text-white text-center py-16 rounded-lg shadow-lg mb-16">
                <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Art Journey?</h2>
                <p className="mb-6">Begin your journey with zero fees.</p>
                <Link href="/SignUp">
                    <button className="bg-white text-blue-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                        Start now
                    </button>
                </Link>
                <br />
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
