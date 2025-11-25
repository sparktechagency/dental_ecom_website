"use client"
import React from 'react';
import { useRouter } from "next/navigation"

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
      className="border border-[#d3e4fd] shadow-xl rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-[#136BFB]/20 hover:-translate-y-1 group"
    >
      <div className="rounded-2xl overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full rounded-2xl overflow-hidden object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/300x300/171717/ffffff?text=No+Image';
          }}
        />
      </div>
      <div className=" p-5 items-center bg-white transition-colors duration-300">
        <p className="text-[#5194e3] text-base font-semibold text-center">{title}</p>
       
      </div>
    </div>
  );
};

export default CategoryCard;
