"use client"
import { useState } from "react";
import useSignUp from "../../hooks/useSignUp";
import SignUpForm from "../../components/SignUpForm";

const RegisterForm = () => {

  const {formData,responseMessage,handleSubmit,handleChange} = useSignUp();
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-300 mt-20">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors duration-300">
        <SignUpForm formData={formData} handleSubmit={handleSubmit} handleChange={handleChange}/>
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
