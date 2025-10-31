"use client";
import { useSubscribeNewsletterMutation } from "@/redux/feature/newsletter/newsletterApi";
import React, { Suspense, useState } from "react";
import { toast } from "sonner";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null); // { type: 'success'|'error', text: string }
  const [subscribe, { isLoading }] = useSubscribeNewsletterMutation();

  const getErrorMessage = (err) => {
    // handle different shapes of RTK Query / fetchBaseQuery errors
    if (!err) return "Subscription failed";
    if (typeof err === "string") return err;
    if (err?.data?.message) return err.data.message;
    if (err?.error) return err.error;
    if (err?.message) return err.message;
    if (err?.status) return `Error ${err.status}`;
    return JSON.stringify(err);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const value = email.trim();
    // simple email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(value)) {
      setMessage({ type: "error", text: "Please enter a valid email!" });
      return;
    }

    try {
      const res = await subscribe({ email: value }).unwrap();
      setMessage({
        type: "success",
        text: res?.message || "Subscribed successfully.",
      });
      toast.success("Subscribed successfully.", {
        style: {
          background: "#dcfce7",
          color: "#166534",
          border: "1px solid #bbf7d0",
        },
      });
      setEmail("");
    } catch (err) {
      const text = getErrorMessage(err);
      if (text.toLowerCase().includes("already")) {
        setMessage({ type: "error", text: text });
        toast.error(text, {
          style: {
            background: "#fef2f2",
            color: "#dc2626",
            border: "1px solid #fecaca",
          },
        });
        setEmail("");
      } else {
        setMessage({ type: "error", text });
      }
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="relative bg-[#171716] rounded-xl p-8 md:p-20 mx-auto w-full">
      <div className="absolute bottom-0 right-0 pointer-events-none">
        <div className="w-[500px] h-[500px] bg-[#136BFB] opacity-20 blur-3xl rounded-full"></div>
      </div>

      <div className="relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-5xl font-bold text-white mb-4">
            Stay Sharp with the Latest in Dental Supplies
          </h2>
          <p className="text-gray-300 text-lg md:text-xl py-4">
            Join our newsletter to access smart savings and clinical insights.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 w-full"
        >
          <div className="w-full max-w-[50rem]">
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-black"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md text-lg w-full px-4 py-2 max-w-[20rem] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "Subscribing..." : "Subscribe!"}
          </button>
        </form>
      </div>
    </div>
    </Suspense>
  );
}
