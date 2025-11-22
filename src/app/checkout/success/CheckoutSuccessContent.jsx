// app/checkout/success/CheckoutSuccessContent.jsx - Updated
"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearCartLocal } from "@/redux/feature/cart/cartSlice";

export default function CheckoutSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("processing");

  useEffect(() => {
    const processSuccess = async () => {
      try {
        const orderId = searchParams.get("orderId");
        
        if (!orderId) {
          throw new Error("Order ID not found");
        }

        // 1. Call backend API to confirm order
        const response = await fetch(`/api/checkout/success?orderId=${orderId}`);
      
        
        if (!response.ok) {
          throw new Error("Failed to confirm order");
        }

        // 2. Clear local cart
        dispatch(clearCartLocal());
        
        // 3. Redirect to congratulations page
        setStatus("success");
        setTimeout(() => {
          router.replace(`/congratulations?orderId=${encodeURIComponent(orderId)}`);
        }, 1000);

      } catch (error) {
        console.error("Order processing failed:", error);
        setStatus("error");
        // Redirect to error page or show error message
        setTimeout(() => {
          router.replace("/checkout/error");
        }, 2000);
      }
    };

    processSuccess();
  }, [dispatch, router, searchParams]);

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#171717]">
        <div className="text-center text-white">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p>Something went wrong. Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#171717]">
      <div className="text-center text-white">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p>
          {status === "processing" 
            ? "Finalizing your order..." 
            : "Order confirmed! Redirecting..."}
        </p>
      </div>
    </div>
  );
}