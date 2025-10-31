import React from "react";
export default function Pharmaceuticals() {
  return (
    <div className="flex justify-between items-center container mx-auto py-10 px-5 md:px-0">
      <div className="w-1/2">
        {/* <h1 className="text-7xl font-bold text-white">Comming Soon</h1> */}
        <img src="/mask.png" alt="doc pic" className="w-full h-full" />
        <p className="text-gray-600 text-xl mt-5">
          We are working hard on this page We will be back soon please visit
          again
        </p>
      </div>
      <div className="w-1/2 flex justify-end items-end">
        <img src="./doc2.png" alt="doc pic" className="w-[400px] h-[600px] object-contain" />
      </div>
    </div>
  );
}