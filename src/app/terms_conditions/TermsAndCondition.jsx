"use client";
import BreadCrumb from "@/components/shared/BreadCrumb";
import React from "react";
import { useGetPageByKeyQuery } from "@/redux/feature/pages/pagesApi";

export default function TermsAndCondition() {
  const { data, isFetching, error } = useGetPageByKeyQuery("terms");

  const title = data?.data?.title || data?.title || "Terms & Condition";
  const content = data?.data?.content || data?.content || data?.data || "";

  return (
    <div className="min-h-screen bg-[#171717] text-white py-5">
      <div className="container mx-auto flex justify-start items-center">
        <BreadCrumb name="Home" title="Terms & Condition" />
      </div>
      <div className="container mx-auto p-5 shadow-lg rounded-lg bg-[#1c1c1c]">
        <section className="px-6 py-12 text-slate-700 leading-relaxed">
          <h1 className="text-2xl font-bold mb-5 text-white">{title}</h1>

          {isFetching && (
            <div className="flex justify-center items-center py-10">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          {error && (
            <p className="text-red-400 text-center py-10">Failed to load content.</p>
          )}

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