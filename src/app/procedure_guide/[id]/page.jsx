"use client"
import React, { useState, useEffect, Suspense } from "react";
import { FaCheck } from "react-icons/fa";
import { PiShoppingCartBold } from "react-icons/pi";
import { useParams, useSearchParams } from "next/navigation";
import { useFetchProcedureByIdQuery } from "@/redux/feature/procedure/procedure";
import { useAddToCartMutation } from "@/redux/feature/cart/cartApi";
import { addToCart } from "@/redux/feature/cart/cartSlice";
import BreadCrumb from "@/components/shared/BreadCrumb";
import { getBaseUrl } from "@/utils/getBaseUrl";
import ProductCard from "@/components/procedure/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useFetchAllProductsQuery } from "@/redux/feature/products/productsApi";

// Separate component for useSearchParams
function ProcedureDetailsWithSearchParams() {
  const searchParams = useSearchParams();
  const params = useParams();
  const id = params?.id;
  
  if (!id) {
    return <div>Loading...</div>;
  }

  return (<Suspense> <ProcedureDetailsImpl id={id} searchParams={searchParams} /></Suspense>);
}

function ProcedureDetailsImpl({ id, searchParams }) {
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user);

  // Procedure details fetch
  const { data: { data: procedureDetails } = {} } = useFetchProcedureByIdQuery(id);
  
  // Products fetch by procedure ID
  const { data: productsData, isLoading: productsLoading } = useFetchAllProductsQuery(id);
  
  // Add to cart mutation
  const [addToCartApi] = useAddToCartMutation();

  // Products data from API
  const products = productsData?.data || productsData || [];

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(products.map((p) => p._id)));
    }
    setSelectAll(!selectAll);
  };

  const handleItemSelect = (itemId) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
    setSelectAll(newSelected.size === products.length);
  };

  // Add to cart function
  const handleAddToCart = async () => {
    if (!user) {
      Swal.fire("Login Required!", "Please login to add items to cart", "error");
      window.location.href = "/sign_in";
      return;
    }
    if (selectedItems.size === 0) {
      Swal.fire("Error!", "Please select at least one product", "error");
      return;
    }

    setIsAddingToCart(true);

    try {
      const selectedProducts = products.filter(product => 
        selectedItems.has(product._id)
      );

      // প্রতিটি selected product এর জন্য add to cart call করুন
      const promises = selectedProducts.map(product => 
        addToCartApi({
          productId: product._id,
          quantity: 1 
        }).unwrap()
      );

      const results = await Promise.all(promises);

      selectedProducts.forEach(product => {
        dispatch(addToCart({
          ...product,
          quantity: 1,
          selected: true
        }));
      });

      // Success message
      Swal.fire(
        "Success!", 
        `${selectedProducts.length} products added to cart!`, 
        "success"
      );

      setSelectedItems(new Set());
      setSelectAll(false);

    } catch (error) {
      console.error("Failed to add products to cart:", error);
      Swal.fire(
        "Error!", 
        "Failed to add products to cart. Please try again.", 
        "error"
      );
    } finally {
      setIsAddingToCart(false);
    }
  };

  const selectedCount = selectedItems.size;

  // Loading state
  if (productsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading products...</div>
      </div>
    );
  }

  return (
   <Suspense fallback={<div>Loading...</div>}>
     <div className="min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <div className="container mx-auto flex justify-start items-center">
          <BreadCrumb name="Procedure Guide" title={procedureDetails?.name || "Procedure"} />
        </div>
        
        {/* Hero Section */}
        <div className="relative bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={`${procedureDetails?.imageUrl}`}
              alt="Endodontic procedure equipment"
              className="w-full h-80 object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
        
        <div className="mt-10">
          <h1 className="text-2xl font-bold text-white">
            {procedureDetails?.name}
          </h1>
          <p className="text-gray-600 text-lg mt-2">
            {procedureDetails?.description}
          </p>
        </div>

        {/* Select All Header */}
        {/* <div className="flex justify-between items-center mt-10">
          <h2 className="text-2xl font-bold text-white">
            Products ({products.length})
          </h2>
          
          {products.length > 0 && (
            <label className="flex items-center space-x-3 cursor-pointer group">
              <span className="text-gray-600">Select all</span>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="sr-only cursor-pointer bg-black"
                />
                <div
                  className={`w-5 h-5 rounded border-2 border-[#136BFB] bg-black transition-all duration-200 ${
                    selectAll ? "border-[#136BFB]" : ""
                  }`}
                >
                  {selectAll && (
                    <FaCheck className="w-3 h-3 text-[#136BFB] absolute top-1 left-1" />
                  )}
                </div>
              </div>
            </label>
          )}
        </div> */}
        
        {/* Divider */}
        {/* <div className="border-b-2 border-gray-700 my-5"></div> */}

        {/* Product Grid */}
     
      </div>
    </div>
   </Suspense>
  );
}

// Main page component with Suspense
export default function ProcedureGuidePage() {
  return (
    <Suspense fallback={<div>Loading procedure guide...</div>}>
      <ProcedureDetailsWithSearchParams />
    </Suspense>
  );
}