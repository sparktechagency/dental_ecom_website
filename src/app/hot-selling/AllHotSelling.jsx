"use client"
import React from 'react'; 
import { useFetchAllHotSellingQuery } from '@/redux/feature/hotSellingApi/HotSellingApi';
import BreadCrumb from '@/components/shared/BreadCrumb';
import SectionHeading from '@/components/shared/SectionHeading';
import HotSellingCard from '@/components/shared/HotSellingCard';
import { getBaseUrl } from '@/utils/getBaseUrl';

const AllHotSelling = () => {
  const { data: products = [], isLoading, error } = useFetchAllHotSellingQuery();
  console.log("Hot Products --->", products); 

  if (isLoading) {
    return (
      <div className="mx-auto container text-white py-10 px-5 md:px-0">
        <div className="container mx-auto flex justify-start items-center pl-5">
          <BreadCrumb name="Home" title="Hot Selling" />
        </div>
        <div className="flex justify-center items-center min-h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto container text-white py-10 px-5 md:px-0">
        <div className="container mx-auto flex justify-start items-center pl-5">
          <BreadCrumb name="Home" title="Hot Selling" />
        </div>
        <div className="text-center text-red-400 py-10">
          Failed to load hot selling products. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto container text-white py-10 px-5 md:px-0">
      <div className="container mx-auto flex justify-start items-center pl-5">
        <BreadCrumb name="Home" title="Hot Selling" />
      </div>

      <SectionHeading title="Hot Selling" showButton={false} />

      {/* Category Cards */}
      <div className='flex gap-5 flex-wrap justify-center space-y-8'>
        {products.map((product) => (
          <HotSellingCard
            key={product._id}
            product={product} 
            id={product._id}
            image={`${getBaseUrl()}${product?.images?.[0]}`}
            title={product?.name}
            description={product?.description}
          />
        ))}
      </div>
    </div>
  );
};

export default AllHotSelling;