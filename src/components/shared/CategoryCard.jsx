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
      className="border-[#6F6F6F] border-[1.5px] rounded-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-[#136BFB]/20 hover:-translate-y-1 group"
    >
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-[280px] object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/300x300/171717/ffffff?text=No+Image';
          }}
        />
      </div>
      <div className="flex justify-between p-5 items-center bg-[#1c1c1c] group-hover:bg-[#252525] transition-colors duration-300">
        <p className="text-white text-xl">{title}</p>
        <div className="transition-transform duration-300 group-hover:translate-x-1">
          <img
            src="https://i.ibb.co/YB8RfTwg/arrow-right.png"
            alt="arrow"
            className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
