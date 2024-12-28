// "use client"; // Required for client-side functionality

// const LogoutButton = ({ username }) => {
//   const handleLogout = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/api/users/Logout", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert("Logout successful!");
//         // Handle logout logic here, e.g., redirect to login page
//       } else {
//         alert(data.error || "Failed to log out.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("An error occurred during logout.");
//     }
//   };

//   return (
//     <button onClick={handleLogout} style={{ marginTop: "1rem" }}>
//       Logout
//     </button>
//   );
// };

// export default LogoutButton;