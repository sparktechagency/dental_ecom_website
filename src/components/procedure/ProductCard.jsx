// components/procedure/ProductCard.jsx
import { getBaseUrl } from '@/utils/getBaseUrl';
import React from 'react';
import { FaCheck } from "react-icons/fa";

const ProductCard = ({ product, isSelected, onSelect }) => {
  const getProductImage = () => {
    if (product?.images && product?.images.length > 0) {
      return `${getBaseUrl()}${product.images[0]}`;
    }
    if (product?.image) {
      return `${getBaseUrl()}${product.image}`;
    }
    return '/image.png';
  };

  return (
    <div
      className={`relative bg-[#202020] rounded-lg p-3 cursor-pointer transition-all duration-200 border-2 ${
        isSelected ? 'border-blue-500 shadow-lg' : 'border-transparent hover:border-gray-500'
      }`}
      onClick={onSelect}
    >
      {/* Selection Checkbox */}
      <div className="absolute top-2 right-2 z-10">
        <div
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
            isSelected 
              ? 'bg-blue-500 border-blue-500' 
              : 'bg-black border-gray-400'
          }`}
        >
          {isSelected && <FaCheck className="w-3 h-3 text-white" />}
        </div>
      </div>

      {/* Product Image */}
      <div className="aspect-square bg-gray-700 rounded-lg mb-3 overflow-hidden">
        <img
          src={getProductImage()}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/image.png';
          }}
        />
      </div>

      {/* Product Info */}
      <div className="text-center">
        <h3 className="text-white text-sm font-medium line-clamp-2">
          {product.name}
        </h3>
        <p className="text-blue-400 text-sm font-semibold mt-1">
          ${product.price?.toFixed(2) || '0.00'}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;