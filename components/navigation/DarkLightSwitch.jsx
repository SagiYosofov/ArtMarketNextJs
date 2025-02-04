"use client"
import React, { useState, useEffect } from "react"

const DarkLightSwitch = () => {
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
        // Check localStorage first
        const storedTheme = localStorage.getItem("theme")
        if (storedTheme) {
            setIsDarkMode(storedTheme === "dark")
            document.documentElement.classList.toggle("dark", storedTheme === "dark")
        } else {
            // If no stored theme, check system preference
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
            setIsDarkMode(prefersDark)
            document.documentElement.classList.toggle("dark", prefersDark)
            localStorage.setItem("theme", prefersDark ? "dark" : "light")
        }
    }, [])

    const toggleTheme = () => {
        const newTheme = !isDarkMode
        setIsDarkMode(newTheme)
        document.documentElement.classList.toggle("dark", newTheme)
        localStorage.setItem("theme", newTheme ? "dark" : "light")
    }

    return (
        <button
            onClick={toggleTheme}
            className="p-3 shadow-full font-semibold rounded-full hover:bg-gray-300 dark:hover:bg-slate-700 bg-gray-200 dark:bg-slate-600 text-black dark:text-white"
        >
            {isDarkMode ? "Dark" : "Light"}
        </button>
    )
}

export default DarkLightSwitch
