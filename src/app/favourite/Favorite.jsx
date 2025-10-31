"use client";
import BreadCrumb from "@/components/shared/BreadCrumb";
import HotSellingCard from "@/components/shared/HotSellingCard";
import { CiSearch } from "react-icons/ci";

export default function Favorite() {
  const products = [
    {
      title: "Penora 200",
      image:
        "https://i.ibb.co/nsfm8xgd/4de2c5b7-3921-48c0-8683-f1a166734214.jpg",
      description:
        "High-speed titanium handpiece with quattro spray, ergonomic grip",
    },
    {
      title: "Walden Tesla Air Rotor",
      image: "https://i.ibb.co/Wvr7BDR9/selling2.png",
      description:
        "High-speed titanium handpiece with quattro spray, ergonomic grip",
    },
    {
      title: "Endo Excellence canal Commander...",
      image: "https://i.ibb.co/gb6H9kgd/selling3.png",
      description:
        "High-speed titanium handpiece with quattro spray, ergonomic grip",
    },
    {
      title: "Nova Compo Plus",
      image: "https://i.ibb.co/7dwxVDfq/selling4.png",
      description:
        "High-speed titanium handpiece with quattro spray, ergonomic grip",
    },
    {
      title: "B&E Etch-37",
      image: "https://i.ibb.co/2YpB12Kz/selling5.png",
      description:
        "High-speed titanium handpiece with quattro spray, ergonomic grip",
    },
  ];

  return (
    <div className="mx-auto container text-white py-10 px-0">
      <div>
        <BreadCrumb name={`Home`} title={`Favorite`}></BreadCrumb>
      </div>

      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold">My Favorite</h1>
        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CiSearch className="h-4 w-4 text-[#136BFB]" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="bg-black border border-[#136BFB] rounded-xl pl-10 pr-4 py-2 text-white placeholder-[#136BFB] focus:outline-none w-64"
            />
          </div>
        </div>
      </div>

      {/* cards */}
      <div className="flex gap-5 flex-wrap justify-center">
        {products.map((product, idx) => (
          <HotSellingCard
            key={idx}
            image={product.image}
            title={product.title}
            description={product.description}
            onViewDetails={() => alert(`View: ${product.title}`)}
            onAddToCart={() => alert(`Added to Cart: ${product.title}`)}
            onWishlistClick={() => alert(`Wishlisted: ${product.title}`)}
          />
        ))}
      </div>
    </div>
  );
}