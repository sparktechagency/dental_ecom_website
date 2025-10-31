"use client"
import Link from "next/link";
import React, { useState } from "react"; // Suspense remove koro
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useForgotPasswordMutation } from "@/redux/feature/auth/authApi";

export default function ForgetPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });
  
  const [forgotPassword, { isLoading, isError, error, isSuccess }] = useForgotPasswordMutation();

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await forgotPassword(formData.email).unwrap();
      console.log("OTP sent successfully:", result);
      
      // Email local storage e save koro ar OTP page e navigate koro
      localStorage.setItem("forgotPasswordEmail", formData.email);
      router.push("/otp");
      
    } catch (err) {
      console.error("Failed to send OTP:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Column - Form */}
      <div className="w-full md:w-1/2 bg-[#171717] p-8 flex flex-col justify-center relative">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-center text-3xl font-bold text-white mb-4">Forgot Password</h1>
          <p className="text-center text-[#9F9C96] mb-8">Please enter your Email to reset your password.</p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-white font-bold text-lg mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-[#2D2D2D] text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                required
              />
            </div>

            {/* Error Message */}
            {isError && (
              <div className="text-red-500 text-center">
                {error?.data?.message || "Something went wrong!"}
              </div>
            )}

            {/* Success Message */}
            {isSuccess && (
              <div className="text-green-500 text-center">
                OTP sent successfully to your email!
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#136BFB] text-white text-lg font-bold py-3 px-4 rounded-lg transition mt-5 disabled:bg-gray-400"
            >
              {isLoading ? "Sending..." : "Get OTP"}
            </button>
          </form>
        </div>
      </div>

      {/* Right Column - Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-[#162236] items-center justify-center relative">
        <div className="absolute top-4 right-4">
          <button className="text-white hover:bg-blue-700 p-2 rounded-full">
            <IoClose size={24} />
          </button>
        </div>
        <div className="text-center px-12">
          <div className="w-[500px] h-[500px] mx-auto">
            <img src="./forgot.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}