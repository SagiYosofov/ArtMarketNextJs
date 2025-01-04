"use client";
import { useState } from "react";
import { useUser } from "../../context/UserContext";

const LoginForm = () => {

  // const SERVER_URL = process.env.SERVER_URL;
  const SERVER_URL = "http://localhost:3000";
  console.log("read server form env file", SERVER_URL);


  const { user, setUser } = useUser(); // Destructure setUser from context to update user state
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(SERVER_URL + "/api/users/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setResponseMessage("Login successful!");

        // Store the user data in the context
        if (data.user) {
          setUser(data.user); // Update the user state in context

          // Print the user data to the console
          console.log("Logged in user:", user);
          console.log("API response data:", data.user.userType);

          // Ensure userType is a string and redirect based on user type
          const userType = String(data.user.userType); // Convert to string
          if (userType === "ADMIN") {
            window.location.href = "/AdminProfile"; // Redirect to Admin Profile
          } else if (userType === "ARTIST") {
            window.location.href = "/ArtistProfile"; // Redirect to Artist Profile
          }
        }
      } else {
        setResponseMessage(data.error || "Invalid credentials.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Failed to log in.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors duration-300">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Username field */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600 dark:text-gray-300"
            >
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
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 dark:text-gray-300"
            >
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
              responseMessage.includes("success")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {responseMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
