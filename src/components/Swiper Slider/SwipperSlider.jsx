"use client";

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
 import Image from 'next/image';
// import './styles.css';
import { Pagination, Autoplay } from "swiper/modules";

const SwipperSlider = () => {
  return (
     <div className="container mx-auto overflow-hidden bg-transparent py-6">
      <Swiper

        slidesPerView={5}
        spaceBetween={30}
        loop={true}

        autoplay={{
          delay: 3000, 
          disableOnInteraction: false,
        }}
        speed={800}
        modules={[Pagination, Autoplay]}
        className="mySwiper h-42"
      >
        <SwiperSlide className="  flex items-center justify-center border border-[#136bfb] shadow-lg hover:shadow-[#136BFB]/20">
          <div className="flex items-center justify-center  h-full">
             <Image src="/first_slider.png"
             height={100}
             width={100}
             />
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center border border-[#136bfb] shadow-lg hover:shadow-[#136BFB]/20 ">
          <div className="flex items-center justify-center  h-full">
             <Image src="/second_slider.png"
             height={100}
             width={100}
             />
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center border border-[#136bfb] shadow-lg hover:shadow-[#136BFB]/20">
          <div className="flex items-center justify-center  h-full">
             <Image src="/third_slider.png"
             height={100}
             width={100}
             />
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center border border-[#136bfb] shadow-lg hover:shadow-[#136BFB]/20">
          <div className="flex items-center justify-center  h-full">
             <Image src="/fourth slider.png"
             height={100}
             width={100}
             />
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center border border-[#136bfb] shadow-lg hover:shadow-[#136BFB]/20">
          <div className="flex items-center justify-center  h-full">
             <Image src="/serventh_slider.png"
             height={100}
             width={100}
             />
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center border border-[#136bfb] shadow-lg hover:shadow-[#136BFB]/20">
          <div className="flex items-center justify-center  h-full">
             <Image src="/tenth_slider.png"
             height={100}
             width={100}
             />
          </div>
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center border border-[#136bfb] shadow-lg hover:shadow-[#136BFB]/20">
          <div className="flex items-center justify-center  h-full">
             <Image src="/twlve_slider.png"
             height={100}
             width={100}
             />
          </div>
        </SwiperSlide>
     
       
      </Swiper>
    </div>
  )
}

export default SwipperSlider