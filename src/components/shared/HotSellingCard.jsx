"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/feature/cart/cartSlice";
import { useAddToCartMutation } from "@/redux/feature/cart/cartApi";
import Swal from "sweetalert2";
import { toast } from "sonner";

export default function HotSellingCard({ product, image, title, description, id }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user);
  const [addToCartApi, { isLoading }] = useAddToCartMutation();

  const handleAddToCart = async () => {
    try {
      if (!user) {
        router.push("/sign_in");
        return;
      }
      if (!product?._id) {
        Swal.fire("Error!", "Product information missing", "error");
        return;
      }

      const res = await addToCartApi({
        productId: product._id,
        quantity: 1,
      }).unwrap();

      if (res?.statusCode === 200) {
        dispatch(
          addToCart({
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.images?.[0],
            quantity: 1,
            selected: true,
          })
        );

        toast.success("Added to cart successfully.", {
          style: {
            background: "#dcfce7",
            color: "#166534",
            border: "1px solid #bbf7d0",
          },
        });
      }
    } catch (error) {
      console.error("Add to cart error:", error);

      if (error?.status === 401) {
        toast.error("Please login to add to cart", {
          style: {
            background: "#fef2f2",
            color: "#dc2626",
            border: "1px solid #fecaca",
          },
        });
        router.push("/sign_in");
      } else {
        toast.error("Failed to add to cart", {
          style: {
            background: "#fef2f2",
            color: "#dc2626",
            border: "1px solid #fecaca",
          },
        });
      }
    }
  };

  const handleWishlistClick = () => {
    router.push("/favourite");
  };

  const productImage =
    image ||
    product?.images?.[0] ||
    "https://placehold.co/300x300/171717/ffffff?text=No+Image";
  const productTitle = title || product?.name || "Default Title";
  const productDescription =
    description || product?.description || "Default Description";
  const productId = id || product?._id;

  return (
    <div className="bg-[#1E1E1E] rounded-lg p-4 shadow-lg flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:shadow-[#136BFB]/20 hover:-translate-y-1">
      <div className="relative rounded-md overflow-hidden cursor-pointer aspect-square sm:aspect-[4/5] bg-[#0f0f0f] flex items-center justify-center group">
        <img
          src={productImage}
          alt={productTitle}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/300x300/171717/ffffff?text=No+Image";
          }}
        />
        <div className="absolute top-2 right-2">
          <img
            src="/favourite.svg"
            alt="heart"
            className="cursor-pointer hover:scale-110 transition-all duration-300"
            onClick={handleWishlistClick}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-4 flex-1 group-hover:text-white">
        <p className="text-white text-base sm:text-lg font-semibold line-clamp-2 min-h-[2.5rem] sm:min-h-[2.75rem] group-hover:text-[#136BFB] transition-colors">
          {productTitle}
        </p>
        <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 min-h-[2.5rem]">
          {productDescription}
        </p>
        <div className="mt-auto flex flex-col md:flex-row items-stretch md:items-center gap-2">
          <Link
            href={`/product/${productId}`}
            className="flex-1 min-w-0 px-3 py-2 md:px-3 md:py-2 lg:px-3 lg:py-2 rounded-md text-[#136BFB] border border-[#136BFB] cursor-pointer hover:bg-[#136BFB] hover:text-white transition-colors text-sm md:text-sm lg:text-base text-center truncate"
          >
            View Details
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            aria-busy={isLoading}
            className={`flex-1 min-w-0 px-3 py-2 md:px-3 md:py-2 lg:px-3 lg:py-2 rounded-md text-white border transition-colors text-sm md:text-sm lg:text-base truncate flex items-center justify-center gap-2 ${
              isLoading
                ? "bg-blue-700 border-blue-700 opacity-80 cursor-not-allowed"
                : "bg-[#136BFB] border-[#136BFB] hover:bg-blue-700"
            }`}
          >
            {isLoading && (
              <svg
                className="w-4 h-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            )}
            <span>{isLoading ? "Adding..." : "Add To Cart"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}