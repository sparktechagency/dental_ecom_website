"use client";
import BreadCrumb from "@/components/shared/BreadCrumb";
import React from "react";
import { useGetPageByKeyQuery } from "@/redux/feature/pages/pagesApi";

export default function PrivacyPolicy() {
  const { data, isFetching, error } = useGetPageByKeyQuery("privacy");
  
  const title = data?.data?.title || data?.title || "Privacy Policy";
  const content = data?.data?.content || data?.content || data?.data || "";

  return (
    <div className="min-h-screen bg-[#171717] text-white py-5">
      <div className="container mx-auto flex justify-start items-center">
        <BreadCrumb name="Home" title="Privacy Policy" />
      </div>
      
      <div className="container mx-auto p-5 shadow-lg rounded-lg bg-[#1c1c1c]">
        <section className="px-6 py-12 text-slate-700 leading-relaxed">
          <h1 className="text-2xl font-bold mb-5 text-white">{title}</h1>
          {isFetching && <p className="text-[#9F9C96]">Loading...</p>}
          {error && <p className="text-red-400">Failed to load content.</p>}
          {!isFetching && !error && (
            typeof content === "string" ? (
              <div className="prose prose-invert max-w-none text-white" dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              <pre className="text-white whitespace-pre-wrap">{JSON.stringify(content, null, 2)}</pre>
            )
          )}
        </section>
      </div>
    </div>
  );
}