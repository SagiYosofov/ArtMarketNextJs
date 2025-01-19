"use client"
import { useState } from "react";

const RegisterForm = () => {

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;




  // State to store form data with initial values for each field
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    userType: "ARTIST", // Default user type set to ARTIST
    bio: "I'm an artist",
  });

   // State to store the response message and its type (success or error)
   const [responseMessage, setResponseMessage] = useState({
    message: "",
    type: "", // success or error
  });

  // Function to handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'username') {
      // Remove spaces from username and show warning if spaces were attempted
      const cleanUsername = value.replace(/\s+/g, '');

      setFormData({ ...formData, [name]: cleanUsername });
    } else {
      // Handle other fields normally
      setFormData({ ...formData, [name]: value });
    }
  };

  // Function to handle form submission asynchronously
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    try {
      // Sending form data to the server using a POST request
      const response = await fetch(`${SERVER_URL}/api/users/SignUp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Sending the form data as JSON in the request body
      });

      // Parsing the JSON response from the server
      const data = await response.json();

      if (response.ok) {
        // If the response is successful, show a success message and reset the form
        setResponseMessage({
          message: "User registered successfully!",
          type: "success", // Success type
        });
        setFormData({
          username: "",
          password: "",
          firstName: "",
          lastName: "",
          email: "",
          address: "",
          userType: "ARTIST", 
          bio: "",
        });
      } else {
       // If the response is not successful, show the error message returned from the server
        setResponseMessage({
        message: data.error || "An error occurred.",
        type: "error", // Error type
      });
    }
    } catch (error) {
      // Catching any errors during the fetch request
      console.error("Error:", error);
      setResponseMessage({
        message: "Failed to register user.",
        type: "error", // Error type
      });
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-300 mt-20">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors duration-300">
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

        {/* Display Response Message */}
        {responseMessage.message && (
          <p
            className={`text-center text-sm mb-4 ${
              responseMessage.type === "success" ? "text-green-500" : "text-red-500"
            }`}
          >
            {responseMessage.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
