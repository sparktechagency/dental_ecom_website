// HotSelling.js - SIMPLE VERSION
"use client";
import React, { Suspense } from "react";
import HotSellingCard from "@/components/shared/HotSellingCard";
import SectionHeading from "@/components/shared/SectionHeading";
import { useFetchAllHotSellingQuery } from "@/redux/feature/hotSellingApi/HotSellingApi";
import { useRouter } from "next/navigation";
import { getBaseUrl } from "@/utils/getBaseUrl";

const HotSelling = () => {
  const { data: products = [] } = useFetchAllHotSellingQuery();
  const router = useRouter();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="pb-10">
      <SectionHeading
        title="Hot Selling"
        buttonText="View All"
        onButtonClick={() => router.push("/hot-selling")}
        
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 container mx-auto px-5 md:px-0">
        {products.map((product) => (
          <HotSellingCard
            image={`${getBaseUrl()}${product?.images?.[0]}`}
            key={product._id}
            id={product?.productId}
            product={product}
            onAddToCart={() => alert(`Added to Cart: ${product.name}`)}
            onWishlistClick={() => alert(`Wishlisted: ${product.name}`)}
          />
        ))}
      </div>
    </div>
    </Suspense>
  );
};

export default HotSelling;
