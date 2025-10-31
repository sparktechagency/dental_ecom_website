"use client";
import {
  useVerifyOtpMutation,
  useForgotPasswordMutation,
} from "@/redux/feature/auth/authApi";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "sonner";

export default function Otp() {
  const [code, setCode] = useState(new Array(6).fill(""));
  const [verifyOtp, { isLoading, isError, error, isSuccess }] =
    useVerifyOtpMutation();
  const [forgotPassword, { isLoading: isResending }] =
    useForgotPasswordMutation();
  const [resendMsg, setResendMsg] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const queryEmail = searchParams?.get("email");
    if (queryEmail) {
      setEmail(queryEmail);
      console.log("Email from query:", queryEmail);
      return;
    }
    try {
      const savedEmail =
        typeof window !== "undefined"
          ? localStorage.getItem("forgotPasswordEmail")
          : null;
      if (savedEmail) {
        setEmail(savedEmail);
        console.log("Email from localStorage (fallback):", savedEmail);
      }
    } catch {}
  }, [searchParams]);

  const handleChange = (value, index) => {
    if (!isNaN(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      document.getElementById(`code-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpCode = code.join("");

    if (otpCode.length !== 6) {
      alert("Please enter 6 digit OTP");
      return;
    }

    if (!email) {
      alert("Email not found. Please try again.");
      return;
    }

    console.log(" Sending OTP verification:", {
      email: email,
      code: otpCode,
    });

    try {
      const result = await verifyOtp({
        email: email,
        code: otpCode,
      }).unwrap();

      // console.log("OTP verified successfully:", result);
      toast.success("OTP verified successfully!", {
        style: {
          background: "#dcfce7",
          color: "#166534",
          border: "1px solid #bbf7d0",
        },
      });

      if (result.statusCode === 200) {
        console.log(" Email verified successfully");

        if (result.data && result.data.resetToken) {
          localStorage.setItem("resetToken", result.data.resetToken);
          console.log(
            " Reset token saved (data.resetToken):",
            result.data.resetToken
          );
        } else if (result.resetToken) {
          localStorage.setItem("resetToken", result.resetToken);
          console.log(" Reset token saved (resetToken):", result.resetToken);
        } else if (result.data) {
          localStorage.setItem("resetToken", result.data);
          console.log(" Reset token saved (data):", result.data);
        } else {
          console.log(" Verification successful, no reset token needed");
        }

        navigate.push("/sign_in");
      } else {
        console.log(" Unexpected response:", result);
        toast.error(result.message || "Something went wrong", {
          style: {
            background: "#fef2f2",
            color: "#dc2626",
            border: "1px solid #fecaca",
          },
        });
        // alert(result.message || "Verification failed");
      }
    } catch (err) {
      console.error(" Failed to verify OTP:", err);
      console.error("Error details:", err.data);

      const errorMessage =
        err?.data?.message ||
        err?.error ||
        "Verification failed. Please try again.";
      toast.error(errorMessage, {
        style: {
            background: "#fef2f2",
            color: "#dc2626",
            border: "1px solid #fecaca",
          },
        });
    }
  };

  const handleResend = async () => {
    if (!email) {
      alert("Email not found. Please try forgot password again.");
      return;
    }

    setResendMsg("");
    console.log("📨 Resending code to:", email);

    try {
      const result = await forgotPassword(email).unwrap();
      console.log(" Resend successful:", result);
      setResendMsg("A new verification code has been sent to your email.");
    } catch (e) {
      console.error(" Resend failed:", e);
      setResendMsg(
        e?.data?.message || "Failed to resend code. Please try again."
      );
    }
  };

  useEffect(() => {
    console.log("🔍 Component State:", {
      email,
      code,
      isLoading,
      isError,
      isSuccess,
      error: error?.data,
    });
  }, [email, code, isLoading, isError, isSuccess, error]);

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-full md:w-1/2 bg-[#171717] p-8 flex flex-col justify-center relative">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-center text-3xl font-bold text-white mb-4">
            Verification Code
          </h1>
          <p className="text-center text-[#9F9C96] mb-2">
            We have sent the verification code to your email
          </p>
          {email && (
            <p className="text-center text-[#136BFB] mb-6 font-medium">
              {email}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between max-w-md mx-auto mb-8">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-xl text-center bg-[#2D2D2D] text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              ))}
            </div>

            {isError && (
              <div className="text-red-500 text-center bg-red-900/20 p-3 rounded">
                {error?.data?.message || "Invalid OTP! Please try again."}
              </div>
            )}

            {resendMsg && (
              <div
                className={`text-center text-sm p-3 rounded ${
                  resendMsg.includes("Failed")
                    ? "bg-red-900/20 text-red-400"
                    : "bg-green-900/20 text-green-400"
                }`}
              >
                {resendMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#136BFB] text-white text-lg font-bold py-3 px-4 rounded-lg transition hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "Verifying..." : "Verify Code"}
            </button>

            {/* <button
              type="button"
              disabled={isResending || !email}
              onClick={handleResend}
              className="w-full mt-3 border border-[#136BFB] text-[#136BFB] text-lg font-bold py-3 px-4 rounded-lg transition hover:bg-[#0f5ed11a] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isResending ? "Resending..." : "Resend Code"}
            </button> */}
          </form>
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 bg-[#162236] items-center justify-center relative">
        <div className="absolute top-4 right-4">
          <Link
            href="/"
            className="text-white hover:bg-blue-700 p-2 rounded-full inline-block"
          >
            <IoClose size={24} />
          </Link>
        </div>
        <div className="text-center px-12">
          <div className="w-[400px] h-[400px] mx-auto">
            <img
              src="/otp.svg"
              alt="Verification"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}