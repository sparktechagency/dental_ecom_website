// app/checkout/cancel/page.jsx
"use client";
import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function CheckoutCancelContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const orderId = searchParams.get("orderId");
    
    // Backend API call - cancel order
    const cancelOrder = async () => {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/checkout/cancel?orderId=${orderId}`);
      } catch (error) {
        console.error("Error cancelling order:", error);
      }
    };

    cancelOrder();

    const timer = setTimeout(() => {
      router.replace("/cart");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#171717]">
      <div className="text-center text-white">
        <div className="w-16 h-16 border-4 border-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-2xl">✕</span>
        </div>
        <h2 className="text-xl mb-2">Payment Cancelled</h2>
        <p>Redirecting to cart...</p>
      </div>
    </div>
  );
}

export default function CheckoutCancelPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutCancelContent />
    </Suspense>
  );
}