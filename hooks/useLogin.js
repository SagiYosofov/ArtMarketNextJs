"use client";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import { useRouter } from 'next/navigation';

export const useLogin = () => {
    const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
    const { setUser } = useUser();
    const router = useRouter();
    
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

                if (data.user) {
                    await setUser(data.user);

                    const userType = String(data.user.userType);
                    if (userType === "ADMIN") {
                        router.push('/AdminProfile');
                    } else if (userType === "ARTIST") {
                        router.push('/ArtistProfile');
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

    return {
        formData,
        responseMessage,
        handleChange,
        handleSubmit
    };
}; 