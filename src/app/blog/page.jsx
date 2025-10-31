// app/blog/page.jsx
"use client";

import { Suspense } from "react";
import BlogContent from "./BlogContent";

export default function BlogPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#171717]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <BlogContent />
    </Suspense>
  );
}