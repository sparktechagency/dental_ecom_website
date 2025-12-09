"use client";
import React, { useState } from "react";
import BreadCrumb from "@/components/shared/BreadCrumb";
import CategoryCard from "@/components/shared/CategoryCard";
import { useFetchAllCategoriesQuery } from "@/redux/feature/category/CategoriesApi";

const AllCategory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

const { data: response, isLoading, error } = useFetchAllCategoriesQuery({
  page: currentPage,
  limit: itemsPerPage,
});

const categories = [...(response?.data || [])].sort(
  (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
);
  const pagination = response?.meta || {};

  console.log("Categories:", categories);
  console.log("Pagination:", pagination);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
            className=" text-2xl md:text-5xl lg:text-6xl font-bold mb-4 
                 text-[#2372c8]
                 "
          >
            Dental <span className="bg-gradient-to-r from-[#2372c8] to-[#79c047] text-2xl md:text-5xl lg:text-6xl font-bold mb-4 
                 
                bg-clip-text text-transparent"> Products</span>
          </h1>
          <h1 className="text-2xl md:text-5xl lg:text-6xl text-[#2372c8] font-bold">
            Catalogue
          </h1>
        </div>

        <div >
          <p className="text-[#5b5c5e] text-center mt-8">
            Browse our comprehensive range of high-quality dental supplies and equipment
          </p>
        </div>

        <div className="flex items-center justify-center mt-12">
          <div className="w-32 h-1 bg-[#7ac142]"></div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5 container mx-auto px-12 md:px-0 my-20">
          {categories.map((category, idx) => (
            <CategoryCard
              key={category._id}
              title={category?.name}
              image={category.imageUrl}
              link={`/product?category=${encodeURIComponent(category?._id || "")}`}
            />
          ))}
        </div>

        {/* Pagination Component */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 my-8">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pagination.totalPages}
              className={`px-4 py-2 rounded-lg ${
                currentPage === pagination.totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              Next
            </button>
          </div>
        )}

       
      </div>
    </div>
  );
};

export default AllCategory;