import React from 'react'
import { FaAngleRight } from "react-icons/fa6";
import Link from 'next/link'

const Hero = () => {
  return (
    <div>



      <div
        className="relative bg-cover bg-center bg-no-repeat py-12 md:py-20 lg:py-64 px-4 overflow-hidden w-full"
        style={{ backgroundImage: "url('/doctors_image.jpeg')" }}
      >
        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-[#86a6c6]/60"></div>

        {/* Content */}
        <div className="relative text-center flex flex-col gap-4 p-6 rounded-lg max-w-2xl mx-auto">
          <div className="flex justify-center">
            <div className="bg-[#f2fce2] rounded-3xl py-2 px-4">
              <p className="text-blue-600 text-sm font-semibold">Premium Dental Supplies</p>
            </div>
          </div>
          <h2 className="text-6xl font-bold text-white">Elevating Dental Care Excellence</h2>

          <p className="text-center leading-8 text-white">
            Providing cutting-edge dental supplies and equipment to enhance your practice
          </p>

          {/* button wrapper */}
          <div className="flex gap-12 items-center justify-center">
           <div>
           <Link
              href="/product"
              className="flex items-center gap-4 
             bg-[#4a90e2] 
              px-6 py-3 rounded-3xl cursor-pointer
              transition-all duration-500 
              hover:bg-gradient-to-r hover:from-[#1f68bb] hover:to-[#6fb8ff]
               hover:scale-105 hover:shadow-lg"
  >
    Explore Products <FaAngleRight />
  </Link>
</div>
               <div >
             <button className="flex items-center gap-4"> Explore Products <FaAngleRight /> </button> 
            </div>
          </div>
         
        </div>
      </div>
    </div>
  )
}

export default Hero