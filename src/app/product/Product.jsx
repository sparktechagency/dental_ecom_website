"use client"
import BreadCrumb from "@/components/shared/BreadCrumb";
import HotSellingCard from "@/components/shared/HotSellingCard";
import SectionHeading from "@/components/shared/SectionHeading";
import { useFetchAllBrandsQuery } from "@/redux/feature/brand/brandApi";
import { useFetchAllCategoriesQuery } from "@/redux/feature/category/CategoriesApi";
import { useFetchAllProcedureQuery } from "@/redux/feature/procedure/procedure";
import { useFetchAllProductsQuery } from "@/redux/feature/products/productsApi";
import { getBaseUrl } from "@/utils/getBaseUrl";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BiSolidDownArrow } from "react-icons/bi";

export default function Product() {
  const searchParams = useSearchParams();
  const urlSearch = searchParams?.get('search') || '';
  const urlBrand = searchParams?.get('brand') || '';
  const urlCategory = searchParams?.get('category') || '';
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(10);

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState(urlCategory ? [urlCategory] : []);
  const [selectedBrands, setSelectedBrands] = useState(urlBrand ? [urlBrand] : []);
  const [selectedProcedures, setSelectedProcedures] = useState([]);
  const [availability, setAvailability] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Query
  const term = (urlSearch || '').trim().toLowerCase();
  const isSearching = term.length > 0;

  const { data, isLoading } = useFetchAllProductsQuery({
    category: selectedCategories.join(","),
    brand: selectedBrands.join(","),
    procedureType: selectedProcedures.join(","),
    availability,
    minPrice,
    maxPrice,
    page: isSearching ? 1 : currentPage,
    limit: isSearching ? 1000 : productPerPage,
  });

  const products = data?.data || [];
  const viewProducts = term
    ? products.filter((p) =>
        (p?.name || '').toLowerCase().includes(term) ||
        (p?.brand?.name || '').toLowerCase().includes(term)
      )
    : products;
  const totalProducts = term ? viewProducts.length : (data?.total || 0);
  const totalPages = Math.ceil(totalProducts / productPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [urlSearch]);

  useEffect(() => {
    setSelectedCategories(urlCategory ? [urlCategory] : []);
    setCurrentPage(1);
  }, [urlCategory]);

  // Fetch all filter options
  const { data: categories } = useFetchAllCategoriesQuery({});
  const { data: brands } = useFetchAllBrandsQuery({});
  const { data: procedure } = useFetchAllProcedureQuery({});

  // UI dropdown toggles
  const [showCategory, setShowCategory] = useState(true);
  const [showProcedure, setShowProcedure] = useState(true);
  const [showBrand, setShowBrand] = useState(true);
  const [showAvailability, setShowAvailability] = useState(true);

  // Handle Checkbox Change 
  const handleCheckboxChange = (value, setState) => {
    setState((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handlePriceFilter = () => {
    setCurrentPage(1); 
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto container text-white">
      <div className="container mx-auto flex justify-start items-center px-2 sm:px-5 md:px-0">
        <BreadCrumb title="Product" name="Home" />
      </div>

      <SectionHeading title="All Products" showButton={false} />

      <div className="flex flex-col md:flex-row gap-4 sm:gap-5 md:gap-6 min-h-screen px-2 sm:px-4 md:px-0 pb-16 md:pb-24">
        {/* Filter Sidebar */}
        <div className="bg-gray-800 px-3 sm:px-4 rounded-lg w-full md:w-1/4 lg:w-1/5 xl:w-1/5 md:h-[90vh] h-auto mb-6 md:mb-0 overflow-y-auto no-scrollbar">
          <div className="space-y-5">

            {/* Price Filter */}
            <div className="p-4 w-full max-w-xs border-b border-[#DBDBDB]">
              <h3 className="text-white text-sm font-semibold mb-3">Price Filter</h3>
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="number"
                  placeholder="Min"
                  min={0}
                  value={minPrice}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (v === "") { setMinPrice(""); return; }
                    const n = Math.max(0, Number(v) || 0);
                    setMinPrice(String(n));
                  }}
                  className="w-full py-2 px-2 rounded border border-gray-400 bg-transparent text-white placeholder:text-gray-400 outline-none"
                />
                <span className="text-white">–</span>
                <input
                  type="number"
                  placeholder="Max"
                  min={0}
                  value={maxPrice}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (v === "") { setMaxPrice(""); return; }
                    const n = Math.max(0, Number(v) || 0);
                    setMaxPrice(String(n));
                  }}
                  className="w-full p-2 rounded border border-gray-400 bg-transparent text-white placeholder:text-gray-400 outline-none"
                />
                <button
                  onClick={handlePriceFilter}
                  className="px-6 py-3 bg-[#136BFB] hover:bg-blue-700 rounded text-white border border-gray-300"
                >
                  <BiSolidDownArrow className="-rotate-90"></BiSolidDownArrow>
                </button>
              </div>
            </div>

            {/* Category Filter */}
            <div className="border-b border-[#DBDBDB] pb-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setShowCategory(!showCategory)}
              >
                <h3 className="text-lg font-semibold">Category</h3>
                <BiSolidDownArrow
                  className={`transition-transform duration-300 text-[#136BFB] ${
                    showCategory ? "rotate-0" : "rotate-180"
                  }`}
                />
              </div>
              {showCategory && (
                <ul className="space-y-2 mt-2">
                  {(Array.isArray(categories) && categories.length > 0) ? (
                    categories.map((cat) => (
                      <li key={cat._id} className="flex justify-between items-center">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="rounded text-blue-500 bg-[#2b2d32] border border-[#136BFB]"
                            checked={selectedCategories?.includes(cat._id)}
                            onChange={() => handleCheckboxChange(cat._id, setSelectedCategories)}
                          />
                          <span>{cat.name}</span>
                        </label>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-400 text-sm">No categories found</li>
                  )}
                </ul>
              )}
            </div>

            {/* Procedure Filter */}
            <div className="border-b border-[#DBDBDB] pb-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setShowProcedure(!showProcedure)}
              >
                <h3 className="text-lg font-semibold">Procedure Type</h3>
                <BiSolidDownArrow
                  className={`transition-transform duration-300 text-[#136BFB] ${
                    showProcedure ? "rotate-0" : "rotate-180"
                  }`}
                />
              </div>
              {showProcedure && (
                <ul className="space-y-2 mt-2">
                  {(Array.isArray(procedure) && procedure.length > 0) ? (
                    procedure.map((prc) => (
                      <li key={prc._id} className="flex justify-between items-center">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="rounded text-blue-500 bg-[#2b2d32] border border-[#136BFB]"
                            checked={selectedProcedures.includes(prc._id)}
                            onChange={() => handleCheckboxChange(prc._id, setSelectedProcedures)}
                          />
                          <span>{prc.name}</span>
                        </label>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-400 text-sm">No procedure found</li>
                  )}
                </ul>
              )}
            </div>

            {/* Brand Filter */}
            <div className="border-b border-[#DBDBDB] pb-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setShowBrand(!showBrand)}
              >
                <h3 className="text-lg font-semibold">Brand</h3>
                <BiSolidDownArrow
                  className={`transition-transform duration-300 text-[#136BFB] ${
                    showBrand ? "rotate-0" : "rotate-180"
                  }`}
                />
              </div>
              {showBrand && (
                <ul className="space-y-2 mt-2">
                  {(Array.isArray(brands) && brands.length > 0) ? (
                    brands.map((brand) => (
                      <li key={brand._id} className="flex justify-between items-center">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="rounded text-blue-500 bg-[#2b2d32] border border-[#136BFB]"
                            checked={selectedBrands.includes(brand._id)}
                            onChange={() => handleCheckboxChange(brand._id, setSelectedBrands)}
                          />
                          <span>{brand.name}</span>
                        </label>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-400 text-sm">No brand found</li>
                  )}
                </ul>
              )}
            </div>

            {/* Availability Filter */}
            <div>
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setShowAvailability(!showAvailability)}
              >
                <h3 className="text-lg font-semibold">Availability</h3>
                <BiSolidDownArrow
                  className={`transition-transform duration-300 text-[#136BFB] ${
                    showAvailability ? "rotate-0" : "rotate-180"
                  }`}
                />
              </div>
              {showAvailability && (
                <ul className="space-y-2 mt-2">
                  <li>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="availability"
                        value="In Stock"
                        checked={availability === "In Stock"}
                        onChange={(e) => setAvailability(e.target.value)}
                        className="rounded text-blue-500"
                      />
                      <span>In Stock</span>
                    </label>
                  </li>
                  <li>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="availability"
                        value="Out of Stock"
                        checked={availability === "Out of Stock"}
                        onChange={(e) => setAvailability(e.target.value)}
                        className="rounded text-blue-500"
                      />
                      <span>Out of Stock</span>
                    </label>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Product Cards */}
        <div className="w-full flex flex-col">
          {viewProducts.length === 0 ? (
            <div className="w-full flex flex-col items-center justify-center text-center bg-[#1E1E1E]/40 rounded-lg p-10 md:p-14 border border-gray-800">
              <div className="mb-4">
                <svg className="w-12 h-12 text-[#136BFB] animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.3-4.3" />
                </svg>
              </div>
              <h3 className="text-white text-lg md:text-xl font-semibold">No products found</h3>
              <p className="text-gray-400 mt-1 text-sm md:text-base">Try changing the search or clearing some filters.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a href="/product" className="px-4 py-2 rounded-md bg-[#136BFB] text-white text-sm hover:bg-blue-700">Clear Filters</a>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 w-full items-stretch">
                {viewProducts.map((product) => (
                  <HotSellingCard
                    key={product._id}
                    id={product?.productId}
                    product={product}
                    image={`${getBaseUrl()}${product?.images?.[0]}`}
                    title={product.name}
                    description={product.description}
                    cardHeight={260}
                    cardWidth={260}
                    price={product.price}
                  />
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
                  <button
                    className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`px-3 py-1 rounded ${
                        page === currentPage
                          ? "bg-[#136BFB] text-white font-bold"
                          : "bg-gray-700 text-white hover:bg-[#136BFB]"
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}