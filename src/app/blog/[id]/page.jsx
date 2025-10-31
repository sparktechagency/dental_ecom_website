"use client"
import BreadCrumb from "@/components/shared/BreadCrumb";
import { useFetchBlogByIdQuery } from "@/redux/feature/blog/blogApi";
import { getBaseUrl } from "@/utils/getBaseUrl";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { MdOutlineDateRange } from "react-icons/md";


const BlogDetails = () => {
  const { id } = useParams();
  const { data: { data: blogDetails } = {}, isLoading } = useFetchBlogByIdQuery(id);
  const navigate = useRouter();

  if (isLoading) {
    return <div className="text-white text-center py-10">Loading...</div>;
  }

  if (!blogDetails) {
    return <div className="text-white text-center py-10">Blog not found</div>;
  }

  return (
    <div className="mx-auto container text-white py-10 px-4">
      <div>
        <BreadCrumb name="Blog" title="Details" />
      </div>

      {/* Blog Image */}
      <div className="relative rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group mb-6">
        <div className="relative h-[20rem] md:h-[25rem] overflow-hidden">
          <img
            src={`${getBaseUrl()}${blogDetails?.imageUrl?.[0]}`}
            alt={blogDetails?.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Title & Meta */}
      <div className="flex justify-between items-center my-10">
        <h2 className="text-3xl font-semibold mb-3">{blogDetails?.title}</h2>
        <div className="text-[#9F9C96] text-sm mt-2 flex items-center gap-2">
          <MdOutlineDateRange className="text-[#9F9C96] text-lg" />
          <span>{new Date(blogDetails?.createdAt).toDateString()}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-[#CFCFCF] mb-6">{blogDetails?.content}</p>

      {/* Go Back Button */}
      <div className="text-center">
        <Link
          href="/blog"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-md text-white font-bold cursor-pointer"
        >
          Go Back to Blog
        </Link>
      </div>
    </div>
  );
};

export default BlogDetails;
