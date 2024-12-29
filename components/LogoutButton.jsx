import Link from "next/link";
import { useUser } from "../context/UserContext";

const LogoutButton = () => {
  const { user, setUser } = useUser();

  // Handle logout functionality by interacting with the API
  const handleLogout = async () => {
    console.log("Going to logout");
    console.log("username: ", user.username);
    try {
      const response = await fetch("http://localhost:3000/api/users/Logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: user.username }),  // Send the logged-in user's username
      });

      const data = await response.json();

      if (response.ok) {
        setUser(null); // Clear user data from context
        localStorage.removeItem("user"); // Remove user data from localStorage
      } else {
        console.error(data.error);  // Handle errors, like already logged out
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Link href="/" onClick={handleLogout} className="hover:underline mx-2 focus:outline-none">
      <button className="rounded-full font-semibold hover:bg-red-700 text-white shadow-2xl bg-red-500 p-3">
        Logout
      </button>
    </Link>
  );
};

export default LogoutButton;
