"use client";
import React from "react";
import BreadCrumb from "@/components/shared/BreadCrumb";
import CategoryCard from "@/components/shared/CategoryCard";
import SectionHeading from "@/components/shared/SectionHeading";
import { getBaseUrl } from "@/utils/getBaseUrl";
import { useFetchAllCategoriesQuery } from "@/redux/feature/category/CategoriesApi";

const AllCategory = () => {
  const { data: categories, isLoading, error } = useFetchAllCategoriesQuery({});

  if (isLoading) {
    return (
      <div className="mx-auto container text-white py-10">
        <div className="container mx-auto flex justify-start items-center px-5 md:px-0">
          <BreadCrumb name="Home" title="Category" />
        </div>
        <div className="flex justify-center items-center min-h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto container text-white pt-10">
        <div className="container mx-auto flex justify-start items-center px-5 md:px-0">
          <BreadCrumb name="Home" title="Category" />
        </div>
        <div className="text-center text-red-400 py-10">
          Failed to load categories. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f1f6fc]">
      <div className="mx-auto container text-white py-10">
        <div className="container mx-auto flex justify-start items-center px-5 md:px-0">
          <BreadCrumb name="Home" title="Category" />
        </div>

        <div className="text-center">
          <h1
            className=" text-2xl md:text-4xl lg:text-6xl font-bold mb-4 
                bg-gradient-to-r from-[#2373c8] to-[#79c047] 
                bg-clip-text text-transparent "
          >
            Dental Products
          </h1>
          <h1 className="text-2xl md:text-4xl lg:text-6xl text-[#3389b2] font-bold">
            Catalogue
          </h1>
        </div>

        <div>
            <p className="text-[#4a4b8a] text-center mt-8">Browse our comprehensive range of high-quality dental supplies and equipment</p>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-5 container mx-auto px-5 md:px-0 my-20">
          {categories?.map((category, idx) => (
            <CategoryCard
              key={idx}
              title={category?.name}
              image={category.imageUrl}
              link={`/product?category=${encodeURIComponent(
                category?._id || ""
              )}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCategory;
