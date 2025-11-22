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
      <div className="relative rounded-xl p-8 md:p-20 mx-auto w-full">
    

      <div className="relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
            Stay Sharp with the Latest in Dental Supplies
          </h2>
          <p className="text-[#777a80] text-sm py-1">
          Subscribe to our newsletter for the latest products, special offers, and dental industry insights.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 w-full"
        >
          <div className="w-full max-w-[30rem]">
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
            className="bg-gradient-to-r from-[#895df6] to-[#179fea] py-3 rounded-lg  text-white font-medium transition-colors duration-200 shadow-md text-lg w-full px-4 max-w-[12rem] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? "Subscribing..." : "Subscribe!"}
          </button>
        </form>
      </div>
    </div>
    </Suspense>
  );
}
