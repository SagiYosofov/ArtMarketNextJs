// "use client"
// import React, { useState, useEffect } from "react"

// const DarkLightSwitch = () => {
//     const [isDarkMode, setIsDarkMode] = useState(false)

//     useEffect(() => {
//         const storedTheme = localStorage.getItem("theme")
//         if (storedTheme) {
//             setIsDarkMode(storedTheme === "dark")
//         } else {
//             const prefersDark = window.matchMedia("(prefers-color-scheme: dark")
//             setIsDarkMode(prefersDark)
//         }
//     }, [])

//     useEffect(() => {
//         if (isDarkMode) {
//             document.documentElement.classList.add("dark")
//             localStorage.setItem("theme", "dark")
//         } else {
//             document.documentElement.classList.remove("dark")
//             localStorage.setItem("theme", "light")
//         }
//     }, [isDarkMode])

//     return (
//         <button
//             onClick={() => setIsDarkMode(!isDarkMode)}
//             className="p-3 shadow-full font-semibold rounded-full hover:bg-gray-300 dark:hover:bg-slate-700 bg-gray-200 dark:bg-slate-600 text-black dark:text-white"
//         >
//             {isDarkMode ? "Dark" : "Light"}
//         </button>
//     )
// }

// export default DarkLightSwitch