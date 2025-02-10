"use client"
// A component for a sign up form containing username, password, firstname, 
// lastname, email, address, usertype, artist bio & submit button
export const SignUpForm = ({ formData, handleSubmit, handleChange }) => {
    return (
        <div>
            {/* Form Heading */}
            <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">Sign Up</h2>
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

                {/* First Name field */}
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                        First Name
                    </label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100 transition-colors duration-300"
                    />
                </div>

                {/* Last Name field */}
                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                        Last Name
                    </label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100 transition-colors duration-300"
                    />
                </div>

                {/* Email field */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100 transition-colors duration-300"
                    />
                </div>

                {/* Address field */}
                <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                        Address
                    </label>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100 transition-colors duration-300"
                    />
                </div>

                {/* User Type Selection (ADMIN/ARTIST) */}
                <div className="mb-4">
                    <label htmlFor="userType" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                        User Type
                    </label>
                    <select
                        name="userType"
                        id="userType"
                        value={formData.userType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100 transition-colors duration-300"
                    >
                        <option value="ADMIN">ADMIN</option>
                        <option value="ARTIST">ARTIST</option>
                    </select>
                </div>

                {/* Conditional fields for ARTIST user type */}
                {formData.userType === "ARTIST" && (
                    <>
                        {/* Artist Bio */}
                        <div className="mb-4">
                            <label htmlFor="bio" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                                Bio
                            </label>
                            <textarea
                                name="bio"
                                id="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100 transition-colors duration-300"
                            />
                        </div>
                    </>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full px-4 py-2 mt-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
                >
                    Register
                </button>
            </form>
        </div>
    )
}

export default SignUpForm
