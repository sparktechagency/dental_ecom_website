// app/blog/BlogContent.jsx
"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import BlogCard from "@/components/shared/BlogCard";
import SectionHeading from "@/components/shared/SectionHeading";
import { useFetchAllBlogsQuery } from "@/redux/feature/blog/blogApi";
import { getBaseUrl } from "@/utils/getBaseUrl";

export default function BlogContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "all";
  
  const { data: blogs, isLoading, error } = useFetchAllBlogsQuery({});

  const filteredBlogs = React.useMemo(() => {
    if (!blogs) return [];
    if (category === "all") return blogs;
    return blogs.filter(blog => blog.category === category);
  }, [blogs, category]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#171717]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error loading blogs. Please try again later.
      </div>
    );
  }

  return (
    <div className="container text-white mx-auto py-8">
      <SectionHeading
        showButton={false}
        title="Insights & Innovations in Dental Care"
      />

      {/* Category filter */}
      <div className="flex flex-wrap gap-4 mb-8 px-5 md:px-0">
        <button
          className={`px-4 py-2 rounded ${
            category === "all" ? "bg-blue-600" : "bg-[#333]"
          }`}
          onClick={() => window.history.pushState({}, "", "?category=all")}
        >
          All Posts
        </button>
        <button
          className={`px-4 py-2 rounded ${
            category === "dental" ? "bg-blue-600" : "bg-[#333]"
          }`}
          onClick={() => window.history.pushState({}, "", "?category=dental")}
        >
          Dental Care
        </button>
        <button
          className={`px-4 py-2 rounded ${
            category === "hygiene" ? "bg-blue-600" : "bg-[#333]"
          }`}
          onClick={() => window.history.pushState({}, "", "?category=hygiene")}
        >
          Oral Hygiene
        </button>
      </div>

      {/* Blog cards */}
      <div className="flex flex-wrap gap-5 px-5 md:px-0">
        {filteredBlogs?.map((blog, idx) => (
          <BlogCard
            key={idx}
            image={`${getBaseUrl()}${blog.imageUrl?.[0]}`}
            id={blog?._id}
            title={blog?.title}
            description={blog?.description}
            date={new Date(blog.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            blogId={blog._id}
          />
        ))}
      </div>

      {filteredBlogs?.length === 0 && (
        <div className="text-center py-10 text-gray-400">
          No blog posts found in this category.
        </div>
      )}
    </div>
  );
}