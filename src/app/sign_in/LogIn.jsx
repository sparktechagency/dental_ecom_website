"use client";
import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline, IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useLoginUserMutation } from "@/redux/feature/auth/authApi";
import Link from "next/link";
import { setUser } from "@/redux/feature/auth/authSlice";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";

export default function LogIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser] = useLoginUserMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData).unwrap();
      const { accessToken } = response.data;
      const decodedUser = jwtDecode(accessToken);

      dispatch(setUser({ user: decodedUser, token: accessToken }));

      toast.success("Login successful!");
      router.push("/");
    } catch (error) {
      toast.error(error?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Column - Form */}
      <div className="w-full md:w-1/2 bg-[#171717] p-8 flex flex-col justify-center relative">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-center text-3xl font-bold text-white mb-2">
            Welcome Back!
          </h1>
          <p className="text-center text-[#9F9C96] mb-8">
            Please enter your email and password to continue
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-white font-bold text-lg mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-[#2D2D2D] text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-white font-bold text-lg mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-[#2D2D2D] text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#136BFB] text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition mt-5"
            >
              Log In
            </button>

            <p className="text-center text-[#9F9C96] mt-5">
              Don't have an account?{" "}
              <Link href="/signup" className="text-[#136BFB] hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Column - Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-[#162236] items-center justify-center relative">
        <div className="absolute top-4 right-4">
          <Link href="/" className="text-white hover:bg-blue-700 p-2 rounded-full inline-block">
            <IoClose size={24} />
          </Link>
        </div>
        <div className="text-center px-12">
          <div className="w-[500px] h-[500px] mx-auto">
            <img src="/signin.svg" alt="Login Illustration" />
          </div>
        </div>
      </div>
    </div>
  );
}