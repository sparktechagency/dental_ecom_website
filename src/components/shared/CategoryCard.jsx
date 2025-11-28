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
      className="group cursor-pointer border border-[#d3e4fd] shadow-md rounded-2xl overflow-hidden bg-white transition-all duration-300 hover:shadow-lg hover:shadow-[#136BFB]/20 hover:-translate-y-1"
    >
      {/* Image container */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
      <div className="p-4 md:p-5 text-center flex flex-col justify-center items-center">
        <p className="text-[#5194e3] text-base md:text-lg font-semibold">
          {title}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
