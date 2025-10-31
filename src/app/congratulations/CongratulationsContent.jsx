// app/congratulations/CongratulationsContent.jsx
"use client"
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CongratulationsContent() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("Your password has been updated, please change your password regularly to avoid this happening.");
  const [buttonText, setButtonText] = useState("Continue");
  const [buttonLink, setButtonLink] = useState("/product");

  useEffect(() => {
    const orderId = searchParams.get('orderId');
    if (orderId) {
      setMessage(`Your order #${orderId} has been placed successfully! We'll send you an email with the order details.`);
      setButtonText("View Order");
      setButtonLink(`/profile/orders/${orderId}`);
    }
  }, [searchParams]);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Column - Content */}
      <div className="w-full md:w-1/2 bg-[#171717] p-8 flex flex-col justify-center relative">
        <div className="max-w-md mx-auto w-full text-center">
          <h1 className="text-3xl font-bold text-white mb-10">
            Congratulations!
          </h1>
          <p className="text-[#9F9C96] mb-8 text-xl">
            {message}
          </p>

          <Link href={buttonLink}>
            <button
              type="submit"
              className="w-full bg-[#136BFB] text-white text-lg font-bold py-3 px-4 rounded-lg transition mt-5"
            >
              {buttonText}
            </button>
          </Link>
        </div>
      </div>

      {/* Right Column - Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-[#162236] items-center justify-center relative">
        <div className="absolute top-4 right-4">
          <Link
            href="/"
            className="text-white hover:bg-blue-700 p-2 rounded-full inline-block"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Link>
        </div>
        <div className="text-center p-8">
          <div className="w-64 h-64 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-32 h-32 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Success!</h2>
          <p className="text-gray-300">Your action was completed successfully</p>
        </div>
      </div>
    </div>
  );
}