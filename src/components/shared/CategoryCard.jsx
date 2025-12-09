"use client";
import React from "react";
import { useRouter } from "next/navigation";

const CategoryCard = ({ image, title, link, onClick }) => {
  const navigate = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (link) {
      navigate.push(link);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer border border-[#d3e4fd] shadow-md rounded-2xl overflow-hidden bg-white transition-all duration-300 hover:shadow-lg hover:shadow-[#136BFB]/20 "
    >
      {/* Image container */}
      <div className="relative w-full aspect-[4/2.5] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/400x300/171717/ffffff?text=No+Image";
          }}
        />

        {/* Gradient overlay */}
        <div
          className="
            absolute inset-0 
            bg-gradient-to-b from-black/30 via-transparent to-black/80
            opacity-70 group-hover:opacity-0
            transition-opacity duration-500 ease-in-out
          "
        ></div>
      </div>

      {/* Text content */}
      <div className="px-4 py-2 md:px-4 md:py-4 text-center flex flex-col ">
        <p className="text-[#5194e3] text-xl font-semibold text-start capitalize">
          {title}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
