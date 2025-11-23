"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { useCheckoutMutation } from "@/redux/feature/orders/ordersApi";

export default function CheckoutSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("processing");
  const [checkOut] = useCheckoutMutation();

  useEffect(() => {
    const processSuccess = async () => {
      try {
        const orderId = searchParams.get("orderId");
        console.log("orderId", orderId);

        if (!orderId) {
          throw new Error("Order ID not found");
        }

        const res = await checkOut(orderId).unwrap();
        if (!res?.success) {
          throw new Error(
            res?.data?.message || res?.message || "something went wrong!"
          );
        }
        if (res?.success) {
          setStatus("success");
        }
      } catch (error) {
        console.error("Order processing failed:", error);
        setStatus('error')
      }
    };

    processSuccess();
  }, [dispatch, router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#171717]">
      <div className="text-center text-white">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p>
          {status === "processing"
            ? "Finalizing your order..."
            : router.push("/congratulations")}
        </p>
      </div>
    </div>
  );
}
