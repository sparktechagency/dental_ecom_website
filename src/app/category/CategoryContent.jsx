// app/category/CategoryContent.jsx
"use client";

import { useSearchParams } from "next/navigation";
import BreadCrumb from "@/components/shared/BreadCrumb";
import CategoryCard from "@/components/shared/CategoryCard";
import SectionHeading from "@/components/shared/SectionHeading";
import { useFetchAllCategoriesQuery } from "@/redux/feature/category/CategoriesApi";
import { getBaseUrl } from "@/utils/getBaseUrl";

export default function CategoryContent() {
 

  const { data: categories, isLoading, error } = useFetchAllCategoriesQuery({});

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-500">Error loading categories. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto container text-white py-10">
      <div className="container mx-auto flex justify-start items-center px-5 md:px-0">
        <BreadCrumb name="Home" title="Category" />
      </div>

      <SectionHeading title="All Category" showButton={false} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-5 container mx-auto px-5 md:px-0">
        {categories?.map((category, idx) => (
          <CategoryCard
            key={idx}
            title={category?.name}
            image={`${category.imageUrl}`}
            link="/product"
          />
        ))}
      </div>
    </div>
  );
}