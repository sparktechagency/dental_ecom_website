import React from 'react'
import { FaAngleRight } from "react-icons/fa6";
import { FaCartArrowDown } from "react-icons/fa6";
import Link from 'next/link'
import CustomButton from "../customButton/CustomButton"

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
        <div 
            data-aos="fade-up"
       data-aos-duration="800"
        className="relative text-center flex flex-col gap-4 p-6 rounded-lg max-w-2xl mx-auto">
          <div className="flex justify-center">
            <div className="bg-[#f2fce2] rounded-3xl py-2 px-4">
              <p className="text-blue-600 text-sm md:font-semibold">Premium Dental Supplies</p>
            </div>
          </div>
          <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-white">Elevating Dental Care Excellence</h2>

          <p className="text-center text-sm md:text-base md:leading-4 lg:leading-8 text-white">
            Providing cutting-edge dental supplies and equipment to enhance your practice
          </p>

          {/* button wrapper */}
          <div className="flex flex-col gap-4 md:flex-row gap-8 items-center justify-center">
           <div>
           <Link
              href="/allcategory"
              className="flex items-center gap-4 
             bg-[#4a90e2] 
              px-6 py-3 rounded-3xl cursor-pointer
              transition-all duration-500 
              hover:bg-gradient-to-r hover:from-[#1f68bb] hover:to-[#6fb8ff]
               hover:scale-105 hover:shadow-lg font-bold"
  >
    Explore Products <FaAngleRight />
  </Link>
</div>


              <div>

                <div> 
                   <Link
                    href="/allcategory"
                   > <CustomButton 
  icon={<FaCartArrowDown className="text-xl" />}
  text="Shop Now"
/>
  </Link>

                </div>
 {/* <Link
        href="/product"
        className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#74b95c] to-[#5e99ca] text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
      >
        <FaCartArrowDown className="text-xl" />
        Shop Now
      </Link> */}
</div>
          </div>
        
         
        </div>
      </div>
    </div>
  )
}

export default Hero