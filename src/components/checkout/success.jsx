// app/checkout/success/page.jsx
"use client";
import CheckoutSuccessContent from "@/app/checkout/success/CheckoutSuccessContent";
import { Suspense } from "react";

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}