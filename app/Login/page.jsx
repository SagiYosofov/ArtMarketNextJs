"use client"
import { useLogin } from "../../hooks/useLogin"

// The LoginForm component renders the login form and handles user authentication
const LoginForm = () => {
    const { formData, responseMessage, handleChange, handleSubmit } = useLogin()

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-300">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors duration-300">
                <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    {/* Username field */}
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100 transition-colors duration-300"
                        />
                    </div>

                    {/* Password field */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100 transition-colors duration-300"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 mt-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
                    >
                        Login
                    </button>
                </form>

                {/* Display Response Message */}
                {responseMessage && (
                    <p
                        className={`text-center text-sm mb-4 ${
                            responseMessage.includes("success") ? "text-green-500" : "text-red-500"
                        }`}
                    >
                        {responseMessage}
                    </p>
                )}
            </div>
        </div>
    )
}

export default LoginForm
