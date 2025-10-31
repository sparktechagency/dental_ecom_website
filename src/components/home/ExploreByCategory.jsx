"use client";
import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import CategoryCard from "../shared/CategoryCard";
import SectionHeading from "../shared/SectionHeading";
import { useFetchAllCategoriesQuery } from "@/redux/feature/category/CategoriesApi";
import { getBaseUrl } from "@/utils/getBaseUrl";


const ExploreByCategory = () => {
  const { data: categories } = useFetchAllCategoriesQuery({});
  const router = useRouter();

  return (
 <Suspense fallback={<div>Loading...</div>}>
     <div className="mb-10">
      <SectionHeading
        onButtonClick={() => {
          router.push("/allcategory");
        }}
      />

      {/* cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-5 container mx-auto px-5 md:px-0">
        {categories?.map((category, idx) => (
          <CategoryCard
            key={idx}
            title={category?.name}
            image={`${getBaseUrl()}${category?.imageUrl}`}
            link={`/product?category=${encodeURIComponent(category?._id || '')}`}
          />
        ))}
      </div>
    </div>
 </Suspense>
  );
};

export default ExploreByCategory;
